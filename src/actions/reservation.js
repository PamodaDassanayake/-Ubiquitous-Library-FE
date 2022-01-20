import * as actionTypes from "./actionTypes";
import axios from "axios";

import {server_ip, api} from '../server';
import {getToken} from '../utill/tokenService';

export const chekBookAvailability = (data) => {
    return dispatch => {
        let url = server_ip + api + `/library/check`;

        axios
            .post(url, data, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.CHECK_BOOK_AVAILABILITY,
                        bookAvailability: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
}

export const reserveBook = (data) => {
    return dispatch => {
        let url = server_ip + api + `/library/reserve`;
        dispatch(
            {
                type: actionTypes.RESERVE_BOOK
            },
            {
                type: actionTypes.PAYMENT
            }
        );
        axios
            .post(url, data, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                console.log(response.data)
                dispatch(
                    {
                        type: actionTypes.RESERVE_BOOK_SUCCESS,
                        reserveFee: response.data
                    },
                    {
                        type: actionTypes.PAYMENT_SUCCESS
                    }
                );
            }).catch(error => {
            console.log(error);
            dispatch(
                {
                    type: actionTypes.RESERVE_BOOK_FAIL,
                    payload: error.response
                },
                {
                    type: actionTypes.PAYMENT_FAIL
                }
            );
        });
    }
}

export const getAllBookReservations = () => {
    return dispatch => {
        let url = server_ip + api+ `/library/admin/reserved/books`;
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
                        type: actionTypes.GET_ALL_BOOK_RESERVATIONS_LIST,
                        bookReservationList: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const getAllVideoReservations = () => {
    return dispatch => {
        let url = server_ip + api+ `/library/admin/reserved/videos`;
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
                        type: actionTypes.GET_ALL_MOVIE_RESERVATIONS_LIST,
                        videoReservationList: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const getBooksReservationsByUser = () => {
    return dispatch => {
        let url = server_ip + api + `/library/reserved/books`;
        axios
            .post(url, null,{
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                console.log(response.data);
                dispatch(
                    {
                        type: actionTypes.GET_BOOKS_RESERVATIONS_LIST_BY_USER,
                        reservationList: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const getVideosReservationsByUser = () => {
    return dispatch => {
        let url = server_ip + api + `/library/reserved/videos`;
        axios
            .post(url, null,{
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                console.log(response.data);
                dispatch(
                    {
                        type: actionTypes.GET_VIDEOS_RESERVATIONS_LIST_BY_USER,
                        reservationList: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const settleBookPayment = (reserveId, fee) => {
    return dispatch => {
        let url = server_ip + api + `/library/pay/book/${reserveId}/${fee}`;
        dispatch(
            {
                type: actionTypes.PAYMENT
            }
        );
        axios
            .post(url, null,{
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.PAYMENT_SUCCESS
                    }
                );
            }).catch(error => {
            console.log(error);
            dispatch(
                {
                    type: actionTypes.PAYMENT_FAIL,
                    payload: error.response.data
                }
            );
        });
    }
};

export const settleMoviePayment = (reserveId, fee) => {
    return dispatch => {
        let url = server_ip + api + `/library/pay/movie/${reserveId}/${fee}`;
        dispatch(
            {
                type: actionTypes.PAYMENT
            }
        );
        axios
            .post(url, null,{
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.PAYMENT_SUCCESS
                    }
                );
            }).catch(error => {
            console.log(error);
            dispatch(
                {
                    type: actionTypes.PAYMENT_FAIL,
                    payload: error.response.data
                }
            );
        });
    }
};

