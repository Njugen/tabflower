import { Component } from "react";
import * as validator from "../../../utils/inputValidators";
import { ValidatorError } from "./../../../utils/exceptionsAndHandler";

export default class HeaderContents extends Component {
  determineTitle = () => {
    const { isObject, isString } = validator;
    const { data } = this.props;

    if (isObject(data)) {
      const { params } = data;

      if (isObject(params)) {
        const { type, groupName } = params;

        if (type === "currently-opened" || type === "new-group") {
          return "Create a New Tab Group";
        } else if (type === "existing-group") {
          return (
            'Edit the "' +
            (isString(groupName) ? groupName : "") +
            '" tab group'
          );
        } else {
          return "Unidentifiable title [2]";
        }
      } else {
        return "Unidentifiable title [1]";
      }
    } else {
      return "Unidentifiable title [0]";
    }
  };

  verifyProps = () => {
    const { data } = this.props;
    const { isObject, isString, isUndefined } = validator;

    if (!isObject(data)) throw ValidatorError("ETGMCreateNewGroupModal-h1");

    if (isObject(data)) {
      const { params } = data;

      if (!isObject(params)) throw ValidatorError("ETGMCreateNewGroupModal-h2");

      const { groupName, type } = params;

      // If there is a groupName variable, it has to be a string (groupName is optional)
      if (!isUndefined(groupName) && !isString(groupName))
        throw ValidatorError("ETGMCreateNewGroupModal-h3");

      // If there is a type variable, it has to be a string (type is optional)
      if (!isUndefined(type) && !isString(type))
        throw ValidatorError("ETGMCreateNewGroupModal-h4");

      if (
        type !== "currently-opened" &&
        type !== "existing-group" &&
        type !== "new-group"
      )
        throw ValidatorError("ETGMCreateNewGroupModal-h5");
    }
  };
  componentDidUpdate = () => {
    this.verifyProps();
  };

  componentDidMount = () => {
    this.verifyProps();
  };
  render() {
    return this.determineTitle();
  }
}
