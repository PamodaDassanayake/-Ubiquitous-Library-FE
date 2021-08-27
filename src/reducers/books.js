import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: false,
    loading: false,
    success: false,
    booksList: [],
    book: [],
    bookSubmitError: false,
    bookSubmitErrorMessage: '',
    bookSubmitSuccess: false,
    bookSubmitLoading: false
};

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_BOOK:
            return {...state, bookSubmitError: false, bookSubmitLoading: true, bookSubmitSuccess: false};
        case actionTypes.ADD_NEW_BOOK_SUCCESS:
            return {...state, bookSubmitError: false, bookSubmitLoading: false, bookSubmitSuccess: true};
        case actionTypes.ADD_NEW_BOOK_FAIL:
            return {
                ...state,
                bookSubmitError: true,
                bookSubmitLoading: false,
                bookSubmitSuccess: false,
                bookSubmitErrorMessage: action.payload
            };
        case actionTypes.VIEW_BOOK_LIST:
            return {...state,   booksList: action.books};
        case actionTypes.VIEW_BOOK_DETAILS_SUCCESS:
            return {...state, book: action.book};
        case actionTypes.SEARCH_BOOKS:
            return {...state, booksList: action.books};
        case actionTypes.BOOK_AVAILABILITY:
            return {...state, availability: action.availability};
        case actionTypes.SEARCH_BOOKS:
            return {...state, booksList: action.books};
        default:
            return state;
    }
};

export default bookReducer;