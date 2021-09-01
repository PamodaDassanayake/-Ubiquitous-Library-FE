import * as actionTypes from '../actions/actionTypes';

const initialState = {
    bookAvailability: null,
    userReservationList: [],
    userBooksReservationList: [],
    userVideosReservationList: [],
    reserveBookLoading: false,
    reserveBookSuccess: false,
    reserveBookError: false,
    reserveBookErrorMessage: '',
    reserveFee: null,
    paymentLoading: false,
    paymentSuccess: false,
    paymentError: false,
    paymentErrorMessage: '',
};


const reservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RESERVATIONS_LIST:
            return {...state, userReservationList: action.reservationList};
        case actionTypes.GET_BOOKS_RESERVATIONS_LIST_BY_USER:
            return {...state, userBooksReservationList: action.reservationList};
        case actionTypes.GET_VIDEOS_RESERVATIONS_LIST_BY_USER:
            return {...state, userVideosReservationList: action.reservationList};
        case actionTypes.CHECK_BOOK_AVAILABILITY:
            return {...state, bookAvailability: action.bookAvailability};
        case actionTypes.RESERVE_BOOK:
            return {...state, reserveBookError: false, reserveBookLoading: true, reserveBookSuccess: false};
        case actionTypes.RESERVE_BOOK_SUCCESS:
            return {
                ...state,
                reserveBookError: false,
                reserveBookLoading: false,
                reserveBookSuccess: true,
                reserveFee: action.reserveFee
            };
        case actionTypes.RESERVE_BOOK_FAIL:
            return {
                ...state, reserveBookError: true,
                reserveBookLoading: false,
                reserveBookSuccess: false,
                reserveBookErrorMessage: action.payload
            };
        case actionTypes.PAYMENT:
            return {...state, paymentError: false, paymentLoading: true, paymentSuccess: false};
        case actionTypes.PAYMENT_SUCCESS:
            return {...state, paymentError: false, paymentLoading: false, paymentSuccess: true};
        case actionTypes.PAYMENT_FAIL:
            return {
                ...state,
                paymentError: true,
                paymentLoading: false,
                paymentSuccess: false,
                paymentErrorMessage: action.payload
            };
        default:
            return state;
    }
};

export default reservationReducer;