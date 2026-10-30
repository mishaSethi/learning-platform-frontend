import { FiCheck, FiX } from "react-icons/fi";
import { PASSWORD_RULES } from "../utils/password";

const LEVELS = [
  "Very weak",
  "Weak",
  "Weak",
  "Medium",
  "Medium",
  "Strong",
  "Strong",
];

export default function PasswordStrength({ password }) {
  if (!password) {
    return null;
  }
  const passed = PASSWORD_RULES.filter((rule) => rule.test(password)).length;
  const level = LEVELS[passed];
  const levelClass =
    passed === PASSWORD_RULES.length
      ? "strong"
      : passed >= 4
        ? "medium"
        : "weak";

  return (
    <div className="password-strength">
      <div className="strength-bar">
        <div
          className={levelClass}
          style={{ width: `${(passed / PASSWORD_RULES.length) * 100}%` }}
        />
      </div>
      <span className={`strength-label ${levelClass}`}>{level}</span>
      <ul className="strength-rules">
        {PASSWORD_RULES.map((rule) => {
          const ok = rule.test(password);
          return (
            <li key={rule.label} className={ok ? "ok" : ""}>
              {ok ? <FiCheck /> : <FiX />} {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
