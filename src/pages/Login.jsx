import { useState } from "react";
import { login } from "../api";
import { FiMail } from "react-icons/fi";
import IconInput from "../components/IconInput";
import PasswordInput from "../components/PasswordInput";

export default function Login({ message, onSuccess, onGoToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      onSuccess();
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
        {error && <p className="error">{error}</p>}
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
