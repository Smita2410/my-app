const AddressRow = ({ item, id, selectedAddressId, handleSelectedAddress }) => {
    // console.log("selectedAddressId", selectedAddressId);
    // console.log("id", id);
    return (<li key={item.id} className="address">
        <label className="select">
            <input className="selectBtn" type="radio"
                checked={selectedAddressId === id}
                onChange={() => handleSelectedAddress(id)}
            />
        </label>
        <div className="userInfo">
            <p>{`Deliver to: ${item.firstName} ${item.lastName}`}</p>
            <h3>{`Address: ${item.address.address}`}</h3>
            <p>{`Phone: ${item.phone}`}</p>
            <p>{`City: ${item.address.city}`}</p>
            <p>{`State: ${item.address.state}`}</p>
            <p>{`Postalcode: ${item.address.postalCode}`}</p>
        </div>
    </li>)
};
export default AddressRow;
