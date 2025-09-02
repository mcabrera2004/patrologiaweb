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
}

export async function generateMetadata({ params }: { params: Params }) {
  const { categoria, subcategoria, slug } = params;

  const subcat = await client.fetch(
    `*[_type == "subcategoria" && slug.current == $slug][0]{ title }`,
    { slug: subcategoria }
  );

  const post = await client.fetch(
    `*[_type == "post" 
      && slug.current == $slug 
      && subcategoria->slug.current == $subcategoria 
      && categoria->slug.current == $categoria][0]{ title }`,
    { categoria, subcategoria, slug }
  );

  return {
    title: subcat?.title || "Tesis",
    description: post?.title || "",
    openGraph: {
      title: subcat?.title || "Tesis",
      description: post?.title || "",
    },
    twitter: {
      title: subcat?.title || "Tesis",
      description: post?.title || "",
    },
  };
}

export default async function TesisPage({
  params,
}: {
  params: Params;
}) {
  const { categoria, subcategoria, slug } = params;

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
            <ClientPortableText value={post.body} />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}