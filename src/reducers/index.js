import {combineReducers} from "redux";
import bookReducer from "./books";
import authReducer from "./auth";
import movieReducer from "./movies";
import userReducer from "./users";
import reservationReducer from "./reservation";
import csvReducer from "./scrape";

export default combineReducers({
    books: bookReducer,
    auths: authReducer,
    movies: movieReducer,
    users: userReducer,
    reservations: reservationReducer,
    csv: csvReducer
});