import React, { Component } from "react";
import getSymbolFromCurrency from "currency-symbol-map";

import { mapStateToPropsForProducts, mapDispatchToProps } from "../../store/Maps";

import { connect } from "react-redux";

import styled from "styled-components";

import { getNumberOfCurrency } from "../../store/functions";

class PriceProduct extends Component {
  render() {
    return (
      <PriceProductStyles>
        <div className="price">
          <div className="price__display-1">PRICE:</div>
          <div className="price__display-2">
            {getSymbolFromCurrency(this.props.currency)}
            {this.props.prices[getNumberOfCurrency(this.props.currency)].amount}
          </div>
        </div>
      </PriceProductStyles>
    );
  }
}

export default connect(
  mapStateToPropsForProducts,
  mapDispatchToProps
)(PriceProduct);

const PriceProductStyles = styled.div`
  .price {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .price__display-1 {
      font-weight: 700;
      font-size: 1.5rem;
    }
    .price__display-2 {
      font-weight: 700;
      font-size: 2rem;
    }
  }
`;
