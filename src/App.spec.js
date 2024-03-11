import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { mount } from 'enzyme';
import App from './App';
import * as testReducer from './reducers';

const { act } = require('react-dom/test-utils');
jest.mock("./services/fetchProducts");
jest.mock("./services/fetchaddress");

Enzyme.configure({ adapter: new Adapter() });
describe('<App/>', () => {
    let component;
    const initialState = {
        id: null,
        products: [],
        selectedProductsId: [],
        selectedAddressId: 0,
        address: [],
        stepNumber: 0,
        showModal: false,
        message: ''
    };
    beforeEach(() => {
        component = mount(
            <App state={initialState} />
        );
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('renders App with loading state', () => {
        expect(component.find('h2')).toHaveLength(1);
        expect(component.find('h2').text()).toEqual(
            '🌀'
        );
    });
    it('renders ProductList page after receiving data from api call', async () => {
        jest.useFakeTimers();
        component = mount(<App state={initialState} />);
        act(() => {
            jest.advanceTimersByTime(1500);
        });
        expect(component.find('ProductList')).toHaveLength(1);
    });

    it('returns new state for increment type', () => {
        const updateAction = { type: 'increment', initialState };
        const updatedState = testReducer.reducer(initialState, updateAction);
        expect(updatedState.stepNumber).toEqual(1);
    });
});
