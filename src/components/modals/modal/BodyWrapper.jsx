import React, { Component } from "react";
import * as validator from "../../utils/inputValidators";

export default class BodyWrapper extends Component {
  render() {
    const { Contents, data } = this.props;
    const { isFunction } = validator;

    return (
      <div className="modal-body">{isFunction(Contents) && Contents(data)}</div>
    );
  }
}
