import styled from "styled-components";

export const Navigation = styled.header`
  position: relative;

  a {
    color: inherit;
    text-decoration: none;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  .items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(50% + 41px);
  }
  .items-1 {
    display: flex;

    justify-content: space-between;
    align-items: center;
  }
  .wrapper--basket {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart .wrapper--cart--currency .wrapper--basket img {
    &:hover {
      cursor: pointer;
    }
    margin-left: 1rem;
    margin-right: 1rem;
  }

  ul li {
    list-style-type: none;
  }

  .wrapper--cart--currency {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
  }

  .dropdown {
    position: relative;
  }

  .dropdown--menu {
    position: relative;

    div {
      position: absolute;
      padding: 1rem;
      box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
      max-width: 114px;
      max-height: 169px;
      margin-right: auto;
      button {
        all: unset;
        font-weight: 600;
        font-size: 1rem;
        color: var(--c-black);
      }
      cursor: pointer;
    }
  }

  .vector {
    margin-left: 0.5rem;
    margin-right: 1rem;
  }

  .header__basketcount {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    top: -13px;
    right: 3px;
    width: 23px;
    height: 23px;
    background-color: black;
    color: white;
    border-radius: 50%;

    font-weight: 700;
    font-size: 14px;
    font-family: Roboto;
  }

  .cart {
    /* display: flex;
    flex-direction: row-reverse; */
    button {
      all: unset;
      display: flex;
      align-items: center;
      div {
        font-weight: 600;
        color: var(--c-black);
      }
    }
    button:hover {
      cursor: pointer;
    }
  }

  .link {
    text-decoration-style: none;
    padding: 2rem 1rem;
    text-transform: uppercase;
    font-family: "Raleway";
    font-weight: 700;
    border: 2px solid transparent;
  }
  .active {
    color: var(--c-primary);
    box-sizing: content-box;
    border-bottom: 2px solid var(--c-primary);
  }
`;
