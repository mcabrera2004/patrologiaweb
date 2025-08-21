"use client";

import React, { useEffect } from "react";

const Header: React.FC = () => {
  useEffect(() => {
    const btn = document.getElementById("mobileMenuToggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("mobileOverlay");

    function openSidebar() {
      if (sidebar) sidebar.classList.add("mobile-open");
      if (overlay) overlay.classList.add("active");
    }
    function closeSidebar() {
      if (sidebar) sidebar.classList.remove("mobile-open");
      if (overlay) overlay.classList.remove("active");
    }

    btn?.addEventListener("click", openSidebar);
    overlay?.addEventListener("click", closeSidebar);

    return () => {
      btn?.removeEventListener("click", openSidebar);
      overlay?.removeEventListener("click", closeSidebar);
    };
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <div className="header-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <div style={{ display: "flex", alignItems: "center", margin: "0 auto" }}>
              <a
                href="/"
                className="logo"
                style={{ textDecoration: "none", color: "white", display: "inline" }}
              >
                <h1 style={{ display: "inline" }}>PADRES DE LA IGLESIA</h1>
              </a>
            </div>
            <button
              className="mobile-menu-toggle"
              id="mobileMenuToggle"
              aria-label="Menú"
            >
              ☰
            </button>
          </div>
        </div>
      </header>
      <div className="mobile-overlay" id="mobileOverlay"></div>
    </>
  );
};

export default Header;