import { createStore } from "redux";

import {
  add_to_cart_pr,
  increment_pr,
  decrement_pr,
  total_sum,
} from "../store/functions";

if (!localStorage.getItem("currency")) {
  localStorage.setItem("currency", "USD");
}

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", "[]");
}

const currency_localStorage = localStorage.getItem("currency");

const initialState = {
  currency: currency_localStorage,
  showCurrency: false,
  showOverlay: false,
  cartItems: JSON.parse(localStorage.getItem("cart")),
  total_price: total_sum(JSON.parse(localStorage.getItem("cart"))),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "switch_show_currency":
      return {
        showCurrency: !state.showCurrency,
      };
    case "close_currency":
      return {
        showCurrency: false,
      };
    case "set_currency":
      localStorage.setItem("currency", action.payload);
      return {
        showCurrency: false,
      };

    case "switch_show_overlay":
      return {
        showOverlay: !state.showOverlay,
      };

    case "close_overlay":
      return {
        showOverlay: false,
      };

    case "add_to_cart":
      localStorage.setItem(
        "cart",
        JSON.stringify(
          add_to_cart_pr(
            JSON.parse(localStorage.getItem("cart")),
            action.payload
          )
        )
      );

      return {
        cartItems: JSON.parse(localStorage.getItem("cart")),
      };

    case "increment_pr":
      localStorage.setItem(
        "cart",
        JSON.stringify(
          increment_pr(JSON.parse(localStorage.getItem("cart")), action.payload)
        )
      );
      return {
        ...state,
        cartItems: JSON.parse(localStorage.getItem("cart")),
      };
    case "decrement_pr":
      localStorage.setItem(
        "cart",
        JSON.stringify(
          decrement_pr(JSON.parse(localStorage.getItem("cart")), action.payload)
        )
      );

      return {
        ...state,
        cartItems: JSON.parse(localStorage.getItem("cart")),
      };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
