import React from "react";
import SmallProfile from "../Author/components/SmallProfile";
import { getLocal, setLocal } from "../../utils";
import {
  getAddressService,
  requestNonceService,
  signMessageService,
  verifySignatureService,
} from "./wallet.service";
import { refreshBalanceService } from "./../../utils/smartcontract";
import { getUserProfileService } from "./../Author/author.service";
import './WalletConnect.css';
import { useQuery } from "react-query";
import { toast } from "react-toastify";


export const useProfile = (accessToken) => useQuery(
  ["profile", accessToken],
  getUserProfileService,
  {
    enabled: !!accessToken,
  }
);

const WalletConnect = () => {
  const handleRegisterWallet = async () => {
    try {
      const publicAddress = await getAddressService();
      if (!publicAddress) {
        return;
      }
      const { nonce, wallet_address } = await requestNonceService(publicAddress);
      const signature = await signMessageService({
        publicAddress,
        nonce,
      });
      const result = await verifySignatureService({
        wallet_address,
        nonce: nonce,
        signature: signature,
      });
      setLocal({
        name: "accessToken",
        value: result.token,
      });
      setLocal({
        name: "tokenExpiry",
        value: result.expiry,
      });
      setLocal({
        name: "publicAddress",
        value: publicAddress,
      });
      window.location.reload();
    } catch (e) {
      toast("Please check your wallet and try again");
    }
  };

  const handleClickWallet = (e) => {
    e.preventDefault();
    handleRegisterWallet();
  };

  const accessToken = getLocal("accessToken");
  const { data: profile } = useProfile(accessToken);

  const { data: balance, refetch } = useQuery(
    ["useBalance", profile],
    async () => await refreshBalanceService(profile.wallet_address),
    {
      enabled: !!profile,
      retry: 1,
    }
  );

  const renderWalletButton = () => {
    if (profile && profile.wallet_address) {
      return (
        <SmallProfile
          balance={balance}
          onRefreshBalance={refetch}
          {...profile}
        />
      );
    } else {
      return (
        <div className="sc-btn-top mg-r-12 show" id="site-header">
          <button
            className="sc-button header-slider style style-1 wallet fl-button pri-1"
            onClick={handleClickWallet}>
            <span>Wallet connect</span>
          </button>
        </div>
      );
    }
  };
  return renderWalletButton();
};

export default React.memo(WalletConnect);
