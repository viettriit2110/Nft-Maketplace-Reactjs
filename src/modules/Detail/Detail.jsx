import React, { Suspense, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Web3 from "web3";
import Loader from "../../components/Loader";
import ErrorBoundary from "../../components/ErrorBoundary";
import Header from "../../components/Header/Header";
import Title from "../../components/Title";
import ModalPortal from "../../components/Modal/ModalPortal";
import History from "./components/History";
import { ACCEPT_TOKEN } from "../../config";
import { getAccount } from "../../utils/smartcontract";
import AuthorLink from "../../components/AuthorLink";
import Modal from "../../components/Modal";
import Order from "../Order";
import { getNFTDetailService, getNFTTransaction } from "./detail.service";
import NotFound from "../../components/NoResult";
import AvatarImage from "../../components/AvatarImage/AvatarImage";
// import payableTokenABI from "./../../constants/abis/Token.json";
import { toLowerCase, getLocal } from './../../utils';
import Sell from '../Sell/Sell';
import CancelOrder from "../../components/CancelOrder/CancelOrder";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useProfile } from './../WalletConnect/WalletConnect';
import "./Detail.css";
import Footer from "../../components/Footer/Footer";

const Detail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState();

  const location = useLocation();
  const state = location.state;
  const [popupCancel, setPopupCancel] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState();
  const [popupSelling, setPopupSelling] = useState(false)

  useEffect(() => {
    if (state && state.data) {
      const { data } = state;
      setProductDetail(data);
    }
  }, []);

  const { data, status } = useQuery(
    "useFetchProduct",
    () => getNFTDetailService(id),
  );

  useEffect(() => {
    if (status === "success") {
      setProductDetail(data);
    }
  }, [data, status]);

  useEffect(() => {
    const getAddressUser = async () => {
      const connectedAddress = await getAccount();
      if (connectedAddress) {
        setConnectedAddress(connectedAddress);
      }
    }
    getAddressUser();
  }, []);

  const { data: transactions } = useQuery(
    "useFetchTransaction",
    () => getNFTTransaction(productDetail.nft_id),
    {
      enabled: !!productDetail,
    }
  );

  const accessToken = getLocal("accessToken");
  const { data: profile, status: profileStatus } = useProfile(accessToken);


  const [isShow, showBidWidget] = useState(false);

  const handleShowOrder = () => showBidWidget(!isShow);

  const handleOrderSuccess = () => {
    console.log(profile);
    if (profileStatus === 'success') {
      const newData = { ...productDetail };
      newData.status = "activated"
      newData.user = { ...profile };
      setProductDetail({ ...newData })
    }
  }

  const [payableTokenInfo] = useState({ symbol: ACCEPT_TOKEN });

  const handleClickCancel = () => {
    setPopupCancel(true);
  }
  const handleFinishCancel = (status) => {
    if (status) {
      let newData = { ...productDetail };
      newData.status = "activated"
      setProductDetail({ ...newData })
    }
  }

  const renderAction = (data) => {
    const isOwner =
      toLowerCase(data.user.wallet_address) === toLowerCase(connectedAddress);
    if (isOwner) {
      if (data.status === "selling") {
        return (
          <button
            onClick={handleClickCancel}
            className="sc-button style bag cc-button pri-3">
            <span>Cancel</span>
          </button>
        );
      } else if (data.status === "activated") {
        return (
          <button
            className="sc-button style bag fl-button pri-3"
            onClick={() => {
              setPopupSelling(true);
            }}>
            <span>Sell</span>
          </button>
        );
      }
    } // if not Owner, allow to buy.
    return (
      <button
        className="sc-button style bag fl-button pri-3"
        onClick={() => handleShowOrder()}>
        <span>Buy</span>
      </button>
    );
  };

  const handleSellSuccess = (status, price) => {
    if (status) {
      let newData = productDetail
      newData.status = "selling"
      newData.listing_price = `${price}`
      setProductDetail({ ...newData })
    }
  }

  return (
    <div id="wrapper">
      <div id="page" className="clearfix">
        <ErrorBoundary>
          <Suspense fallback={Loader}>
            <Header />
            <Title title="Item Detail" breadcrumbs={["Home", "Details"]} />
            <div className="tf-section tf-item-details">
              <div className="themesflat-container">
                {productDetail ? (
                  <div className="row">
                    <div className="col-xl-6 col-md-12">
                      <div className="content-left">
                        <div className="media">
                          <img src={productDetail.pet.image.url} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-12">
                      <div className="content-right">
                        <div className="sc-item-details">
                          <h2 className="style2">{productDetail.name}</h2>
                          <div className="meta-item">
                            <div className="left">
                              <span className="viewed eye">
                                Attack: {productDetail.stats_attack}
                              </span>
                              <span className="liked heart">
                                HP: {productDetail.stats_hp}
                              </span>
                              <span className="liked heart">
                                Speed: {productDetail.stats_speed}
                              </span>
                            </div>
                          </div>
                          <div className="client-infor sc-card-product">
                            <div className="meta-info">
                              {productDetail.user ? (
                                <div className="author">
                                  <div className="avatar">
                                    <AvatarImage
                                      size={44}
                                      editable={false}
                                      name={
                                        productDetail.user.display_name ||
                                        productDetail.user.wallet_address
                                      }
                                    />
                                  </div>
                                  <div className="info">
                                    <span>Owned By</span>
                                    <h6>
                                      <AuthorLink data={productDetail.user} />
                                    </h6>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <p>
                            Habitant sollicitudin faucibus cursus lectus
                            pulvinar dolor non ultrices eget. Facilisi
                            lobortisal morbi fringilla urna amet sed ipsum vitae
                            ipsum malesuada. Habitant sollicitudin faucibus
                            cursus lectus pulvinar dolor non ultrices eget.
                            Facilisi lobortisal morbi fringilla urna amet sed
                            ipsum
                          </p>
                          <div className="meta-item-details style2">
                            <div className="item meta-price">
                              <span className="heading">Selling Price</span>
                              <div className="price">
                                <div className="price-box">
                                  <h5>
                                    {Web3.utils.fromWei(productDetail.listing_price, 'ether')}{" "}
                                    {payableTokenInfo.symbol}
                                  </h5>
                                  {/* <span>= ${price}</span> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          {productDetail.user ? renderAction(productDetail) : null}
                          <History
                            transactions={transactions}
                            payableToken={payableTokenInfo.symbol}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NotFound
                    message={
                      "Could not get product information, please try again"
                    }
                  />
                )}
              </div>
            </div>
            <Footer />
            {/* <Auctions /> */}
            <ModalPortal>
              <Modal title="Order" isShow={isShow} onClose={handleShowOrder}>
                {productDetail ? (
                  <Order
                    isShow={isShow}
                    data={{
                      available: 1,
                      ...productDetail,
                    }}
                    onSuccess={handleOrderSuccess}
                  />
                ) : null}
              </Modal>
            </ModalPortal>
            <ModalPortal>
              <Modal
                title="Cancel Order"
                isShow={popupCancel}
                onClose={() => {
                  setPopupCancel(false);
                }}>
                {
                  popupCancel ?
                    <CancelOrder
                      data={productDetail}
                      onCanceled={handleFinishCancel}
                    /> : null}
              </Modal>
            </ModalPortal>
            <ModalPortal>
              <Modal
                title="Sell Item"
                isShow={popupSelling}
                onClose={() => {
                  setPopupSelling(false);
                }}>
                {productDetail ? (
                  <Sell
                    data={productDetail}
                    onSuccess={(status, price) => {
                      handleSellSuccess(status, price);
                    }}
                  />
                ) : null}
              </Modal>
            </ModalPortal>
          </Suspense>
        </ErrorBoundary>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Detail;
