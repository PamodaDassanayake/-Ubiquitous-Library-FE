import * as actionTypes from "./actionTypes";
import axios from "axios";

import {server_ip, api} from '../server';
import {getToken} from '../utill/tokenService';

import moment from 'moment';

export const getMemberships = () => {
    return dispatch => {
        let url = server_ip + api + "/membership-types";
        axios
            .get(url)
            .then(response => {
                console.log(response.data);
                dispatch(
                    {
                        type: actionTypes.VIEW_MEMBERSHIPS,
                        memberships: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });

    }
};

export const setAccountType = (account) => {
    return dispatch => {
        let url = server_ip + api + "/authenticate";
        const token = Buffer.from(`${account.username}:${account.password}`, 'utf8').toString('base64');
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${token}`
                },
            })
            .then(response => {
                console.log(response.data);
                localStorage.setItem("username", account.username);
                localStorage.setItem("password", account.password);
                dispatch(
                    {
                        type: actionTypes.SET_ACCOUNT_TYPE,
                        account_type: response.data === 'admin' ? response.data : 'user'
                    }
                );
            }).catch(error => {
            console.log(error);
            dispatch(
                {
                    type: actionTypes.INVALID_LOGIN,
                    invalid_login: true
                }
            );
        });
    }
};

export const getAccountType = () => {
    return dispatch => {
        if (getToken() === null) {
            return;
        }
        let url = server_ip + api + "/authenticate";
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                console.log(response.data);
                getLoggedUser();
                dispatch(
                    {
                        type: actionTypes.SET_ACCOUNT_TYPE,
                        account_type: response.data === 'admin' ? response.data : 'user'
                    }
                );
            }).catch(error => {
            console.log(error);
        });

    }
};

export const getLoggedUser = () => {
    return dispatch => {
        if (getToken() === null) {
            return;
        }
        let url = server_ip + api + "/account";
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
                        type: actionTypes.SET_LOGGED_USER,
                        user: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });

    }
};

export const registerUser = (membershipType, userDetails) => {
    return dispatch => {
        let url = server_ip + api + `/register`;
        dispatch(
            {
                type: actionTypes.REGISTER_USER
            }
        );
        axios
            .post(url, userDetails)
            .then(response => {
                const userData = response.data;

                let validDate = moment(new Date()).add(1, 'Y');
                const membershipData = {
                    "membershipType": membershipType,
                    "paymentDate": moment(new Date()).format("YYYY-MM-DD"),
                    "userId": userData.id,
                    "validTill": validDate.format("YYYY-MM-DD")
                };
                url = server_ip + api + `/memberships`;
                const token = Buffer.from(`${userDetails.login}:${userDetails.password}`, 'utf8').toString('base64');
                axios
                    .post(url, membershipData, {
                        headers: {
                            'Authorization': `Basic ${token}`
                        },
                    })
                    .then(mResponse => {
                        console.log('membershipDetails : ' + mResponse.data);
                        dispatch(
                            {
                                type: actionTypes.REGISTER_USER_SUCCESS,
                                newUser: mResponse.data
                            }
                        );
                    }).catch(error => {
                    dispatch(
                        {
                            type: actionTypes.REGISTER_USER_FAIL,
                            payload: error.response.data
                        }
                    );
                    console.log(error);
                });

            }).catch(error => {
            dispatch(
                {
                    type: actionTypes.REGISTER_USER_FAIL,
                    payload: error.response.data
                }
            );
            console.log(error);
        });
    }
};

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        dispatch(
            {
                type: actionTypes.SET_ACCOUNT_TYPE,
                account_type: ''
            }
        );
    }
};

