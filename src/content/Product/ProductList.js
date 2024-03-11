import Product from './Product';
import { useContext } from 'react';
import { AppContext, AppDispatchContext } from '../../Reducers/AppContext';

const ProductList = () => {
    const state = useContext(AppContext);
    const dispatch = useContext(AppDispatchContext);
    const { products, selectedProductsId } = state;
    function handleSelectedProduct(item) {
        dispatch({
            type: 'changed_selection',
            selectedId: item.id
        })
    }
    return (<ul className="search">{!products.length ? (<h2>No products found</h2>) :
        (products.map((item) => (
            <Product key={item.id} item={item}
                handleSelectedProduct={() => handleSelectedProduct(item)}
                selectedProductsId={selectedProductsId}
            />
        )))}
    </ul>
    );
}
export default ProductList;
