import React, { useEffect, useState } from "react";
import { ACCEPT_TOKEN, FEE, PAYMENT_TOKEN } from "../../config";

import { SCAN_URL } from "../../config";
import Token from "./../../constants/abis/Token.json";
import Web3 from "web3";
import "./Order.css";

import { useMarketPlaceContract, getTokenContract, getTokenInfo } from "../../utils/smartcontract";


import Spinner from '../../components/Spinner/Spinner'
import Check from '../../components/Check/Check'
import Fail from '../../components/Fail/Fail'

const Order = ({
    data: {
        listing_price,
        order_id,
        fee = FEE,
        payable_token = PAYMENT_TOKEN,
    },
    isShow,
    onSuccess,
}) => {
    const [payableToken, setPayableToken] = useState({ symbol: ACCEPT_TOKEN });
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const quantity = 1;

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
                                <p className="text-success">Check it</p>
                            </Check>
                        </a>
                    </>
                );
            case "fail":
                return (
                    <>
                        <p className="text-color pt-2 pb-2 text-center">Your transaction is Failed, please check and try again</p>
                        <p className="text-danger pb-2 text-center">{message}</p>
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
                                    onClick={handleBuySubmit}
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
                        onClick={handleBuySubmit}>
                        Buy
                    </button>
                )
        }
    }

    useEffect(() => {
        const getPayableTokenDetail = async () => {
            try {
                const contractToken = await getTokenContract(
                    Token, payable_token
                );
                const payableTokenInfo = await getTokenInfo(contractToken);
                if (payableTokenInfo) {
                    setPayableToken(payableTokenInfo);
                }
            } catch (e) {
                setMessage(e.message);
                setStatus("fail");
            }
        }
        getPayableTokenDetail();
    }, []);

    const [{ handleState, hash, receipt, error: orderError }, { executeOrder }] = useMarketPlaceContract();

    useEffect(() => {
        if (!handleState) {
            return;
        }
        if (receipt) {
            if (handleState === 'approveToken') {
                setStatus("processing");
            } else {
                setStatus("done");
                onSuccess(order_id);
            }
        } else {
            setStatus("processing");
        }
    }, [handleState, receipt]);

    useEffect(() => {
        if (hash) {
            setStatus("transactionHash");
        }
    }, [hash]);

    useEffect(() => {
        if (orderError) {
            setStatus("fail");
            if (orderError.message === 'insufficient balance') {
                setMessage(`Your balance is not enought, please check again.`);
            }
            console.log("fail", orderError);
        }
    }, [orderError]);

    useEffect(() => {
        setStatus("");
    }, [isShow]);


    const handleBuySubmit = (e) => {
        e.preventDefault();
        executeOrder(order_id, listing_price);
    };

    return (
        <div className="place-bid">
            <div className="d-flex justify-content-between">
                <p>Price:</p>
                <p className="text-right price color-popup">
                    {Web3.utils.fromWei(listing_price) * quantity || 0} {payableToken.symbol}
                </p>
            </div>
            <div className="d-flex justify-content-between">
                <p>Service fee:</p>
                <p className="text-right price color-popup">
                    {fee} {payableToken.symbol}
                </p>
            </div>
            <div className="d-flex justify-content-between">
                <p>Total amount:</p>
                <p className="text-right price color-popup">
                    {Web3.utils.fromWei(listing_price) * quantity + fee} {payableToken.symbol}
                </p>
            </div>
            {
                renderButtonByStatus(status)
            }
        </div>
    );
};

Order.defaultProps = {
    data: {
        listing_price: 0,
        available: 1,
        fee: 0,
    },
    isShow: false,
    onSuccess: () => { },
};

export default Order;
