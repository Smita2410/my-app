const Product = ({ item, handleSelectedProduct, selectedProductsId }) => {
    return (<li key={item.id} className="product">
        <label className="select">
            <input className="selectBtn" type="checkbox"
                checked={selectedProductsId.find(id => id === item.id) || false}
                onChange={() => handleSelectedProduct(item)}
            />
        </label>
        <div className="img">
            <img src={item.thumbnail} alt={item.title} />
        </div>
        <div className="content">
            <p>{item.title}</p>
            <p>{`Quantity: ${item.quantity}`}</p>
            <h4>{`Unit Price: ${item.price}`} &#8377;</h4>
            <h3>{`Total: ${item.total}`} &#8377; </h3>
        </div>
    </li>)
};
export default Product;
