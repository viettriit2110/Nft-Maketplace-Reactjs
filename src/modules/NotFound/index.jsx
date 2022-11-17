import React, { Suspense } from 'react';
import Loader from '../../components/Loader';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header/Header';
import Title from '../../components/Title';
import Footer from '../../components/Footer';

const NotFound = () => {
  return (
    <div id="wrapper">
      <div id="page" className="clearfix">
        <ErrorBoundary>
          <Suspense fallback={Loader}>
            <Header />
            <Title title="Item NotFound" breadcrumbs={['Home', 'NotFounds']} />
            <section className="tf-no-result tf-section">
              <div className="themesflat-container">
                <div className="row">
                  <div className="col-12">
                    <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                      Sorry, We Couldn’t Find Any Results For This Search.
                    </h2>
                    
                  </div>
                </div>
              </div>
            </section>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default NotFound;
