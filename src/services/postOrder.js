
// mocked http response to simulate successful and error api response
async function postOrder() {
    try {
        const res = await fetch(
            `https://dummyjson.com/http/200`); // response {"status": "200", "message": "OK"}
        if (!res.ok) {
            throw new Error(`Oops something went wrong ${res.status}`);
        }
        const data = await res.json();
        data.message = "Your order has been placed successfully"
        return data;
    }
    catch (error) {
        console.error(`Could not process your error: ${error}`);
        return Promise.reject(error);
    }
}
export default postOrder;

// https://dummyjson.com/http/404/Hello_Peter  simulate error call
// https://dummyjson.com/http/200 : simulate success call
