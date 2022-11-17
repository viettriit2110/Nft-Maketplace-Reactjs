import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import WalletConnect from '../../modules/WalletConnect';
import { getLocal, setLocal } from '../../utils';

/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/accessible-emoji */

const Header= () => {
  const [themeState, setTheme] = useState('dark');

  function setDark() {
    const body = document.querySelector('body');
    if (body && !body.className.includes('is_dark')) {
      body.classList.add('is_dark');
    }
    setLocal({ name: "theme", value: "dark"});
    setTheme('dark');
  }

  function setLight() {
    const body = document.querySelector('body');
    if (body && body.className.includes('is_dark')) {
      body.classList.remove('is_dark');
    }
    setLocal({ name: "theme", value: "light" });
    setTheme('light');
  }

  const localTheme = getLocal("theme") || "dark";

  useEffect(() => {
    localTheme === 'light' ? setLight() : setDark()
    setTheme(localTheme);
  }, []);


  return (
    <header id="header_main" className="header_1 js-header">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div id="site-header-inner">
              <div className="wrap-box flex">
                <div id="site-logo" className="clearfix">
                  <div id="site-logo-inner">
                    <Link to="/" className="main-logo">
                      <img
                        id="logo_header"
                        src={`/assets/images/logo/${themeState === 'light' ? 'logo' : 'logo'}@2x.png`}
                        alt="nft-gaming"
                        width="133"
                        height="56"
                      />
                    </Link>
                  </div>
                </div>
                <div className="mobile-button">
                  <span></span>
                </div>
                <nav id="main-nav" className="main-nav">
                  <ul id="menu-primary-menu" className="menu">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    {/* <li>
                      <Link to="/author">Author</Link>
                    </li> */}
                  </ul>
                </nav>
                <div className="flat-search-btn flex">
                  {/* <SearchBox /> */}
                  <WalletConnect />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mode_switcher">
        <h6>
          Dark mode <strong>Available</strong>
        </h6>
        <a
          role="button"
          onClick={setLight}
          className={`light d-flex align-items-center ${
            themeState !== "dark" ? "is_active" : ""
          }`}>
          <span className="dark-icon">🌞</span>
        </a>
        <a
          role="button"
          onClick={setDark}
          className={`dark d-flex align-items-center ${
            themeState === "dark" ? "is_active" : ""
          }`}>
          <span className="dark-icon">🌜</span>
        </a>
      </div>
      <nav id="main-nav-mobi" className="main-nav" style={{ display: "none" }}>
        <ul id="menu-primary-menu" className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;