import React, { Component, createContext } from "react";
import * as validator from "../utils/inputValidators";

const AppContext = createContext(true);

export class AppContextProvider extends Component {
  state = {
    //NOT NEEDED ANYMORE  currentView: {},
    routes: [],
    modal: {},
    errors: [],
    //   MainNavBar: {},
    refreshFactor: 0,
  };

  setValueToState = (key, value, refresh, callback) => {
    const { isFunction } = validator;

    let inputState = {
      [key]: value,
    };

    if (refresh && refresh === true) {
      inputState.refreshFactor = this.state.refreshFactor + 1;
    }

    this.setState(inputState, () => {
      isFunction(callback) && callback(this.state);
    });
  };

  getValueFromState = (key) => {
    return this.state[key];
  };

  launchModal = (data) => {
    const modal = {
      //  launched: true,
      ...data,
    };
    this.setValueToState("modal", modal);
  };

  launchErrorOverlay = (data) => {
    let errors = this.getValueFromState("errors");
    errors.push(data);

    this.setValueToState("errors", errors);
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setValueToState: this.setValueToState,
          getValueFromState: this.getValueFromState,
          launchModal: this.launchModal,
          launchErrorOverlay: this.launchErrorOverlay,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
