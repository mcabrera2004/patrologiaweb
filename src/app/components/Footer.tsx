import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container footer-container">
        <div
          className="footer-top"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "18px 0" // mismo padding superior e inferior
          }}
        >
          <p style={{ margin: 0, fontSize: "0.95rem", textAlign: "center" }}>
            ¿Preguntas?{" "}
            <a href="/contacto">
              Contáctanos
            </a>
          </p>
        </div>

        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid rgba(139,105,20,0.35)",
            padding: "18px 0",
            display: "flex",
            alignItems: "center",   // Centra verticalmente
            justifyContent: "center"
          }}
        >
          <p style={{ margin: 0, fontSize: "0.9rem", textAlign: "center" }}>
            En colaboración con{" "}
            <a
              href="https://presbiterianismo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Presbiterianismo.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;