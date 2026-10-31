// Shows the profile photo, or the first letter of the name when there is none
export default function Avatar({ name, src, size = 40 }) {
  const style = { width: size, height: size, fontSize: size * 0.42 };

  if (src) {
    return (
      <img
        className="user-avatar"
        src={src}
        alt={`${name}'s profile photo`}
        style={style}
      />
    );
  }
  return (
    <span className="user-avatar initial" style={style} aria-hidden="true">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
