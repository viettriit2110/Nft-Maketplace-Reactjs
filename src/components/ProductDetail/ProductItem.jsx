import React from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import AuthorLink from "../AuthorLink";
import UserAvatar from "react-user-avatar";

import { ACCEPT_TOKEN } from "../../config";
import { toLowerCase } from '../../utils';
import "./ProductItem.css"

const ProductItem = ({
  data,
  onShowSell,
  onShowOrder,
  ind,
  connectedAddress,
  onClickCancel
}) => {

  const renderAction = (data) => {
    const isOwner = toLowerCase(data.user.wallet_address) === toLowerCase(connectedAddress);
    if (isOwner) {
      if (data.status === "selling") {
        return (
          <button
            onClick={async () => await onClickCancel(ind)}
            className="sc-button style bag cc-button pri-3">
            <span>Cancel</span>
          </button>
        );
      } else if (data.status === "activated"){
        return (
          <button
            className="sc-button style bag fl-button pri-3"
            onClick={() => {
              onShowSell(ind);
            }}>
            <span>Sell</span>
          </button>
        );
      }
    } // if not Owner, allow to buy.
    return (
      <button
        className="sc-button style bag fl-button pri-3"
        onClick={() => onShowOrder(ind)}>
        <span>Buy</span>
      </button>
    );
  };

  return (
    <div className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6 product__item">
      <div className="sc-card-product explode">
        <div className="card-media">
          <Link to={`/detail/${data.id}`} state={{ data }}>
            {data.pet && data.pet.image ? (
              <img src={data.pet.image.url} alt="Pet" />
            ) : (
              <img src="/assets/images/no-img.jpeg" alt="NoImg" />
            )}
          </Link>
        </div>
        <div className="card-title">
          <h5>
            <Link to={`/detail/${data.id}`} state={{ data }}>
              {data.name}
            </Link>
          </h5>
          <div className="tags">bsc</div>
        </div>
        <div className="meta-info">
          <div className="author">
            <div className="avatar">
              <UserAvatar
                size="44"
                name={data.user.display_name || "NA"}
                style={{ fontSize: "2rem" }}
              />
            </div>
            <div className="info">
              {data.user ? (
                <>
                  <span>Owned By</span>
                  <h6>
                    <AuthorLink data={data.user} />
                  </h6>
                </>
              ) : null}
            </div>
          </div>
          {data.listing_price ? (
            <div className="price">
              <span>Price</span>
              <div className="wrapper-price flex align-items-center">
                <p className="h-price text-color">
                  {Web3.utils.fromWei(data.listing_price, 'ether')}
                </p>
                <p className="text-warning type-token">{ACCEPT_TOKEN}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="card-bottom">
          {data.user ? renderAction(data) : null}
        </div>
      </div>
    </div>
  );
};

ProductItem.defaultProps = {
  data: {},
  onClick: () => {},
};

export default ProductItem;
