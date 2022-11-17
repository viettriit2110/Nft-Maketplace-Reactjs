import axiosInstance from "../../utils/apiRequest";
import { API } from "../../config";
import { toast } from "react-toastify";
import Web3 from "web3";
let web3;

export const requestNonceService = async (address) => {
    const { data } = await axiosInstance.get(
        `${API}/auth/nonce?address=${address}`
    );
    try {
        const { nonce, wallet_address } = data.data;
        return { nonce, wallet_address };
    } catch (error) {
        console.log(error);
        throw new Error("Cannot get nonce with your wallet");
    }
};
export const verifySignatureService = async (params) => {
    const { data } = await axiosInstance.post(
        `${API}/auth/verify_signature`,
        JSON.stringify(params)
    );
    return data.data;
};

export const getAddressService = async () => {
    if (!window.ethereum) {
        window.log("Please install or enable MetaMask first.");
        toast("Please install or enable MetaMask.", { delay: 1000 });
        return "";
    }

    if (!web3) {
        try {
            await window.ethereum.enable();
            web3 = new Web3(window.ethereum);
        } catch (error) {
            toast("You need to allow MetaMask.");
            window.log("You need to allow MetaMask.", error);
            return "";
        }
    }

    const coinbase = await web3.eth.getCoinbase();
    
    if (!coinbase) {
        console.log("Please activate MetaMask.");
        return "";
    }
    const publicAddress = await coinbase.toLowerCase();
    // const bigBalance = await web3.eth.getBalance(publicAddress);
    // const balance = web3.utils.fromWei(bigBalance, "ether");
    return publicAddress;
};

export const signMessageService = async ({ publicAddress, nonce }) => {
    try {
        const signature = await web3.eth.personal.sign(
            `${nonce}`,
            publicAddress,
            ""
        );
        return signature;
    } catch (error) {
        console.log(error);
        throw new Error("You need to sign the message to be able to log in.");
    }
};

