import { Component } from "react";
import * as validator from "../../../utils/inputValidators";
import { ValidatorError } from "./../../../utils/exceptionsAndHandler";

export default class HeaderContents extends Component {
  determineTitle = () => {
    const { isObject, isString } = validator;
    const { data } = this.props;
    const defaultTitle = "Confirm launch of this tab group";

    if (!isObject(data)) return defaultTitle;
    const { params } = data;

    if (!isObject(params)) return defaultTitle;
    const { groupName } = params;

    if (!isString(groupName)) return defaultTitle;

    return 'Confirm launch of tab group "' + groupName + '"';
  };

  verifyProps = () => {
    const { data } = this.props;
    const { isObject, isString, isUndefined } = validator;

    if (!isObject(data)) throw ValidatorError("ETGMLaunchGroupsModal-h1");

    if (isObject(data)) {
      const { params } = data;

      if (!isObject(params)) throw ValidatorError("ETGMLaunchGroupsModal-h2");

      const { groupName } = params;

      // If there is a groupName variable, it has to be a string (groupName is optional)
      if (!isUndefined(groupName) && !isString(groupName))
        throw ValidatorError("ETGMLaunchGroupsModal-h3");
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
