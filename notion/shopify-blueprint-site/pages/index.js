import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';

export default function Home({ htmlContent, data }) {
  return (
    <>
      <Head>
        <title>{data.title} | Shopify Blueprint</title>
        <meta name="description" content={data.description || 'Shopify Blueprint Tutorial'} />
        <meta name="keywords" content="shopify, notion, blueprint, tutorial, static site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  );
}

export async function getStaticProps() {
  // Baca satu file Markdown (misal content/index.md)
  const filePath = path.join(process.cwd(), 'content', 'index.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  // Parse front-matter: title, description, dll.
  const { data, content } = matter(fileContents);
  // Ubah konten MD jadi HTML
  const processed = await remark().use(html).process(content);
  return {
    props: {
      data,
      htmlContent: processed.toString(),
    },
  };
}
