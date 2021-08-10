import * as actionTypes from "./actionTypes";
import axios from "axios";

import {server_ip, api} from '../server';
import {getToken} from '../utill/tokenService';

export const addMovie = (movie) => {
    return dispatch => {
        let url = server_ip + api + "/videos/videos";
        dispatch(
            {
                type: actionTypes.ADD_NEW_MOVIE
            }
        );
        axios
            .post(url, movie, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.ADD_NEW_MOVIE_SUCCESS
                    }
                );
            }).catch(error => {
            console.log(error);
            dispatch(
                {
                    type: actionTypes.ADD_NEW_MOVIE_FAIL,
                    payload: error.response.data
                }
            );
        });
    }
};

export const getMoviesList = () => {
    return dispatch => {
        let url = server_ip + api + "/videos/videos";
        axios
            .get(url)
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.VIEW_MOVIES_LIST,
                        movies: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
}

export const getMovieDetails = (movieId) => {
    return dispatch => {
        let url = server_ip + api + `/videos/${movieId}`;
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                console.log(response.data)
                dispatch(
                    {
                        type: actionTypes.VIEW_MOVIE_DETAILS_SUCCESS,
                        movie: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
}