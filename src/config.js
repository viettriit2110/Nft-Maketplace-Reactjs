export const API_VERSION = `/${process.env.REACT_APP_API_VERSION || "v1"}`;
export const API = `${
  process.env.REACT_APP_API_END_POINT ||
  "https://api-test.nft.marketplace.200lab.io"
}${API_VERSION}`;
export const TOKEN_NAME = "BNB";
export const ACCEPT_TOKEN = "GLD";

export const FEE = 0;
export const NFT_MARKET_ADDR =
  process.env.REACT_APP_NFT_MARKET_ADDR ||
  "0x9F53eF4DC95FC1C5411d68f461c403F42A160e93";
export const NFT_ADDR =
  process.env.REACT_APP_NFT_ADDR ||
  "0xD20EA6A53300A0BD1A9646109e847e53a2f474a4";
export const PAYMENT_TOKEN =
  process.env.REACT_APP_PAYMENT_TOKEN ||
  "0xf8655d7c5BF977e97295be51CB3f59B2742A10e4" 
export const SCAN_URL =
  process.env.REACT_APP_SCAN_URL || "https://testnet.bscscan.com/";
export const AUDIT = process.env.REACT_APP_AUDIT_URL || "#";