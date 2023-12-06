import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: {
      prepare(product, quantity, comments, addOns, menu) {
        return {
          payload: {
            product,
            quantity,
            comments,
            addOns,
            menu,
            cartId: Date.now() + product.id,
          },
        };
      },

      reducer(state, action) {
        const prods = state.products.filter(
          (prod) => prod.product.id === action.payload.product.id,
        );

        const hasComments = prods.some((prod) =>
          prod.hasOwnProperty("comments"),
        );

        if (
          prods.length === 0 ||
          action.payload.addOns.length > 0 ||
          action.payload.comments ||
          hasComments ||
          action.payload.menu.length > 0
        ) {
          state.products = [...state.products, action.payload];
        } else {
          cartSlice.caseReducers.sumCartProduct(state, action);
        }
      },
    },
    removeProduct(state, action) {
      state.products = state.products.filter(
        (product) => product.cartId !== action.payload.cartId,
      );
    },
    updateCart: {
      prepare(cartId, quantity, comments, addOns, menu) {
        return {
          payload: {
            cartId,
            quantity,
            comments,
            addOns,
            menu,
          },
        };
      },

      reducer(state, action) {
        const { quantity, comments, cartId, addOns, menu } = action.payload;
        const index = state.products.findIndex(
          (prod) => prod.cartId === cartId,
        );

        if (index !== -1) {
          // Update the quantity of the existing product
          state.products[index].quantity = quantity;
          state.products[index].comments = comments;
          state.products[index].addOns = addOns;
          state.products[index].menu = menu;
        }
      },
    },
    sumCartProduct: {
      prepare(product, quantity, cartId) {
        return {
          payload: {
            product,
            quantity,
            cartId,
          },
        };
      },

      reducer(state, action) {
        const { product, quantity, cartId } = action.payload;
        const index = state.products.findIndex(
          (prod) => prod.cartId === cartId,
        );

        if (index !== -1) {
          // Update the quantity of the existing product
          state.products[index].quantity += quantity;
        }
      },
    },
  },
});

export const {
  setCart,
  removeProduct,
  updateCart,
  incrementCartProduct,
  decrementCartProduct,
  sumCartProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
