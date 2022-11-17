import React from 'react';


const Modal = ({ title, isShow = false, children, onClose, hideIconClose }) => (
  <>
    <div
      className="modal fade popup show"
      id="popup_bid_success"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
      style={{ display: isShow ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {!hideIconClose ? (
            <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          ): null}
          <div className="modal-body space-y-20 pd-40">
            <h3 className="text-center">{title}</h3>
            {/* <p className="text-center">
            your bid <span className="price color-popup">(4ETH) </span> has been
            listing to our database
          </p>
          <a href="#" className="btn btn-primary"> Watch the listings</a> */}
            {children}
          </div>
        </div>
      </div>
    </div>
    {isShow ? <div className="modal-backdrop fade show"></div> : null}
  </>
);

export default Modal;