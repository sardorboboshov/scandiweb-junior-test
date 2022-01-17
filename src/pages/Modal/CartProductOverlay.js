import React, { Component } from "react";
import { client } from "../../store/client";
import { gql } from "@apollo/client";
import { connect } from "react-redux";
import getSymbolFromCurrency from "currency-symbol-map";
import { getNumberOfCurrency } from "../../store/functions";
import overlay_plus from "../../components/images/overlay_plus.svg";
import overlay_minus from "../../components/images/overlay_minus.svg";
import {
  mapStateToPropsForProducts,
  mapDispatchToProps,
} from "../../store/Maps";
import {
  AttributesOverlay,
  CartProductOverlayStyles,
  ItemsOverlay,
} from "./ModalStyles";

class CartProductOverlay extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      data: [],
      isLoaded: false,
      error: "",
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
        <CartProductOverlayStyles>
          <div className="items--1">
            <div className="brand">{this.state.data.brand}</div>
            <div className="name">{this.state.data.name}</div>
            <div className="price">
              {getSymbolFromCurrency(this.props.currency)}
              {
                this.state.data.prices[getNumberOfCurrency(this.props.currency)]
                  .amount
              }
            </div>

            {this.state.data.attributes.map((attribute, s_idx) => {
              return (
                <AttributesOverlay key={s_idx}>
                  <div className="attribute">
                    <div className="attribute__name">{attribute.name}:</div>
                    <ItemsOverlay>
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
                            />
                          );
                        }

                        return (
                          <div
                            className={
                              attribute.items[idx].displayValue ===
                              this.props.cartItems[this.props.f_idx].attributes[
                                attribute.name
                              ]
                                ? "item item__active"
                                : "item"
                            }
                            key={idx}
                          >
                            {item.value}
                          </div>
                        );
                      })}
                    </ItemsOverlay>
                  </div>
                </AttributesOverlay>
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
                <img src={overlay_plus} alt="" />
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
                <img src={overlay_minus} alt="" />
              </div>
            </div>
            <div className="img">
              <img src={this.state.data.gallery[0]} alt="" />
            </div>
          </div>
        </CartProductOverlayStyles>
      );
    }
  }
}

export default connect(
  mapStateToPropsForProducts,
  mapDispatchToProps
)(CartProductOverlay);
