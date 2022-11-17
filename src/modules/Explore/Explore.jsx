import React, { Suspense, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import ErrorBoundary from "../../components/ErrorBoundary";
import "./Explore.css";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import {
  loadMoreNFT,
  loadNFTList,
  selectNFTList,
  selectNFTState,
} from "./explore.slice";
import ProductItem from "../../components/ProductDetail/ProductItem";
import Header from "../../components/Header/Header";
import Title from "../../components/Title";
import Filters from "../../components/Filter/Filters";
import Footer from "../../components/Footer";
import ModalPortal from "../../components/Modal/ModalPortal";
import Modal from "../../components/Modal";
import Order from "../Order";
import { getAccount } from "../../utils/smartcontract"

import Sell from "../Sell/Sell";
import CancelOrder from "../../components/CancelOrder/CancelOrder";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/accessible-emoji */
const Explore = () => {
  const dispatch = useDispatch();
  const [popupBuy, showBidWidget] = useState(false);
  const [itemSelected, setItemSelected] = useState(-1);
  const onToggleBidHandler = () => showBidWidget(!popupBuy);
  const [account, setAccount] = useState("")
  const [popupCancel, setPopupCancel] = useState(false)
  const [popupSelling, setPopupSelling] = useState(false)

  const onShowOrder = (ind) => {
    setItemSelected(ind);
    onToggleBidHandler();
  };
  const [items, setItems] = useState([]);

  const renderItems = (listItem) =>
    listItem.map((nft, index) => {
      return (
        <ProductItem
          data={nft}
          key={nft.id || index}
          ind={index}
          connectedAddress={account}
          onShowOrder={(ind) => { onShowOrder(ind) }}
          onClickCancel={handleClickCancel}
          onShowSell={(index) => {
            handleClickItem(index);
          }}
        />
      );
    });

  const { paging, filter } = useAppSelector(selectNFTState);
  const listItem = useAppSelector(selectNFTList);

  useEffect(() => {
    if (listItem.length) {
      setItems([...listItem])
    }
  }, [listItem])

  useEffect(() => {
    let params = { page: 1, limit: 12, element: "", sortBy: "" };
    dispatch(loadNFTList(params));
  }, []);

  useEffect(() => {
    async function fetchAccount() {
      const addr = await getAccount();
      if (addr) {
        setAccount(addr)
      }
    }

    fetchAccount()
  }, [])

  const handleFinishCancel = (status, ind) => {
    if (status === "done") {
      const newData = items.map((item, index) => index === ind ? { ...item, status: "activated" } : item)
      setItems([...newData])
    }
  }

  const handleOrderSuccess = (order_id) => {
    if (order_id) {
      const newList = items.filter((item) => item.order_id !== order_id);
      setItems([...newList]);
    }
  }

  const handleClickCancel = (index) => {
    setItemSelected(index);
    setPopupCancel(true);
  }

  const onLoadMore = (page) => {
    let params = {
      page: page,
      limit: 12,
      element: filter.element || "",
      sortBy:filter.sort_by || "",
    };
    
    dispatch(loadMoreNFT(params));
  };

  const onSelectCategory = (category) => {
    let params = { page: 1, limit: 12, element: category, sortBy: "" };
    dispatch(loadNFTList(params));
  };

  const handleSuccess = (status, price) => {
    if (status) {
      let newData = items
      newData[itemSelected].status = "selling"
      newData[itemSelected].listing_price = `${price}`
      setItems([...newData])
    }
  }

  const handleClickItem = (index) => {
    setItemSelected(index);
    setPopupSelling(true);
  }

  return (
    <div id="wrapper">
      <div id="page" className="clearfix">
        <ErrorBoundary>
          <Suspense fallback={Loader}>
            <Header />
            <Title title="Peties Marketplace" />
            <div className="tf-section sc-explore-1">
              <div className="themesflat-container">
                <div className="row">
                  <div className="col-md-12">
                    <Filters onSelect={onSelectCategory} />
                  </div>
                  {items && items.length ? renderItems(items) : null}
                </div>
              </div>
              {paging && (paging.limit * paging.page <= paging.total) ? (
                <div
                  className="col-md-12 wrap-inner load-more text-center"
                  onClick={() => {
                    onLoadMore(paging.page + 1);
                  }}>
                  <button
                    id="loadmore"
                    className="sc-button loadmore fl-button pri-3">
                    <span>Load More</span>
                  </button>
                </div>
              ) : null}
            </div>
            <ModalPortal>
              <Modal
                title="Buy"
                isShow={popupBuy}
                onClose={onToggleBidHandler}>
                {itemSelected >= 0 ? (
                  <Order
                    isShow={popupBuy}
                    data={{
                      available: 1,
                      ...items[itemSelected],
                    }}
                    onSuccess={handleOrderSuccess}
                  />
                ) : null}
              </Modal>
            </ModalPortal>
            <ModalPortal>
              <Modal
                title="Sell Item"
                isShow={popupSelling}
                onClose={() => {
                  setPopupSelling(false);
                  setItemSelected(-1);
                }}>
                {popupSelling && itemSelected >= 0 ? (
                  <Sell
                    data={items[itemSelected]}
                    onSuccess={(status, price) => {
                      handleSuccess(status, price);
                    }}
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
                  data={items[itemSelected]} itemIndex={itemSelected}
                  onCanceled={handleFinishCancel}
                /> : null}
              </Modal>
            </ModalPortal>
            <Footer />
            {/* <ModalBid title="Place a Bid" /> */}
          </Suspense>
        </ErrorBoundary>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Explore;
