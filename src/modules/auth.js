export const SET_AUTH = "auth/SET_AUTH";
export const SHOW_REGISTER_FORM = "auth/SHOW_REGISTER_FORM";
export const HIDE_REGISTER_FORM = "auth/HIDE_REGISTER_FORM";

const initialState = {
    authenticated: false,
    currentUser: null,
    showRegisterForm: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                authenticated: action.payload.authenticated,
                currentUser: action.payload.currentUser,
            };
        case SHOW_REGISTER_FORM:
            return {
                ...state,
                showRegisterForm: true,
            };
        case HIDE_REGISTER_FORM:
            return {
                ...state,
                showRegisterForm: false,
            };
        default:
            return state;
    }
}

export const setAuth = (flag) => {
    return dispatch => {
        dispatch({
            type: SET_AUTH,
            payload: flag,
        });
    };
};