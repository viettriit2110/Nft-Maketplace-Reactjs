import React from "react";
import currencyIcon from "./currencyIcons";
import "./CryptoIcon.css";

export const CryptoIcon = ({ currency }) => (
  <img
    className="coin"
    src={currencyIcon[currency] || "/assets/images/icon/empty-token.png"}
    alt="/"
  />
);
