import { Suspense, lazy, useState } from 'react';
import ClickSpark from '@/components/reactbits/ClickSpark';
import LiquidChrome from '@/components/reactbits/LiquidChrome';
import Nav from '@/sections/Nav';
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

export default function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <ClickSpark sparkColor="#3fd0c9" sparkSize={9} sparkRadius={18} sparkCount={8} duration={420}>
      {/* One animated field behind the entire page. Every panel above is
          translucent, so the glass has something real to refract. */}
      <div className="bg-field" aria-hidden="true">
        <LiquidChrome baseColor={[0.03, 0.05, 0.07]} speed={0.18} amplitude={0.35} frequencyX={2.6} frequencyY={2.2} interactive={false} />
      </div>
      <div className="bg-veil" aria-hidden="true" />

      <a className="skip" href="#team">Skip to content</a>
      <Nav onAdmin={() => setAdmin(true)} />
      <main>
        <Hero />
        <PartnerStrip />
        <Team />
        <Robot />
        <Marquee />
        <Bios />
        <Services />
        <Outreach />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
      {admin && (
        <Suspense fallback={null}>
          <Admin open onClose={() => setAdmin(false)} />
        </Suspense>
      )}
    </ClickSpark>
  );
}
