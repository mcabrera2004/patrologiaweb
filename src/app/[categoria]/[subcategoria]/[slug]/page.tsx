import { client } from "@/sanity/lib/client";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ClientPortableText from "./ClientPortableText";

interface Params {
  categoria: string;
  subcategoria: string;
  slug: string;
}

interface Post {
  title: string;
  body: any;
  subcategoria: {
    title: string;
  };
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const { categoria, subcategoria, slug } = resolvedParams;

  const post: Post | null = await client.fetch(
    `*[_type == "post" 
      && slug.current == $slug 
      && subcategoria->slug.current == $subcategoria 
      && categoria->slug.current == $categoria][0]{
        title,
        subcategoria->{title}
      }`,
    { categoria, subcategoria, slug }
  );

  if (!post) return {};

  return {
    title: post.subcategoria?.title || "Patrología",
    description: post.title,
    openGraph: {
      title: post.subcategoria?.title || "Patrología",
      description: post.title,
      url: `https://www.patrologia.org/${categoria}/${subcategoria}/${slug}`,
      siteName: "Patrología",
      images: [
        {
          url: "/OpenGraph.jpg",
          width: 300,
          height: 250,
          alt: "Favicon de Patrología",
        },
      ],
      locale: "es_ES",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: post.subcategoria?.title || "Patrología",
      description: post.title,
      images: ["/OpenGraph.jpg"],
    },
  };
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
      && categoria->slug.current == $categoria][0]{
        title, 
        body, 
        subcategoria->{title}
      }`,
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
            <ClientPortableText value={post.body} />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}