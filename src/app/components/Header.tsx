"use client";

import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="header-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/" className="logo" style={{ textDecoration: "none", color: "white", display: "flex", alignItems: "center" }}>
              <span className="icon">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <h1 style={{ display: "inline", marginLeft: 8 }}>PADRES DE LA IGLESIA</h1>
            </a>
          </div>
        </div>
      </header>
      <div className="mobile-overlay" id="mobileOverlay"></div>
    </>
  );
};

export default Header;