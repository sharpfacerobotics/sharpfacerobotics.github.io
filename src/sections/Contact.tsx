import { useState } from 'react';
import { team, socials } from '@/data/site';
import { Instagram, GitHub } from '@/components/Icons';
import { Magnetic } from '@/components/Motion';
import { outreachPhotos } from '@/data/outreachPhotos';
import { excludedPhotos } from '@/data/photoPicks';
import PhotoWall from '@/components/PhotoWall';
import LogoLoop from '@/components/reactbits/LogoLoop';
import { sponsors } from '@/data/sponsors';
import './Contact.css';

const ICON = { Instagram, GitHub } as const;

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
      {/* A living wall of the team behind the copy — tiles cross-fade through
          the whole set and drift, so the closing section is never static. */}
      <PhotoWall photos={outreachPhotos.map(p => p.src).filter(s => !excludedPhotos.includes(s))} tiles={12} interval={5200} className="contact__wall" />
      <div className="wrap contact__in">
        <div className="contact__lead">
          <div className="sec-index"><b>07</b><span>Contact</span></div>
          <h2 className="d2 contact__h">Sponsor us, mentor us, or bring your team by.</h2>
          <p className="lede">
            We answer everything — sponsorship, collaborations with other teams, and students
            at {team.school} who want in next season.
          </p>
        </div>

        <div className="contact__panel glass glass--spec">
          <button className="contact__mail" onClick={copy}>
            <span className="mono-sm">Email</span>
            <b>{team.email}</b>
            <span className={`mono contact__copy${copied ? ' is-on' : ''}`}>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <Magnetic><a className="btn btn--solid contact__mailto" href={`mailto:${team.email}`}>Open mail app</a></Magnetic>

          <ul className="contact__social">
            {socials.map(s => {
              const Icon = ICON[s.label as keyof typeof ICON];
              return (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <span className="contact__ico">{Icon ? <Icon size={20} /> : null}</span>
                    <span className="mono">{s.label}</span>
                    <span className="contact__arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Closing sign-off. Prospective sponsors land on this page, so the
          partners run across the bottom of it — visibility where it counts. */}
      <div className="signoff">
        <div className="wrap signoff__in">
          <p className="signoff__mark">
            Sharp Face <span className="signoff__accent">Robotics</span>
          </p>
          <p className="mono signoff__meta">
            FTC {team.number} · {team.season} · {team.city}
          </p>
        </div>
        <div className="signoff__loop">
          <LogoLoop
            logos={sponsors.map(sp => ({ src: sp.logoColor, alt: sp.name, title: sp.name, href: sp.href ?? undefined }))}
            speed={30}
            direction="right"
            logoHeight={22}
            gap={56}
            pauseOnHover
            fadeOut
            fadeOutColor="#07080b"
            ariaLabel="Our partners"
          />
        </div>
      </div>
    </section>
  );
}
