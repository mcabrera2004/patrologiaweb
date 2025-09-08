import { client } from "@/sanity/lib/client";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Params {
  categoria: string;
  subcategoria: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { categoria, subcategoria } = await params;

  // Obtener los títulos de la categoría y subcategoría
  const cat = await client.fetch(
    `*[_type == "categoria" && slug.current == $slug][0]{title}`,
    { slug: categoria }
  );
  const subcat = await client.fetch(
    `*[_type == "subcategoria" && slug.current == $slug][0]{title}`,
    { slug: subcategoria }
  );

  return {
    title: cat?.title || "Patrología",
    description: subcat?.title || "",
    openGraph: {
      title: cat?.title || "Patrología",
      description: subcat?.title || "",
      url: `https://www.patrologia.org/${categoria}/${subcategoria}`,
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
      type: "website",
    },
    twitter: {
      card: "summary",
      title: cat?.title || "Patrología",
      description: subcat?.title || "",
      images: ["/OpenGraph.jpg"],
    },
  };
}

export default async function SubcategoriaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { subcategoria, categoria } = await params;

  const subcat = await client.fetch(
    `*[_type == "subcategoria" && slug.current == $slug][0]`,
    { slug: subcategoria }
  );

  if (!subcat) return <div>No existe la subcategoría.</div>;

  const posts: Post[] = await client.fetch(
    `*[_type == "post" && subcategoria._ref == $subcatId] | order(priority asc, title asc){
      _id,
      title,
      slug
    }`,
    { subcatId: subcat._id }
  );

  return (
    <>
      <Header />
      <div className="container">
        <div className="main-layout">
          <Sidebar />
          <main className="main-content" id="mainContent">
            <h1>{subcat.title}</h1>
            <ul className="theses">
              {posts.map((t) => (
                <li key={t._id}>
                  <a href={`/${categoria}/${subcategoria}/${t.slug.current}`}>
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
