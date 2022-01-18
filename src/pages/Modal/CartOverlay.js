import React, { Component } from "react";
import CartProductOverlay from "./CartProductOverlay";
import { CartOverlayStyles } from "./ModalStyles";
import { NavLink } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  mapStateToPropsForProducts,
  mapDispatchToProps,
} from "../../store/Maps";
import { connect } from "react-redux";
import Modal from "./Modal";
export class CartOverlay extends Component {
  render() {
    return (
      <Modal>
        <CartOverlayStyles>
          <div className="intro">
            <div className="bag">my bag,</div>
            <div>{this.props.number_of_products} items</div>
          </div>
          {this.props.cartItems.map((item, f_idx) => {
            return (
              <div key={JSON.stringify(item.attributes)}>
                {item.count > 0 && (
                  <CartProductOverlay item={item} f_idx={f_idx} />
                )}
              </div>
            );
          })}
          <div className="total">
            <div className="total--text">Total</div>
            <div className="total--sum">
              {getSymbolFromCurrency(this.props.currency)}
              {this.props.total_price}
            </div>
          </div>
          <div className="buttons">
            <NavLink
              to="/cart"
              className="button view"
              onClick={this.props.close_overlay}
            >
              view bag
            </NavLink>

            <button className="button checkout">checkout</button>
          </div>
        </CartOverlayStyles>
      </Modal>
    );
  }
}

export default connect(
  mapStateToPropsForProducts,
  mapDispatchToProps
)(CartOverlay);
