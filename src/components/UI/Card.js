import styled from "styled-components";

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
  img {
    display: block;
    max-width: 354px;
    max-height: 330px;
    width: auto;
    height: auto;
    margin-bottom: 1rem;
  }

  .product--name {
    font-weight: 300;
    font-size: 1.5rem;
    color: var(--c-black);
  }

  .product--price {
    font-weight: 500;
    font-size: 1.5rem;
    color: var(--c-black);
  }
`;

export default Card;
