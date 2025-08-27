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
                    Durante los primeros siglos del cristianismo, la mayoría de los grandes maestros de la fe coincidía en los puntos centrales: qué significaba el Bautismo, cómo entender la Eucaristía y por qué la Tradición era fundamental. Aunque hubo algunas voces que pensaban distinto, el peso de las enseñanzas de estos Padres fue tan grande que terminaron marcando el rumbo de la Iglesia en su época y consolidando las bases sobre las que más tarde se construiría la teología cristiana.
                  </p>
              </div>
              <div className="column">
                <h2>POR QUÉ</h2>
                <p>
                  Hoy se discuten infinidad de temas teológicos, pero pocas veces se consulta qué pensaban los primeros cristianos al respecto. Los Padres de la Iglesia no pretendieron ser infalibles, sin embargo, cuando coincidían en un punto, ese acuerdo se convertía en un fuerte respaldo para la doctrina. Aunque sus escritos están al alcance de todos en internet, todavía son muchos los que nunca se acercaron a leerlos. Este sitio busca facilitar ese acceso y poner sus enseñanzas al servicio de quien quiera conocerlas.
                </p>
              </div>
              <div className="column">
                <h2>QUIÉNES</h2>
                <p>
                  Los Padres de la Iglesia suelen clasificarse en tres grandes grupos: los Padres Apostólicos, los anteriores al Concilio de Nicea y los posteriores a él. Los primeros vivieron en tiempos cercanos a los apóstoles y, en muchos casos, recibieron directamente su enseñanza. Gracias a ellos, la tradición cristiana se transmitió de manera viva a las siguientes generaciones.
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