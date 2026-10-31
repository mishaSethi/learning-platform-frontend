import { useState } from "react";
import posterImg from "../assets/everest-trek-poster.jpg";
import "./AuthLayout.css";

// The looping clip lives in frontend/public/videos. If it can't load or play,
// the browser simply keeps showing the poster photo.
// Scenes cut from "The Himalayan - Mount Everest Base Camp trek HD Time Lapse" by
// Amit Haware, CC BY 3.0, via Wikimedia Commons - the licence requires the credit
// (and the note that it was edited) shown in the corner of the video.
const VIDEO_SRC = "/videos/everest-trek.webm";

// Shared frame for the log in, sign up, 2FA and password pages: a looping
// Himalaya video on the left (behind the form on phones), the form on the right.
export default function AuthLayout({ children }) {
  // People who ask their device for less motion get the still photo instead
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <div className="auth-layout">
      <section className="auth-media">
        {reduceMotion ? (
          <img className="auth-video" src={posterImg} alt="" />
        ) : (
          <video
            className="auth-video"
            src={VIDEO_SRC}
            poster={posterImg}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        <div className="auth-media-shade" />

        <div className="auth-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 20 L9 8 L13 14 L16 10 L22 20 Z" fill="#ffffff" />
            <path d="M9 8 L11 11.5 L10 12 L8.6 10.6 Z" fill="#2f6b4f" />
          </svg>
          Himalayan &amp; Skies
        </div>

        <div className="auth-tagline">
          <p className="auth-kicker">Explore the roof of the world</p>
          <h2>Every summit starts with a single step.</h2>
          <p>
            Learn about the Himalayas, test yourself in the quiz and plan your
            next trek.
          </p>
        </div>

        {!reduceMotion && (
          <p className="auth-credit">
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
          </p>
        )}
      </section>

      <main className="auth-form-side">{children}</main>
    </div>
  );
}
