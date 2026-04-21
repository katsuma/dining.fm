import { defaultHost } from "@/utils/meta";

export function loader() {
  const body = `User-agent: *
Allow: /

Sitemap: ${defaultHost}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
