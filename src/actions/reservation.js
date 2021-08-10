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
                        type: actionTypes.RESERVE_BOOK_SUCCESS
                    }
                );
            }).catch(error => {
            console.log(error);
            dispatch(
                {
                    type: actionTypes.RESERVE_BOOK_FAIL,
                    payload: error.response.data
                }
            );
        });
    }
}

export const getAllUserReservations = () => {
    return dispatch => {
        let url = server_ip + `/allUserReservations`;
        axios
            .get(url)
            .then(response => {
                console.log(response.data);
                dispatch(
                    {
                        type: actionTypes.GET_RESERVATIONS_LIST,
                        reservationList: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
}

export const getReservationsByUser = (userId) => {
    return dispatch => {
        let url = server_ip + `/userReservations`;
        axios
            .get(url)
            .then(response => {
                console.log(response.data);
                dispatch(
                    {
                        type: actionTypes.GET_RESERVATIONS_LIST_BY_USER,
                        reservationList: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
}

