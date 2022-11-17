import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { PAYMENT_TOKEN, NFT_MARKET_ADDR, NFT_ADDR } from "./../config";
import NFTabi from "./../constants/abis/NFT.json";
import paymentTokenAbi from "./../constants/abis/Token.json";
import { clearLocal } from ".";
import marketplaceAbi from "./../constants/abis/marketplace.json";
import { MAX_NUM } from "./../constants";
import { toast } from "react-toastify";

export const loadWeb3 = async () => {
    let web3;
    const provider = await detectEthereumProvider();
    if (provider) {
        web3 = new Web3(provider);
        const netId = await web3.eth.getChainId();
        if (netId !== 97) {
            toast.error(
                "Your Wallet network is not supported yet, please select BSC Testnet",
                { delay: 1000 }
            );
            return false;
        }
    } else {
        // no ethereum provider
        console.log("no ethereum wallet detected");
        toast.error("Please install or enable MetaMask.", { delay: 1000 });
        return false;
    }
    return web3;
};

export const getAccount = async () => {
    const web3 = await loadWeb3();
    if (!web3) {
        return false;
    }
    const accounts = await web3.eth.getAccounts();
    if (accounts.length) {
        return accounts[0];
    }
    return;
};

export const getTokenContract = async (abiOfToken, addressOfToken) => {
    const web3 = await loadWeb3();
    if (!web3) {
        return false;
    }
    const tokenContract = new web3.eth.Contract(abiOfToken, addressOfToken);
    return tokenContract;
};

export const getTokenInfo = async (tokenContract) => {
    if (!tokenContract || !tokenContract.methods) {
        return;
    }
    const [name, symbol] = await Promise.all([
        tokenContract.methods.name().call(),
        tokenContract.methods.symbol().call(),
    ]);
    return { name, symbol };
};

export const refreshBalanceService = async (publicAddress) => {
    let web3 = await loadWeb3();

    if (!web3) {
        return false;
    }
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
        toast("Please activate MetaMask.", { delay: 1000 });
        return {};
    }
    const walletAddress = coinbase.toLowerCase();
    if (walletAddress !== publicAddress) {
        alert("The wallet is changed, please select correct wallet!");
        clearLocal();
        // eslint-disable-next-line
        window.location.href = window.location.href;
        return;
    }
    const contract = await getTokenContract(paymentTokenAbi, PAYMENT_TOKEN);
    if (contract) {
        const tokenBalance = await contract.methods.balanceOf(publicAddress).call();
        const tokenInfo = await getTokenInfo(contract);
        const balance = web3.utils.fromWei(tokenBalance, "ether");
        return { balance, publicAddress, ...tokenInfo };
    }
    return false;
};

