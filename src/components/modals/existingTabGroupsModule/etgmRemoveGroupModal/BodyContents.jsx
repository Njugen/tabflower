import React, { Component, Fragment } from "react";
import * as validator from "../../../utils/inputValidators";

export default class BodyContents extends Component {
  render() {
    const { isObject } = validator;
    const { data } = this.props;

    if (!isObject(data)) return "ETGMRemoveGroupsModal-105";
    const { params } = data;

    if (!isObject(params)) return "ETGMRemoveGroupsModal-104";
    const { groupId, groupName } = params;

    return (
      <Fragment>
        {!groupId && (
          <p>
            Are you sure you want to remove all existing groups? You will lose
            all saved windows and tabs. This cannot be undone.
          </p>
        )}
        {groupId && (
          <p>
            Are you sure you want to remove the tab group{" "}
            {groupName ? <strong>{groupName}</strong> : ""}? You will lose all
            windows and tabs saved in it. This cannot be undone.
          </p>
        )}
      </Fragment>
    );
  }
}
