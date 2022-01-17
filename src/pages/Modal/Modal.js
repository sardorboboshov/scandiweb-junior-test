import React, { Component } from "react";
import reactDom from "react-dom";
import Backdrop from "./Backdrop";
import {
  mapStateToPropsForProducts,
  mapDispatchToProps,
} from "../../store/Maps";
import { connect } from "react-redux";
import { ModalOverlayStyles } from "./ModalStyles";

class ModalOverlay extends Component {
  render() {
    return <ModalOverlayStyles>{this.props.children}</ModalOverlayStyles>;
  }
}

const portalElement = document.getElementById("overlays");

class Modal extends Component {
  render() {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {this.props.showOverlay &&
          reactDom.createPortal(<Backdrop />, portalElement)}
        {this.props.showOverlay &&
          reactDom.createPortal(
            <ModalOverlay>{this.props.children}</ModalOverlay>,
            portalElement
          )}
      </div>
    );
  }
}
export default connect(mapStateToPropsForProducts, mapDispatchToProps)(Modal);
