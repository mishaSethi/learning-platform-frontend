// Same rules as the backend's @StrongPassword
export const PASSWORD_RULES = [
  { label: "8–64 characters", test: (p) => p.length >= 8 && p.length <= 64 },
  { label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "Number", test: (p) => /\d/.test(p) },
  { label: "Special character", test: (p) => /[^A-Za-z0-9\s]/.test(p) },
  { label: "No spaces", test: (p) => p.length > 0 && !/\s/.test(p) },
];

export function isStrongPassword(password) {
  return PASSWORD_RULES.every((rule) => rule.test(password));
}
