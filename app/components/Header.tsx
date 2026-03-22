import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      className="w-full bg-no-repeat bg-top"
      style={{
        backgroundImage: "url('/background-header.png')",
        backgroundSize: "100% auto",
      }}
    >
      <div className="flex justify-center py-8">
        <h1>
          <Link to={"/"}>
            <img src="/logo.svg" alt="dining.fm" width={176} height={60} />
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
