const currencyIds = {
    BNB: "binancecoin",
    ETH: "ethereum",
};

const PRICE_ENDPOINT =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency";

export const getPrice = async (value, crypto, base = "USD") => {
    let cApi = `${PRICE_ENDPOINT}=${base}&ids=${currencyIds[crypto]}`;
    try {
        const priceObject = await fetch(cApi)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.error(response.status);
                }
            })
            .then((json) => json);
        if (priceObject.length) {
            const result = Number(priceObject[0].current_price * value);
            return result;
        }
        return value;
    } catch (e) {
        console.log(e);
        return value;
    }
};
