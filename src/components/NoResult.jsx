import React from "react";

const NoResult = ({ message }) => (
  <section className="tf-no-result tf-section">
    <div className="themesflat-container">
      <div className="row">
        <div className="col-12">
          <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
            {message}
          </h2>
        </div>
      </div>
    </div>
  </section>
);

NoResult.defaultProps = {
  message: "Sorry, We Couldn’t Find Any Results For This Search.",
};

export default NoResult;
