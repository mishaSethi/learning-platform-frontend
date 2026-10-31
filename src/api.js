const API_URL = import.meta.env.VITE_API_URL;

// Turn HTTP error codes into friendly messages
const ERROR_MESSAGES = {
  400: "Please check your details and try again.",
  401: "Invalid email or password.",
  409: "This email is already registered.",
};

async function request(path, options = {}, errorMessages = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      // Files (FormData) set their own Content-Type; everything else is JSON
      ...(!(options.body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error(
      errorMessages[response.status] ||
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

export function forgotPassword(email) {
  return request("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(email, code, newPassword) {
  return request(
    "/api/auth/reset-password",
    {
      method: "POST",
      body: JSON.stringify({ email, code, newPassword }),
    },
    { 400: "Invalid or expired code. Check it, or request a new one." },
  );
}

export function verifyTwoFactor(email, code) {
  return request(
    "/api/auth/verify-2fa",
    {
      method: "POST",
      body: JSON.stringify({ email, code }),
    },
    { 401: "Invalid or expired code. Check it, or request a new one." },
  );
}

export function getQuizQuestions() {
  return request("/api/quiz/questions");
}

export function submitQuiz(answers) {
  return request("/api/quiz/submit", {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
}

export function getQuizAttempts() {
  return request("/api/quiz/attempts");
}

export function getQuizLeaderboard() {
  return request("/api/quiz/leaderboard");
}

export function getProfileDetails() {
  return request("/api/me/details");
}

// Name and email are never sent - they can't be changed
export function updateProfileDetails(details) {
  return request(
    "/api/me/details",
    { method: "PUT", body: JSON.stringify(details) },
    { 400: "Some details aren't valid - please check the highlighted rules and try again." },
  );
}

export function uploadAvatar(imageBlob) {
  const formData = new FormData();
  formData.append("file", imageBlob, "avatar.jpg");
  return request(
    "/api/me/avatar",
    { method: "PUT", body: formData },
    {
      400: "Please choose a JPEG or PNG photo.",
      413: "That photo is too large (max 2 MB).",
    },
  );
}

export function deleteAvatar() {
  return request("/api/me/avatar", { method: "DELETE" });
}

// Photos are images, not JSON, so they are fetched differently.
// Returns a temporary address an <img> can show, or null if there is no photo.
export async function getAvatarUrl() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/me/avatar`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    return null;
  }
  return URL.createObjectURL(await response.blob());
}
