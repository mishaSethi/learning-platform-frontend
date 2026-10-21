export default function Welcome({ onGetStarted, onLogin }) {
  return (
    <div className="welcome">
      <span className="badge">🏔️ Start your journey</span>
      <h1>
        Welcome to the <span className="highlight">Learning Platform</span>
      </h1>
      <p>
        Learn something new every day — one step at a time, like climbing a
        mountain.
      </p>
      <div className="welcome-buttons">
        <button onClick={onGetStarted}>Get started →</button>
        <button className="secondary" onClick={onLogin}>
          Log in
        </button>
      </div>
    </div>
  );
}
