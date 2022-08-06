import { FETCH_USER_DETAILS } from '../action/index';

const user = {
    name: '',
    email: ''
}

export const user_details_reducer = (state = user, data) => {
    switch (data.type) {
        case FETCH_USER_DETAILS:
            return {
                name: data.payload.name,
                email: data.payload.email,
            }

        default:
            return state;
    }
}