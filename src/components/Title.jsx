import React from 'react';

const Title = ({ title, breadcrumbs }) => (
  <section className="flat-title-page inner">
    <div className="overlay"></div>
    <div className="themesflat-container">
      <div className="row">
        <div className="col-md-12">
          <div className="page-title-heading mg-bt-12">
            <h1 className="heading text-center">{title}</h1>
          </div>
          {
            breadcrumbs && breadcrumbs.length ?
              <div className="breadcrumbs style2">
                <ul>
                  {breadcrumbs.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
              : null
          }
        </div>
      </div>
    </div>
  </section>
);

export default Title;