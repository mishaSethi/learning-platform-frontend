import { useEffect, useRef, useState } from "react";
import { FiCamera, FiLock, FiTrash2 } from "react-icons/fi";
import {
  deleteAvatar,
  getAvatarUrl,
  getProfileDetails,
  updateProfileDetails,
  uploadAvatar,
} from "../api";
import Avatar from "../components/Avatar";
import { resizeToSquare } from "../utils/image";

const MAX_ORIGINAL_BYTES = 10 * 1024 * 1024; // before we shrink it
const PHONE_PATTERN = /^\+?[0-9]{7,15}$/;
const PLACE_PATTERN = /^[\p{L} .'-]+$/u;
const POSTAL_PATTERN = /^[A-Za-z0-9 -]{3,10}$/;
const TODAY = new Date().toISOString().slice(0, 10);

// Every editable field, empty to start with
const EMPTY_FORM = {
  phone: "",
  dateOfBirth: "",
  gender: "",
  addressLine: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  experienceLevel: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  bio: "",
};

// Server reply -> form values (missing values become empty boxes)
function toForm(details) {
  return Object.fromEntries(
    Object.keys(EMPTY_FORM).map((key) => [key, details[key] ?? ""]),
  );
}

// Checks the form before sending; returns an error message or "" if all good
function validate(form, phoneLocked) {
  if (!phoneLocked && form.phone.trim() && !PHONE_PATTERN.test(form.phone.trim())) {
    return "Phone must be 7–15 digits, with an optional + at the start.";
  }
  if (form.dateOfBirth && (form.dateOfBirth > TODAY || form.dateOfBirth < "1900-01-01")) {
    return "Please enter a real date of birth.";
  }
  for (const [key, label] of [
    ["city", "City"],
    ["state", "State"],
    ["country", "Country"],
    ["emergencyContactName", "Emergency contact name"],
  ]) {
    if (form[key].trim() && !PLACE_PATTERN.test(form[key].trim())) {
      return `${label} can only contain letters, spaces, dots, hyphens and apostrophes.`;
    }
  }
  if (form.postalCode.trim() && !POSTAL_PATTERN.test(form.postalCode.trim())) {
    return "Postal code must be 3–10 letters or numbers.";
  }
  if (
    form.emergencyContactPhone.trim() &&
    !PHONE_PATTERN.test(form.emergencyContactPhone.trim())
  ) {
    return "Emergency contact phone must be 7–15 digits, with an optional + at the start.";
  }
  return "";
}

export default function Profile({ user, avatarUrl, onUserChange, onAvatarChange }) {
  const fileInput = useRef(null);
  const [details, setDetails] = useState(null); // last saved version from the server
  const [form, setForm] = useState(EMPTY_FORM); // what is in the boxes now
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoMessage, setPhotoMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // If this load is cancelled (page left, or React's dev-mode double run),
    // ignore its answer - otherwise a late reply could wipe what the user typed
    let ignore = false;
    getProfileDetails()
      .then((d) => {
        if (!ignore) {
          setDetails(d);
          setForm(toForm(d));
        }
      })
      .catch((err) => {
        if (!ignore) {
          setLoadError(err.message);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  // True when the boxes differ from what is saved - only then can you update
  const hasChanges = details !== null && JSON.stringify(form) !== JSON.stringify(toForm(details));

  function setField(key, value) {
    setForm({ ...form, [key]: value });
    setFormMessage({ type: "", text: "" });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const problem = validate(form, details.phoneLocked);
    if (problem) {
      setFormMessage({ type: "error", text: problem });
      return;
    }
    setSaving(true);
    try {
      const saved = await updateProfileDetails({
        ...form,
        dateOfBirth: form.dateOfBirth || null, // empty date box = no date
      });
      setDetails(saved);
      setForm(toForm(saved));
      onUserChange({ ...user, phone: saved.phone });
      setFormMessage({ type: "success", text: "Profile updated." });
    } catch (err) {
      setFormMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  async function handlePhotoChosen(e) {
    const file = e.target.files[0];
    e.target.value = ""; // lets the same file be picked again later
    if (!file) {
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setPhotoMessage({ type: "error", text: "Please choose a JPEG or PNG photo." });
      return;
    }
    if (file.size > MAX_ORIGINAL_BYTES) {
      setPhotoMessage({ type: "error", text: "That photo is over 10 MB - please pick a smaller one." });
      return;
    }
    setPhotoBusy(true);
    setPhotoMessage({ type: "", text: "" });
    try {
      const small = await resizeToSquare(file);
      onUserChange(await uploadAvatar(small));
      onAvatarChange(await getAvatarUrl());
      setPhotoMessage({ type: "success", text: "Photo updated." });
    } catch (err) {
      setPhotoMessage({ type: "error", text: err.message });
    } finally {
      setPhotoBusy(false);
    }
  }

  async function handleRemovePhoto() {
    if (!window.confirm("Remove your profile photo?")) {
      return;
    }
    setPhotoBusy(true);
    setPhotoMessage({ type: "", text: "" });
    try {
      onUserChange(await deleteAvatar());
      onAvatarChange(null);
      setPhotoMessage({ type: "success", text: "Photo removed." });
    } catch (err) {
      setPhotoMessage({ type: "error", text: err.message });
    } finally {
      setPhotoBusy(false);
    }
  }

  if (loadError) {
    return (
      <>
        <h1 className="page-title">My Profile</h1>
        <p className="error">{loadError}</p>
      </>
    );
  }

  if (!details) {
    return (
      <>
        <h1 className="page-title">My Profile</h1>
        <p className="profile-hint">Loading your profile…</p>
      </>
    );
  }

  return (
    <>
      <h1 className="page-title">My Profile</h1>

      {/* ---------- Photo + locked account details ---------- */}
      <div className="profile-panel">
        <div className="profile-photo">
          <Avatar name={user.name} src={avatarUrl} size={128} />
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png"
            hidden
            onChange={handlePhotoChosen}
          />
          <div className="profile-photo-actions">
            <button type="button" onClick={() => fileInput.current.click()} disabled={photoBusy}>
              <FiCamera /> {photoBusy ? "Saving…" : user.hasAvatar ? "Change photo" : "Add photo"}
            </button>
            {user.hasAvatar && (
              <button
                type="button"
                className="secondary-button"
                onClick={handleRemovePhoto}
                disabled={photoBusy}
              >
                <FiTrash2 /> Remove
              </button>
            )}
          </div>
          <p className="profile-hint">JPEG or PNG. Saved straight away.</p>
          {photoMessage.text && <p className={photoMessage.type}>{photoMessage.text}</p>}
        </div>

        <div className="profile-account">
          <h2 className="profile-section-title">Account</h2>
          <dl className="profile-locked">
            <dt>Name</dt>
            <dd>
              {details.name} <FiLock title="Can't be changed" />
            </dd>
            <dt>Email</dt>
            <dd>
              {details.email} <FiLock title="Can't be changed" />
            </dd>
            <dt>Phone</dt>
            <dd>
              {details.phoneLocked ? (
                <>
                  {details.phone} <FiLock title="Can't be changed" />
                </>
              ) : (
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="Add once, e.g. +919876543210"
                  maxLength={16}
                />
              )}
            </dd>
          </dl>
          <p className="profile-hint">
            <FiLock /> Name, email and phone come from sign-up and can't be changed.
            {!details.phoneLocked && " You can add a phone number once."}
          </p>
        </div>
      </div>

      {/* ---------- Details form, saved only with the button ---------- */}
      <form className="profile-form-card" onSubmit={handleUpdate}>
        <section>
          <h2 className="profile-section-title">Personal</h2>
          <div className="profile-grid">
            <label>
              Date of birth
              <input
                type="date"
                value={form.dateOfBirth}
                max={TODAY}
                min="1900-01-01"
                onChange={(e) => setField("dateOfBirth", e.target.value)}
              />
            </label>
            <label>
              Gender
              <select value={form.gender} onChange={(e) => setField("gender", e.target.value)}>
                <option value="">Select…</option>
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </label>
          </div>
        </section>

        <section>
          <h2 className="profile-section-title">Address</h2>
          <div className="profile-grid">
            <label className="span-2">
              Address line
              <input
                value={form.addressLine}
                maxLength={120}
                placeholder="House number, street"
                onChange={(e) => setField("addressLine", e.target.value)}
              />
            </label>
            <label>
              City
              <input value={form.city} maxLength={60} onChange={(e) => setField("city", e.target.value)} />
            </label>
            <label>
              State
              <input value={form.state} maxLength={60} onChange={(e) => setField("state", e.target.value)} />
            </label>
            <label>
              Postal code
              <input
                value={form.postalCode}
                maxLength={10}
                onChange={(e) => setField("postalCode", e.target.value)}
              />
            </label>
            <label>
              Country
              <input
                value={form.country}
                maxLength={60}
                placeholder="e.g. India"
                onChange={(e) => setField("country", e.target.value)}
              />
            </label>
          </div>
        </section>

        <section>
          <h2 className="profile-section-title">Trekking & safety</h2>
          <div className="profile-grid">
            <label className="span-2">
              Experience level
              <select
                value={form.experienceLevel}
                onChange={(e) => setField("experienceLevel", e.target.value)}
              >
                <option value="">Select…</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
            </label>
            <label>
              Emergency contact name
              <input
                value={form.emergencyContactName}
                maxLength={60}
                onChange={(e) => setField("emergencyContactName", e.target.value)}
              />
            </label>
            <label>
              Emergency contact phone
              <input
                type="tel"
                value={form.emergencyContactPhone}
                maxLength={16}
                onChange={(e) => setField("emergencyContactPhone", e.target.value)}
              />
            </label>
          </div>
        </section>

        <section>
          <h2 className="profile-section-title">About me</h2>
          <label>
            Short bio
            <textarea
              value={form.bio}
              maxLength={500}
              rows={4}
              placeholder="Treks you've done, peaks you dream of…"
              onChange={(e) => setField("bio", e.target.value)}
            />
            <span className="profile-hint">{form.bio.length}/500</span>
          </label>
        </section>

        <div className="profile-update-bar">
          {formMessage.text && <p className={formMessage.type}>{formMessage.text}</p>}
          {hasChanges && !formMessage.text && (
            <p className="profile-hint">You have unsaved changes.</p>
          )}
          <button type="submit" disabled={!hasChanges || saving}>
            {saving ? "Updating…" : "Update profile"}
          </button>
        </div>
      </form>
    </>
  );
}
