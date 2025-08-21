"use client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import React, { useState, createContext, useContext } from "react";

// Contexto para saber si estamos dentro de una quote (puedes dejarlo si planeas usarlo para otras cosas)
const QuoteContext = createContext(false);

const NoteMark = ({ value }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <span className="note-toggle-wrapper" style={{ display: "inline" }}>
        <button
          className="note-toggle"
          tabIndex={0}
          aria-label="Mostrar nota"
          onClick={() => setVisible((v) => !v)}
          type="button"
        >
          ⁺
        </button>
      </span>
      {visible && (
        <div className="note visible">
          <PortableText value={value.content} components={components} />
        </div>
      )}
    </>
  );
};

const components: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <QuoteContext.Provider value={true}>
        <blockquote className="citation">{children}</blockquote>
      </QuoteContext.Provider>
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
    note: (props: any) => <NoteMark {...props} />,
  },
};

export default function ClientPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}