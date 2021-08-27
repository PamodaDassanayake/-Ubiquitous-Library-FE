import * as actionTypes from "./actionTypes";
import axios from "axios";

import {server_ip, api} from '../server';
import {getToken} from '../utill/tokenService';

export const addBook = (book) => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.ADD_NEW_BOOK
            }
        );
        let url = server_ip + api + "/books";
        axios
            .post(url, book, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                console.log(response.data);
                dispatch(
                    {
                        type: actionTypes.ADD_NEW_BOOK_SUCCESS
                    }
                );
            }).catch(error => {
            dispatch(
                {
                    type: actionTypes.ADD_NEW_BOOK_FAIL,
                    payload: error.response.data
                }
            );
            console.log(error);
        });
    }
};

export const getBooksList = () => {
    return dispatch => {
        let url = server_ip + api + "/books/books";
        axios
            .get(url)
            .then(response => {
                console.log(response)
                dispatch(
                    {
                        type: actionTypes.VIEW_BOOK_LIST,
                        books: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const getBookDetails = (booksId) => {
    return dispatch => {
        let url = server_ip + api + `/books/${booksId}`;
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                console.log(response.data);
                dispatch(
                    {
                        type: actionTypes.VIEW_BOOK_DETAILS_SUCCESS,
                        book: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const searchBooks = (title, author) => {
    return dispatch => {
        let url = server_ip + api + `/books/search`;
        const params = {
            title: title,
            author: author
        };
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
                params
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.SEARCH_BOOKS,
                        books: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

