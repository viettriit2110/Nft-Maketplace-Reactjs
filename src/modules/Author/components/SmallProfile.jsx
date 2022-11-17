import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "react-user-avatar";

import { CryptoIcon } from "../../../components/CryptoIcon";
import { TOKEN_NAME } from "../../../config";
import { clearLocal, copyText } from "../../../utils";
/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/accessible-emoji,no-self-assign */

const SmallProfile = ({
  wallet_address,
  balance,
  display_name,
  onRefreshBalance = () => {},
}) => {
  const [isShowAvatar, toggleShowAvatar] = useState(false);
  const handleToggleAvatar = () => toggleShowAvatar(!isShowAvatar);

  const handleCopyText = () => {
    if (!wallet_address) {
      return;
    }
    copyText(wallet_address);
  };

  const logoutHandler = () => {
    clearLocal();
    window.location.href = window.location.href;
  };

  const refreshBalanceHdl = (e) => {
    e.preventDefault();
    onRefreshBalance(wallet_address);
  };

  return (
    <div
      className="admin_active"
      id="header_admin"
      style={{ display: "block" }}>
      <div className="header_avatar">
        <div className="price" onClick={handleToggleAvatar}>
          <p className="text-dark font-weight-bold">
            {`Hello, ${display_name || wallet_address}`}
          </p>
        </div>
        <div onClick={handleToggleAvatar}>
          <UserAvatar
            size="50"
            name="Will Smith"
            src="/assets/images/avatar/default-avatar.jpg"
            style={{ fontSize: "10rem" }}
          />
        </div>
        <div className={`avatar_popup mt-20 ${isShowAvatar ? "visible" : ""}`}>
          <div className="d-flex align-items-center copy-text justify-content-between">
            <span> {wallet_address.slice(0, 15)}... </span>
            <a role="button" onClick={handleCopyText} className="ml-2">
              <i className="fal fa-copy"></i>
            </a>
          </div>
          <div className="d-flex align-items-center mt-10">
            <CryptoIcon currency={balance.symbol} />
            <div className="info ml-10">
              <p className=" w-full text-sm font-bold text-green-500">
                {parseFloat(balance.balance).toFixed(2)} {balance.symbol}
              </p>
            </div>
            <a
              role="button"
              onClick={refreshBalanceHdl}
              className="ml-2"
              style={{ color: "#000" }}
              title="Refresh balance">
              <i className="fas fa-sync-alt"></i>
            </a>
          </div>
          <div className="hr"></div>
          <div className="links mt-20">
            <Link to="/author">
              <i className="fab fa-accusoft"></i>
              <span> My items</span>
            </Link>

            <a className="mt-10" onClick={logoutHandler} id="logout">
              <i className="fal fa-sign-out"></i>
              <span> Logout</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

SmallProfile.defaultProps = {
  balance: {
    balance: 0,
    symbol: TOKEN_NAME,
  },
};
export default SmallProfile;
