import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const logoPath = '/logo.svg';

  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>
        <Link href={'/'}>
          <Image src={logoPath} alt={'dining.fm'} width={176} height={60} priority={true} />
        </Link>
      </h1>
    </header>
  );
}
