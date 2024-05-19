import { storeState } from "./store.constants";

export const initialState = {
    userDetails: []
};

export const updateUserDetails = (state = initialState, action) => {
    const {
        type,
        payload,
    } = action;

    switch(type){
        case storeState.SAVE_USER_DETAILS:
            return { ...payload }
        case storeState.REMOVE_SAVE_USER_DETAILS:
            return { ...payload }
        default:
            return {...state}
    }
}