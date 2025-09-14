export const ADD_DETAILS = 'ADD_DETAILS';
export const REMOVE_DETAILS = 'REMOVE_DETAILS';

export const addDetails = (ingredient) => ({
    type: ADD_DETAILS,
    payload: ingredient
});

export const removeDetails = () => ({
    type: REMOVE_DETAILS,
});