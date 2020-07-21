import { Component } from "react";
import * as validator from "../../../utils/inputValidators";
import { ValidatorError } from "./../../../utils/exceptionsAndHandler";

export default class HeaderContents extends Component {
  determineTitle = () => {
    const { isObject, isString } = validator;
    const { data } = this.props;

    const defaultTitle = 'Confirm removal of "unknown" tab group';

    if (!isObject(data)) return defaultTitle;
    const { params } = data;

    if (!isObject(params)) return defaultTitle;

    const { groupId, groupName } = params || {};

    let newGroupName = groupName;

    if (!isString(groupName) || (isString(groupName) && groupName.length === 0))
      newGroupName = "unknown";

    return !isString(groupId)
      ? "Confirm Removal of All Tabs"
      : 'Confirm removal of the "' + newGroupName + '" tab group';
  };

  verifyProps = () => {
    const { data } = this.props;
    const { isObject, isString, isUndefined } = validator;

    if (!isObject(data)) throw ValidatorError("ETGMRemoveGroupsModal-h1");

    if (isObject(data)) {
      const { params } = data;

      if (!isObject(params)) throw ValidatorError("ETGMRemoveGroupsModal-h2");

      const { groupName } = params;

      // If there is a groupName variable, it has to be a string (groupName is optional)
      if (!isUndefined(groupName) && !isString(groupName))
        throw ValidatorError("ETGMRemoveGroupsModal-h3");
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
