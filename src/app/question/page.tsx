import '@/app/layout.css'
import QA from '@/app/question/QA';

export async function generateMetadata() {
  const title = "ロボットADへの質問";
  const description = "ロボットADがRAGを利用して本Podcastに関する質問を受け付けます。ロボットADはまだ見習いなのでたまにポンコツな回答もしますが、ご容赦ください。";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      url: '/question',
    },
    twitter: {
      title: title,
      description: description,
      url: '/question',
      card: 'summary_large_image',
    }
  }
}

export default function Page() {
  return (
    <QA />
  );
}
