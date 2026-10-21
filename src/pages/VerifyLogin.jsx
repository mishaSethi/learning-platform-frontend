import { useState } from "react";
import { FiShield } from "react-icons/fi";
import { login, verifyTwoFactor } from "../api";
import IconInput from "../components/IconInput";

export default function VerifyLogin({
  email,
  password,
  onSuccess,
  onBackToLogin,
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      const data = await verifyTwoFactor(email, code);
      localStorage.setItem("token", data.token);
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
      await login(email, password);
      setCode("");
      setInfo("A new code has been sent. Use the newest email.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card">
      <h1>Check your email</h1>
      <p className="subtitle">
        For your security, we sent a 6-digit login code to{" "}
        <strong>{email}</strong>. It expires in 5 minutes.
      </p>
      <form onSubmit={handleSubmit}>
        <IconInput
          icon={FiShield}
          placeholder="6-digit code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{6}"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          autoFocus
          required
        />
        {error && <p className="error">{error}</p>}
        {info && <p className="success">{info}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Verifying…" : "Verify and log in"}
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
