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
    bookSubmitLoading: false,
    comments: [],

    googleBooksList: [],
    requestedBooksList: [],

    requestBookLoading: false,
    requestBookSuccess: false,
    requestBookError: false,

    purchaseBookLoading: false,
    purchaseBookSuccess: false,
    purchaseBookError: false,
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
            return {...state, booksList: action.books};
        case actionTypes.VIEW_BOOK_DETAILS_SUCCESS:
            return {...state, book: action.book};
        case actionTypes.SEARCH_BOOKS:
            return {...state, booksList: action.books};
        case actionTypes.BOOK_AVAILABILITY:
            return {...state, availability: action.availability};
        case actionTypes.SEARCH_BOOKS:
            return {...state, booksList: action.books};
        case actionTypes.VIEW_COMMENTS:
            return {...state, comments: action.comments};

        case actionTypes.SEARCH_GOOGLE_BOOKS:
            return {...state, googleBooksList: action.googleBooks};
        case actionTypes.FETCH_REQUESTED_BOOKS:
            return {...state, requestedBooksList: action.requestedBooks};
        case actionTypes.REQUEST_GOOGLE_BOOKS:
            return {...state, requestBookError: false, requestBookLoading: true, requestBookSuccess: false};
        case actionTypes.REQUEST_GOOGLE_BOOKS_SUCCESS:
            return {...state, requestBookError: false, requestBookLoading: false, requestBookSuccess: true};
        case actionTypes.REQUEST_GOOGLE_BOOKS_ERROR:
            return {...state, requestBookError: true, requestBookLoading: false, requestBookSuccess: false};

        case actionTypes.PURCHASE_BOOKS:
            return {...state, purchaseBookError: false, purchaseBookLoading: true, purchaseBookSuccess: false};
        case actionTypes.PURCHASE_BOOKS_SUCCESS:
            return {...state, purchaseBookError: false, purchaseBookLoading: false, purchaseBookSuccess: true};
        case actionTypes.PURCHASE_BOOKS_ERROR:
            return {...state, purchaseBookError: true, purchaseBookLoading: false, purchaseBookSuccess: false};
        default:
            return state;
    }
};

export default bookReducer;