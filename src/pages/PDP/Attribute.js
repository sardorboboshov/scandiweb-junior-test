import React, { Component } from "react";

import { AttributeStyles, Items } from "./PDPStyles";
export class Attribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sel_value: "",
    };
  }
  render() {
    return (
      <AttributeStyles>
        <div className="attribute">
          <div className="attribute__name">{this.props.attribute.name}:</div>

          <Items>
            {this.props.attribute.items.map((item, idx) => {
              if (this.props.attribute.type === "swatch") {
                return (
                  <div
                    className={
                      this.state.sel_value === item.displayValue
                        ? "item__swatch item__swatch__active"
                        : "item__swatch"
                    }
                    style={{ backgroundColor: item.value }}
                    key={idx}
                    onClick={() => {
                      this.setState({ sel_value: item.displayValue });
                      this.props.clickHandler(this.props.attribute, item);
                    }}
                  >
                    {this.state.sel_value === item.displayValue && "SELECTED"}
                  </div>
                );
              }
              return (
                <div
                  className={
                    this.state.sel_value === item.displayValue
                      ? "item item__active"
                      : "item"
                  }
                  key={idx}
                  onClick={() => {
                    this.setState({ sel_value: item.displayValue });
                    this.props.clickHandler(this.props.attribute, item);
                  }}
                >
                  {item.value}
                </div>
              );
            })}
          </Items>
        </div>
      </AttributeStyles>
    );
  }
}

export default Attribute;
