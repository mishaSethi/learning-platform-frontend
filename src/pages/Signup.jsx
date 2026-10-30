import { useState } from "react";
import { signup } from "../api";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import IconInput from "../components/IconInput";
import SlowServerHint from "../components/SlowServerHint";
import PasswordInput from "../components/PasswordInput";
import PasswordStrength from "../components/PasswordStrength";
import { isStrongPassword } from "../utils/password";

export default function Signup({ onSuccess, onGoToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!isStrongPassword(form.password)) {
      setError(
        "Please choose a stronger password - see the checklist below the password box.",
      );
      return;
    }

    setLoading(true);
    try {
      await signup(form.name, form.email, form.password, form.phone);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Create account</h1>
      <form onSubmit={handleSubmit}>
        <IconInput
          icon={FiUser}
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <IconInput
          icon={FiMail}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <PasswordInput
          name="password"
          placeholder="Create a strong password"
          maxLength={64}
          value={form.password}
          onChange={handleChange}
          required
        />
        <PasswordStrength password={form.password} />
        <IconInput
          icon={FiPhone}
          name="phone"
          type="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}
        <SlowServerHint loading={loading} />
        <button type="submit" disabled={loading}>
          {loading ? "Creating…" : "Sign up"}
        </button>
      </form>
      <p className="switch">
        Already have an account?{" "}
        <button type="button" className="link" onClick={onGoToLogin}>
          Log in
        </button>
      </p>
    </div>
  );
}
