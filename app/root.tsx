import React, { useEffect } from 'react';
import ReactGA from "react-ga4";
import { Link, Outlet } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { components } from '@/components/mdx-components';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];
export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ReactGA.initialize("G-3MHRGQL5EY");
  }, []);

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MDXProvider components={components}>
          {children}
        </MDXProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "エラーが発生しました";
  let details = "指定されたページは表示できません";
  let stack: string | undefined;
  const isProduction = import.meta.env.NODE_ENV === 'production';

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "ページが見つかりません" : "エラーが発生しました";
    details = error.data || "指定されたページは表示できません";
  } else if (!isProduction && error && error instanceof Error) {
    stack = error.stack;
  }

  const ErrorContent = () => (
    <div className="container">
      <section className="my-8">
        <h2 className="title">{message}</h2>

        {!isProduction && details && (
          <p className="text-xl mb-16">{details}</p>
        )}

        {!isProduction && stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </section>
      <section className="text-center my-16">
        <p className="text-xl leading-[2.4rem] mb-4">
          <Link to={'/'}>トップページへ戻る</Link>
        </p>
      </section>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen">
        <Header />
        <main className="w-auto md:w-200 mx-8 md:mx-auto">
          <ErrorContent />
        </main>
        <Footer />
      </div>
    </Layout>
  );
}
