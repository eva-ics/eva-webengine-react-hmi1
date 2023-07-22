//React
import { useState } from "react";
// Utility modules
import { HeaderProps, NAV_LINK, Page } from "../types";

const HeaderDesktop = ({ setDashboardPage, logout }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState(NAV_LINK.OVERVIEW);

  return (
    <header>
      <nav className="header-nav">
        <a
          className={`header-nav__link ${
            activeLink === "overview" ? "active" : ""
          }`}
          href="#"
          onClick={() => {
            setDashboardPage(Page.Main);
            setActiveLink(NAV_LINK.OVERVIEW);
          }}
        >
          Overview
        </a>{" "}
        <a
          className={`header-nav__link ${
            activeLink === "turbines" ? "active" : ""
          }`}
          href="#"
          onClick={() => {
            setDashboardPage(Page.Turbines);
            setActiveLink(NAV_LINK.TURBINES);
          }}
        >
          Turbines
        </a>
        <a className="header-nav__link " href="#" onClick={logout}>
          Logout
        </a>
      </nav>
    </header>
  );
};

export default HeaderDesktop;
