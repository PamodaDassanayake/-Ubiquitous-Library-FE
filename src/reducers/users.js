import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: false,
    loading: false,
    success: false,
    usersList: [],
    user: []
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VIEW_USER_DETAILS_SUCCESS:
            return {...state, user: action.user};
        case actionTypes.VIEW_USERS_LIST:
            return {...state, usersList: action.users};
        default:
            return state;
    }
};

export default userReducer;