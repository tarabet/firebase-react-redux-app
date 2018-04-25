export const LOADING = "LOADING";

export default (state = false, action = {}) => {
    switch (action.type) {
        case LOADING:
            return action.payload;
        default:
            return state;
    }
}

export const loading = (flag) => {
    return dispatch => {
        dispatch({
            type: LOADING,
            payload: flag,
        });
    };
};