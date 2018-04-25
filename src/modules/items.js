export const SET_ITEMS = "items/SET_ITEMS";

const initialState = {
    toDoItems: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS:
            return {
                ...state,
                toDoItems: action.payload.items,
            };
        default:
            return state;
    }
}

export const setItems = (items) => {
    return dispatch => {
        dispatch({
            type: SET_ITEMS,
            payload: items,
        });
    };
};