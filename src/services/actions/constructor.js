export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    payload: ingredient
});

export const removeIngredient = (uid) => ({
    type: REMOVE_INGREDIENT,
    payload: uid
});

export const moveIngredient = (dragIndex, hoverIndex) => ({
    type: MOVE_INGREDIENT,
    payload: { dragIndex, hoverIndex }
});