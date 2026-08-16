import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import SwarmCursor from '@/components/reactbits/SwarmCursor';
import Backdrop from '@/components/Backdrop';
import Nav, { TABS, type TabId } from '@/sections/Nav';
import Hero from '@/sections/Hero';
import PartnerStrip from '@/sections/PartnerStrip';
import Marquee from '@/sections/Marquee';
import Team from '@/sections/Team';
import Robot from '@/sections/Robot';
import Bios from '@/sections/Bios';
import Services from '@/sections/Services';
import Outreach from '@/sections/Outreach';
import Sponsors from '@/sections/Sponsors';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

const Admin = lazy(() => import('@/sections/Admin'));
const isTab = (v: string): v is TabId => TABS.some(t => t.id === v);

export default function App() {
  const [admin, setAdmin] = useState(false);
  const [tab, setTab] = useState<TabId>('home');
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  /* Heavy pointer effects are desktop-only: a swarm following a finger is
     meaningless on touch and costs a frame budget phones do not have. */
  const [rich, setRich] = useState(false);

  useEffect(() => {
    setRich(
      window.matchMedia('(hover: hover)').matches &&
      window.matchMedia('(min-width: 1000px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace('#', '');
      if (h === 'admin') { setAdmin(true); return; }
      if (isTab(h)) setTab(h);
      else if (!h) setTab('home');
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const go = useCallback((next: TabId) => {
    if (next === tab) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setPhase('out');
    window.setTimeout(() => {
      setTab(next);
      window.scrollTo({ top: 0 });
      if (window.location.hash.replace('#', '') !== next) {
        history.pushState(null, '', next === 'home' ? './' : `#${next}`);
      }
      setPhase('in');
    }, 190);
  }, [tab]);

  return (
    <>
      {/* React Bits SwarmCursor as a SIBLING overlay, never a wrapper: its
          children slot is `position:absolute; inset:0; place-items:center;
          pointer-events:none`, which would centre the whole document and make
          every link dead. Rendered childless over a fixed layer instead. */}
      {rich && (
        <div className="swarm-layer" aria-hidden="true">
          <SwarmCursor
            color="#4fe0d8" accentColor="#8b7bff" count={16} size={9} merge={0.55}
            glow={0.5} opacity={0.5} spread={70} separation={26} speed={0.16}
            wander={0.5} trail={0.7} scatterOnClick
          />
        </div>
      )}
      <Backdrop />
      <a className="skip" href="#main">Skip to content</a>
      <Nav tab={tab} onTab={go} onAdmin={() => setAdmin(true)} />

      <main id="main" className={`view view--${phase}`} key={tab}>
        {tab === 'home' && <><Hero onTab={go} /><PartnerStrip /><Marquee /></>}
        {tab === 'team' && <Team />}
        {tab === 'robot' && <Robot />}
        {tab === 'roster' && <Bios />}
        {tab === 'services' && <Services />}
        {tab === 'outreach' && <Outreach />}
        {tab === 'partners' && <Sponsors />}
        {tab === 'contact' && <Contact />}
      </main>

      <Footer />
      {admin && (
        <Suspense fallback={null}>
          <Admin open onClose={() => { setAdmin(false); if (window.location.hash === '#admin') history.replaceState(null, '', './'); }} />
        </Suspense>
      )}
    </>
  );
}
