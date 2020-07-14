import React, { Component, Fragment } from "react";
import * as validator from "../../../utils/inputValidators";

export default class BodyContents extends Component {
  render() {
    const { data } = this.props;
    const { isObject, isString, isUndefined } = validator;

    if (isUndefined(data))
      return "The information related to this message is missing. There is no contents to show.";
    if (!isObject(data))
      return "The information related to this message is invalid. The contents cannot be viewed.";
    if (isUndefined(data.params))
      return "The parameter(s) provided by the information container is missing. There is no contents to show.";

    if (!isObject(data.params))
      return "The parameter(s) provided by the information container is invalid. The contents cannot be viewed.";
    const { tabInfo } = data.params;

    if (isObject(tabInfo)) {
      const { title } = tabInfo;

      if (isString(title)) {
        return (
          <Fragment>
            <p>
              You are about to close the tab <strong>{title}</strong>. All
              ongoing activities will be interrupted and possibly lost.
            </p>
            <p>Are you sure you want to proceed?</p>
            <p className="small">
              You may reopen this tab through the browser's history feature
              (presuming you have it activated).
            </p>
          </Fragment>
        );
      } else {
        if (isUndefined(title)) {
          return "The targetted tab's title was not provided. Other info about the targetted tab might also be incorrect, therefore no contents nor settings can be modified at the moment";
        } else {
          return "The targetted tab's title was not provided in the correct manner. Other info about the targetted tab might also be incorrect, therefore no contents nor settings can be modified at the moment";
        }
      }
    } else {
      if (isUndefined(tabInfo)) {
        return "The information about the targetted tab is missing. There are no contents nor settings to modify.";
      } else {
        return "The information about the targetted tab was provided in wrong format. Its contents and settings cannot be shown.";
      }
    }
  }
}
