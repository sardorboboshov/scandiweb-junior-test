import React, { Component } from "react";
import { client } from "../../store/client";
import PricePage from "./PricePage";
import circle_icon from "../../components/images/circle_icon.svg";
import { Title, ProductListStyles, Div, StyledLink } from "./PLPstyles";

import {
  mapStateToPropsForProducts,
  mapDispatchToProps,
} from "../../store/Maps";

import { connect } from "react-redux";

import { gql } from "@apollo/client";
import Card from "./PLPstyles";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      networkStatus: 7,
      error: "",
    };
  }

  async componentDidMount() {
    if (!this.state.isLoaded) {
      try {
        const response = await client.query({
          query: gql`
          query Category{
            category(input: { title: "${this.props.categoryName}" }) {
              name
              products {
                id
                name
                description
                inStock
                attributes {
                    name
                  }
                prices {
                  currency
                  amount
                }
                gallery
              }
            }
          }
        `,
        });
        this.setState({
          data: response.data,
          isLoaded: true,
          networkStatus: response.networkStatus,
        });
      } catch (err) {
        this.setState({
          error: err,
        });
      }
    }
  }
  render() {
    if (this.state.error) {
      return <p>Error...</p>;
    }
    if (!this.state.isLoaded) {
      return <p>Loading...</p>;
    }
    if (this.state.data.category) {
      const productsData = this.state.data.category;
      return (
        <Div>
          <Title>{productsData.name}</Title>
          <ProductListStyles>
            {productsData.products.map((product, idx) => (
              <Card
                key={idx}
                out_of_stock={product.inStock === false ? 1 : 0}
                nu_of_attributes={product.attributes.length === 0}
              >
                <StyledLink
                  to={`${this.props.categoryName}/${product.id}`}
                  out_of_stock={product.inStock === false ? 1 : 0}
                >
                  {product.inStock === true && (
                    <div className="image-container">
                      <img src={product.gallery[0]} alt="" />

                      {product.attributes.length === 0 && (
                        <img
                          className="circle_icon"
                          src={circle_icon}
                          alt=""
                          onClick={(e) => {
                            e.preventDefault();
                            this.props.add_to_cart({
                              id: product.id,
                              attributes: [],
                              prices: product.prices,
                            });
                          }}
                        />
                      )}
                    </div> 
                  )}
                  {product.inStock === false && (
                    <div className="wrap">
                      <img src={product.gallery[0]} alt="" />
                      <div className="content">OUT OF STOCK</div>
                    </div>
                  )}
                  <footer>
                    <Paragraph name={product.name} />
                    <PricePage prices={product.prices} />
                  </footer>
                </StyledLink>
              </Card>
            ))}
          </ProductListStyles>
        </Div>
      );
    }
  }
}
export default connect(mapStateToPropsForProducts, mapDispatchToProps)(Page);

class Paragraph extends Component {
  render() {
    return <div className="product--name">{this.props.name}</div>;
  }
}
