import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AllPage from "../../pages/PLP/AllPage";
import Clothes from "../../pages/PLP/Clothes";
import Tech from "../../pages/PLP/Tech";
import Header from "../../pages/Header/Header";

import ProductPage from "../../pages/PDP/ProductPage";
import Cart from "../../pages/Cart/Cart";

export default class Category extends Component {
  render() {
    return (
      <>
        <Route path="/" component={Header} />
        <Route exact path="/all" component={AllPage} />
        <Route exact path="/">
          <Redirect to="/all" />
        </Route>

        <Route exact path="/clothes" component={Clothes} />
        <Route exact path="/tech" component={Tech} />
        <Route exact path="/*/:productId" component={ProductPage} />
        <Route exact path="/cart" component={Cart} />
      </>
    );
  }
}
