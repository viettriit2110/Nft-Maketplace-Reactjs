import React, {  } from 'react';
import Carousel from '../../../components/Carousel';

const Auctions = () => {

  return (
    <section className="tf-section live-auctions item-details pad-b-74 mobie-style">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title">
                Live Auctions</h2>
              <a href="explore-3.html" className="exp">EXPLORE MORE</a>
            </div>
          </div>
          <div className="col-md-12">
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Auctions;