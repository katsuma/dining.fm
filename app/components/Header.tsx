import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex w-auto mx-8 py-8 justify-center">
      <h1>
        <Link to={'/'}>
          <img src="/logo.svg" alt="dining.fm" width={176} height={60} />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
