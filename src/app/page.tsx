import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <Header />

      <div className="container">
        <div className="main-layout">
          <Sidebar />

          <main className="main-content" id="mainContent">
            <h1>Entendiendo a los Padres de la Iglesia</h1>
            <div className="columns">
              <div className="column">
                <h2>QUÉ</h2>
                <p>
                  Aunque siempre hubo algunos disidentes, durante los primeros mil años de la Iglesia existió un amplio consenso entre los Padres sobre todos los principios básicos de la fe, desde el Bautismo hasta la Eucaristía y el papel de la Tradición. Como los pastores y teólogos más respetados de su tiempo, la opinión de los Padres estableció el estándar de lo que se considera enseñanza cristiana bíblica.
                </p>
              </div>
              <div className="column">
                <h2>POR QUÉ</h2>
                <p>
                  Aunque muchas personas debaten sobre teología, pocas se toman el tiempo para ver qué ha dicho la Iglesia primitiva sobre distintos temas teológicos. Si bien los Padres de la Iglesia no eran infalibles, su consenso generalizado sobre ciertos temas debería otorgar peso a las posturas teológicas que defendieron. A pesar de que sus escritos están disponibles de forma gratuita <a href="#">en línea</a>, muchas personas no se han tomado el tiempo de informarse sobre lo que enseñaron los Padres de la Iglesia.
                </p>
              </div>
              <div className="column">
                <h2>QUIÉNES</h2>
                <p>
                  Los Padres de la Iglesia primitiva se dividen en tres categorías principales: Padres Apostólicos, Padres ante-nicenos y Padres post-nicenos. Los Padres Apostólicos fueron contemporáneos de los apóstoles y probablemente fueron instruidos por ellos, transmitiendo la tradición y enseñanza de los mismos apóstoles como sus sucesores directos. Ejemplos de Padres Apostólicos son Clemente y Policarpo.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}