import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import { Outlet } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { components } from "@/components/mdx-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { LinkButton } from "./components/LinkButton";
import { Heading } from "./components/Heading";
import { Paragraph } from "./components/Paragraph";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap",
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
        {/* yellow-light の色を指定 */}
        <meta name="theme-color" content="#fdfbf8" />
        <Meta />
        <Links />
      </head>
      <body>
        <MDXProvider components={components}>{children}</MDXProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

function ErrorContent({
  message,
  details,
  stack,
  isProduction,
}: {
  message: string;
  details: string;
  stack?: string;
  isProduction: boolean;
}) {
  return (
    <div className="container">
      <section className="my-8">
        <Heading title={message} dotClassName="bg-orange" />

        {!isProduction && details && <Paragraph>{details}</Paragraph>}

        {!isProduction && stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </section>
      <section className="text-center my-16">
        <LinkButton to="/">トップページへ戻る</LinkButton>
      </section>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "エラーが発生しました";
  let details = "指定されたページは表示できません";
  let stack: string | undefined;
  const isProduction = import.meta.env.NODE_ENV === "production";

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404 ? "ページが見つかりません" : "エラーが発生しました";
    details = error.data || "指定されたページは表示できません";
  } else if (!isProduction && error && error instanceof Error) {
    stack = error.stack;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white md:max-w-[780px] md:mx-auto md:shadow-[0_0_30px_rgba(0,0,0,0.06)]">
        <Header />
        <main className="w-auto md:w-130 mx-8 md:mx-auto">
          <ErrorContent
            message={message}
            details={details}
            stack={stack}
            isProduction={isProduction}
          />
        </main>
        <Footer />
      </div>
    </Layout>
  );
}
