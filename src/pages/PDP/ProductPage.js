import React, { Component } from "react";
import PriceProduct from "./PriceProduct";
import Attribute from "./Attribute";
import { client } from "../../store/client";
import {
  DescriptionWrapper,
  StyledLinkPr,
  Wrapper,
  OneStyle,
  StyledDescription,
} from "./ProductPageStyles";
import { gql } from "@apollo/client";
import {
  mapStateToPropsForProducts,
  mapDispatchToProps,
} from "../../store/Maps";
import { connect } from "react-redux";
import { getLengthOfObject } from "../../store/functions";

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoaded: false,
      error: "",
      active_img: "",
      selectedAttributes: {},
    };
  }

  async componentDidMount() {
    if (!this.state.isLoaded) {
      try {
        const response = await client.query({
          query: gql`
              query Product {
                product(id: "${this.props.match.params.productId}") {
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
                    currency
                    amount
                  }
                  
                }
              }
            `,
        });
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

  render() {
    const clickHandler = (attribute, item) => {
      this.setState((prevState) => {
        let selectedAttributes = {
          ...prevState.selectedAttributes,
        };
        selectedAttributes[`${attribute.name}`] = item.displayValue;
        return { selectedAttributes };
      });
    };

    if (this.state.error) {
      return <p>Error...</p>;
    }
    if (!this.state.isLoaded) {
      return <p>Loading...</p>;
    }
    if (this.state.data) {
      const selectedAllAttributes =
        getLengthOfObject(this.state.selectedAttributes) ===
        this.state.data.attributes.length;
      return (
        <div style={{ marginBottom: "3rem" }}>
          <DescriptionWrapper>
            {this.state.data.gallery.length > 1 && (
              <div className="images">
                {this.state.data.gallery.map((img, idx) => {
                  return (
                    <img
                      alt=""
                      src={img}
                      key={idx}
                      onClick={() => {
                        this.setState({ active_img: img });
                      }}
                    />
                  );
                  // }
                })}
              </div>
            )}
            <div className="big-image">
              <img
                src={this.state.active_img || this.state.data.gallery[0]}
                alt=""
              />
            </div>

            <OneStyle
              className="description"
              notselected={selectedAllAttributes === false ? 1 : 0}
            >
              <div className="product__brand">{this.state.data.brand}</div>
              <div className="product__name">{this.state.data.name}</div>
              {this.state.data.attributes.length > 0 &&
                this.state.data.attributes.map((attribute, idx) => {
                  return (
                    <Attribute
                      attribute={attribute}
                      key={idx}
                      clickHandler={clickHandler}
                    />
                  );
                })}
              <PriceProduct prices={this.state.data.prices} />
              <Wrapper
                notselected={selectedAllAttributes === false ? 1 : 0}
                out_of_stock={this.state.data.inStock === false ? 1 : 0}
              >
                <StyledLinkPr
                  notselected={selectedAllAttributes === false ? 1 : 0}
                  out_of_stock={this.state.data.inStock === false ? 1 : 0}
                  onClick={() =>
                    this.props.add_to_cart({
                      id: this.state.data.id,
                      attributes: this.state.selectedAttributes,
                      prices: this.state.data.prices,
                    })
                  }
                >
                  <div>add to cart</div>
                </StyledLinkPr>
              </Wrapper>
              <StyledDescription
                className="description--text"
                dangerouslySetInnerHTML={{
                  __html: this.state.data.description,
                }}
              ></StyledDescription>
            </OneStyle>
          </DescriptionWrapper>
        </div>
      );
    }
  }
}

export default connect(
  mapStateToPropsForProducts,
  mapDispatchToProps
)(ProductPage);
