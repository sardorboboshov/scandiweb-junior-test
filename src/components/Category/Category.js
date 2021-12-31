import React, { Component } from "react";
import { Route } from "react-router-dom";
import AllPage from "../../pages/AllPage";
import Clothes from "../../pages/Clothes";
import Tech from "../../pages/Tech";
import Header from "./Header";
import ProductPage from "../../pages/ProductPage";

export default class Category extends Component {
  render() {
    return (
    
      <>
        <Route path="/" component={Header} />
        <Route exact path="/" component={AllPage} />
        <Route exact path="/all" component={AllPage} />
        <Route exact path="/clothes" component={Clothes} />
        <Route exact path="/tech" component={Tech} />
        <Route exact path="/*/:productId" component={ProductPage} />
        {/* <Route exact path="/tech/:productId" component={ProductPage} /> */}
      </>
     
    );
  }
}
