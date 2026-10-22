import { useState } from "react";
import { login } from "../api";
import { FiMail } from "react-icons/fi";
import IconInput from "../components/IconInput";
import SlowServerHint from "../components/SlowServerHint";
import PasswordInput from "../components/PasswordInput";

export default function Login({
  message,
  onSuccess,
  onGoToSignup,
  onForgotPassword,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      onSuccess(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Log in</h1>
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <IconInput
          icon={FiMail}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="link forgot-link"
          onClick={onForgotPassword}
        >
          Forgot password?
        </button>
        {error && <p className="error">{error}</p>}
        <SlowServerHint loading={loading} />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="switch">
        New here?{" "}
        <button type="button" className="link" onClick={onGoToSignup}>
          Create an account
        </button>
      </p>
    </div>
  );
}
