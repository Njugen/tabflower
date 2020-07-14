import React, { Component } from "react";
import * as validator from "../../utils/inputValidators";

export default class FooterWrapper extends Component {
  render() {
    const { Contents, data } = this.props;
    const { isFunction } = validator;

    return (
      <div className="modal-footer">
        {isFunction(Contents) && Contents(data)}
      </div>
    );
  }
}
