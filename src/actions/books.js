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
                // headers: {
                //     'Authorization': `Basic ${getToken()}`
                // },
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

export const getCommentsForBook = (bookId) => {
    const token = getToken();
    return dispatch => {
        let url = server_ip + api + `/comment/books/${bookId}`;
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${token}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.VIEW_COMMENTS,
                        comments: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const postCommentForBook = (details) => {
    const token = getToken();
    return dispatch => {
        let url = server_ip + api + `/comment/books`;
        axios
            .post(url, details, {
                headers: {
                    'Authorization': `Basic ${token}`
                },
            })
            .then(response => {
                console.log(response.data)
                dispatch(
                    {
                        type: actionTypes.POST_COMMENT
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const searchGoogleBooks = (bookName) => {
    return dispatch => {
        let url = server_ip + api + `/books/google?q=${bookName}`;
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                }
            })
            .then(response => {
                console.log('google books')
                console.log(response.data)
                dispatch(
                    {
                        type: actionTypes.SEARCH_GOOGLE_BOOKS,
                        googleBooks: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const requestGoogleBook = (book) => {
    return dispatch => {
        let url = server_ip + api + `/books/request`;
        dispatch(
            {
                type: actionTypes.REQUEST_GOOGLE_BOOKS,
            }
        );
        axios
            .put(url, book, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                }
            })
            .then(response => {
                console.log(response.data)
                if (response.data) {
                    dispatch(
                        {
                            type: actionTypes.REQUEST_GOOGLE_BOOKS_SUCCESS,
                        }
                    );
                } else {
                    dispatch(
                        {
                            type: actionTypes.REQUEST_GOOGLE_BOOKS_ERROR,
                        }
                    );
                }
            }).catch(error => {
            console.log(error);
            dispatch(
                {
                    type: actionTypes.REQUEST_GOOGLE_BOOKS_ERROR,
                }
            );
        });
    }
};

export const getRequestedBooks = () => {
    return dispatch => {
        let url = server_ip + api + `/books/requested`;
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                }
            })
            .then(response => {
                console.log(response.data)
                dispatch(
                    {
                        type: actionTypes.FETCH_REQUESTED_BOOKS,
                        requestedBooks: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const purchaseBook = (book) => {
    return dispatch => {
        let url = server_ip + api + `/books/requested/purchased`;
        dispatch(
            {
                type: actionTypes.PURCHASE_BOOKS,
            }
        );
        axios
            .post
            (url, book, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                }
            })
            .then(response => {
                console.log(response.data)
                if (response.data) {
                    dispatch(
                        {
                            type: actionTypes.PURCHASE_BOOKS_SUCCESS,
                        }
                    );
                } else {
                    dispatch(
                        {
                            type: actionTypes.PURCHASE_BOOKS_ERROR,
                        }
                    );
                }
            }).catch(error => {
            console.log(error);
            dispatch(
                {
                    type: actionTypes.PURCHASE_BOOKS_ERROR,
                }
            );
        });
    }
};

