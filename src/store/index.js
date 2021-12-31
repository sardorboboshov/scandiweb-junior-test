import { createStore } from "redux";

const currency_localStorage = localStorage.getItem("currency") || "USD";
const initialState = {
  currency: currency_localStorage,
  showCurrency: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === "switch_show_currency") {
    return {
      ...state,
      showCurrency: !state.showCurrency,
    };
  }

  if (action.type === "set_currency") {
    localStorage.setItem("currency", action.payload);
    return {
      ...state,
      currency: action.payload,
      showCurrency: false,
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
