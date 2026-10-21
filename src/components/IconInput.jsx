export default function IconInput({ icon: Icon, ...inputProps }) {
  return (
    <div className="input-group">
      <Icon className="input-icon" />
      <input {...inputProps} />
    </div>
  );
}
