import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import ClickSpark from '@/components/reactbits/ClickSpark';
import Backdrop from '@/components/Backdrop';
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
  /* `phase` drives the cross-fade: out -> swap -> in. Without it the new tab
     would pop in while the old one is still painted. */
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  // deep links and the browser back button both drive the tab
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
    <ClickSpark sparkColor="#3fd0c9" sparkSize={9} sparkRadius={18} sparkCount={8} duration={420}>
      <Backdrop />
      <a className="skip" href="#main">Skip to content</a>
      <Nav tab={tab} onTab={go} onAdmin={() => setAdmin(true)} />

      <main id="main" className={`view view--${phase}`} key={tab}>
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
    </ClickSpark>
  );
}
