import { Component } from "react";
import * as validator from "../../../utils/inputValidators";

export default class HeaderContents extends Component {
  headerTitle = () => {
    const { isObject, isString } = validator;
    const { data } = this.props;

    if (isObject(data)) {
      const { params } = data;

      if (isObject(params)) {
        const { groupId, groupName } = params || {};
        let newGroupName = groupName;

        if (
          !isString(groupName) ||
          (isString(groupName) && groupName.length === 0)
        )
          newGroupName = "unknown";

        return !groupId
          ? "Confirm Removal of All Tabs"
          : 'Confirm removal of the "' + newGroupName + '" tab group';
      }
    } else {
    }
  };

  render() {
    return this.headerTitle();
  }
}
