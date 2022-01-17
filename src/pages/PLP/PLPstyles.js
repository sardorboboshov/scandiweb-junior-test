import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
const Card = styled.article`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;

  .title {
    font-size: 42px;
    font-weight: 400;
    text-transform: capitalize;
  }

  .image-container {
    position: relative;
  }

  img {
    display: block;
    max-width: 354px;
    max-height: 330px;
    width: auto;
    height: auto;
    margin-bottom: 1rem;
  }
  .circle_icon {
    position: absolute;
    bottom: -0.5rem;
    right: 0.5rem;
  }

  .product--name {
    font-weight: 300;
    font-size: 1.5rem;
    color: var(--c-black);
  }

  .product--price {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 160%;
    color: #1d1f22;
  }

  .wrap {
    display: flex;
    position: relative;
    text-align: center;
  }

  .wrap img + .content {
    position: absolute;
    left: 25.42%;
    right: 25.71%;
    top: 44.24%;
    bottom: 43.94%;
    font-size: 1.2rem;
    font-weight: 600;
    color: #8d8f9a;
    line-height: 160%;
  }
  ${({ out_of_stock, nu_of_attributes }) =>
    !out_of_stock &&
    nu_of_attributes &&
    css`
      box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    `}
  ${({ out_of_stock }) =>
    out_of_stock &&
    css`
      img,
      .product--name,
      .product--price {
        opacity: 0.5;
      }
      img:hover {
        cursor: not-allowed;
        transform: none;
      }
      cursor: not-allowed;
    `}
`;

export default Card;

export const Title = styled.div`
  font-size: 42px;
  font-weight: 400;
  text-transform: capitalize;
`;

export const ProductListStyles = styled.div`
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

export const Div = styled.div`
  margin: 3rem 3rem;
  margin-top: 6rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  color: inherit;

  ${({ out_of_stock }) =>
    out_of_stock &&
    css`
      pointer-events: none;
    `}
`;
