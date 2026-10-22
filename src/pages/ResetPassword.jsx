import { useState } from "react";
import { FiHash } from "react-icons/fi";
import { forgotPassword, resetPassword } from "../api";
import IconInput from "../components/IconInput";
import SlowServerHint from "../components/SlowServerHint";
import PasswordInput from "../components/PasswordInput";

export default function ResetPassword({ email, onSuccess, onBackToLogin }) {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await resetPassword(email, code, newPassword);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setInfo("");
    try {
      await forgotPassword(email);
      setCode("");
      setInfo("A new code has been sent. Use the newest email.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card">
      <h1>Reset password</h1>
      <p className="subtitle">
        We sent a 6-digit code to <strong>{email}</strong>. It expires in 15
        minutes.
      </p>
      <form onSubmit={handleSubmit}>
        <IconInput
          icon={FiHash}
          placeholder="6-digit code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{6}"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          required
        />
        <PasswordInput
          placeholder="New password (min 6 characters)"
          minLength={6}
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <SlowServerHint loading={loading} />
        {info && <p className="success">{info}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Saving…" : "Reset password"}
        </button>
      </form>
      <p className="switch">
        Didn't get it?{" "}
        <button type="button" className="link" onClick={handleResend}>
          Resend code
        </button>
        {" · "}
        <button type="button" className="link" onClick={onBackToLogin}>
          Back to log in
        </button>
      </p>
    </div>
  );
}
