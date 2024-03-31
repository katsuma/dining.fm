import Link from 'next/link'
import '@/app/layout.css'

export default async function NotFound() {
  return (
    <main className='main'>
      <section className='section'>
        <h2>ページが見つかりませんでした</h2>
        <p>
          <Link href="/">トップページへ戻る</Link>
        </p>
      </section>
    </main>
  )
}
