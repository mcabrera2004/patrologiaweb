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

export async function generateMetadata({ params }: { params: Params }) {
  const { categoria, subcategoria } = params;

  // Obtiene el nombre de la categoría
  const cat = await client.fetch(
    `*[_type == "categoria" && slug.current == $slug][0]{ title }`,
    { slug: categoria }
  );

  // Obtiene el nombre de la subcategoría
  const subcat = await client.fetch(
    `*[_type == "subcategoria" && slug.current == $slug][0]{ title }`,
    { slug: subcategoria }
  );

  return {
    title: cat?.title || "Subcategoría",
    description: subcat?.title || "",
    openGraph: {
      title: cat?.title || "Subcategoría",
      description: subcat?.title || "",
    },
    twitter: {
      title: cat?.title || "Subcategoría",
      description: subcat?.title || "",
    },
  };
}

const PAGE_SIZE = 10;

export default async function SubcategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { subcategoria, categoria } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1", 10);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const subcat = await client.fetch(
    `*[_type == "subcategoria" && slug.current == $slug][0]`,
    { slug: subcategoria }
  );

  if (!subcat) return <div>No existe la subcategoría.</div>;

  const totalPosts: number = await client.fetch(
    `count(*[_type == "post" && subcategoria._ref == $subcatId])`,
    { subcatId: subcat._id }
  );

  const posts: Post[] = await client.fetch(
    `*[_type == "post" && subcategoria._ref == $subcatId] | order(title asc) [${start}...${end}]{
      _id,
      title,
      slug
    }`,
    { subcatId: subcat._id }
  );

  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

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
            <div className="pagination">
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "18px" }}>
                <a
                  href={page > 1 ? `?page=${page - 1}` : undefined}
                  className={`pagination-arrow${page === 1 ? " disabled" : ""}`}
                  aria-disabled={page === 1}
                  tabIndex={page === 1 ? -1 : 0}
                  style={{
                    pointerEvents: page === 1 ? "none" : "auto",
                  }}
                >
                  &#8592;
                </a>
                <a
                  href={page < totalPages ? `?page=${page + 1}` : undefined}
                  className={`pagination-arrow${page === totalPages ? " disabled" : ""}`}
                  aria-disabled={page === totalPages}
                  tabIndex={page === totalPages ? -1 : 0}
                  style={{
                    pointerEvents: page === totalPages ? "none" : "auto",
                  }}
                >
                  &#8594;
                </a>
              </div>
              <div className="pagination-page">
                Página {page} de {totalPages}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}