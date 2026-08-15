import { team } from '@/data/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <p className="mono-sm">
          © {new Date().getFullYear()} {team.name} · FTC Team {team.number} · {team.school} · {team.city}
        </p>
        <p className="mono-sm foot__colophon">
          Archivo &amp; IBM Plex Mono · built with React &amp; React&nbsp;Bits
        </p>
      </div>
    </footer>
  );
}
