import React, { Component, Fragment } from "react";

export default class BodyContents extends Component {
  render() {
    return (
      <Fragment>
        <p>
          Closing this window will also close all its tabs. All ongoing
          activities on these web pages will be interrupted and possibly lost.
        </p>
        <p>Are you sure you want to proceed?</p>
        <p className="small">
          You may reopen the window with all its tabs intact from the browser's
          history feature (presuming you have it activated).
        </p>
      </Fragment>
    );
  }
}
