export default function Badge({ label, level }) {
  return <span className={`badge ${level}`}>{label}</span>;
}
