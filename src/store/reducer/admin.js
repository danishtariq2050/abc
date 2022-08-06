import { FETCH_ADMIN_DETAILS } from '../action/index';

const admin = {
    name: '',
    email: ''
}

export const admin_details_reducer = (state = admin, data) => {
    switch (data.type) {
        case FETCH_ADMIN_DETAILS:
            return {
                name: data.payload.name,
                email: data.payload.email,
            }

        default:
            return state;
    }
}