import React, { Suspense, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header/Header';
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import ProductItem from '../../components/ProductDetail/ProductItem';
import ProfileInfo from './components/ProfileInfo';
import NoResult from '../../components/NoResult';
import NotFound from '../NotFound';
import { getLocal } from '../../utils';
import {
  getUserProfileService,
  getUserNFTService,
  updateUserService,
} from "./author.service";
import { useQuery, useQueryClient, useMutation } from "react-query";
import Sell from "../Sell/Sell";
import Order from "../Order";
import './Author.css';

import ModalPortal from '../../components/Modal/ModalPortal';
import Modal from '../../components/Modal';
import { getAccount } from "../../utils/smartcontract";
import Filters from "../../components/Filter/Filters"
import CancelOrder from "../../components/CancelOrder/CancelOrder";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Author= () => {
  
  const [isEditable, setEditProfile] = useState(false);
  const location = useLocation();
  const state = location.state;
  const [itemSelected, setItemSelected] = useState(-1)
  const [showPopup, setShowPopup] = useState(false);
  const [popupCancel, setPopupCancel] = useState(false);
  const [isShowOrder, setShowPopupOrder] = useState(false);
  const [nfts, setNTFs] = useState([])
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const accessToken = getLocal("accessToken");
  const [connectedAddress, setConnectedAddress] = useState();
  const { data: useProfile } = useQuery("profile", getUserProfileService, {
    enabled: !!accessToken && !id,
  });

  useEffect(() => {
    if (state && id) {
      const data = state.data;
      setProfile({ ...data });
    } else if (id) {
      return <NotFound />;
    } else if (accessToken) {
      setProfile({ ...useProfile });
      setEditProfile(true);
    } else {
      return <NotFound />;
    }
  }, [useProfile]);
  
  if (!profile) {
    return <NotFound />;
  }

  const { data: nftsList, isLoading } = useQuery(
    "nftsUser",
    () => {
      let params = { page: 1, limit: 12, element: ""};
      return getUserNFTService(profile.id || id, params)
    },
    {
      enabled: !!(profile.id || id),
      retry: 3,
    }
  );

  const mutation = useMutation(updateUserService, {
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["profile"], {...profile, ...variables});
    },
  });
  
  useEffect(() => {
    if (nftsList && nftsList.data) {
      console.log(nftsList.data);
      setNTFs(nftsList)
    }
  }, [isLoading]);

  const onChangeNameHandler = (name) => {
    // dispatch(updateProfile({ display_name: name }));
    mutation.mutate({ display_name: name });
  }

  const handleClickItem = (index) => {
    setItemSelected(index)
    setShowPopup(true)
  }

  const handleShowOrder = (index) => {
    setItemSelected(index);
    setShowPopupOrder(true);
  }

  const handleSuccess = (status, price) => {
    if (status) {
      let newData = nfts
      newData.data[itemSelected].status = "selling"
      newData.data[itemSelected].listing_price = `${price}`
      setNTFs({...newData})
    }
    // setShowPopup(false)
  }

  const handleLoadMore = async (page) => {
    let params = {
      page: page,
      limit: 12,
      element: nfts.filter.element,
    };
    const res = await getUserNFTService(profile.id || id, params)
    let newData = nfts
    newData.data = [...nfts.data, ...res.data]
    newData.filter = res.filter
    newData.paging = res.paging
    setNTFs({...newData})
  };

  const handleSelectCategory = async (category) => {
    let params = { page: 1, limit: 12, element: category};
    const res = await getUserNFTService(profile.id || id, params)
    let newData = nfts
    newData.data = [...res.data]
    newData.filter = res.filter
    newData.paging = res.paging
    setNTFs({...newData})
  };

  const handleClickCancel = (index) => {
    setItemSelected(index);
    setPopupCancel(true);
  }


  const handleFinishCancel = (status, ind) => {
    if (status === "done") {
      const newList = nfts.data.map((item, index) => index === ind ? { ...item, status: "activated" } : item)
      setNTFs({
        ...nfts,
        data: [...newList],
      })
    }
    setItemSelected(-1);
  }

  const handleOrderSuccess = (order_id) => {
    if (order_id) {
      const newList = nfts.data.filter((item) => item.order_id !== order_id);
      setNTFs({
        ...nfts,
        data: [...newList],
      })
    }
  }

  useEffect(() => {
      const getAddressUser = async() => {
        const connectedAddress = await getAccount();
        setConnectedAddress(connectedAddress);
      }
      getAddressUser();
  }, []);

  return (
    <div id="wrapper">
      <div id="page" className="clearfix">
        <ErrorBoundary>
          <Suspense fallback={Loader}>
            <Header />
            <Title title={isEditable ? "My Profile" : "Author"} />
            <section className="tf-section authors">
              <div className="themesflat-container">
                <div className="flat-tabs tab-authors">
                  <div className="author-profile flex">
                    <ProfileInfo
                      editable={isEditable}
                      id={profile.id}
                      status={profile.status}
                      fullName={profile.display_name}
                      walletAddress={profile.wallet_address}
                      onChangeName={onChangeNameHandler}
                    />
                  </div>
                  {/* <ul className="menu-tab flex">
                    <li className="tablinks active">ALL</li>
                    <li className="tablinks">ART</li>
                    <li className="tablinks">MUSIC</li>
                    <li className="tablinks">COLLECTIBLES</li>
                    <li className="tablinks">SPORTS</li>
                  </ul> */}
                  <div className="content-tab">
                    <div className="content-inner">
                      <div className="row pl-4 pr-4">
                        <Filters onSelect={handleSelectCategory}/>
                      </div>
                      <div className="row">
                        {nfts && nfts.data ? (
                          nfts.data.map((nft, index) => (
                            <ProductItem
                              data={nft}
                              key={index}
                              ind={index}
                              onShowSell={(index) => {
                                handleClickItem(index);
                              }}
                              onShowOrder={(index) => {
                                handleShowOrder(index);
                              }}
                              onClickCancel={handleClickCancel}
                              connectedAddress={connectedAddress}
                            />
                          ))
                        ) : (
                          <NoResult
                            message={
                              isLoading
                                ? "Getting NFTs data..."
                                : "This profile don't have any NFT."
                            }
                          />
                        )}
                        {/* <div className="col-md-12 wrap-inner load-more text-center">
                          <a href="author02.html" className="sc-button loadmore fl-button pri-3"><span>Load More</span></a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {nfts.paging && (nfts.paging.limit * nfts.paging.page < nfts.paging.total) ? (
                  <div
                    className="col-md-12 wrap-inner load-more text-center"
                    onClick={() => {
                      handleLoadMore(nfts.paging.page + 1);
                    }}>
                    <button
                      id="loadmore"
                      className="sc-button loadmore fl-button pri-3">
                      <span>Load More</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </section>
            <ModalPortal>
              <Modal
                title="Sell Item"
                isShow={showPopup}
                onClose={() => {
                  setShowPopup(false);
                  setItemSelected(-1);
                }}>
                {itemSelected >= 0 ? (
                  <Sell
                    data={nfts.data[itemSelected]}
                    onSuccess={(status, price) => {
                      handleSuccess(status, price);
                    }}
                  />
                ) : null}
              </Modal>
            </ModalPortal>
            <ModalPortal>
              <Modal
                title="Buy"
                isShow={isShowOrder}
                onClose={() => {
                  setShowPopupOrder(false);
                  setItemSelected(-1);
                }}>
                {itemSelected >= 0 ? (
                  <Order
                    isShow={isShowOrder}
                    onSuccess={handleOrderSuccess}
                    data={{
                      available: 1,
                      ...nfts.data[itemSelected],
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
                      data={nfts.data[itemSelected]} itemIndex={itemSelected}
                      onCanceled={handleFinishCancel}
                    /> : null}
              </Modal>
            </ModalPortal>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </div>
      <ToastContainer />
    </div>
  );
}

export default React.memo(Author);