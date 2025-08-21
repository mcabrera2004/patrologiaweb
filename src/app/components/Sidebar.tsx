"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

type Subcategoria = {
  title: string;
  slug: { current: string };
  priority?: number;
};

type Categoria = {
  _id: string;
  title: string;
  slug: { current: string };
  priority?: number;
  subcategorias: Subcategoria[];
};

export default function Sidebar() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "categoria"]|order(priority asc, title asc){
          _id,
          title,
          slug,
          priority,
          "subcategorias": *[_type == "subcategoria" && references(^._id)]|order(priority asc, title asc){
            title,
            slug,
            priority
          }
        }`
      )
      .then(setCategorias);
  }, []);

  const toggleMenu = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <nav className="sidebar" id="sidebar">
      <ul>
        {categorias.map((cat, idx) => (
          <li key={cat._id}>
            <div
              className="category-header"
              onClick={() => toggleMenu(idx)}
              style={{ cursor: cat.subcategorias.length ? "pointer" : "default" }}
            >
              {cat.title}
              {cat.subcategorias.length > 0 && (
                <span className={`toggle${openIndexes.includes(idx) ? " active" : ""}`}>
                  {openIndexes.includes(idx) ? "−" : "+"}
                </span>
              )}
            </div>
            {cat.subcategorias.length > 0 && (
              <ul className={`submenu${openIndexes.includes(idx) ? " active" : ""}`}>
                {cat.subcategorias.map((sub) => (
                  <li key={sub.slug.current}>
                    <Link href={`/${cat.slug.current}/${sub.slug.current}`}>{sub.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}