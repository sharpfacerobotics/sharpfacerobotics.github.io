import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import SwarmCursor from '@/components/reactbits/SwarmCursor';
import Backdrop from '@/components/Backdrop';
import GlassSurface from '@/components/reactbits/GlassSurface';
import Nav, { TABS, type TabId } from '@/sections/Nav';
import Hero from '@/sections/Hero';
import PartnerStrip from '@/sections/PartnerStrip';
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
  const [dir, setDir] = useState<1 | -1>(1);
  const [wipe, setWipe] = useState(false);
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
    const from = TABS.findIndex(t => t.id === tab);
    const to = TABS.findIndex(t => t.id === next);
    setDir(to > from ? 1 : -1);
    setWipe(true);
    window.setTimeout(() => setWipe(false), 620);
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
            color="#4fe0d8" accentColor="#8b7bff" count={9} size={5} merge={0.8}
            glow={0.35} opacity={0.22} spread={26} separation={12} speed={0.3}
            wander={0.22} trail={0.85} scatterOnClick
          />
        </div>
      )}
      <Backdrop />
      <a className="skip" href="#main">Skip to content</a>
      <Nav tab={tab} onTab={go} onAdmin={() => setAdmin(true)} />

      {/* React Bits GlassSurface as a real refracting wipe across the tab
          change — it sweeps the direction you moved along the tab bar. */}
      {wipe && (
        <div className={`wipe wipe--${dir > 0 ? 'fwd' : 'back'}`} aria-hidden="true">
          <GlassSurface
            width="46%" height="100%" borderRadius={0}
            blur={12} displace={1.6} distortionScale={-190}
            redOffset={3} greenOffset={11} blueOffset={19}
            brightness={62} opacity={0.85} backgroundOpacity={0.05} saturation={1.5}
            className="wipe__pane"
          />
        </div>
      )}

      <main id="main" className={`view view--${phase} view--${dir > 0 ? 'fwd' : 'back'}`} key={tab}>
        {tab === 'home' && <><Hero onTab={go} /><PartnerStrip /></>}
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
