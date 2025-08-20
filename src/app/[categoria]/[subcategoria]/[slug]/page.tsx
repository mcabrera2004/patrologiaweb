import { client } from "@/sanity/lib/client";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { PortableText, PortableTextComponents } from "@portabletext/react";
export const revalidate = 60;

interface Params {
  categoria: string;
  subcategoria: string;
  slug: string;
}

interface Post {
  title: string;
  body: any;
}

const components: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote className="citation">{children}</blockquote>
    ),
    objection: ({ children }) => (
      <div className="objection">
        <div className="objection-text">{children}</div>
      </div>
    ),
    h2: ({ children }) => (
      <h2
        className="objections-title"
        style={{
          fontWeight: 700,
          borderBottom: "2px solid currentColor",
          paddingBottom: 12,
          fontFamily: "'Source Serif Pro', serif",
          fontSize: "1.6rem",
          margin: "50px 0 25px 0",
        }}
      >
        {children}
      </h2>
    ),
    h4: ({ children }) => (
      <h4
        style={{
          fontWeight: 600,
          borderBottom: "2px solid currentColor",
          paddingBottom: 8,
          fontFamily: "'Source Serif Pro', serif",
          fontSize: "1.15rem",
          margin: "35px 0 18px 0",
          color: "#8b6914",
          letterSpacing: "0.5px",
        }}
      >
        {children}
      </h4>
    ),
  },
  marks: {
    red: ({ children }) => (
      <span style={{ color: "#8b2635" }}>{children}</span>
    ),
    sup: ({ children }) => (
      <sup
        style={{
          fontSize: "0.85em",
          verticalAlign: "super",
          color: "#222",
          fontFamily: "'Source Serif Pro', serif",
          fontWeight: 600,
          letterSpacing: "0.02em",
        }}
      >
        {children}
      </sup>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1a0dab", textDecoration: "underline" }}
      >
        {children}
      </a>
    ),
  },
};

export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "post"]{
      "categoria": categoria->slug.current,
      "subcategoria": subcategoria->slug.current,
      "slug": slug.current
    }`
  );
  // Filtra los que tengan todos los slugs definidos
  return posts
    .filter((p: any) => p.categoria && p.subcategoria && p.slug)
    .map((p: any) => ({
      categoria: p.categoria,
      subcategoria: p.subcategoria,
      slug: p.slug,
    }));
}

export default async function TesisPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  const { categoria, subcategoria, slug } = resolvedParams;

  const post: Post | null = await client.fetch(
    `*[_type == "post" 
      && slug.current == $slug 
      && subcategoria->slug.current == $subcategoria 
      && categoria->slug.current == $categoria][0]{ title, body }`,
    { categoria, subcategoria, slug }
  );

  if (!post) return <div>No existe la tesis.</div>;

  return (
    <>
      <Header />
      <div className="container">
        <div className="main-layout">
          <Sidebar />
          <main className="main-content" id="mainContent">
            <h1 className="thesis-title">{post.title}</h1>
            <PortableText value={post.body} components={components} />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}