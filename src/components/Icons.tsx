/* Real marks, drawn as SVG rather than a webfont: they stay crisp, inherit
   currentColor, and add no network request. */
export function Instagram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.4" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GitHub({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.53.1.72-.23.72-.5v-1.83c-2.92.63-3.54-1.4-3.54-1.4-.48-1.21-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.06.08 1.61 1.09 1.61 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.18 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.88 1.08a9.9 9.9 0 0 1 5.24 0c2-1.36 2.88-1.08 2.88-1.08.57 1.45.21 2.52.1 2.79.67.74 1.08 1.67 1.08 2.82 0 4.02-2.46 4.9-4.8 5.16.38.33.71.97.71 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  );
}

export function Trophy({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4.6a.6.6 0 0 0-.6.7c.2 1.9 1.3 3.4 3 3.7" />
      <path d="M17 5.5h2.4a.6.6 0 0 1 .6.7c-.2 1.9-1.3 3.4-3 3.7" />
      <path d="M12 14v3.5" />
      <path d="M8.5 20.5h7l-.7-2.2a1 1 0 0 0-1-.8h-3.6a1 1 0 0 0-1 .8l-.7 2.2Z" />
    </svg>
  );
}

export function Roster({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 19.5c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M16 6.2a3 3 0 0 1 0 5.6" />
      <path d="M18 19.5c0-2.2-1-3.8-2.6-4.6" />
    </svg>
  );
}

export function RobotIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="16" height="11" rx="2.4" />
      <path d="M12 8V4.8" /><circle cx="12" cy="3.6" r="1.2" />
      <circle cx="9" cy="13" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1.1" fill="currentColor" stroke="none" />
      <path d="M9.5 16.3h5" /><path d="M2.5 12v3" /><path d="M21.5 12v3" />
    </svg>
  );
}
