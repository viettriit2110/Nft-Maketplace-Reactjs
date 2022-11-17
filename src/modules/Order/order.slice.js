export const selectWalletState = (state) => state.wallet;
export const selectPublicAddress = (state) => state.wallet.publicAddress;
export const selectNonce = (state) => state.wallet.nonce;
export const selectBalance = (state) => state.wallet.balance;
