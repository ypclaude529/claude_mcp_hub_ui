const PATHS = {
  server: (
    <>
      <rect x="3" y="4" width="18" height="8" rx="3" />
      <rect x="3" y="12" width="18" height="8" rx="3" />
      <line x1="7" y1="8" x2="7.01" y2="8" />
      <line x1="7" y1="16" x2="7.01" y2="16" />
    </>
  ),
  tool: (
    <path d="M7 10h3v-3l-3.5-3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1-3 3l-6-6a6 6 0 0 1-8-8l3.5 3.5" />
  ),
  clipboard: (
    <>
      <path d="M9 5h-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <line x1="9" y1="12" x2="9.01" y2="12" /><line x1="13" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="9.01" y2="16" /><line x1="13" y1="16" x2="15" y2="16" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7h3.5" />
    </>
  ),
  warning: (
    <>
      <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7-2.983l-8.423-14.06a1.989 1.989 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  shield: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  ),
};

export default function Icon({ name, size = 16, style }) {
  return (
    <span className="icon" style={{ width: size, height: size, ...style }} aria-hidden="true">
      <svg viewBox="0 0 24 24">{PATHS[name]}</svg>
    </span>
  );
}
