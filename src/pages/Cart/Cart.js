import React, { Component } from "react";

import { connect } from "react-redux";
import { CartStyles } from "./CartStyles";
import {
  mapStateToPropsForProducts,
  mapDispatchToProps,
} from "../../store/Maps";
import CartProduct from "./CartProduct";

export class Cart extends Component {
  render() {
    return (
      <CartStyles>
        <div className="cart">cart</div>

        {this.props.cartItems.map((item, f_idx) => {
          return (
            <div key={f_idx}>
              {item.count > 0 && <CartProduct item={item} f_idx={f_idx} />}
            </div>
          );
        })}
      </CartStyles>
    );
  }
}

export default connect(mapStateToPropsForProducts, mapDispatchToProps)(Cart);
