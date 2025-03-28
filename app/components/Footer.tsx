const Footer = () => {
  return (
    <footer className="p-5 text-gray-800 text-sm bg-gray-200">
      <div className="flex justify-around w-[50rem] mx-auto">
        <div className="w-1/2">
          <p className="font-bold mb-4 text-xl">購読</p>
          <ul className="list-none p-0 m-0">
            <li className="text-xl leading-8"><a href="https://open.spotify.com/show/3wSB2J20uqON5nPhCmMia5">Spotify</a></li>
            <li className="text-xl leading-8"><a href="https://podcasts.apple.com/us/podcast/dining-fm/id1668849655">Apple Podcasts</a></li>
            <li className="text-xl leading-8"><a href="https://listen.style/p/diningfm">LISTEN</a></li>
            <li className="text-xl leading-8"><a href="https://overcast.fm/itunes1668849655/dining-fm">Overcast</a></li>
            <li className="text-xl leading-8"><a href="https://music.amazon.co.jp/podcasts/2a16e7f2-2c99-4d85-8ee7-0916a6c1f56d/dining-fm">Amazon Music</a></li>
          </ul>
        </div>

        <div className="w-1/2">
          <p className="font-bold mb-4 text-xl">SNS</p>
          <ul className="list-none p-0 m-0">
            <li className="text-xl leading-8"><a href="https://x.com/diningfm">X</a></li>
            <li className="text-xl leading-8"><a href="https://threads.net/diningfm">Threads</a></li>
            <li className="text-xl leading-8"><a href="https://instagram.com/diningfm">Instagram</a></li>
            <li className="text-xl leading-8"><a href="https://youtube.com/@diningfm">YouTube</a></li>
          </ul>
        </div>
      </div>

      <p className="text-center my-8 text-gray-500 text-xl">
        Copyright (c) dining.fm
      </p>
    </footer>
  );
};

export default Footer;
