import { clearUserData, getUserData } from '../util.js';
import { displayErrorMessage } from './errMsg.js';

const host = 'http://localhost:3030';

async function request(method, url, data){
    const options = {
        method,
        headers: {}
    };

    if(data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if(userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if(!response.ok) {
            if(response.status == 403){
                clearUserData();
            }
            const err = await response.json();
            throw new Error(err.message);
        }

        if(response.status == 204){
            return response;
        } else {
            return response.json();
        }

    } catch (err) {
        //TODO - Vij kak trqbva da izleze greshkata be, shamanduro!
        displayErrorMessage(err);
        throw err;
    }
}

export const get = (url) =>  request('get', url);
export const post = (url, data) =>  request('post', url, data);
export const put = (url, data) =>  request('put', url, data);
export const del = (url) =>  request('delete', url);