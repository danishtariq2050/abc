import { SAVE_TO_CART } from '../action/index';

const cartValues = {
    totalQuantity: 0,
    totalPrice: 0,
    products: [],
}

export const addToCart_reducer = (state = cartValues, data) => {
    switch (data.type) {
        case SAVE_TO_CART:
            return {
                totalQuantity: state.totalQuantity + data.payload.totalQuantity,
                totalPrice: state.totalPrice + data.payload.totalPrice,
                products: state.products.concat(data.payload.product),
            }

        default:
            return state;
    }
}