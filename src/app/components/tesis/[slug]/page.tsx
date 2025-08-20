import { client } from "@/sanity/lib/client";
import Sidebar from "@/app/components/Sidebar";

interface Params {
  slug: string;
}

interface Tesis {
  title: string;
  contenido: string;
}

export default async function TesisPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tesis: Tesis | null = await client.fetch(
    `*[_type == "tesis" && slug.current == $slug][0]`,
    { slug }
  );

  if (!tesis) return <div>La tesis solicitada no existe.</div>;

  return (
    <div className="container">
      <div className="main-layout">
        <Sidebar />
        <main className="main-content" id="mainContent">
          <h1>{tesis.title}</h1>
          <div>{tesis.contenido}</div>
        </main>
      </div>
    </div>
  );
}