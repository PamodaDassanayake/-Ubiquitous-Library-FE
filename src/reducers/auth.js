import * as actionTypes from '../actions/actionTypes';

const initialState = {
    memberships: [],
    account_type: '',
    invalid_login: false,
    newUser: null,
    user: null,
    userRegisterError: false,
    userRegisterErrorMessage: '',
    userRegisterSuccess: false,
    userRegisterLoading: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VIEW_MEMBERSHIPS:
            return {...state, memberships: action.memberships};
        case actionTypes.SET_ACCOUNT_TYPE:
            return {...state, account_type: action.account_type};
        case actionTypes.INVALID_LOGIN:
            return {...state, invalid_login: true};
        case actionTypes.REGISTER_USER:
            return {...state, userRegisterLoading: true, userRegisterSuccess: false, userRegisterError: false};
        case actionTypes.REGISTER_USER_SUCCESS:
            return {
                ...state,
                newUser: action.newUser,
                userRegisterLoading: false,
                userRegisterSuccess: true,
                userRegisterError: false
            };
        case actionTypes.REGISTER_USER_FAIL:
            return {
                ...state,
                userRegisterLoading: false,
                userRegisterSuccess: false,
                userRegisterError: true,
                userRegisterErrorMessage: action.payload
            };
        case actionTypes.SET_LOGGED_USER:
            return {...state, user: action.user};
        default:
            return state;
    }
};

export default authReducer;