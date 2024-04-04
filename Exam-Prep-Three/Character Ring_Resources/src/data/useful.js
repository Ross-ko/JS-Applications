import { del, get, post, put } from './request.js';

const endpoints = {
    useful: '/data/useful',
    likesForChar: (characterId) => `/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`,
    likesForUser: (characterId, userId) => `/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function isLiking(characterId) {
    await post(endpoints.useful, {characterId});
}

export async function getLikesForChar(characterId) {
    return get(endpoints.likesForChar(characterId));
}

export async function userLiking(characterId, userId){
    return get(endpoints.isLiking(characterId, userId));
}