import { useEffect, useState } from "react";

// The free backend sleeps when nobody uses it and takes up to a minute to wake.
// If a request is still loading after a few seconds, tell the user why.
const SHOW_AFTER_MS = 5000;

export default function SlowServerHint({ loading }) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!loading) {
      return;
    }
    const timer = setTimeout(() => setSlow(true), SHOW_AFTER_MS);
    // When loading finishes, cancel the timer and hide the note again
    return () => {
      clearTimeout(timer);
      setSlow(false);
    };
  }, [loading]);

  if (!loading || !slow) {
    return null;
  }

  return (
    <p className="slow-hint" role="status">
      ⏳ Waking up the server - this can take up to a minute on the first visit.
      Thanks for waiting!
    </p>
  );
}
