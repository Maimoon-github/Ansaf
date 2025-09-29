import React, { useState } from "react";
import logo from "../assets/headerlogo.png";
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  const NavItems = [
    { title: "Home", url: "/", cName: "nav-links" },
    { title: "About", url: "/about", cName: "nav-links" },
    {
      title: "Services",
      url: "/services",
      cName: "nav-links",
      dropdown: [
        { title: "Villa Construction", url: "/services/villa-construction" },
        { title: "Villa Design", url: "/services/villa-design" },
        { title: "Interior Design", url: "/services/interior-design" },
        { title: "Villa Renovation", url: "/services/villa-renovation" },
        { title: "Villa Maintenance", url: "/services/villa-maintenance" },
        { title: "Fitout", url: "/services/fitout" },
      ],
    },
    { title: "Contact", url: "/Contact-us", cName: "nav-links" },
  ];

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

        .NavbarItems {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: white;
          padding: 0 20px;
          height: 115px; /* reduced height */
          position: absolute;
          top: 10px; /* gap from top */
          left: 50%;
          transform: translateX(-50%);
          border-bottom: 4px solid #1B4583;
          font-family: "Poppins", sans-serif;
          z-index: 1000;
          width: 90%;
          max-width: 1200px;
          border-radius: 8px; /* optional rounded corners */
        }

        .logo img {
        padding-top: 15px
          
        }

        .menu {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-links {
          text-decoration: none;
          color: black;
          padding: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .nav-links:hover {
          background: #F89F22;
          border-radius: 5px;
        }

        .nav-button {
          padding: 8px 14px;
          background: #F89F22;
          border-radius: 5px;
          color: white;
          font-weight: bold;
          text-decoration: none;
        }

        /* Dropdown */
        .dropdown {
          position: relative;
        }
        .dropdown-content {
        width: 10rem;
          display: none;
          position: absolute;
          left: 0;
          background: white;
          box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
          border-radius: 5px;
        }
        .dropdown:hover .dropdown-content {
          display: block;
        }
        .dropdown-content a {
          display: block;
          padding: 8px;
          text-decoration: none;
          color: black;
        }
        .dropdown-content a:hover {
          background: #F89F22;
        }

        /* Mobile */
        .hamburger {
          display: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
@media (max-width: 850px) {
  .NavbarItems {
    width: 95%;
    max-width: 700px;
  }
  .menu {
    position: fixed;
    top: 7.2rem; /* below navbar */
    left: -100%; /* completely off screen */
    right: 0;
    flex-direction: column;
    width: 100%;
    background: white;
    padding-top: 1.5rem;
    margin: 0; /* remove default margin */
    padding-left: 0; /* remove left padding */
    list-style: none; /* prevent bullet spacing */
    transition: left 0.3s ease;
    z-index: 999;
    transform: translateX(-100%); /* fully hide */
            padding-top: 1.5rem; /* reduced padding */
  }
  .menu.active {
    left: 0; /* slide in */
     transform: translateX(0);
  }
  .hamburger {
    display: block;
  }
  .dropdown-content {
    position: static;
    box-shadow: none;
  }
  .nav-button {
    margin-top: auto;
    margin-bottom: 2rem;
    width: 80%;
    text-align: center;
  }
}

        @media (max-width: 850px) {
         
      
          .menu.active {
           
          }
          
        }
      `}</style>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <nav className="NavbarItems">
        {/* Logo */}
        <div className="logo">
         <Link to='/'> <img src={logo} alt="Logo" /> </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={handleClick}>
          <i className={open ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        {/* Menu Links */}
        <ul className={`menu ${open ? "active" : ""}`}>
          {NavItems.map((item, index) => {
            if (item.dropdown) {
              return (
                <li key={index} className="dropdown">
                  <a
                    href={item.url}
                    className={item.cName}
                    onClick={(e) => {
                      if (window.innerWidth <= 850) {
                        e.preventDefault();
                        setDropdownOpen(!dropdownOpen);
                      }
                    }}
                  >
                    {item.title} <i className="fas fa-chevron-down"></i>
                  </a>
                  <div
                    className="dropdown-content"
                    style={{
                      display:
                        window.innerWidth <= 850
                          ? dropdownOpen
                            ? "block"
                            : "none"
                          : undefined,
                    }}
                  >
                    {item.dropdown.map((drop, i) => (
                      <a key={i} href={drop.url}>
                        {drop.title}
                      </a>
                    ))}
                  </div>
                </li>
              );
            }
            return (
              <li key={index}>
                <a href={item.url} className={item.cName}>
                  {item.title}
                </a>
              </li>
            );
          })}
          <a href="https://calendly.com/ansafcont-building-contracting/30min" className="nav-button">
            Let's Connect
          </a>
        </ul>
      </nav>
    </>
  );
}
