import React, { useEffect, useState } from "react";
import { ACCEPT_TOKEN } from '../../config';

import "./Sell.css";
import Web3 from "web3";
import { useMarketPlaceContract } from "../../utils/smartcontract";

import Spinner from '../../components/Spinner/Spinner'
import Check from '../../components/Check/Check'
import Fail from '../../components/Fail/Fail'
import { SCAN_URL } from "../../config";

const Sell = ({
  data: {
    nft_id,
    name,
    listing_price,
  },
  onSuccess,
}) => {
  const [price, setPrice] = useState(Web3.utils.fromWei(listing_price.toString(), 'ether'));
  const [status, setStatus] = useState("");
  useEffect(() => {
    return () => {
      setStatus("");
    };
  }, []);

  const renderButtonByStatus = (status) => {
    switch (status) {
      case "processing":
        return (
          <button className="btn btn-primary d-flex justify-content-center">
            <Spinner>
              <p className="text-white">Processing...</p>
            </Spinner>
          </button>
        );
      case "transactionHash":
        return (
          <>
            <p className="text-color pt-2 pb-10 text-center">Your transaction is processing</p>
            <a className="btn btn-primary d-flex justify-content-center"
              href={`${SCAN_URL}tx/${hash}`} target="_blank" rel="noopener noreferrer"
            >
              <Spinner>
                <p className="text-white">Check it</p>
              </Spinner>
            </a>
          </>
        );
      case "done":
        return (
          <>
            <p className="text-color pt-2 pb-10 text-center">Your transaction is Done</p>
            <a className="btn btn-primary d-flex justify-content-center"
              href={`${SCAN_URL}tx/${hash}`} target="_blank" rel="noopener noreferrer"
            >
              <Check>
                <p className="text-white">Check it</p>
              </Check>
            </a>
          </>
        );
      case "fail":
        return (
          <>
            <p className="text-color pt-2 pb-2 text-center">Your transaction is Failed, please check and try again</p>
            {
              hash ?
                <a className="btn btn-primary d-flex justify-content-center"
                  href={`${SCAN_URL}tx/${hash}`} target="_blank" rel="noopener noreferrer"
                >
                  <Fail>
                    <p className="text-white">Check it</p>
                  </Fail>
                </a>
                :
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSellingSubmit}
                >
                  Try
                </button>
            }
          </>
        );
      default:
        return (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSellingSubmit}
          >
            Sell
          </button>
        )
    }
  }

  const [{ handleState, hash, receipt, error: sellError }, { approveNFT, addOrder }] = useMarketPlaceContract();

  useEffect(() => {
  if (handleState) {
    if (receipt) {
      if (handleState === 'approve') {
        addOrder(nft_id, price);
      }
      onSuccess(receipt.status, Web3.utils.toWei(price.toString(), 'ether'));
      setStatus("done");
    } else {
      setStatus("processing");
    }
  }
  }, [handleState, receipt]);

  useEffect(() => {
  if (hash) {
    setStatus("transactionHash");
  }
  }, [hash]);

  useEffect(() => {
  if (sellError) {
    setStatus("fail");
    console.log("fail", sellError);
  }
  }, [sellError]);

  const handleSellingSubmit = async (e) => {
    e.preventDefault();
    if (!price || price <= 0) {
      alert("Please check your price number.");
      return;
    }
    setStatus("processing");
    approveNFT(nft_id);
  }

  return (
    <div className="selling-bid">
      <div className="d-flex justify-content-between pt-2 pb-2">
        <p>Name:</p>
        <p className="text-right price color-popup">{name}</p>
      </div>
      {
        status !== 'done' ?
          <>
            <div className="d-flex justify-content-center w-100 pt-2 pb-2">
              <div className="form-group w-100 bg-light.bg-gradient">
              <p>Price:</p>
                <input
                  type="number"
                  className="form-control bg-light.bg-gradient input-price"
                  id="formGroupExampleInput"
                  placeholder="Type your price..."
                  defaultValue={Web3.utils.fromWei(listing_price.toString(), 'ether')}
                  onChange={(e) => { setPrice(parseFloat(e.target.value || 0)) }}
                  readOnly={status === 'processing' ? true : false}
                />
              </div>
            </div>
          </>
          : null
      }

      <div className="d-flex justify-content-between pt-2 pb-2">
        <p>Total amount:</p>
        <p className="text-right price color-popup">{price} {ACCEPT_TOKEN}</p>
      </div>
      {
        renderButtonByStatus(status)
      }
    </div>
  );
};

Sell.defaultProps = {
  data: {
    price: 1,
    available: 1,
    fee: 0
  },
  onSubmitBidHandler: () => { }
}

export default Sell;