export const FETCH_USER_DETAILS = "fetch_user";
export const FETCH_ADMIN_DETAILS = "fetch_admin";
export const SAVE_TO_CART = "add_to_cart";

export const user_details = (data) => {
    return {
        type: FETCH_USER_DETAILS,
        payload: data
    }
}

// export const admin_details = (data, yu) => {
export const admin_details = (data) => {
    return {
        type: FETCH_ADMIN_DETAILS,
        payload: data,
        // abc: 'xyz',
        // op: yu,
    }
}

export const addToCart = (data) => {
    return {
        type: SAVE_TO_CART,
        payload: data
    }
}