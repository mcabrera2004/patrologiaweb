"use client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import React, { useState } from "react";

const NoteMark = ({ value }: any) => {
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    if (!visible) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".note-bubble")) setVisible(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [visible]);

  return (
    <span className="note-bubble" style={{ position: "relative", display: "inline-block" }}>
      <button
        className="note-toggle"
        tabIndex={0}
        aria-label="Mostrar nota"
        onClick={() => setVisible((v) => !v)}
        type="button"
      >
        ⁺
      </button>
      <span className={`note${visible ? " visible" : ""}`}>
        <button
          className="close-note"
          aria-label="Cerrar nota"
          onClick={() => setVisible(false)}
          type="button"
        >
          ✕
        </button>
        <PortableText value={value.content} components={components} />
      </span>
      {/* No renderizamos children */}
    </span>
  );
};

const components: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote className="citation">{children}</blockquote>
    ),
    objection: ({ children }) => (
      <div className="objection">
        <div className="objection-text">{children}</div>
      </div>
    ),
    h2: ({ children }) => (
      <h2
        className="objections-title"
        style={{
          fontWeight: 700,
          borderBottom: "2px solid currentColor",
          paddingBottom: 12,
          fontFamily: "'Source Serif Pro', serif",
          fontSize: "1.6rem",
          margin: "50px 0 25px 0",
        }}
      >
        {children}
      </h2>
    ),
    h4: ({ children }) => (
      <h4
        style={{
          fontWeight: 600,
          borderBottom: "2px solid currentColor",
          paddingBottom: 8,
          fontFamily: "'Source Serif Pro', serif",
          fontSize: "1.15rem",
          margin: "35px 0 18px 0",
          color: "#8b6914",
          letterSpacing: "0.5px",
        }}
      >
        {children}
      </h4>
    ),
  },
  marks: {
    red: ({ children }) => (
      <span style={{ color: "#8b2635" }}>{children}</span>
    ),
    sup: ({ children }) => (
      <sup
        style={{
          fontSize: "0.85em",
          verticalAlign: "super",
          color: "#222",
          fontFamily: "'Source Serif Pro', serif",
          fontWeight: 600,
          letterSpacing: "0.02em",
        }}
      >
        {children}
      </sup>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1a0dab", textDecoration: "underline" }}
      >
        {children}
      </a>
    ),
    note: NoteMark,
  },
};

export default function ClientPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}