export const initialState = {
    id: null,
    products: [],
    selectedProductsId: [],
    selectedAddressId: 0,
    address: [],
    stepNumber: 0,
    showModal: false,
    message: ''
};

export function reducer(state, action) {
    switch (action.type) {
        case 'fetched': {
            return {
                ...initialState,
                ...action.payload
            }
        }
        case 'message': {
            console.log("action object in error", action)
            return { ...state, message: action.message }
        }
        case 'changed_selection': {
            let newSelectedItemId = [];
            if (state.selectedProductsId.includes(action.selectedId)) {
                newSelectedItemId = state.selectedProductsId.filter(id => id !== action.selectedId);
            }
            else {
                newSelectedItemId = state.selectedProductsId.slice();
                newSelectedItemId.push(action.selectedId);
            }
            return {
                ...state,
                selectedProductsId: newSelectedItemId
            };
        }
        case 'increment': {
            console.log("state.stepNumber in increment", state.stepNumber);
            return {
                ...state,
                stepNumber: state.stepNumber < 3 ? state.stepNumber + 1 : 0
            }
        }
        case 'decrement': {
            return {
                ...state,
                stepNumber: state.stepNumber > 0 ? state.stepNumber - 1 : 0
            }
        }
        case 'decrement_amount': {
            return {
                ...state,
                stepNumber: state.stepNumber - action.amount
            }
        }
        case 'toggle': {
            return {
                ...state,
                showModal: action.showModal
            }
        }
        case 'add': {
            const newAddress = state.address.slice();
            newAddress.push(action.addr);
            console.log("newAddress", newAddress);
            return {
                ...state,
                address: newAddress
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
