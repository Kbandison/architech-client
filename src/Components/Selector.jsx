import { createSelector } from "reselect";

const getCart = (state) => state.cart;

export const memorizedCart = createSelector([getCart], (cart) => cart);

export default memorizedCart;
