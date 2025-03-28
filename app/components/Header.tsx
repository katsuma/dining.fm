import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex w-[50rem] mx-auto my-8">
      <h1 className="py-4">
        <Link to={'/'}>
          <img src="/logo.svg" alt="dining.fm" width={176} height={60} />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
