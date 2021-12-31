import React, { Component } from "react";

export default class ProductPage extends Component {
  render() {
    const { productId } = this.props.match.params;
    const categoryProduct = this.props.match.params[0];
    return (
      <>
        {console.log(categoryProduct)}
        <p>Product detail page</p>
        <p>Product id: {productId}</p>
      </>
    );
  }
}
