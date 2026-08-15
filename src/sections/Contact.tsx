import { useState } from 'react';
import { team, socials } from '@/data/site';
import './Contact.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(team.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${team.email}`;
    }
  };

  return (
    <section className="band contact" id="contact">
      <div className="gridfield" aria-hidden="true" />
      <div className="wrap contact__in">
        <div className="sec-index"><b>07</b><span>Contact</span></div>
        <h2 className="d2 contact__h">
          Sponsor us, mentor us,<br />or bring your team by.
        </h2>
        <p className="lede contact__p">
          We answer everything — sponsorship, collaborations with other teams, or students
          at {team.school} who want in next season.
        </p>

        <div className="contact__actions">
          <button className="contact__mail ticked" onClick={copy}>
            <span className="mono-sm">Email</span>
            <b>{team.email}</b>
            <span className="mono contact__copy">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <a className="btn" href={`mailto:${team.email}`}>Open mail app</a>
        </div>

        <ul className="contact__social">
          {socials.map(s => (
            <li key={s.label}>
              <a className="mono" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
