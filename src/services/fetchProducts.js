async function requestProducts() {
    try {
        const res = await fetch(
            `https://dummyjson.com/carts/user/5`);
        if (!res.ok) {
            throw new Error(`Oops something went wrong ${res.status}`);
        }
        const data = await res.json();
        // console.log("data", JSON.stringify(data));
        return data?.carts[0]?.products;
    }
    catch (error) {
        console.error(`Could not process your error: ${error}`);
        return Promise.reject(error);
    }

}
export default requestProducts;
