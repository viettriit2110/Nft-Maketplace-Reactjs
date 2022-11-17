import moment from "moment";
import React from "react";
import Web3 from "web3";
import AvatarImage from "../../../components/AvatarImage/AvatarImage";
import { ACCEPT_TOKEN, SCAN_URL } from "../../../config";

/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/accessible-emoji */

const TransactionInfo = ({ data, payableToken }) => {
  return (
    <div className="content">
      <div className="client">
        <a
          href={`${SCAN_URL}tx/${data.tx_hash}`}
          title="Open the transaction"
          rel="noopener noreferrer"
          target="_blank">
          <div className="sc-author-box style-2">
            <div className="author-avatar">
              <AvatarImage size={50} editable={false} />
              <div className="badge"></div>
            </div>
            <div className="author-infor">
              <div className="history-infor">
                <span>From: <strong>{data.seller_address}</strong> To: <strong>{data.buyer_address}</strong></span>
              </div>
              <span className="time">
                at {moment(data.updated_at).format("DD/MM/YYYY, h:mm A")}
              </span>
            </div>
          </div>
        </a>
      </div>
      <div className="price">
        <h5>
          {" "}
          {Web3.utils.fromWei(data.price)} {payableToken}
        </h5>
      </div>
    </div>
  );
};

TransactionInfo.defaultProps = {
  data: {},
  payableToken: ACCEPT_TOKEN,
};
export default TransactionInfo;
