import { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group">
      <FiLock className="input-icon" />
      <input {...props} type={showPassword ? "text" : "password"} />
      <button
        type="button"
        className="eye-button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
}
