import * as actionTypes from '../actions/actionTypes';

const initialState = {
    bookAvailability: null,
    userReservationList: [],
    reserveBookLoading: false,
    reserveBookSuccess: false,
    reserveBookError: false,
    reserveBookErrorMessage: ''
};


const reservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RESERVATIONS_LIST:
            return {...state, userReservationList: action.reservationList};
        case actionTypes.GET_RESERVATIONS_LIST_BY_USER:
            return {...state, userReservationList: action.reservationList};
        case actionTypes.CHECK_BOOK_AVAILABILITY:
            return {...state, bookAvailability: action.bookAvailability};
        case actionTypes.RESERVE_BOOK:
            return {...state, reserveBookError: false, reserveBookLoading: true, reserveBookSuccess: false};
        case actionTypes.RESERVE_BOOK_SUCCESS:
            return {...state, reserveBookError: false, reserveBookLoading: false, reserveBookSuccess: true};
        case actionTypes.RESERVE_BOOK_FAIL:
            return {
                ...state, reserveBookError: true,
                reserveBookLoading: false,
                reserveBookSuccess: false,
                reserveBookErrorMessage: action.payload
            };
        default:
            return state;
    }
};

export default reservationReducer;