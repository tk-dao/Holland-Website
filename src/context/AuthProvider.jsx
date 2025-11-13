// src/context/AuthProvider.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const AUTH_CTX_VERSION = "v1";
const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const signingOutRef = useRef(false);

  const login = ({ email, password }) =>
    supabase.auth.signInWithPassword({ email, password });

  const signup = ({ email, password, fullName }) =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

  async function logout() {
    signingOutRef.current = true;
    try {
      await supabase.auth.signOut();
    } finally {
      setUser(null);
      setProfile(null);
      signingOutRef.current = false;
    }
  }

  const profileQueueRef = useRef(Promise.resolve());
  let profileSeq = 0;
  function runProfileTask(label, fn) {
    const id = ++profileSeq;
    console.log(`[Q] START #${id} ${label}`);
    profileQueueRef.current = profileQueueRef.current
      .catch((e) => {
        console.warn(`[Q] prior task error (ignored to keep queue):`, e);
      })
      .then(async () => {
        try {
          const r = await fn();
          console.log(`[Q] DONE  #${id} ${label}`);
          return r;
        } catch (e) {
          console.error(`[Q] FAIL  #${id} ${label}`, e);
          throw e;
        }
      });
    return profileQueueRef.current;
  }

  // async function ensureProfile(u) {
  //   await supabase.from("profiles").upsert(
  //     {
  //       auth_user_id: u.id,
  //       email: u.email,
  //       full_name: u.user_metadata?.full_name ?? null,
  //       avatar_url: u.user_metadata?.avatar_url ?? null,
  //     },
  //     { onConflict: "auth_user_id" }
  //   );
  // }

  async function loadProfile(userId) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("auth_user_id", userId)
      .maybeSingle();
    return data ?? null;
  }

  useEffect(() => {
    let mounted = true;

    // Bootstrap
    (async () => {
      console.log("BOOTSTRAP: start");
      const { data: { session } = {} } = await supabase.auth.getSession();
      if (!mounted) return;

      const u = session?.user ?? null;
      setUser(u);
      setLoading(false);

      if (u) {
        const p = await runProfileTask("loadProfile", () => loadProfile(u.id)); // then read it
        console.log(p);
        setProfile(p || null);
      } else {
        setProfile(null);
      }
      console.log("BOOTSTRAP: end");
    })();

    // Auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (signingOutRef.current) {
          console.log("[Auth] ignoring event during signout:", _event);
          return;
        }

        const u = session?.user ?? null;
        console.log("Auth Event:", _event, !!u ? "has user" : "no user");

        setUser(u);
        setLoading(false);

        if (!u) {
          setProfile(null);
          return;
        }

        const shouldLoadProfile = [
          "INITIAL_SESSION",
          "SIGNED_IN",
          "TOKEN_REFRESHED",
          "USER_UPDATED",
        ].includes(_event);

        if (shouldLoadProfile) {
          console.log(u.id);
          runProfileTask("loadProfile", () => loadProfile(u.id))
            .then((p) => {
              console.log(p);
              setProfile(p || null);
            })
            .catch((err) => {
              console.error("[Auth] profile load failed", err);
              setProfile(null);
            });
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <AuthCtx.Provider
      value={{
        user,
        profile,
        loading,
        login,
        signup,
        logout,
        tag: AUTH_CTX_VERSION,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}
