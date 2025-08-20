import { client } from "@/sanity/lib/client";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
export const revalidate = 60;

interface Params {
  categoria: string;
  subcategoria: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
}

export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "post"]{
      "categoria": categoria->slug.current,
      "subcategoria": subcategoria->slug.current,
      "slug": slug.current
    }`
  );
  return posts.map((p: any) => ({
    categoria: p.categoria,
    subcategoria: p.subcategoria,
    slug: p.slug,
  }));
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
    `*[_type == "post" && subcategoria._ref == $subcatId]{
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