import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.min.css'; // core Swiper
import 'swiper/modules/navigation/navigation.min.css'; // Navigation module
import 'swiper/modules/pagination/pagination.min.css'; // Pagination module

SwiperCore.use([Navigation, Pagination]);

/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/accessible-emoji */
const Carousel = () => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <Swiper className='show-shadow carousel pad-t-24 auctions'
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      loop={false}
      slidesPerView={1}
      spaceBetween={30}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1300: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      onBeforeInit={(swiper) => {
        // @ts-ignore
        swiper.params.navigation.prevEl = navigationPrevRef.current;
        // @ts-ignore
        swiper.params.navigation.nextEl = navigationNextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
    >
      <SwiperSlide>
        <div className="sc-card-product">
          <div className="card-media">
            <a href="item-details.html"><img src="/assets/images/box-item/card-item8.jpg" alt="product item" /></a>
            <button className="wishlist-button heart"><span className="number-like"> 100</span></button>
            <div className="featured-countdown">
              <span className="slogan"></span>
              <span className="js-countdown" data-timer="516400" data-labels=" :  ,  : , : , "></span>
            </div>
            <div className="button-place-bid">
              <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></a>
            </div>
          </div>
          <div className="card-title">
            <h5><a href="item-details.html">"Hamlet Contemplates Contemplates "</a></h5>
            <div className="tags">bsc</div>
          </div>
          <div className="meta-info">
            <div className="author">
              <div className="avatar">
                <img src="/assets/images/avatar/avt-11.jpg" alt="product item" />
              </div>
              <div className="info">
                <span>Creator</span>
                <h6> <a href="author02.html">SalvadorDali
                </a> </h6>
              </div>
            </div>
            <div className="price">
              <span>Current Bid</span>
              <h5> 4.89 ETH</h5>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slider-item">
          <div className="sc-card-product">
            <div className="card-media active">
              <a href="item-details.html"><img src="/assets/images/box-item/image-box-10.jpg" alt="product item" /></a>
              <button className="wishlist-button heart"><span className="number-like"> 220</span></button>
              <div className="featured-countdown">
                <span className="slogan"></span>
                <span className="js-countdown" data-timer="81640" data-labels=" :  ,  : , : , "></span>
              </div>
              <div className="button-place-bid">
                <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></a>
              </div>
            </div>
            <div className="card-title">
              <h5 className="style2"><a href="item-details.html">"Triumphant Awakening Contemplates "</a></h5>
              <div className="tags">bsc</div>
            </div>
            <div className="meta-info">
              <div className="author">
                <div className="avatar">
                  <img src="/assets/images/avatar/avt-12.jpg" alt="product item" />
                </div>
                <div className="info">
                  <span>Creator</span>
                  <h6> <a href="author02.html">Trista Francis</a> </h6>
                </div>
              </div>
              <div className="price">
                <span>Current Bid</span>
                <h5> 4.89 ETH</h5>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="sc-card-product">
          <div className="card-media">
            <a href="item-details.html"><img src="/assets/images/box-item/image-box-11.jpg" alt="product item" /></a>
            <button className="wishlist-button heart"><span className="number-like"> 90</span></button>
            <div className="featured-countdown">
              <span className="slogan"></span>
              <span className="js-countdown" data-timer="316400" data-labels=" :  ,  : , : , "></span>
            </div>
            <div className="button-place-bid">
              <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></a>
            </div>
          </div>
          <div className="card-title">
            <h5 className="style2"><a href="item-details.html">"Living Vase 01 by Lanza Contemplates "</a></h5>
            <div className="tags">bsc</div>
          </div>
          <div className="meta-info">
            <div className="author">
              <div className="avatar">
                <img src="/assets/images/avatar/avt-13.jpg" alt="product item" />
              </div>
              <div className="info">
                <span>Creator</span>
                <h6> <a href="author02.html">Freddie Carpenter</a> </h6>
              </div>
            </div>
            <div className="price">
              <span>Current Bid</span>
              <h5> 4.89 ETH</h5>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="sc-card-product">
          <div className="card-media">
            <a href="item-details.html"><img src="/assets/images/box-item/image-box-21.jpg" alt="product item" /></a>
            <button className="wishlist-button heart"><span className="number-like"> 145</span></button>
            <div className="featured-countdown">
              <span className="slogan"></span>
              <span className="js-countdown" data-timer="716400" data-labels=" :  ,  : , : , "></span>
            </div>
            <div className="button-place-bid">
              <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></a>
            </div>
          </div>
          <div className="card-title">
            <h5 className="style2"><a href="item-details.html">"Flame Dress' by Balmain Contemplates "</a></h5>
            <div className="tags">bsc</div>
          </div>
          <div className="meta-info">
            <div className="author">
              <div className="avatar">
                <img src="/assets/images/avatar/avt-14.jpg" alt="" />
              </div>
              <div className="info">
                <span>Creator</span>
                <h6> <a href="author02.html">Tyler Covington</a> </h6>
              </div>
            </div>
            <div className="price">
              <span>Current Bid</span>
              <h5> 4.89 ETH</h5>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="sc-card-product">
          <div className="card-media">
            <a href="item-details.html"><img src="/assets/images/box-item/card-item8.jpg" alt="product item" /></a>
            <button className="wishlist-button heart"><span className="number-like"> 100</span></button>
            <div className="featured-countdown">
              <span className="slogan"></span>
              <span className="js-countdown" data-timer="516400" data-labels=" :  ,  : , : , "></span>
            </div>
            <div className="button-place-bid">
              <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></a>
            </div>
          </div>
          <div className="card-title">
            <h5><a href="item-details.html">"Hamlet Contemplates Contemplates "</a></h5>
            <div className="tags">bsc</div>
          </div>
          <div className="meta-info">
            <div className="author">
              <div className="avatar">
                <img src="/assets/images/avatar/avt-11.jpg" alt="product item" />
              </div>
              <div className="info">
                <span>Creator</span>
                <h6> <a href="author02.html">SalvadorDali
                </a> </h6>
              </div>
            </div>
            <div className="price">
              <span>Current Bid</span>
              <h5> 4.89 ETH</h5>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <div className="swiper-pagination mg-t-12"></div>
      {/* <div className="slider-button-next btn-slide-next" ref={navigationPrevRef}></div>
                      <div className="slider-button-prev btn-slide-prev" ref={navigationNextRef}></div> */}
    </Swiper>
  )
};

export default Carousel;