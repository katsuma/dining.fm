import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="lg:flex w-auto md:w-[50rem] mx-8 md:mx-auto my-8">
      <h1 className="">
        <Link to={'/'}>
          <img src="/logo.svg" alt="dining.fm" width={176} height={60} />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
