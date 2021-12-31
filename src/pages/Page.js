import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import { connect } from "react-redux";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import Card from "../components/UI/Card";

const getNumberOfCurrency = (str) => {
  if (str === "USD") {
    return 0;
  } else if (str === "GBP") {
    return 1;
  } else if (str === "AUD") {
    return 2;
  } else if (str === "JPY") {
    return 3;
  } else if (str === "RUB") {
    return 4;
  }
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});
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
    try {
      const response = await client.query({
        query: gql`
          query AllCategories {
            categories {
              name
              products {
                prices {
                  currency
                  amount
                }
                id
                name
                description
                inStock
                gallery
              }
            }
          }
        `,
      });
      this.setState({
        ...this.state,
        data: response.data,
        isLoaded: true,
        networkStatus: response.networkStatus,
      });
    } catch (err) {
      this.setState({
        ...this.state,
        error: err,
      });
    }
  }
  render() {
    let categoryName;
    const { categoryNumber } = this.props;
    if (categoryNumber === 0) {
      categoryName = "clothes";
    } else if (categoryNumber === 1) {
      categoryName = "tech";
    }
    if (this.state.error) {
      return <p>Error...</p>;
    }
    if (!this.state.isLoaded) {
      return <p>Loading...</p>;
    }
    if (this.state.data.categories) {
      const productsData = this.state.data.categories[categoryNumber];
      return (
        <ApolloProvider client={client}>
          <Div>
            <Title>{productsData.name}</Title>
            <ProductListStyles key={productsData.name}>
              {productsData.products.map((product) => (
                <StyledLink
                  to={`${categoryName}/${product.id}`}
                  key={product.name}
                >
                  <Card>
                    <img src={product.gallery[0]} alt="" />
                    <footer>
                      <p>{product.name}</p>
                      <h4>
                        {getSymbolFromCurrency(
                          localStorage.getItem("currency")
                        )}
                        {
                          product.prices[
                            getNumberOfCurrency(
                              localStorage.getItem("currency")
                            )
                          ].amount
                        }
                      </h4>
                      {product.inStock === true ? <p>yes</p> : <p>No</p>}
                    </footer>
                  </Card>
                </StyledLink>
              ))}
            </ProductListStyles>
          </Div>
        </ApolloProvider>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currency: localStorage.getItem("currency"),
    showCurrency: state.showCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_currency: (payload) =>
      dispatch({ type: "set_currency", payload: payload }),
    switch_show_currency: () => {
      dispatch({ type: "switch_show_currency" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

const Title = styled.div`
  font-size: 42px;
  font-weight: 400;
  text-transform: capitalize;
`;

const ProductListStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  margin: 2rem;
  p {
    display: flex;
    cursor: pointer;
  }
  .text {
    text-align: justify;
    width: 444px;
  }
  margin-bottom: 2rem;
`;

const Div = styled.div`
  margin: 3rem 3rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  color: inherit;
`;
