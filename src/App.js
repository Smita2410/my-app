import { useState, useEffect, lazy, Suspense, useReducer } from "react";
import AppContext from "./AppContext";
import requestProducts from "./services/fetchProducts";
import requestAddress from "./services/fetchAddress";
import postOrder from "./services/postOrder";
import { initialState, reducer } from "./reducers";
import Billing from "./Billing";
import Confirmation from "./ConfirmationPage"

const Address = lazy(() => import("./Address")); //dynamic  import
const ProductList = lazy(() => import("./ProductList"));

const App = () => {

  const selectedProduct = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const products = state.products;
  const address = state.address;
  const message = state.message
  const showModal = state.showModal;
  const selectedProductsId = state.selectedProductsId;
  const { firstName, lastName, phone, selectedAddressId } = state;
  let stepPosition = state.stepNumber;
  useEffect(() => {
    async function getInitialData() {
      const [res1, res2] = await Promise.all([requestProducts(), requestAddress()]);
      if (res1 && res2) {
        dispatch({
          type: 'fetched',
          payload: {
            ...initialState,
            id: res2.id,
            products: res1,
            address: [
              {
                id: res2.id,
                firstName: res2.firstName,
                lastName: res2.lastName,
                phone: res2.phone,
                address: res2.address
              }]
          }
        });
      }
    }
    getInitialData();
  }, []);

  function handleContinue() {
    if (stepPosition === 2) {
      const res = postOrder();
      console.log("res", res);
      res.then(data => dispatch({ type: 'message', message: data.message }))
        .catch((error) => dispatch({ type: 'message', message: error.message }));
    }
    dispatch({
      type: 'increment',
      stepPosition: stepPosition
    });
  }

  function handleBack() {
    dispatch({
      type: 'decrement',
      stepPosition: stepPosition
    });
  }
  return (
    <Suspense fallback={<div className="loading-pane">
      <h2 className="loader">🌀</h2>
    </div>}>
      <AppContext.Provider value={selectedProduct}>
        <div className="wrapper">
          <header>
            {stepPosition === 0 && <h1>ProductCheckoutPage</h1>}
            {stepPosition === 1 && <h3>Select Delivery Address</h3>}
            {stepPosition === 2 && <h3>Billing page</h3>}
          </header>
          {stepPosition === 1 && <Address dispatch={dispatch}
            address={address}
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            selectedAddressId={selectedAddressId}
            showModal={showModal} />}
          {stepPosition === 0 && <ProductList
            dispatch={dispatch}
            products={products}
            selectedProductsId={selectedProductsId}
          />}
          {
            stepPosition === 2 && <Billing
              dispatch={dispatch}
              products={products}
              selectedProductsId={selectedProductsId}
              stepPosition={stepPosition}
            />
          }
          {
            (stepPosition === 3) && <Confirmation message={message} />
          }
          {(stepPosition === 3 && message.length === 0) ? <div className="loading-pane">
            <h2 className="loader">🌀</h2>
          </div> : <div className="btns">
            {products.length > 0 && <button className="cbtn" onClick={handleContinue}>{stepPosition >= 3 ? "Go to Homepage" : "Continue"}</button>}
            {stepPosition <= 0 ? null : <button className="cbtn" onClick={handleBack}>Back</button>}
          </div>}
        </div>
      </AppContext.Provider>
    </Suspense>
  );
};
export default App;
