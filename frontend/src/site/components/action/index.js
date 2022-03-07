export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_ALL = 'GET_ALL';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ALL_ITEM = 'DELETE_ALL_ITEM';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const TOTAL_AMOUNT = 'TOTAL_AMOUNT';
export function addToCart(payload) {
    return {
        type: 'ADD_TO_CART',
        payload
    }
}
export function getAllItem(payload) {
    return {
        type: 'GET_ALL',
        payload
    }
}
export function deleteItem(payload) {
    return {
        type: 'DELETE_ITEM',
        payload
    }
}
export function deleteAllItem(payload) {
    return {
        type: 'DELETE_ALL_ITEM',
        payload
    }
}
export function updateQuantity(payload) {
    return {
        type: 'UPDATE_QUANTITY',
        payload
    }
}

export function getTotalAmount(payload) {
    return {
        type: 'TOTAL_AMOUNT',
        payload
    }
}