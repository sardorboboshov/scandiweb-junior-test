import styled from "styled-components";

export const CartStyles = styled.div`
  margin: 3rem 4rem;
  .cart {
    font-weight: bold;
    font-size: 32px;
    text-transform: uppercase;
    color: var(--c-black);
    margin-top: 5rem;
    margin-bottom: 59px;
  }
  hr {
    background-color: #e5e5e5;
    height: 1px;
  }
  &:last-child {
    padding-bottom: 3rem;
  }
`;

export const CartProductStyles = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  gap: 2rem;
  .items--1 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    .brand {
      font-size: 30px;
      font-weight: 600;
    }
    .name {
      font-size: 30px;
    }
    .price {
      font-weight: bold;
      font-size: 24px;
    }
  }
  .items--2 {
    display: flex;
    justify-content: space-between;
    align-items: center;

    flex-direction: row;
    gap: 12px;
    .items--2-1 {
      display: flex;
      justify-content: space-between;
      height: 100%;
      align-items: center;
      flex-direction: column;

      .count {
        font-weight: 600;
        font-size: 24px;
      }
      .crement {
        cursor: pointer;
        img {
          display: block;
        }
      }
    }

    .img {
      img {
        width: 200px;
      }
    }
    .container {
      display: flex;
      position: relative;
      align-items: center;
      text-align: center;

      img {
        display: block;
        width: 200px;
      }
      .chevron {
        position: absolute;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        font-size: 36px;
        div {
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
