'use client';
import React from "react";
import '../globals.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white w-100 py-3 d-flex flex-column align-items-center">
      
      <nav className="text-center">
        {/* Footer text */}
        <span className="d-block mb-2">&copy;Gazi Ul Muhtadi</span>
        
        {/* Horizontal info list */}
        <ul className="list-unstyled d-flex flex-row justify-content-center m-0 p-0">
          <li className="mx-3">Student no. 22263007</li>
          <li className="mx-3">Date: 17.08.2025</li>
        </ul>
      </nav>
      
    </footer>
  );
};

export default Footer;