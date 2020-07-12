import React, { Component } from "react";
import TBTextInput from "../form/tbTextInput";
import * as validator from "../inputValidators";
import { ValidatorError, ErrorHandler } from "../exceptionsAndHandler";
import AppContext from "./../../contexts/AppContextProvider";

export default class UrlForm extends Component {
  static contextType = AppContext;

  sendToErrorOverlay = this.context.sendToErrorOverlay;

  state = {
    url: null,
  };

  handleChange = (id, value) => {
    try {
      const { isString } = validator;

      if (isString(id)) {
        if (isString(value)) {
          const url = value;
          this.setState({ url });
        } else {
          throw ValidatorError("windowsList-115");
        }
      } else {
        throw ValidatorError("windowsList-114");
      }
    } catch (err) {
      ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  render() {
    const { windowId, containerId, onRaiseNewUrl, onCancel, type } = this.props;

    const { url } = this.state;

    const primaryButtonFunction = () => {
      if (type === "tab") {
        return onRaiseNewUrl(url, windowId, () => {
          onCancel(containerId);
        });
      } else {
        return onRaiseNewUrl(url);
      }
    };

    const secondaryButtonFunction = () => {
      return type === "tab" ? onCancel(containerId) : onCancel();
    };

    const properties = {
      className: type === "tab" ? "addNewTabForm" : "addNewWindowForm",
      title:
        type === "tab"
          ? "Add new tab to Window " + (windowId + 1)
          : "Add New window",
      primaryButtonLabel: type === "tab" ? "Add tab to window" : "Add window",
    };

    const { className, title, primaryButtonLabel } = properties;

    return (
      <div className={className}>
        <h5>{title}</h5>
        <div className="col-12">
          <TBTextInput
            id="url"
            label="URL"
            value={url || "https://"}
            onChange={(id, value) => this.handleChange(id, value)}
          ></TBTextInput>
        </div>
        <div className="text-aligner p-3">
          <button
            className="btn btn-secondary"
            onClick={() => secondaryButtonFunction()}
          >
            Cancel
          </button>
          <button
            className="btn-tabeon btn"
            onClick={() => primaryButtonFunction()}
          >
            {primaryButtonLabel}
          </button>
        </div>
      </div>
    );
  }
}
