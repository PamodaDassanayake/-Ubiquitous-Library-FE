import * as actionTypes from "./actionTypes";
import axios from "axios";
import moment from 'moment';

import {server_ip, api} from '../server';
import {getToken} from '../utill/tokenService';

export const generateCsv = () => {
    return dispatch => {
        let url = server_ip + api + "/csv/generate";
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
};

export const saveCsv = (csvDetails) => {
    return dispatch => {
        let url = server_ip + api + `/csv/save`;
        axios
            .put(url, csvDetails, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.CSV_SAVE,
                        saveOne: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
}


export const loadCsv = () => {
    return dispatch => {
        let url = server_ip + api + `/csv/load`;
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.CSV_LOAD,
                        csv: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const startScrap = () => {
    return dispatch => {
        let url = server_ip + api + `/scrape/start`;
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.SCRAP_START
                    }
                );

            }).catch(error => {
            console.log(error);
        });
    }
};

export const getScrapStatus = () => {
    return dispatch => {
        let url = server_ip + api + `/scrape/status`;
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
                        type: actionTypes.SCRAP_STATUS,
                        status: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};

export const getScrapResources = () => {
    return dispatch => {
        let url = server_ip + api + `/scrape`;
        axios
            .get(url, {
                headers: {
                    'Authorization': `Basic ${getToken()}`
                },
            })
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.GET_SCRAP,
                        payload: response.data
                    }
                );
            }).catch(error => {
            console.log(error);
        });
    }
};