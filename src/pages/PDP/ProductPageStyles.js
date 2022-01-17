import styled, { css } from "styled-components";
export const DescriptionWrapper = styled.div`
  margin: 3rem 4rem;
  margin-bottom: 5rem;
  display: flex;

  gap: 1rem;
  max-height: 600px;

  flex-wrap: wrap;

  /* design style for images that will display on the left side */
  .images {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: flex-start;
    img {
      max-width: 100px;
      max-height: 100px;
      width: auto;
      height: auto;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
        transition: all ease-in-out 0.5s;
      }
    }
  }

  /* design style for "big-image" that will display on the center of page */
  .big-image {
    img {
      max-width: 600px;
      max-height: 600px;
      width: auto;
      height: auto;
    }
  }

  /* design style for description */

  .description {
    left: 2rem;
    display: flex;
    flex-direction: column;
    margin-left: 3rem;
    align-self: stretch;
    gap: 2rem;

    .product__brand {
      font-weight: 600;
      font-size: 30px;
      color: var(--c-black);
    }

    .product__name {
      /* display: flex; */
      align-self: stretch;
      font-weight: 400;
      font-size: 30px;
      line-height: 27px;
      color: var(--c-black);
    }
    .attribute {
      .attribute__name {
        text-transform: uppercase;
        display: flex;
        font-style: normal;
        font-weight: bold;
        font-family: "Roboto Condensed";
        font-weight: 700;
        font-size: 18px;
        line-height: 18px;
        color: var(--c-black);
      }
      .items {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
        .item__swatch {
          width: 63px;
          height: 45px;
          display: flex;
          padding: 10px;
          border: 2px solid var(--c-black);
        }
        .item {
          width: 63px;
          height: 45px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid var(--c-black);
          font-family: "Source Sans Pro";
        }

        .item,
        .item__swatch {
          &:hover {
            transform: scale(1.1);
            transition: all 0.3s ease-in-out;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export const StyledLinkPr = styled.div`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  color: var(--c-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--c-primary);
  color: var(--c-white);
  text-transform: uppercase;

  ${({ notselected, out_of_stock }) =>
    (notselected || out_of_stock) &&
    css`
      pointer-events: none;
    `}
`;

export const Wrapper = styled.div`
  width: 20rem;
  ${({ notselected, out_of_stock }) =>
    notselected || out_of_stock
      ? css`
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;
        `}
`;

export const OneStyle = styled.div`
  &:last-child {
    padding-bottom: 3rem;
  }
`;

export const StyledDescription = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: var(--c-black);
  font-weight: 400;

  word-wrap: break-word;
  max-width: fit-content;
  font-family: "Roboto";
  * {
    font-family: "Roboto";
  }
`;
