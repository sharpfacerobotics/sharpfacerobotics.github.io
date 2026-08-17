import { services } from '@/data/site';
import { Reveal, Spotlight } from '@/components/Motion';
import SignOff from '@/components/SignOff';
import TextType from '@/components/reactbits/TextType';
import './Services.css';

export default function Services() {
  return (
    <>
    <section className="band fitview" id="services">
      <div className="wrap">
        <header className="sec-head">
          <div className="sec-index"><b>04</b><span>What we built for everyone else</span></div>
          <h2 className="d2">
            Tools we wished{' '}
            <TextType
              as="span"
              className="svc__typed"
              text={['existed.', 'someone had built.', 'we had in year one.']}
              typingSpeed={55}
              deletingSpeed={28}
              pauseDuration={2200}
              initialDelay={500}
              loop
              showCursor
              cursorCharacter="_"
              textColors={['#4fe0d8']}
            />
          </h2>
        </header>

        <Spotlight><div className="svc__grid">
          {services.map((s, i) => (
            <Reveal as="article" className="svc" key={s.name} delay={i * 80}>
              <div className="svc__head">
                <div className="svc__mark">
                  {s.logo
                    ? <img src={s.logo} alt="" loading="lazy" />
                    : <span className="svc__glyph" aria-hidden="true">S</span>}
                </div>
                <div>
                  <h3 className="d3">{s.name}</h3>
                  <p className="mono-sm">{s.tag}</p>
                </div>
                {s.status && <span className="mono svc__status">{s.status}</span>}
              </div>

              <p className="svc__body">{s.body}</p>

              <a className="btn" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.cta} <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          ))}
        </div></Spotlight>
      </div>
    </section>
    <SignOff direction="left" />
    </>
  );
}
