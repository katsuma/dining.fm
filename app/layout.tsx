import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import usePageTracking from '@/hooks/usePageTracking';

const Layout = () => {
  usePageTracking();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="w-auto md:w-[50rem] mx-8 md:mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
