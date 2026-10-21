import { useEffect, useState } from "react";
import { getMe } from "../api";

export default function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => onLogout());
  }, [onLogout]);

  if (!user) {
    return (
      <div className="card">
        <p>Loading your profile…</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h1>Welcome, {user.name}! 👋</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {user.phone && (
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      )}
      <button onClick={onLogout}>Log out</button>
    </div>
  );
}
