import { useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiCompass,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiMap,
  FiMapPin,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { getAvatarUrl, getMe } from "../api";
import Avatar from "../components/Avatar";
import {
  CLIMBERS,
  HIGHEST_PEAKS,
  HIMALAYA_TOPICS,
  POPULAR_TREKS,
  QUICK_FACTS,
  TREKKING_TIPS,
} from "../data/mountains";
import Profile from "./Profile";
import Quiz from "./Quiz";
import "./Dashboard.css";

const SECTIONS = [
  { id: "overview", label: "Overview", icon: FiHome },
  { id: "himalayas", label: "About the Himalayas", icon: FiBookOpen },
  { id: "peaks", label: "Highest Peaks", icon: FiTrendingUp },
  { id: "treks", label: "Popular Treks", icon: FiMap },
  { id: "climbers", label: "Legendary Climbers", icon: FiAward },
  { id: "quiz", label: "Himalaya Quiz", icon: FiHelpCircle },
  { id: "tips", label: "Trekking Tips", icon: FiCompass },
  { id: "profile", label: "My Profile", icon: FiUser },
];

export default function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState("overview");
  // The card that is open in full, or null to show the card list
  const [detail, setDetail] = useState(null);
  // Temporary address of the profile photo, or null to show the initial
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getMe()
      .then((me) => {
        setUser(me);
        if (me.hasAvatar) {
          getAvatarUrl().then(setAvatarUrl);
        }
      })
      .catch(() => onLogout());
  }, [onLogout]);

  // Swap in a new photo address and free the memory of the old one
  function handleAvatarChange(url) {
    setAvatarUrl((old) => {
      if (old) {
        URL.revokeObjectURL(old);
      }
      return url;
    });
  }

  function openSection(id) {
    setSection(id);
    setDetail(null);
    window.scrollTo(0, 0);
  }

  function openDetail(item) {
    setDetail(item);
    window.scrollTo(0, 0);
  }

  if (!user) {
    return (
      <div className="page">
        <div className="card">
          <p>Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const sectionLabel = SECTIONS.find((s) => s.id === section).label;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">🏔️ Himalayan &amp; Skies</div>

        <button
          type="button"
          className="sidebar-user"
          onClick={() => openSection("profile")}
        >
          <Avatar name={user.name} src={avatarUrl} size={44} />
          <span className="sidebar-user-text">
            <strong>{user.name}</strong>
            <small>View profile</small>
          </span>
        </button>

        <nav className="sidebar-nav">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`nav-item ${section === id ? "active" : ""}`}
              onClick={() => openSection(id)}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <button type="button" className="nav-item logout" onClick={onLogout}>
          <FiLogOut />
          <span>Log out</span>
        </button>
      </aside>

      <main className="dashboard-content" key={detail ? detail.title : section}>
        {detail ? (
          <DetailView
            item={detail}
            backLabel={sectionLabel}
            onBack={() => openDetail(null)}
          />
        ) : (
          <>
            {section === "overview" && (
              <Overview user={user} onOpen={openSection} />
            )}
            {section === "himalayas" && <Himalayas onOpen={openDetail} />}
            {section === "peaks" && <Peaks onOpen={openDetail} />}
            {section === "treks" && <Treks onOpen={openDetail} />}
            {section === "climbers" && <Climbers onOpen={openDetail} />}
            {section === "quiz" && <Quiz />}
            {section === "tips" && <Tips />}
            {section === "profile" && (
              <Profile
                user={user}
                avatarUrl={avatarUrl}
                onUserChange={setUser}
                onAvatarChange={handleAvatarChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

/* ---------- Shared building blocks ---------- */

function InfoCard({ badge, badgeClass = "", title, subtitle, text, onClick }) {
  return (
    <button type="button" className="info-card" onClick={onClick}>
      <div className="info-card-top">
        {badge && <span className={`info-badge ${badgeClass}`}>{badge}</span>}
        <h3>{title}</h3>
        {subtitle && <p className="info-subtitle">{subtitle}</p>}
        {text && <p className="info-text">{text}</p>}
      </div>
      <span className="read-more">
        Read more <FiChevronRight />
      </span>
    </button>
  );
}

// item: { kicker, title, subtitle, stats: [{label, value}], paragraphs: [], highlights: [] }
function DetailView({ item, backLabel, onBack }) {
  return (
    <article className="detail">
      <button type="button" className="back-button" onClick={onBack}>
        <FiArrowLeft /> Back to {backLabel}
      </button>

      <header className="detail-hero">
        {item.kicker && <span className="detail-kicker">{item.kicker}</span>}
        <h1>{item.title}</h1>
        {item.subtitle && <p>{item.subtitle}</p>}
      </header>

      {item.stats?.length > 0 && (
        <dl className="detail-stats">
          {item.stats.map((stat) => (
            <div key={stat.label} className="detail-stat">
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="detail-body">
        {item.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>

      {item.highlights?.length > 0 && (
        <section className="detail-highlights">
          <h2>Highlights</h2>
          <ul>
            {item.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

function SectionHeader({ title, intro }) {
  return (
    <>
      <h1 className="page-title">{title}</h1>
      <p className="page-intro">{intro}</p>
    </>
  );
}

/* ---------- Sections ---------- */

function Overview({ user, onOpen }) {
  return (
    <>
      <section className="hero">
        <h1>Welcome, {user.name}! 👋</h1>
        <p>
          Explore the world's highest mountains and plan your next Himalayan
          trek.
        </p>
      </section>

      <div className="facts">
        {QUICK_FACTS.map((fact) => (
          <div key={fact.value} className="fact">
            <span className="fact-value">{fact.value}</span>
            <span className="fact-label">{fact.label}</span>
          </div>
        ))}
      </div>

      <h2 className="section-title">Where to next?</h2>
      <div className="shortcuts">
        {SECTIONS.filter((s) => s.id !== "overview").map(
          ({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className="shortcut"
              onClick={() => onOpen(id)}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ),
        )}
      </div>
    </>
  );
}

function Himalayas({ onOpen }) {
  return (
    <>
      <SectionHeader
        title="About the Himalayas"
        intro="How the world's highest mountains were born, and the rivers, wildlife and people that depend on them. Tap a card to read more."
      />
      <div className="card-grid">
        {HIMALAYA_TOPICS.map((topic) => (
          <InfoCard
            key={topic.id}
            badge={topic.emoji}
            badgeClass="emoji"
            title={topic.title}
            text={topic.summary}
            onClick={() =>
              onOpen({
                kicker: `${topic.emoji} About the Himalayas`,
                title: topic.title,
                subtitle: topic.summary,
                stats: topic.stats,
                paragraphs: topic.paragraphs,
                highlights: topic.highlights,
              })
            }
          />
        ))}
      </div>
    </>
  );
}

function Peaks({ onOpen }) {
  return (
    <>
      <SectionHeader
        title="Highest Peaks"
        intro="The ten highest mountains on Earth - all over 8,000 m, and all in the Himalaya or the neighbouring Karakoram range. Tap a peak to learn its story."
      />
      <div className="card-grid">
        {HIGHEST_PEAKS.map((peak) => (
          <InfoCard
            key={peak.name}
            badge={`#${peak.rank}`}
            title={peak.name}
            subtitle={`${peak.height.toLocaleString("en-IN")} m · ${peak.location}`}
            text={`First climbed ${peak.firstAscent}`}
            onClick={() =>
              onOpen({
                kicker: `#${peak.rank} highest mountain on Earth`,
                title: peak.name,
                subtitle: peak.location,
                stats: [
                  {
                    label: "Height",
                    value: `${peak.height.toLocaleString("en-IN")} m`,
                  },
                  { label: "Range", value: peak.range },
                  { label: "Location", value: peak.location },
                  { label: "First ascent", value: peak.firstAscent },
                ],
                paragraphs: peak.paragraphs,
              })
            }
          />
        ))}
      </div>
    </>
  );
}

function Treks({ onOpen }) {
  return (
    <>
      <SectionHeader
        title="Popular Treks"
        intro="Classic Himalayan treks for every level. Altitudes and durations are typical values - itineraries vary by route and operator."
      />
      <div className="card-grid">
        {POPULAR_TREKS.map((trek) => (
          <button
            key={trek.name}
            type="button"
            className="info-card trek-card"
            onClick={() =>
              onOpen({
                kicker: `${trek.difficulty} trek · ${trek.region}`,
                title: trek.name,
                subtitle: trek.description,
                stats: [
                  { label: "Max altitude", value: trek.maxAltitude },
                  { label: "Duration", value: trek.duration },
                  { label: "Difficulty", value: trek.difficulty },
                  { label: "Best season", value: trek.bestSeason },
                ],
                paragraphs: trek.paragraphs,
                highlights: trek.highlights,
              })
            }
          >
            <div className="info-card-top">
              <div className="trek-header">
                <h3>{trek.name}</h3>
                <span
                  className={`difficulty ${difficultyClass(trek.difficulty)}`}
                >
                  {trek.difficulty}
                </span>
              </div>
              <p className="trek-region">
                <FiMapPin /> {trek.region}
              </p>
              <p className="info-text">{trek.description}</p>
              <ul className="trek-stats">
                <li>
                  <FiTrendingUp /> {trek.maxAltitude}
                </li>
                <li>
                  <FiClock /> {trek.duration}
                </li>
                <li>
                  <FiCalendar /> {trek.bestSeason}
                </li>
              </ul>
            </div>
            <span className="read-more">
              Read more <FiChevronRight />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function difficultyClass(difficulty) {
  if (difficulty.startsWith("Easy")) return "easy";
  if (difficulty === "Moderate") return "moderate";
  return "hard";
}

function Climbers({ onOpen }) {
  return (
    <>
      <SectionHeader
        title="Legendary Climbers"
        intro="The people who reached the highest points on Earth and changed what we believed was possible. Tap a card to read their story."
      />
      <div className="card-grid">
        {CLIMBERS.map((climber) => (
          <InfoCard
            key={climber.name}
            badge={climber.year}
            title={climber.name}
            subtitle={climber.country}
            text={climber.knownFor}
            onClick={() =>
              onOpen({
                kicker: "🏆 Legendary climber",
                title: climber.name,
                subtitle: climber.knownFor,
                stats: [
                  { label: "Country", value: climber.country },
                  { label: "Year(s)", value: climber.year },
                  { label: "Known for", value: climber.knownFor },
                ],
                paragraphs: climber.paragraphs,
              })
            }
          />
        ))}
      </div>
    </>
  );
}

function Tips() {
  return (
    <>
      <SectionHeader
        title="Trekking Tips"
        intro="The basics to stay safe and enjoy the mountains."
      />
      <div className="tips-grid">
        {TREKKING_TIPS.map((tip) => (
          <article key={tip.title} className="tip-card">
            <h3>
              {tip.title === "Altitude sickness" && <FiAlertTriangle />}{" "}
              {tip.title}
            </h3>
            <ul>
              {tip.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
