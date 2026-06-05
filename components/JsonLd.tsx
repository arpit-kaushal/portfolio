import { personJsonLd, websiteJsonLd } from "../lib/seo";

export function JsonLd() {
  const graph = [personJsonLd(), websiteJsonLd()];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
