import { total_sum, measure_len } from "./functions";

export const mapStateToPropsForProducts = (state) => {
  return {
    currency: localStorage.getItem("currency"),
    showCurrency: state.showCurrency,
    showOverlay: state.showOverlay,
    number_of_products: JSON.parse(localStorage.getItem("cart"))
      ? measure_len(JSON.parse(localStorage.getItem("cart")))
      : 0,
    cartItems: JSON.parse(localStorage.getItem("cart")),
    total_price: JSON.parse(localStorage.getItem("cart"))
      ? total_sum(JSON.parse(localStorage.getItem("cart")))
      : 0,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    set_currency: (payload) =>
      dispatch({ type: "set_currency", payload: payload }),
    switch_show_currency: () => {
      dispatch({ type: "switch_show_currency" });
    },
    close_currency: () => {
      dispatch({ type: "close_currency" });
    },
    switch_show_overlay: () => {
      dispatch({ type: "switch_show_overlay" });
    },
    close_overlay: () => {
      dispatch({ type: "close_overlay" });
    },
    add_to_cart: (payload) => {
      dispatch({ type: "add_to_cart", payload: payload });
    },
    increment_pr: (payload) => {
      dispatch({ type: "increment_pr", payload: payload });
    },
    decrement_pr: (payload) => {
      dispatch({ type: "decrement_pr", payload: payload });
    },
  };
};
