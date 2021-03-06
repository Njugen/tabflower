import React, { Component } from "react";
import AppContext from "../../contexts/AppContextProvider";

import WindowsList from "./../../utils/windowsList";

require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

export default class BodyContents extends Component {
  static contextType = AppContext;

  sendToModal = this.context.sendToModal;

  render() {
    const { ...props } = this.props;
    return (
      <>
        <p>
          Tab Flower offers you an oversight over all opened tabs, making it
          easier to remove tabs and windows you seldom use. You may also scan
          for unresponsive websites and remove them.
        </p>

        <WindowsList
          canCloseItems={true}
          initialShowTabs={true}
          initialTabStyle="horizontal"
          {...props}
        />
      </>
    );
  }
}
