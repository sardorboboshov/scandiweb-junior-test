import React, { Component } from "react";

import {
  mapStateToPropsForProducts,
  mapDispatchToProps,
} from "../../store/Maps";
import { connect } from "react-redux";
import { BackdropStyles } from "./ModalStyles";
class Backdrop extends Component {
  render() {
    return <BackdropStyles onClick={this.props.close_overlay} />;
  }
}

export default connect(
  mapStateToPropsForProducts,
  mapDispatchToProps
)(Backdrop);
