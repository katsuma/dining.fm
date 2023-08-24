import Header from './_components/Header'
import Footer from './_components/Footer'
import '@fontsource/m-plus-rounded-1c/400.css';
import '@fontsource/m-plus-rounded-1c/800.css';
import './globals.css'
import type { Metadata } from 'next'

const siteName = 'dining.fm'
const siteDescription = 'dining.fmは、ギャルソン好きの夫katsumaと、お菓子好きの妻daikokuの東京2人暮らし夫婦が、ゆるゆると話す雑談Podcast。ファッション、スイーツ、ホテルなどを中心に、我が家のダイニングテーブルから家庭内で話題のトピックをお届けします🏠'

export const metadata: Metadata = {
  metadataBase: new URL('https://dining.fm'),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ['dining.fm', 'podcast', 'ポッドキャスト'],
  openGraph: {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    url: '/',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    site: '@diningfm',
    creator: '@diningfm',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
