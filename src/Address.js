import AddressRow from "./AddressRow";
import Modal from "./Modal";
import validateForm from "./utils/validateForm";
import { useState, useContext } from 'react';
import { AppContext, AppDispatchContext } from './AppContext';

const Address = () => {
    const [errors, setErrors] = useState(null);
    const state = useContext(AppContext);
    const dispatch = useContext(AppDispatchContext);
    const { address, selectedAddressId, showModal } = state;
    function handleSelectedAddress(index) {
        dispatch({
            type: 'select_address',
            selectedAddressId: index
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {};
        const contactObj = {};
        const addressObj = {};
        contactObj["firstName"] = formData.get("fname");
        contactObj["lastName"] = formData.get("lname");
        contactObj["phone"] = formData.get("mobile");
        addressObj["postalCode"] = formData.get("pincode");
        addressObj["address"] = formData.get("address");
        addressObj["state"] = formData.get("state");
        addressObj["city"] = formData.get("city");
        obj["address"] = addressObj;
        console.log(contactObj);
        console.log(addressObj);
        const { isValid, errors } = validateForm(contactObj, addressObj);
        console.log("errors", errors);
        if (isValid) {
            dispatch({
                type: 'add',
                addr: { ...obj, ...contactObj }
            });
            dispatch({
                type: 'toggle',
                showModal: !showModal
            });
        }
        else {
            setErrors(errors)
        }

    }
    return (<div>
        {address.length > 0 ? <ul className="search">{address.map((item, index) =>
            <AddressRow
                id={index}
                item={item}
                selectedAddressId={selectedAddressId}
                handleSelectedAddress={() => handleSelectedAddress(index)}
            />)} {showModal ? <Modal>
                <div className="modalWrapper">
                    <header className="address-form-header"><h4>Add new address</h4> <button className="closeBtn" onClick={() => dispatch({
                        type: 'toggle',
                        showModal: !showModal
                    })}>X</button></header>
                    <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
                        <label className="contactDetails">
                            Contact Details: <input type="text" placeholder="firstName*" name="fname" />
                            {errors && errors.firstName && <span>{errors.firstName}</span>}
                            <input type="text" placeholder="lastName" name="lname" />
                            <input type="text" placeholder="Mobile No*" name="mobile" />
                            {errors && errors.phone && <span>{errors.phone}</span>}
                        </label>
                        <label className="addressDetails">
                            Address: <input type="text" placeholder="Pin Code*" name="pincode" />
                            {errors && errors.postalCode && <span>{errors.postalCode}</span>}
                            <input type="text" placeholder="Address*" name="address" />
                            {errors && errors.address && <span>{errors.address}</span>}
                            <input type="text" placeholder="State*" name="state" />
                            {errors && errors.state && <span>{errors.state}</span>}
                            <input type="text" placeholder="City*" name="city" />
                            {errors && errors.city && <span>{errors.city}</span>}
                        </label>
                        <button type="submit">Add new address</button>
                    </form>
                </div>

            </Modal> : null} <button className="cbtn add" onClick={() => dispatch({
                type: 'toggle',
                showModal: !showModal
            })}>Add new address</button></ul> : <h3>Please add new address</h3>}
    </div>
    )
}
export default Address;
