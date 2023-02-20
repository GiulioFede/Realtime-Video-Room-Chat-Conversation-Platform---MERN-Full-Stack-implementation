
//stato inziale quando si avvia l'applicazione
const initState = {
    userDetails: null
};

const authReducer = (state=initState, action) => {
    switch (action.type) {
        case "DUMMY":
            return state;
        default:
            return state;
    }
};

export default authReducer;