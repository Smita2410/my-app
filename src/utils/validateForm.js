const validateForm = (contactObj, addressObj) => {
    let errors = {};
    let isValid = true;
    console.log("postalCode", addressObj.address.postalCode)
    if (!contactObj.firstName.trim()) {
        errors.firstName = 'Firstname is required';
        isValid = false;
    } else if (contactObj.firstName.length < 2 || contactObj.firstName.length > 50) {
        errors.firstName = 'Name must be between 2 and 50 characters';
        isValid = false;
    }

    if (!addressObj.address.trim()) {
        errors.address = 'Street is required';
        isValid = false;
    } else if (addressObj.address.length > 100) {
        errors.address = 'Street must be less than 100 characters';
        isValid = false;
    }

    if (!addressObj.city.trim()) {
        errors.city = 'City is required';
        isValid = false;
    } else if (addressObj.city.length > 50) {
        errors.city = 'City must be less than 50 characters';
        isValid = false;
    }

    if (!addressObj.state.trim()) {
        errors.state = 'State is required';
        isValid = false;
    } else if (addressObj.state.length !== 2) {
        errors.state = 'State must be 2 characters';
        isValid = false;
    }

    if (!addressObj.postalCode.trim()) {
        errors.postalCode = 'Postal code is required';
        isValid = false;
    } else if (!/^\d{5}$/.test(addressObj.postalCode)) {
        errors.postalCode = 'Postal code must be a 5-digit number';
        isValid = false;
    }

    if (!contactObj.phone.trim()) {
        errors.phone = 'Phone number is required';
        isValid = false;
    } else if (!/^\d{10}$/.test(contactObj.phone)) {
        errors.phone = 'Phone number must be a 10-digit number';
        isValid = false;
    }
    return { isValid, errors };
};
export default validateForm;
