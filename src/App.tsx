import { Suspense, lazy, useState } from 'react';
import Nav from '@/sections/Nav';
import Hero from '@/sections/Hero';
import Team from '@/sections/Team';
import Robot from '@/sections/Robot';
import Bios from '@/sections/Bios';
import Services from '@/sections/Services';
import Outreach from '@/sections/Outreach';
import Sponsors from '@/sections/Sponsors';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

/* Firebase is ~500 kB and only the handful of admins ever need it, so the
   whole admin panel (and the SDK with it) is a separate chunk fetched on demand. */
const Admin = lazy(() => import('@/sections/Admin'));

export default function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <>
      <a className="skip" href="#team">Skip to content</a>
      <Nav onAdmin={() => setAdmin(true)} />
      <main>
        <Hero />
        <Team />
        <Robot />
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
    </>
  );
}
