import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null); // e.g., “check your email”

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      // include full name in user_metadata; trigger/upsert copies to profiles
      const { data } = await signup({ email, password, fullName });

      // Two possibilities depending on your Supabase Email Confirm setting:
      // 1) Email confirm ON (default): no session yet → ask user to check email
      if (!data.session) {
        setInfo(
          "Account created! Please check your email to confirm before signing in."
        );
      } else {
        // 2) Email confirm OFF: they’re already logged in
        navigate("/portal/dashboard", { replace: true });
      }
    } catch (e) {
      setError(e?.message || "Signup failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create your account</h2>

          {info && (
            <div className="alert alert-info">
              <span>{info}</span>
            </div>
          )}
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="input input-bordered w-full"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <input
              className="input input-bordered w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <input
              className="input input-bordered w-full"
              placeholder="Confirm password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button className="btn btn-primary w-full" disabled={submitting}>
              {submitting ? "Creating…" : "Create account"}
            </button>
          </form>

          <p className="text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
