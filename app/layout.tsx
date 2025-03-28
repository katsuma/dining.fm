import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto w-[50rem] flex justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
