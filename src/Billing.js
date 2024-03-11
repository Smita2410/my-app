import generateBill from "./utils/generateBills";
const Billing = ({ dispatch, products, selectedProductsId, isError, stepPosition, errorMessage }) => {
    const selectedProduct = products.filter(product => selectedProductsId.includes(product.id));
    const [totalPrice, totalDiscount, finalPrice, totalQuantity] = generateBill(selectedProduct);
    function handleOnClick() {
        dispatch({
            type: 'decrement',
            stepPosition: 1
        })
    }
    console.log("isError", isError);
    console.log("stepPosition", stepPosition);
    return (
        <>
            <div className="search">
                {selectedProduct.length > 0 ? <div className="billing">
                    <h4>{`PRICE DETAILS (${totalQuantity} items)`}</h4>
                    <div className="billing-item">
                        <span>Total MRP</span>
                        <span>&#8377;{totalPrice}</span>
                    </div>
                    <div className="billing-item">
                        <span>Total discount on MRP </span>
                        <span className="discount">-&#8377;{totalDiscount}</span>

                    </div>
                    <div className="billing-item">
                        <span>Total Amount</span>
                        <span>&#8377;{finalPrice}</span>
                    </div>
                </div> :
                    <div className="billing"><h3>You don't have any products added to cart</h3><button className="cbtn" onClick={handleOnClick}>
                        Add Items from ProductList
                    </button></div>}
            </div>
        </>
    )
};
export default Billing;
