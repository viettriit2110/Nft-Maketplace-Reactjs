import React from "react";
import { Link } from "react-router-dom";
import "./AuthorLink.css";

const AuthorLink = ({ data }) => {
  return (
    <Link
      className="author-link"
      to={`/author/${data.id}`}
      state={{ data }}
      title={data.display_name || data.wallet_address}
    >
      <p className="text-color display-name">{data.display_name || data.wallet_address}</p> 
    </Link>
  );
};

export default AuthorLink;