export const useMarketPlaceContract = () => {
    const [hash, setHash] = useState("");
    const [receipt, setRecept] = useState(null);
    const [error, setError] = useState(null);
    const [orderId, setOrderId] = useState();
    const [nftId, setNftId] = useState();
    const [addOrderState, setAddOrder] = useState({ price: 0 });
    const [approveAllowance, setAllowance] = useState();
    const [buyNft, setBuyNft] = useState({
        orderId: "",
        price: "0",
    });
    const [handleState, setHandleState] = useState("");
    const [balance, setTokenBalance] = useState("0");

    const approveNFT = (nftId) => {
        setNftId(nftId);
        setHandleState("approve");
    };

    const cancelOrder = (orderId) => {
        setOrderId(orderId);
        setHandleState("cancel");
    };

    const addOrder = (nftId, price) => {
        setNftId(nftId);
        setAddOrder({ price });
        setHandleState("addOrder");
    };

    const executeOrder = (orderId, price, payableToken) => {
        setBuyNft({ orderId, price, payableToken });
        setHandleState("executeOrder");
    };

    useEffect(() => {
        setError("");
        setRecept("");
        setHash("");
    }, [handleState]);

    // approve NFT token and sell the NFT
    useEffect(() => {
        const handleApproveNFT = async () => {
            const sellerAddress = await getAccount();
            if (!sellerAddress) {
                setError({ message: "Cannot connect wallet, please check again" });
            }
            const NFTContract = await getTokenContract(NFTabi, NFT_ADDR);
            try {
                NFTContract.methods
                    .approve(NFT_MARKET_ADDR, nftId)
                    .send({ from: sellerAddress })
                    .once("transactionHash", setHash)
                    .once("receipt", setRecept)
                    .on("error", setError);
            } catch (e) {
                console.log(e);
                setError("Something error, please check again.");
            }
        };
        if (handleState === "approve") {
            handleApproveNFT();
        }
    }, [handleState]);

    // Sell NFT
    useEffect(() => {
        const { price } = addOrderState;
        const handleAddOrder = async () => {
            const sellerAddress = await getAccount();
            if (!sellerAddress) {
                setError({ message: "Cannot connect wallet, please check again" });
            }
            const marketPlaceContract = await getTokenContract(
                marketplaceAbi,
                NFT_MARKET_ADDR
            );
            try {
                marketPlaceContract.methods
                    .addOrder(
                        parseInt(nftId),
                        PAYMENT_TOKEN,
                        Web3.utils.toWei(price.toString(), "ether")
                    )
                    .send({ from: sellerAddress })
                    .once("transactionHash", setHash)
                    .once("receipt", setRecept)
                    .on("error", setError);
            } catch (e) {
                console.log(e);
                setError("Something error, please check again.");
            }
        };
        if (handleState === "addOrder") {
            handleAddOrder();
        }
    }, [handleState]);

    // cancel order
    useEffect(() => {
        const handleCancelOrder = async () => {
            const sellerAddress = await getAccount();
            if (!sellerAddress) {
                setError({ message: "Cannot connect wallet, please check again" });
                return;
            }
            const marketPlaceContract = await getTokenContract(
                marketplaceAbi,
                NFT_MARKET_ADDR
            );
            try {
                marketPlaceContract.methods
                    .cancelOrder(orderId)
                    .send({ from: sellerAddress })
                    .once("transactionHash", setHash)
                    .once("receipt", setRecept)
                    .on("error", setError);
            } catch (e) {
                console.log(e);
                setError("Something error, please check again.");
            }
        };
        if (handleState === "cancel") {
            handleCancelOrder();
        }
    }, [handleState]);

    // buy ( approve token and execute order)
    useEffect(() => {
        const approveTokenContract = async () => {
            const addressBuyer = await getAccount();
            if (!addressBuyer) {
                setError({ message: "Cannot connect wallet, please check again" });
                return;
            }
            try {
                const contractToken = await getTokenContract(
                    paymentTokenAbi,
                    PAYMENT_TOKEN
                );
                contractToken.methods
                    .approve(NFT_MARKET_ADDR, MAX_NUM)
                    .send({ from: addressBuyer })
                    .once("transactionHash", setHash)
                    .once("receipt", setRecept)
                    .on("error", setError);
            } catch (e) {
                console.log(e);
                setError("Something error, please check again.");
            }
        };

        const checkTokenApproved = async () => {
            const addressBuyer = await getAccount();
            if (!addressBuyer) {
                setError({ message: "Cannot connect wallet, please check again" });
                return;
            }
            try {
                const contractToken = await getTokenContract(
                    paymentTokenAbi,
                    PAYMENT_TOKEN
                );
                const balance = await contractToken.methods
                    .balanceOf(addressBuyer)
                    .call();
                setTokenBalance(balance);
                const allowance = await contractToken.methods
                    .allowance(addressBuyer, NFT_MARKET_ADDR)
                    .call();
                setAllowance(allowance);
            } catch (e) {
                setError(e.message);
            }
        };

        const executeOrderContract = async () => {
            const addressBuyer = await getAccount();
            try {
                const marketPlaceContract = await getTokenContract(
                    marketplaceAbi,
                    NFT_MARKET_ADDR
                );
                const { orderId, price } = buyNft;
                marketPlaceContract.methods
                    .executeOrder(orderId, price)
                    .send({ from: addressBuyer })
                    .once("transactionHash", setHash)
                    .once("receipt", setRecept)
                    .on("error", setError);
            } catch (e) {
                console.log(e);
                setError("Something error, please check again.");
            }
        };

        if (handleState === "executeOrder") {
            const { price } = buyNft;
            checkTokenApproved();
            if (!approveAllowance || !balance) {
                return;
            }

            if (approveAllowance < MAX_NUM) {
                setHandleState("approveToken");
                approveTokenContract();
            } else {
                if (balance && parseInt(balance) >= parseInt(price)) {
                    setHandleState("executeOrder");
                    executeOrderContract();
                } else {
                    setHandleState("");
                    setError({ message: "insufficient balance" });
                }
            }
        }
    }, [handleState, approveAllowance, balance]);

    useEffect(() => {
        if (error) {
            setHandleState("");
        }
    }, [error]);

    return [
        { handleState, hash, receipt, error },
        { cancelOrder, approveNFT, addOrder, executeOrder },
    ];
};