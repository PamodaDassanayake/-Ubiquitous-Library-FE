import * as actionTypes from "./actionTypes";
import axios from "axios";

import {server_ip, api} from '../server';
import {getToken} from '../utill/tokenService';

export const getUsersList = () => {
    return dispatch => {
        let url = server_ip + api + "/admin/users";
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.VIEW_USERS_LIST,
                        users: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
}

export const getUserDetails = (userId) => {
    return dispatch => {
        let url = server_ip + `/users/${userId}`;
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
                        type: actionTypes.VIEW_USER_DETAILS_SUCCESS,
                        user: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const blockUser = (login) => {
    return dispatch => {
        let url = server_ip + api + `/admin/users/deactivate/${login}`;
        axios
            .put(url,'',{
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.BLOCK_USER
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const activeUser = (login) => {
    return dispatch => {
        let url = server_ip + api + `/admin/users/activate/${login}`;
        axios
            .put(url,'',{
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.BLOCK_USER
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

