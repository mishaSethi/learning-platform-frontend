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
  FiX,
} from "react-icons/fi";
import { getAvatarUrl, getMe } from "../api";
import posterImg from "../assets/everest-trek-poster.jpg";
import Avatar from "../components/Avatar";
import {
  CLIMBERS,
  HIGHEST_PEAKS,
  HIMALAYA_TOPICS,
  POPULAR_TREKS,
  QUICK_FACTS,
  TREKKING_TIPS,
} from "../data/mountains";
import { PEAK_PHOTOS, TRAIL_PHOTOS, TREK_PHOTOS } from "../data/photos";
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

// Treks shown on the overview page, one for each level of difficulty
const FEATURED_TREKS = ["Everest Base Camp", "Valley of Flowers", "Kedarkantha"];

// Background of the "Book your trek" banner at the bottom of the overview
const CTA_PHOTO = PEAK_PHOTOS["Kangchenjunga"];

// Same looping clip as the login page (see AuthLayout.jsx for the licence note)
const VIDEO_SRC = "/videos/everest-trek.webm";

export default function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState("overview");
  // The card that is open in full, or null to show the card list
  const [detail, setDetail] = useState(null);
  // Temporary address of the profile photo, or null to show the initial
  const [avatarUrl, setAvatarUrl] = useState(null);
  // The "bookings open soon" popup: null when closed, otherwise { trek } (trek may be null)
  const [booking, setBooking] = useState(null);

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

  const openBooking = (trek) => setBooking({ trek });

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
            onBook={openBooking}
          />
        ) : (
          <>
            {section === "overview" && (
              <Overview
                user={user}
                onOpen={openSection}
                onOpenTrek={(trek) => openDetail(trekDetail(trek))}
                onBook={openBooking}
              />
            )}
            {section === "himalayas" && <Himalayas onOpen={openDetail} />}
            {section === "peaks" && <Peaks onOpen={openDetail} />}
            {section === "treks" && (
              <Treks
                onOpenTrek={(trek) => openDetail(trekDetail(trek))}
                onBook={openBooking}
              />
            )}
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

      {booking && (
        <BookingSoon
          trek={booking.trek}
          onClose={() => setBooking(null)}
          onBrowse={() => {
            setBooking(null);
            openSection("treks");
          }}
        />
      )}
    </div>
  );
}

/* ---------- Shared building blocks ---------- */

// Author and licence of a photo - the free licences require it next to the picture.
// Inside a card (a button) links aren't allowed, so the card shows plain text.
function PhotoCredit({ credit, label = "Photo", links = true }) {
  const licence =
    links && credit.licenseUrl ? (
      <a href={credit.licenseUrl} target="_blank" rel="noreferrer">
        {credit.license}
      </a>
    ) : (
      credit.license
    );
  return (
    <small className="media-credit">
      {label}:{" "}
      {links ? (
        <a href={credit.page} target="_blank" rel="noreferrer">
          {credit.artist}
        </a>
      ) : (
        credit.artist
      )}
      , {licence}
    </small>
  );
}

