import React, { Component } from "react";
import { NavLink} from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.svg";
import cart from "../images/cart.svg";
import CurrencyList from "./CurrencyList";
import getSymbolFromCurrency from "currency-symbol-map";
import down_vector from "../images/down_vector.svg";
import up_vector from "../images/up_vector.svg";

import { connect } from "react-redux";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrency: false,
      currency: "USD",
    };
    this.switch_show_currencyHandler = this.switch_show_currencyHandler.bind(
      this
    );
  }
  switch_show_currencyHandler() {
    this.props.switch_show_currency();
  }

  render() {
    const vector = this.props.showCurrency === true ? up_vector : down_vector;
    return (
      <>
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
          <div className="cart">
            <img src={cart} alt="logo" />
            <button onClick={() => this.switch_show_currencyHandler()}>
              <div>
                {getSymbolFromCurrency(localStorage.getItem("currency"))}
              </div>
              <img src={vector} alt="logo" />
            </button>
            {this.props.showCurrency && <CurrencyList />}
          </div>
        </Navigation>
        {/* <Outlet /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: localStorage.getItem("currency"),
    showCurrency: state.showCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_currency: (payload) =>
      dispatch({ type: "set_currency", payload: payload }),
    switch_show_currency: () => {
      dispatch({ type: "switch_show_currency" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const Navigation = styled.header`
  a {
    color: inherit;
    text-decoration: none;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  .items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(50% + 41px);
  }
  .items-1 {
    display: flex;

    justify-content: space-between;
    align-items: center;
  }
  .logo,
  .cart img {
    &:hover {
      cursor: pointer;
    }
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .cart {
    display: flex;
    flex-direction: row-reverse;
    button {
      all: unset;
      display: flex;
      align-items: center;
      div {
        font-weight: 700;
        color: var(--c-black);
      }
    }
    button:hover {
      cursor: pointer;
    }
  }

  .link {
    text-decoration-style: none;
    padding: 2rem 1rem;
    text-transform: uppercase;
    font-family: "Raleway";
    font-weight: 700;
    border: 2px solid transparent;
  }
  .active {
    color: var(--c-primary);
    box-sizing: content-box;
    border-bottom: 2px solid var(--c-primary);
    /* bottom: 2px; */
  }
`;
