export const ADD_DETAILS = 'ADD_DETAILS';
export const REMOVE_DETAILS = 'REMOVE_DETAILS';

export type TIngredient = {
  _id: string;
  uid?: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export const addDetails = (ingredient: TIngredient): { type: typeof ADD_DETAILS; payload: TIngredient } => ({
    type: ADD_DETAILS,
    payload: ingredient
});

export const removeDetails = (): { type: typeof REMOVE_DETAILS } => ({
    type: REMOVE_DETAILS,
});