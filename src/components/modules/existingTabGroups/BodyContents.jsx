import React, { Component } from "react";
import AppContext from "../../contexts/AppContextProvider";
import * as validator from "../../utils/inputValidators";
import TabGroupItem from "../../utils/tabGroupItem";

require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

export default class BodyContents extends Component {
  static contextType = AppContext;

  sendToModal = this.context.sendToModal;

  renderTabGroups = (groups) => {
    groups = groups || [];
    const { ...props } = this.props;
    const { isPositiveNumber } = validator;
    console.log("EXISTING", this.props);
    if (isPositiveNumber(groups.length)) {
      return groups.map((group, i) => {
        return (
          <>
            <TabGroupItem info={group} key={"tg-" + i} {...props} />
          </>
        );
      });
    } else {
      return (
        <div className="no-tab-groups-msg">
          There are no saved tab groups at the moment. You may add a new tab
          group by clicking the "Create a new group" button below
        </div>
      );
    }
  };

  render() {
    const { tabgroups } = this.props;

    return (
      <>
        <div className="existing-tab-groups-module">
          <p>
            To keep the browser's tab bar from overflowing, Tab Flower lets you
            group windows and tabs together. You may create new tab groups at
            any time, and launch their tabs in a categorized manner later.
          </p>
          <div className="existing-tab-groups-list">
            {this.renderTabGroups(tabgroups)}
          </div>
        </div>
      </>
    );
  }
}
