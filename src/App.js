import React, { Component } from "react";
import Category from "./components/Routes/Routes";

import { mapStateToPropsForProducts, mapDispatchToProps } from "./store/Maps";
import { connect } from "react-redux";
import CartOverlay from "./pages/Modal/CartOverlay";

class App extends Component {
  render() {
    return (
      <div
        onClick={() => {
          this.props.close_currency();
          this.props.close_overlay();
        }}
      >
        <Category />
        <CartOverlay />
      </div>
    );
  }
}

export default connect(mapStateToPropsForProducts, mapDispatchToProps)(App);
