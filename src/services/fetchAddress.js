async function requestAddress() {
    console.log("And this");
    try {
        const res = await fetch(
            `https://dummyjson.com/users/5`);
        if (!res.ok) {
            throw new Error(`Oops something went wrong ${res.status}`);
        }
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error(`Could not process your error: ${error}`);
        return Promise.reject(error);
    }

}
export default requestAddress;
