import { del, get, post, put } from './request.js';

const endpoints = {
    market: '/data/cyberpunk?sortBy=_createdOn%20desc',
    cyberware: '/data/cyberpunk',
    cyberwareById: '/data/cyberpunk/'
};

export async function getAllCyberware() {
    return get(endpoints.market);
}

export async function getCyberwareById(id){
    return get(endpoints.cyberwareById + id);
}

export async function addCyberware(item, imageUrl, price, availability, type, description) {
    return post(endpoints.cyberware, {item, imageUrl, price, availability, type, description});
}

export async function updateCyberware(id, data) {
    return put(endpoints.cyberwareById + id, data);
}

export async function deleteCyberware(id) {
    return del(endpoints.cyberwareById + id);
}