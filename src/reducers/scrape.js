import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: false,
    loading: false,
    success: false,
    csv: [],
    saveOne: '',
    scrapStatus: '',
    scrap: []
};


const csvReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CSV_LOAD:
            return {...state, csv: action.csv};
        case actionTypes.CSV_SAVE:
            return {...state, saveOne: action.saveOne};
        case actionTypes.SCRAP_STATUS:
            return {...state, scrapStatus: action.status};
        case actionTypes.GET_SCRAP:
            return {...state, scrap: action.payload};
        default:
            return state;
    }
};

export default csvReducer;
