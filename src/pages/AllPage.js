import React, { Component } from "react";
import Page from "./Page";
export default class AllPage extends Component {
  render() {
    return (
      <>
        <Page categoryNumber={0} />
        <Page categoryNumber={1} />
      </>
    );
  }
}
