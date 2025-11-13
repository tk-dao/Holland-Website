import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/portal/dashboard";
  console.log(from);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  async function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page
    setError(null);
    setSubmitting(true); // disable the button + show spinner text
    try {
      await login({ email, password }); // Supabase email/password login
      navigate(from, { replace: true }); // go to intended page
    } catch (e) {
      const msg = e?.message || "Login failed";
      // Supabase returns: "Invalid login credentials" (status 400)
      if (/invalid login credentials/i.test(msg)) {
        setError(
          "We couldn't find that account. Double-check your email/password or create a new account."
        );
      } else {
        setError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="grid relative place-items-center min-h-screen">
      <img
        src="../media/UNMC_landscape2.jpg"
        alt="UNMC campus"
        className="h-screen w-screen object-cover"
      ></img>
      <aside
        className="
        absolute right-10 top-1/2 
        -translate-y-1/2 z-10
        w-[min(92vw,480px)] h-[720px]
        rounded-4xl bg-white/95
        backdrop-blur shadow-2xl 
        p-8 flex flex-col items-center"
      >
        <img
          src="/media/UNMC_logo.png"
          alt="UNMC"
          className="h-auto w-auto top-0 mb-24"
        ></img>

        <p className="text-2xl font-display-lemon">Welcome Back!</p>
        <p className="text-[12px] text-gray-600 mt-2 mb-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 underline">
            Create an account
          </Link>{" "}
          here!
        </p>

        <form
          onSubmit={handleSubmit}
          className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        >
          {/* <legend className="fieldset-legend font-display-lemonlight">
            Login
          </legend> */}

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && (
            <div className="alert alert-error mt-3">
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-neutral mt-4"
            disabled={submitting}
          >
            {submitting ? "Signing in…" : "Login"}
          </button>
        </form>
      </aside>
    </div>
  );
}
