import { Component } from "react";
import * as validator from "../../../utils/inputValidators";

export default class HeaderContents extends Component {
  determineTitle = () => {
    const { isObject } = validator;
    const { data } = this.props;

    if (isObject(data)) {
      const { params } = data;

      if (isObject(params)) {
        const { type, groupName } = params;

        if (type === "currently-opened" || type === "new-group") {
          return "Create a New Tab Group";
        } else if (type === "existing-group") {
          return 'Edit the "' + (groupName || "") + '" tab group';
        }
      } else {
        return "Data parameters are missing";
      }
    } else {
      return "Data section is missing in component props";
    }
  };

  render() {
    return this.determineTitle();
  }
}
