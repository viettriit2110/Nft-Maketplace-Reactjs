import React from 'react';
import "./Footer.css";
import { AUDIT } from './../../config';

/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/accessible-emoji */
const Footer = () => {

  return(
  <footer id="footer" className="clearfix bg-style">
    <div className="themesflat-container">
      <div className="row">
        <div className="col-lg-3 col-md-12 col-12">
          <div className="widget widget-logo">
            <div className="logo-footer" id="logo-footer">
              <a href="/">
                <img
                  id="logo_footer"
                  className='logo-footer_light'
                  src="/assets/images/logo/logo@2x.png"
                  alt="nft-gaming"
                  width="135"
                  height="56"
                />
                  <img
                    id="logo_footer"
                    className='logo-footer_dark'
                    src="/assets/images/logo/logo2@2x.png"
                    alt="nft-gaming"
                    width="135"
                    height="56"
                  />
              </a>
            </div>
            <p className="sub-widget-logo">
              Website NFT Marketplace demo của khoá học Blockchain NFT, Web3 dành cho người mới bắt đầu, cung cấp bởi 200lab edu.
            </p>
            <div className="logo-footer" id="logo-footer">
                <a href={AUDIT} target="_blank" rel="noopener noreferrer">
                <img
                  id="logo_footer"
                  className='logo-footer_dark'
                  src="/assets/images/audit_dark.png"
                  alt="Audit by Verichain"
                  width="235"
                />
                  <img
                    id="logo_footer"
                    className='logo-footer_light'
                    src="/assets/images/audit.png"
                    alt="Audit by Verichain"
                    width="235"
                  />
              </a>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-4 col-sm-7 col-7">
          <div className="widget widget-menu style-2">
            <h5 className="title-widget">Khoá học</h5>
            <ul>
              <li>
                <a href="https://200lab.io/khoa-hoc/khoa-hoc-blockchain-nft-smartcontract-web3">Khoá học blockchain</a>
              </li>
              <li>
                <a href="https://200lab.io/khoa-hoc/khoa-hoc-reactjs-github-graphql">Khoá học ReactJS</a>
              </li>
              <li>
                <a href="https://200lab.io/khoa-hoc/khoa-hoc-data-analytics-with-python-sql">Khoá học Data</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-5 col-5">
          <div className="widget widget-menu fl-st-3">
            <h5 className="title-widget">Khoá Học</h5>
            <ul>
              <li>
                <a href="https://edu.200lab.io/khoa-hoc/khoa-hoc-golang-food-delivery-backend">Khoá học Golang</a>
              </li>
              <li>
                <a href="https://edu.200lab.io/khoa-hoc/khoa-hoc-flutter-food-delivery">Khoá học Flutter</a>
              </li>
              <li>
                <a href="https://community.200lab.io/home">FAQ Community</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-7 col-12">
          <div className="widget widget-subcribe">
            <h5 className="title-widget">Theo dõi</h5>
            {/* <Subscribe /> */}
            <div className="widget-social style-1 mg-t32">
              <ul>
                <li>
                  <a href="https://facebook.com/edu.200lab">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UCXc-GBhPcGrzwkZt67h4suQ">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
                <li className="mgr-none">
                  <a href="https://www.tiktok.com/@200lab.edu">
                    <i className="icon-fl-tik-tok-2"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);}

export default Footer;