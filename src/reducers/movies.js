import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: false,
    loading: false,
    success: false,
    moviesList: [],
    movie: [],
    movieSubmitError: false,
    movieSubmitErrorMessage: '',
    movieSubmitSuccess: false,
    movieSubmitLoading: false,
    comments: []
};


const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_MOVIE:
            return {...state, movieSubmitError: false, movieSubmitLoading: true, movieSubmitSuccess: false};
        case actionTypes.ADD_NEW_MOVIE_SUCCESS:
            return {...state, movieSubmitError: false, movieSubmitLoading: false, movieSubmitSuccess: true};
        case actionTypes.ADD_NEW_BOOK_FAIL:
            return {
                ...state,
                movieSubmitError: true,
                movieSubmitLoading: false,
                movieSubmitSuccess: false,
                movieSubmitErrorMessage: action.payload
            };
        case actionTypes.VIEW_MOVIE_DETAILS_SUCCESS:
            return {...state, movie: action.movie};
        case actionTypes.VIEW_MOVIES_LIST:
            return {...state, moviesList: action.movies};
        case actionTypes.VIEW_COMMENTS:
            return {...state, comments: action.comments};
        case actionTypes.SEARCH_MOVIES:
            return {...state, moviesList: action.movies};
        default:
            return state;
    }
};

export default movieReducer;