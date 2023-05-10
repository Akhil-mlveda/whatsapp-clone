// all actions 
export const initialState = {
    user: null,
};

export const actionTypes = {
    SET_USER : "SET_USER",
};

// then send the data layer or state of the component
const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
}

export default reducer;