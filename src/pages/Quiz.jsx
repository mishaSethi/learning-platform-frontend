import { useEffect, useState } from "react";
import {
  FiAward,
  FiBarChart2,
  FiCheckCircle,
  FiRefreshCw,
  FiRepeat,
  FiXCircle,
} from "react-icons/fi";
import {
  getQuizAttempts,
  getQuizLeaderboard,
  getQuizQuestions,
  submitQuiz,
} from "../api";
import "./Quiz.css";

const LETTERS = ["A", "B", "C", "D"];

function scoreMessage(score, total) {
  if (score === total) return "Summit reached! A perfect score. 🏔️";
  if (score >= total * 0.7) return "Great climb - you know your mountains!";
  if (score >= total * 0.4)
    return "Good effort - keep exploring the dashboard and try again.";
  return "Keep training - read About the Himalayas and have another go.";
}

export default function Quiz() {
  const [stage, setStage] = useState("start"); // "start" | "playing" | "result"
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // questionId -> chosen option (0-3)
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [board, setBoard] = useState({ top: [], me: null, totalUsers: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load my past attempts and the leaderboard whenever we're on the start screen
  useEffect(() => {
    if (stage === "start") {
      getQuizAttempts()
        .then(setAttempts)
        .catch(() => setAttempts([]));
      getQuizLeaderboard()
        .then(setBoard)
        .catch(() => setBoard({ top: [], me: null, totalUsers: 0 }));
    }
  }, [stage]);

  async function startQuiz() {
    setError("");
    setLoading(true);
    try {
      setQuestions(await getQuizQuestions());
      setAnswers({});
      setCurrent(0);
      setStage("playing");
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function finishQuiz() {
    const unanswered = questions.length - Object.keys(answers).length;
    if (
      unanswered > 0 &&
      !window.confirm(
        `You have ${unanswered} unanswered question(s). Submit anyway?`,
      )
    ) {
      return;
    }
    setError("");
    setLoading(true);
    try {
      const payload = questions.map((q) => ({
        questionId: q.id,
        selectedOption: answers[q.id] ?? null,
      }));
      setResult(await submitQuiz(payload));
      setStage("result");
      window.scrollTo(0, 0);
      // Fetch the new ranking so the result screen can show it
      getQuizLeaderboard()
        .then(setBoard)
        .catch(() => {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ---------- Start screen ---------- */
  if (stage === "start") {
    const me = board.me;
    // Best score and count come from the leaderboard when it loads, otherwise
    // from my own attempts - so the tiles never show "-" once I've played
    const myBest =
      me?.bestScore ??
      (attempts.length ? Math.max(...attempts.map((a) => a.score)) : null);
    const myCount = me ? me.attempts : attempts.length;
    const myRank = me?.rank ?? null; // null until I've taken the quiz
    return (
      <div className="quiz-page">
        <header className="quiz-header">
          <h1 className="page-title">Himalaya Quiz</h1>
          <p className="page-intro">
            Test what you've learned about the world's highest mountains. Every
            quiz picks 10 random questions, and your answers are marked on the
            server.
          </p>
        </header>

        <div className="quiz-stats">
          <div className="quiz-stat">
            <FiAward />
            <span className="quiz-stat-value">
              {myBest !== null ? `${myBest}/10` : "-"}
            </span>
            <span className="quiz-stat-label">Your best score</span>
          </div>
          <div className="quiz-stat">
            <FiBarChart2 />
            <span className="quiz-stat-value">
              {myRank !== null ? `${myRank}/${board.totalUsers}` : `-/${board.totalUsers || "-"}`}
            </span>
            <span className="quiz-stat-label">Your rank / all users</span>
          </div>
          <div className="quiz-stat">
            <FiRepeat />
            <span className="quiz-stat-value">{myCount}</span>
            <span className="quiz-stat-label">Quizzes taken</span>
          </div>
        </div>

        <div className="quiz-card quiz-rules">
          <h3>How it works</h3>
          <ul>
            <li>10 multiple-choice questions, one at a time</li>
            <li>Go back and change answers before you submit</li>
            <li>See the right answer and an explanation for every question</li>
            <li>Your best score sets your rank among all users</li>
          </ul>
          {error && <p className="error">{error}</p>}
          <button type="button" onClick={startQuiz} disabled={loading}>
            {loading ? "Loading questions…" : "Start quiz"}
          </button>
        </div>

        {attempts.length > 0 && (
          <section className="quiz-card">
            <h3 className="quiz-card-title">Your recent attempts</h3>
            <ul className="quiz-history">
              {attempts.slice(0, 5).map((a) => (
                <li key={a.id}>
                  <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                  <strong>
                    {a.score}/{a.total}
                  </strong>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  /* ---------- Playing ---------- */
  if (stage === "playing") {
    const q = questions[current];
    const isLast = current === questions.length - 1;
    const answered = Object.keys(answers).length;

    return (
      <div className="quiz-page">
        <div className="quiz-progress-label">
          <span>
            Question {current + 1} of {questions.length}
          </span>
          <span>{answered} answered</span>
        </div>
        <div className="quiz-progress">
          <div
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="quiz-card quiz-question">
          <span className="quiz-question-number">Question {current + 1}</span>
          <h2>{q.text}</h2>
          <div className="quiz-options">
            {q.options.map((option, i) => (
              <button
                key={option}
                type="button"
                className={`quiz-option ${answers[q.id] === i ? "selected" : ""}`}
                onClick={() => setAnswers({ ...answers, [q.id]: i })}
              >
                <span className="quiz-letter">{LETTERS[i]}</span>
                <span className="quiz-option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        <div className="quiz-nav">
          <button
            type="button"
            className="quiz-secondary"
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
          >
            ← Previous
          </button>
          {isLast ? (
            <button type="button" onClick={finishQuiz} disabled={loading}>
              {loading ? "Marking…" : "Submit answers"}
            </button>
          ) : (
            <button type="button" onClick={() => setCurrent(current + 1)}>
              Next →
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ---------- Result ---------- */
  return (
    <div className="quiz-page">
      <div className="quiz-card quiz-score">
        <span className="quiz-score-number">
          {result.score}/{result.total}
        </span>
        <p>{scoreMessage(result.score, result.total)}</p>
        {board.me?.rank != null && (
          <p className="quiz-score-rank">
            Your rank: <strong>{board.me.rank}/{board.totalUsers}</strong> (best{" "}
            {board.me.bestScore}/10)
          </p>
        )}
        <div className="quiz-score-actions">
          <button type="button" onClick={startQuiz} disabled={loading}>
            <FiRefreshCw /> Try again
          </button>
          <button
            type="button"
            className="quiz-secondary"
            onClick={() => setStage("start")}
          >
            Back to start
          </button>
        </div>
      </div>

      <h2 className="section-title">Review your answers</h2>
      <div className="quiz-review">
        {result.review.map((item, n) => (
          <article
            key={item.questionId}
            className={`quiz-card quiz-review-item ${item.correct ? "right" : "wrong"}`}
          >
            <h3>
              {item.correct ? <FiCheckCircle /> : <FiXCircle />} {n + 1}.{" "}
              {item.text}
            </h3>
            <p>
              Your answer:{" "}
              <strong>
                {item.selectedOption === null
                  ? "Skipped"
                  : item.options[item.selectedOption]}
              </strong>
            </p>
            {!item.correct && (
              <p>
                Correct answer:{" "}
                <strong>{item.options[item.correctOption]}</strong>
              </p>
            )}
            <p className="quiz-explanation">{item.explanation}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
