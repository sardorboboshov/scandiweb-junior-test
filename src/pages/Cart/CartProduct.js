import React, { Component } from "react";
import { client } from "../../store/client";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  mapStateToPropsForProducts,
  mapDispatchToProps,
} from "../../store/Maps";
import { AttributeStyles, ItemsCart } from "../PDP/PDPStyles";
import { gql } from "@apollo/client";

import { connect } from "react-redux";
import { CartProductStyles } from "./CartStyles";
import { getNumberOfCurrency } from "../../store/functions";
import cart_plus from "../../components/images/cart_plus.svg";
import cart_minus from "../../components/images/cart_minus.svg";
export class CartProduct extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      data: [],
      isLoaded: false,
      error: "",
      img_number: 0,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      try {
        const response = await client.query({
          query: gql`
                query Product {
                  product(id: "${this.props.item.id}") {
                    name
                    id
                    category
                    gallery
                    inStock
                    description
                    brand
                    attributes {
                      name
                      type
                      items {
                        displayValue
                        value
                      }
                    }
                    prices {
                      currency {
                        label
                      }
                      amount
                    }
                    
                  }
                }
              `,
        });
        this._isMounted &&
          this.setState({
            data: response.data.product,
            isLoaded: true,
          });
      } catch (err) {
        this.setState({
          error: err,
        });
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (this.state.error) {
      return <p>Error...</p>;
    }
    if (!this.state.isLoaded) {
      return <p>Loading...</p>;
    }
    if (this.state.data) {
      return (
        <>
          <hr />

          <CartProductStyles>
            <div className="items--1">
              <div className="brand">{this.state.data.brand}</div>
              <div className="name">{this.state.data.name}</div>
              <div className="price">
                {getSymbolFromCurrency(this.props.currency)}
                {
                  this.state.data.prices[
                    getNumberOfCurrency(this.props.currency)
                  ].amount
                }
              </div>

              {this.state.data.attributes.map((attribute, s_idx) => {
                return (
                  <AttributeStyles key={s_idx}>
                    <div className="attribute">
                      <div className="attribute__name">{attribute.name}:</div>
                      <ItemsCart>
                        {attribute.items.map((item, idx) => {
                          if (attribute.type === "swatch") {
                            return (
                              <div
                                className={
                                  attribute.items[idx].displayValue ===
                                  this.props.cartItems[this.props.f_idx]
                                    .attributes[attribute.name]
                                    ? "item__swatch item__swatch__active"
                                    : "item__swatch"
                                }
                                style={{ backgroundColor: item.value }}
                                key={idx}
                              >
                                {attribute.items[idx].displayValue ===
                                  this.props.cartItems[this.props.f_idx]
                                    .attributes[attribute.name] && "SELECTED"}
                              </div>
                            );
                          }

                          return (
                            <div
                              className={
                                attribute.items[idx].displayValue ===
                                this.props.cartItems[this.props.f_idx]
                                  .attributes[attribute.name]
                                  ? "item item__active"
                                  : "item"
                              }
                              key={idx}
                            >
                              {item.value}
                            </div>
                          );
                        })}
                      </ItemsCart>
                    </div>
                  </AttributeStyles>
                );
              })}
            </div>
            <div className="items--2">
              <div className="items--2-1">
                <div
                  className="crement"
                  onClick={async () => {
                    await this.props.increment_pr({
                      id: this.state.data.id,
                      attributes: this.props.cartItems[this.props.f_idx]
                        .attributes,
                    });
                  }}
                >
                  <img src={cart_plus} alt="" />
                </div>
                <div className="count">
                  {this.props.cartItems[this.props.f_idx].count}
                </div>
                <div
                  className="crement"
                  onClick={async () => {
                    await this.props.decrement_pr({
                      id: this.state.data.id,
                      attributes: this.props.cartItems[this.props.f_idx]
                        .attributes,
                    });
                  }}
                >
                  <img src={cart_minus} alt="" />
                </div>
              </div>
              {this.state.data.gallery.length > 1 ? (
                <div className="container">
                  <img
                    src={this.state.data.gallery[this.state.img_number]}
                    alt=" "
                  />
                  <div className="chevron">
                    <div
                      className="left"
                      onClick={() =>
                        this.setState((prevState) => ({
                          img_number:
                            (prevState.img_number -
                              1 +
                              this.state.data.gallery.length) %
                            this.state.data.gallery.length,
                        }))
                      }
                    >
                      {"<"}
                    </div>
                    <div
                      className="right"
                      onClick={() =>
                        this.setState((prevState) => ({
                          img_number:
                            (prevState.img_number + 1) %
                            this.state.data.gallery.length,
                        }))
                      }
                    >
                      {">"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="img">
                  <img src={this.state.data.gallery[0]} alt="not found" />
                </div>
              )}
            </div>
          </CartProductStyles>
        </>
      );
    }
  }
}

export default connect(
  mapStateToPropsForProducts,
  mapDispatchToProps
)(CartProduct);
