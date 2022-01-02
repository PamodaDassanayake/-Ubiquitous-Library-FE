import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: false,
    loading: false,
    success: false,
    usersList: [],
    user: [],
    userBlockError: false,
    userBlockErrorMessage: '',
    userBlockSuccess: false,
    userBlockLoading: false,
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VIEW_USER_DETAILS_SUCCESS:
            return {...state, user: action.user};
        case actionTypes.VIEW_USERS_LIST:
            return {...state, usersList: action.users};
        case actionTypes.BLOCK_USER:
            return {...state, userBlockLoading: true, userBlockSuccess: false, userBlockError: false};
        case actionTypes.BLOCK_USER_SUCCESS:
            return {...state, userBlockLoading: false, userBlockSuccess: true, userBlockError: false};
        case actionTypes.BLOCK_USER_FAIL:
            return {
                ...state,
                userBlockLoading: false,
                userBlockSuccess: false,
                userBlockError: true,
                userBlockErrorMessage: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;