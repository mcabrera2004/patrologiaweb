"use client";
import React, { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Footer: React.FC = () => {
  useEffect(() => {
    // Solo cargar el script si no existe
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Definir la función global para Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "es",
            includedLanguages: "es,en,fr,it,de,pt",
            layout: 0
          },
          "gtranslate_wrapper"
        );
      }
    };
  }, []);

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
            padding: "18px 0"
          }}
        >
          <p style={{ margin: 0, fontSize: "0.95rem", textAlign: "center" }}>
            ¿Preguntas?{" "}
            <a href="/contacto">
              Contáctanos
            </a>
          </p>
          <div id="gtranslate_wrapper" style={{ marginTop: 16, display: "flex", justifyContent: "center" }} />
        </div>

        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid rgba(139,105,20,0.35)",
            padding: "18px 0",
            display: "flex",
            alignItems: "center",
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