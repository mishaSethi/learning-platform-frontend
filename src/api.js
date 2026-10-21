const API_URL = import.meta.env.VITE_API_URL;

// Turn HTTP error codes into friendly messages
const ERROR_MESSAGES = {
  400: "Please check your details and try again.",
  401: "Invalid email or password.",
  409: "This email is already registered.",
};

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(
      ERROR_MESSAGES[response.status] ||
        "Something went wrong. Please try again.",
    );
  }
  return response.json();
}

export function signup(name, email, password, phone) {
  return request("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password, phone }),
  });
}

export function login(email, password) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getMe() {
  return request("/api/me");
}