function InfoCard({
  badge,
  badgeClass = "",
  title,
  subtitle,
  text,
  photo,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`info-card ${photo ? "has-photo" : ""}`}
      onClick={onClick}
    >
      {photo && (
        <div className="card-photo">
          <img src={photo.src} alt={photo.alt} loading="lazy" />
          <PhotoCredit credit={photo.credit} links={false} />
        </div>
      )}
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

// item: { kicker, title, subtitle, photo, bookable, stats: [{label, value}], paragraphs: [], highlights: [] }
function DetailView({ item, backLabel, onBack, onBook }) {
  return (
    <article className="detail">
      <button type="button" className="back-button" onClick={onBack}>
        <FiArrowLeft /> Back to {backLabel}
      </button>

      <header
        className={`detail-hero ${item.photo ? "has-photo" : ""}`}
        style={
          item.photo
            ? { "--hero-photo": `url("${item.photo.src}")` }
            : undefined
        }
      >
        {item.kicker && <span className="detail-kicker">{item.kicker}</span>}
        <h1>{item.title}</h1>
        {item.subtitle && <p>{item.subtitle}</p>}
        {item.bookable && (
          <button
            type="button"
            className="hero-primary"
            onClick={() => onBook(item.title)}
          >
            Book this trek <FiChevronRight />
          </button>
        )}
        {item.photo && <PhotoCredit credit={item.photo.credit} />}
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

      {item.bookable && (
        <section className="detail-book">
          <div>
            <h2>Ready to walk the {item.title} trail?</h2>
            <p>Reserve your spot and we&apos;ll help you plan the rest.</p>
          </div>
          <button type="button" onClick={() => onBook(item.title)}>
            Book this trek
          </button>
        </section>
      )}
    </article>
  );
}

// Online booking isn't built yet - this popup says so instead of a dead button
function BookingSoon({ trek, onClose, onBrowse }) {
  useEffect(() => {
    const closeOnEscape = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
          autoFocus
        >
          <FiX />
        </button>
        <span className="modal-icon" aria-hidden="true">
          🏔️
        </span>
        <h2 id="booking-title">Bookings open soon</h2>
        <p>
          {trek ? (
            <>
              We&apos;re getting online booking ready for{" "}
              <strong>{trek}</strong>.
            </>
          ) : (
            <>We&apos;re getting online trek booking ready.</>
          )}{" "}
          Until then, explore the routes, best seasons and trekking tips so
          you&apos;re ready to go.
        </p>
        <div className="modal-actions">
          {trek ? (
            <button type="button" onClick={onClose}>
              Got it
            </button>
          ) : (
            <button type="button" onClick={onBrowse}>
              Browse treks
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Everything the detail page needs to show one trek
function trekDetail(trek) {
  return {
    kicker: `${trek.difficulty} trek · ${trek.region}`,
    title: trek.name,
    subtitle: trek.description,
    photo: TREK_PHOTOS[trek.name],
    bookable: true,
    stats: [
      { label: "Max altitude", value: trek.maxAltitude },
      { label: "Duration", value: trek.duration },
      { label: "Difficulty", value: trek.difficulty },
      { label: "Best season", value: trek.bestSeason },
    ],
    paragraphs: trek.paragraphs,
    highlights: trek.highlights,
  };
}

function TrekCard({ trek, onOpen, onBook }) {
  const photo = TREK_PHOTOS[trek.name];
  return (
    <article className="trek-card">
      <div className="card-photo">
        <img src={photo.src} alt={photo.alt} loading="lazy" />
        <span className={`difficulty ${difficultyClass(trek.difficulty)}`}>
          {trek.difficulty}
        </span>
        <PhotoCredit credit={photo.credit} />
      </div>
      <div className="trek-card-body">
        <h3>{trek.name}</h3>
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
        <div className="trek-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => onOpen(trek)}
          >
            View details
          </button>
          <button type="button" onClick={() => onBook(trek.name)}>
            Book this trek
          </button>
        </div>
      </div>
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

function Overview({ user, onOpen, onOpenTrek, onBook }) {
  // People who ask their device for less motion get the still photo instead
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const firstName = user.name.split(" ")[0];
  const featured = FEATURED_TREKS.map((name) =>
    POPULAR_TREKS.find((trek) => trek.name === name),
  );

  return (
    <>
      <section className="hero-video">
        {reduceMotion ? (
          <img className="hero-video-media" src={posterImg} alt="" />
        ) : (
          <video
            className="hero-video-media"
            src={VIDEO_SRC}
            poster={posterImg}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        <div className="hero-video-content">
          <span className="hero-kicker">Namaste, {firstName} 🙏</span>
          <h1>Your Himalayan adventure starts here</h1>
          <p>
            Walk through Sherpa villages, cross prayer-flag passes and wake up
            below the highest peaks on Earth.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="hero-primary"
              onClick={() => onOpen("treks")}
            >
              <FiMap /> Explore treks
            </button>
            <button
              type="button"
              className="hero-ghost"
              onClick={() => onBook(null)}
            >
              Book a trek
            </button>
          </div>
        </div>
        {!reduceMotion && (
          <small className="media-credit">
            Video:{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:The_Himalayan_-_Mount_Everest_Base_Camp_trek_HD_Time_Lapse.webm"
              target="_blank"
              rel="noreferrer"
            >
              Amit Haware
            </a>{" "}
            (edited),{" "}
            <a
              href="https://creativecommons.org/licenses/by/3.0/"
              target="_blank"
              rel="noreferrer"
            >
              CC BY 3.0
            </a>
          </small>
        )}
      </section>

      <div className="facts">
        {QUICK_FACTS.map((fact) => (
          <div key={fact.value} className="fact">
            <span className="fact-value">{fact.value}</span>
            <span className="fact-label">{fact.label}</span>
          </div>
        ))}
      </div>

      <div className="section-head">
        <h2 className="section-title">Featured treks</h2>
        <button type="button" className="link" onClick={() => onOpen("treks")}>
          See all {POPULAR_TREKS.length} treks
        </button>
      </div>
      <div className="card-grid">
        {featured.map((trek) => (
          <TrekCard
            key={trek.name}
            trek={trek}
            onOpen={onOpenTrek}
            onBook={onBook}
          />
        ))}
      </div>

      <h2 className="section-title">Life on the trail</h2>
      <div className="gallery">
        {TRAIL_PHOTOS.map((photo) => (
          <figure key={photo.src} className="gallery-item">
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
            <PhotoCredit credit={photo.credit} />
          </figure>
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

      <section
        className="cta-banner"
        style={{ "--hero-photo": `url("${CTA_PHOTO.src}")` }}
      >
        <div>
          <h2>The mountains are calling</h2>
          <p>
            Pick your trek, choose your season and start counting down to
            sunrise over the Himalayas.
          </p>
        </div>
        <button
          type="button"
          className="hero-primary"
          onClick={() => onBook(null)}
        >
          Book your trek <FiChevronRight />
        </button>
        <PhotoCredit credit={CTA_PHOTO.credit} />
      </section>
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
            photo={PEAK_PHOTOS[peak.name]}
            onClick={() =>
              onOpen({
                kicker: `#${peak.rank} highest mountain on Earth`,
                title: peak.name,
                subtitle: peak.location,
                photo: PEAK_PHOTOS[peak.name],
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

function Treks({ onOpenTrek, onBook }) {
  return (
    <>
      <SectionHeader
        title="Popular Treks"
        intro="Classic Himalayan treks for every level. Altitudes and durations are typical values - itineraries vary by route and operator."
      />
      <div className="card-grid">
        {POPULAR_TREKS.map((trek) => (
          <TrekCard
            key={trek.name}
            trek={trek}
            onOpen={onOpenTrek}
            onBook={onBook}
          />
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
