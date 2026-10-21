import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { forgotPassword } from "../api";
import IconInput from "../components/IconInput";

export default function ForgotPassword({ onCodeSent, onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      onCodeSent(email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Forgot password?</h1>
      <p className="subtitle">
        Enter your email and we'll send you a 6-digit code to reset your
        password.
      </p>
      <form onSubmit={handleSubmit}>
        <IconInput
          icon={FiMail}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send code"}
        </button>
      </form>
      <p className="switch">
        Remembered it?{" "}
        <button type="button" className="link" onClick={onBackToLogin}>
          Back to log in
        </button>
      </p>
    </div>
  );
}
