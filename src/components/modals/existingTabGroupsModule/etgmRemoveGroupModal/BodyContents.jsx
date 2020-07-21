import React, { Component, Fragment } from "react";
import * as validator from "../../../utils/inputValidators";
import { ValidatorError } from "./../../../utils/exceptionsAndHandler";

export default class BodyContents extends Component {
  verifyProps = () => {
    const { data } = this.props;
    const { isObject } = validator;

    if (!isObject(data)) throw ValidatorError("ETGMRemoveGroupsModal-b1");

    const { params } = data;

    if (!isObject(params)) throw ValidatorError("ETGMRemoveGroupsModal-b2");
  };

  render() {
    const { isObject } = validator;
    const { data } = this.props;

    if (!isObject(data)) return "ETGMRemoveGroupsModal-b1";
    const { params } = data;

    if (!isObject(params)) return "ETGMRemoveGroupsModal-b2";
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
