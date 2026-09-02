import { program, teamNumbers } from '@/data/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <p className="mono-sm">
          © {new Date().getFullYear()} {program.name} · FTC {teamNumbers} · {program.city}
        </p>
      </div>
    </footer>
  );
}
