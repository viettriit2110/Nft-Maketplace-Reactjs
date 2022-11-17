import React, { useEffect, useState } from 'react';
import Check from "../../components/Check/Check";
import Spinner from "../../components/Spinner/Spinner";
import Fail from "../../components/Fail/Fail";
import { SCAN_URL } from "../../config";
import { useMarketPlaceContract } from "../../utils/smartcontract";

const CancelOrder = ({
  data,
  itemIndex,
  onCanceled,
}) => {
  const [status, setStatus] = useState("");
  let orderId = "";
  if (data) {
    orderId = data.order_id; 
  }
  const [{ hash, receipt, error: cancelError }, {cancelOrder}] = useMarketPlaceContract();

  useEffect(() => {
    if (hash) {
      setStatus("transactionHash");
    }
    if (receipt) {
      if (receipt.code === 4001) {
        setStatus("fail");
      } else {
        setStatus("done");
      }
    }
    if (cancelError) {
      setStatus("fail");
      console.log("fail", cancelError);
    }
  }, [hash, receipt, cancelError])


  useEffect(() => {
    if (["fail", "done"].indexOf(status) !== -1) {
      onCanceled(status, itemIndex);
    }
  }, [status]);

  const handleCancelOrder = async () => {
    setStatus("processing");
    cancelOrder(orderId);
  };

  const renderButtonByStatus = (status) => {
    switch(status) {
      case "processing":
        return (
          <button className="btn btn-primary d-flex justify-content-center">
            <Spinner>
              <p className="text-white">Processing...</p>
            </Spinner>
          </button>
        );
      case "transactionHash": 
          return(
            <>
              <p className="text-color pb-2">Your transaction is processing</p>
              <a className="btn btn-primary d-flex justify-content-center"
                href={`${SCAN_URL}/tx/${hash}`} target="_blank" rel="noopener noreferrer"
              >
                <Spinner>
                  <p className="text-white">Check it</p>
                </Spinner>
              </a>
            </>
          );
      case "done":
        return(
          <>
            <p className="text-color space-y-20">Your transaction is Done</p>
            <a className="btn btn-primary d-flex justify-content-center"
              href={`${SCAN_URL}/tx/${hash}`} target="_blank" rel="noopener noreferrer"
            >
              <Check>
                <p className="text-white">Check it</p>
              </Check>
            </a>
          </>
        );
      case "fail":
        return (
          <button className="btn btn-primary d-flex justify-content-center">
            <Fail>
              <p className="text-white">Failed</p>
            </Fail>
          </button>
        );
      default:
        return(
          <button className="btn btn-primary d-flex justify-content-center" onClick={handleCancelOrder}>
            Are you sure to cancel?
          </button>
        )
    }
    
  };

  return (
    <div className="flex-column d-flex align-items-center justify-content-center">
      {renderButtonByStatus(status)}
    </div>
  );
}

CancelOrder.defaultProps = {
  itemIndex: -1,
  onCanceled: () => {}
}

export default CancelOrder;