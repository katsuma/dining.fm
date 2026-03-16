import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import usePageTracking from '@/hooks/usePageTracking';

const Layout = () => {
  usePageTracking();

  return (
    <div className="min-h-screen bg-white md:max-w-[580px] md:mx-auto md:shadow-[0_0_30px_rgba(0,0,0,0.06)]">
      <Header />
      <main className="w-auto md:w-130 mx-8 md:mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
