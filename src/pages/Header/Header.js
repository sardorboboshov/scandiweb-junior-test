import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import { Navigation } from "./HeaderStyles";
import {
  mapStateToPropsForProducts,
  mapDispatchToProps,
} from "../../store/Maps";
import logo from "../../components/images/logo.svg";
import cart from "../../components/images/cart.svg";

import getSymbolFromCurrency from "currency-symbol-map";
import down_vector from "../../components/images/down_vector.svg";
import up_vector from "../../components/images/up_vector.svg";

import styled from "styled-components";

import { connect } from "react-redux";

class Header extends Component {
  set_currencyHandler(currency) {
    this.props.set_currency(currency);
  }

  render() {
    const vector = this.props.showCurrency === true ? up_vector : down_vector;
    const currencies = ["USD", "GBP", "AUD", "JPY", "RUB"];
    return (
      <Navigation>
        <div className="items">
          <div className="items-1">
            <NavLink
              to="/all"
              className={(navData) =>
                navData.isActive ? "link active" : "link"
              }
            >
              all
            </NavLink>
            <NavLink
              to="/tech"
              className={(navData) =>
                navData.isActive ? "link active" : "link"
              }
            >
              tech
            </NavLink>
            <NavLink
              to="/clothes"
              className={(navData) =>
                navData.isActive ? "link active" : "link"
              }
            >
              clothes
            </NavLink>
          </div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <ul className="cart dropwdown">
          <li className="wrapper--cart--currency">
            <div
              className="wrapper--basket"
              onClick={(e) => {
                e.stopPropagation();
                this.props.close_currency();
                this.props.switch_show_overlay();
              }}
            >
              <img className="basket" src={cart} alt="logo" />
              {this.props.number_of_products > 0 && (
                <span className="header__basketcount">
                  {this.props.number_of_products}
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                this.props.switch_show_currency();
              }}
            >
              <div>{(this.props.currency.symbol)}</div>
              <img src={vector} alt="logo" className="vector" />
            </button>
          </li>
          <li>
            <ul>
              {this.props.showCurrency && (
                <CurrencyWrapper>
                  <Currency>
                    {currencies.map((currency, idx) => (
                      <li
                        onClick={() => this.set_currencyHandler(currency)}
                        key={idx}
                      >
                        {getSymbolFromCurrency(currency)} {currency}
                      </li>
                    ))}
                  </Currency>
                </CurrencyWrapper>
              )}
            </ul>
          </li>
        </ul>
      </Navigation>
    );
  }
}

export default connect(mapStateToPropsForProducts, mapDispatchToProps)(Header);

const Currency = styled.div`
  position: absolute;
  padding: 1rem;

  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  max-width: 114px;
  z-index: 50;
  li {
    align-self: center;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;

    font-weight: 600;
    font-size: 1rem;
    color: var(--c-black);
  }
  cursor: pointer;
`;

const CurrencyWrapper = styled.div`
  display: flex;
  z-index: 50;
  flex-direction: row-reverse;
`;
