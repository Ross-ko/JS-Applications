import {get, post, put, del} from './request.js';

const endpoints = {
    dashboard: '/data/characters?sortBy=_createdOn%20desc',
    characters: '/data/characters',
    charById: '/data/characters/'
};

export async function getAllChars(){
    return get(endpoints.dashboard);
}

export async function getCharById(id) {
    return get(endpoints.charById + id);
}

export async function addCharacter(category, imageUrl, description, moreInfo) {
    return post(endpoints.characters, {category, imageUrl, description, moreInfo});
}

export async function editChar(id, data) {
    return put(endpoints.charById + id, data);
}

export async function deleteChar(id){
    return del(endpoints.charById + id);
}