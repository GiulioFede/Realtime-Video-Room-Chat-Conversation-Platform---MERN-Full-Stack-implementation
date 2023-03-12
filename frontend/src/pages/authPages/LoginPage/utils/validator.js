
export const validateLoginForm = ({email, password}) => {

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    //ritorniamo true solo se entrambe sono vere
    return isEmailValid && isPasswordValid;
}

const validatePassword = (password) => {
    return password.length > 6 && password.length < 12;
}

export const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
}