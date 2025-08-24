"use client";
import React, { useState } from "react";
import "../globals.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="bg-dark text-white d-flex justify-content-between align-items-center px-3"
        style={{ height: "60px" }}
      >
        <span className="fw-bold">Student no: 22263007</span>

        {/* Hamburger  */}
        <button
          className="btn btn-dark fs-4"
          onClick={() => setMenuOpen(true)}
          style={{
            visibility: menuOpen ? "hidden" : "visible",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ☰
        </button>
      </header>

      {/* Side Menu */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <ul className="nav flex-column text-white mt-4">
          <li className="nav-item">
            <a className="nav-link text-white" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/Pages">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Bottom Navbar */}
      <div className="bottom_navbar bg-secondary text-white d-flex flex-column justify-content-center align-items-center w-100 py-2">
        <nav>
          <ul className="list-unstyled d-flex flex-row text-center m-0 p-0">
            <li>
              <button className="btn px-4 border-0">Tabs</button>
            </li>
            <li>
              <button className="btn px-4 border-0">Pre-lab Questions</button>
            </li>
            <li>
              <button className="btn px-4 border-0">Escape Room</button>
            </li>
            <li>
              <button className="btn px-4 border-0">Coding Races</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
