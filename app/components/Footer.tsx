import {
  SiYoutube,
  SiSpotify,
  SiApplepodcasts,
  SiAmazonmusic,
  SiX,
  SiThreads,
  SiInstagram,
} from "react-icons/si";
import { Heading } from "@/components/Heading";

const SUBSCRIBE_LINKS = [
  {
    name: "YouTube",
    href: "https://youtube.com/@diningfm",
    icon: SiYoutube,
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/3wSB2J20uqON5nPhCmMia5",
    icon: SiSpotify,
  },
  {
    name: "Apple Podcast",
    href: "https://podcasts.apple.com/us/podcast/dining-fm/id1668849655",
    icon: SiApplepodcasts,
  },
  {
    name: "Amazon Music",
    href: "https://music.amazon.co.jp/podcasts/2a16e7f2-2c99-4d85-8ee7-0916a6c1f56d/dining-fm",
    icon: SiAmazonmusic,
  },
] as const;

const SNS_LINKS = [
  {
    name: "X (@diningfm)",
    href: "https://x.com/diningfm",
    icon: SiX,
  },
  {
    name: "Threads",
    href: "https://threads.net/diningfm",
    icon: SiThreads,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/diningfm",
    icon: SiInstagram,
  },
] as const;

const Footer = () => {
  return (
    <footer className="mt-8">
      <div className="w-auto md:w-120 mx-8 md:mx-auto">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Heading title="購読" dotClassName="bg-green" />
            <ul className="list-none p-0 m-0 space-y-3">
              {SUBSCRIBE_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] font-bold text-text-link tracking-[-0.42px] no-underline border-b-0 transition-all duration-200 hover:text-orange hover:border-b-2 hover:border-orange"
                  >
                    <link.icon className="size-4 shrink-0" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading title="SNS" dotClassName="bg-yellow" />
            <ul className="list-none p-0 m-0 space-y-3">
              {SNS_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] font-bold text-text-link tracking-[-0.42px] no-underline border-b-0 transition-all duration-200 hover:text-orange hover:border-b-2 hover:border-orange"
                  >
                    <link.icon className="size-4 shrink-0" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-gray-300 mt-8">
          <div className="flex justify-center">
            <img src="/logo.svg" alt="dining.fm" width={140} height={34} />
          </div>
          <p className="text-center text-sm text-black-secondary py-8">Copyright (c) dining.fm</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
