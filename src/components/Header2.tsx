import React, { useState } from "react";
import logo from "../assets/headerlogo.png";
import { url } from "inspector";
export default function Navbar() {
  const NavItems = [
    {
      title: "Home",
      url: "/",
      cName: "nav-links"
    },
    {
      title: "About",
      url: "/About",
      cName: "nav-links"
    },
    {
      title: "Portfolio",
      url: "/services",
      cName: "nav-links"
    },
    {
      title: "Contact",
      url: "#",
      cName: "nav-links"
    },
    {
      title: "Let's Connect",
      url: "#",
      cName: "nav-button"
    }
  ];

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
        .App {
          margin: 0;
          padding: 0;
          font-family: "Poppins", sans-serif;
          text-align: center;
          background: linear-gradient(
            0deg,
            rgba(34, 193, 195, 1) 0%,
            rgba(253, 187, 45, 1) 100%
          );
        }
        .NavbarItems {
        border-bottom: 9px solid #1B4583;
          display: flex;
          justify-content: space-between;
          background-color: white;
          align-items: center;
          font-size: 1.2rem;
          border-radius: 9px;
          padding: 0px 20px;
          height: 115px;
          width: 90%;
          position: fixed;
          top: 10px;
          left: 50%;
          transform: translate(-50%);
        }
        
        
       
        .MenuItems {
          list-style: none;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
        .nav-links {
          text-decoration: none;
          color: black;
          padding: 10px 12px;
        }
        .nav-links i {
          padding-right: 10px;
        }
        .nav-links:hover {
          background-color: turquoise;
          color: black;
          border-radius: 5px;
          transition: all 0.2s ease-in-out;
        }
        .fa-bars,
        .fa-times {
          color: green;
          cursor: pointer;
        }
        .Hamburger-Cross-Icons {
          display: none;
        }
        .nav-button {
          padding: 12px;
          background-color: #F89F22;
          border-radius: 5px;
          color: white;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: bold;
        }
        @media screen and (max-width: 850px) {
          .NavbarItems {
            z-index: 99;
          }
          .MenuItems {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            background-color: white;
            width: 100%;
            border-radius: 15px;
            height: auto;
            backdrop-filter: blur(5px);
            position: absolute;
            align-items: stretch;
            top: 0;
            left: -110%;
            padding: 10rem 4rem 40px 6rem;
            margin: 0;
            z-index: -1;
            transition: all 0.3s ease-in-out;
          }
          .MenuItems.active {
            left: 0%;
          }
          .nav-links {
            display: block;
            width: 100%;
            padding: 1.5rem 0;
          }
          .Hamburger-Cross-Icons {
            display: block;
          }
          .nav-button {
            padding: 1rem;
            display: block;
            text-align: center;
            width: 80%;
            margin: auto;
          }
        }
      `}</style>

      <nav className="NavbarItems">
        <h3 className="logo" style={{paddingTop: '1rem'}}>
          <img src={logo} alt="" />
          {/* <i className="fab fa-react"></i>Rayz */}
        </h3>
        <div className="Hamburger-Cross-Icons" onClick={handleClick}>
          <i className={open ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={open ? "MenuItems active" : "MenuItems"}>
          {NavItems.map((Item, index) => {
            return (
              <li key={index}>
                <a href={Item.url} className={Item.cName}>
                  
                  {Item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}



