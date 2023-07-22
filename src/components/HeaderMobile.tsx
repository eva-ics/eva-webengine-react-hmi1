//React
import { useState } from "react";
import { useAppSelector } from "../hooks";
//Icons
import BurgerMenuIconDark from "../assets/images/icons/burger_dark.svg";
import BurgerMenuIconLight from "../assets/images/icons/burger_light.svg";
import CloseMenuIconDark from "../assets/images/icons/close_dark.svg";
import CloseMenuIconLight from "../assets/images/icons/close_light.svg";
// Utility modules
import { HeaderProps, NAV_LINK, Page, THEME } from "../types";

const HeaderMobile = ({ setDashboardPage, logout }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState(NAV_LINK.OVERVIEW);
  const [showMenu, setShowMenu] = useState(false);
  const theme = useAppSelector((state) => state.theme);

  return (
    <>
      <div className={`backdrop-hidden ${showMenu ? "backdrop-visible" : ""}`}>
        <div className="close-menu" onClick={() => setShowMenu(false)}>
          {theme === THEME.DARK ? (
            <img src={CloseMenuIconDark} alt="icon-close" />
          ) : (
            <img src={CloseMenuIconLight} alt="icon-close" />
          )}
        </div>
        <div className="mobile-menu-content">
          <nav className="header-nav__mobile">
            <a
              className={`header-nav-link__mobile ${
                activeLink === "overview" ? "active-mobile" : ""
              }`}
              href="#"
              onClick={() => {
                setDashboardPage(Page.Main);
                setActiveLink(NAV_LINK.OVERVIEW);
                setShowMenu(false);
              }}
            >
              Overview
            </a>{" "}
            <a
              className={`header-nav-link__mobile ${
                activeLink === "turbines" ? "active-mobile" : ""
              }`}
              href="#"
              onClick={() => {
                setDashboardPage(Page.Turbines);
                setActiveLink(NAV_LINK.TURBINES);
                setShowMenu(false);
              }}
            >
              Turbines
            </a>
            <a className="header-nav-link__mobile" href="#" onClick={logout}>
              Logout
            </a>
          </nav>
        </div>
      </div>
      <header className="header-mobile">
        <div className="container header-mobile__content">
          <div className="burger-menu" onClick={() => setShowMenu(!showMenu)}>
            {theme === THEME.DARK ? (
              <img src={BurgerMenuIconDark} alt="burger icon" />
            ) : (
              <img src={BurgerMenuIconLight} alt="burger icon" />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMobile;
