function generateBill(selectedProduct) {
    let totalPrice = 0;
    let totalDiscount = 0;
    let finalPrice = 0;
    let totalQuantity = 0;
    for (let item of selectedProduct) {
        totalPrice += item.total;
        totalDiscount += item.discountedPrice;
        totalQuantity += item.quantity;
    }
    finalPrice = totalPrice - totalDiscount;
    return [totalPrice, totalDiscount, finalPrice, totalQuantity];
}
export default generateBill;
