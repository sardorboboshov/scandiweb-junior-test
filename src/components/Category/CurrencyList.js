import React, { Component } from "react";
import styled from "styled-components";
import getSymbolFromCurrency from "currency-symbol-map";

import { connect } from "react-redux";
class CurrencyList extends Component {
  constructor(props) {
    super(props);
    this.set_currencyHandler = this.set_currencyHandler.bind(this);
  }
  set_currencyHandler(currency) {
    this.props.set_currency(currency);
  }
  render() {
    const currencies = ["USD", "GBP", "AUD", "JPY", "RUB"];

    return (
      <Currency>
        {currencies.map((currency, idx) => (
          <button onClick={() => this.set_currencyHandler(currency)} key={idx}>
            {getSymbolFromCurrency(currency)} {currency}
          </button>
        ))}
      </Currency>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_currency: (payload) =>
      dispatch({ type: "set_currency", payload: payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);

const Currency = styled.div`
  margin-top: 0.5rem;
  padding: 1rem;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  button {
    all: unset;
    font-weight: 900;
    font-size: 1rem;
    color: var(--c-black);
  }
`;
