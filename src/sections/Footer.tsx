import { team } from '@/data/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <p className="mono-sm">
          © {new Date().getFullYear()} {team.name} · FTC Team {team.number} · {team.school} · {team.city}
        </p>
      </div>
    </footer>
  );
}
