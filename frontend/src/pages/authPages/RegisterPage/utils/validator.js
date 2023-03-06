
export const validateRegisterForm = ({email, password, username}) => {

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isUsernameValid = validateUsername(username);

    //ritorniamo true solo se entrambe sono vere
    return isEmailValid && isPasswordValid && isUsernameValid;
}

const validatePassword = (password) => {
    return password.length > 6 && password.length < 12;
}

const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
}

const validateUsername = (username) => {
    return username.length > 2 && username.length < 13
}