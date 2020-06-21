import React, { Component, createContext } from "react";
import * as validator from "../utils/inputValidators";

const AppContext = createContext(true);

export class AppContextProvider extends Component {
  state = {
    currentView: {},
    routes: [],
    modal: {},
    errors: [],
    MainNavBar: {},
    refreshFactor: 0,
  };

  setValueToState = (key, value, refresh, callback) => {
    const { isFunction } = validator;

    this.setState(
      {
        [key]: value,
        refreshFactor: refresh && this.state.refreshFactor + 1,
      },
      () => {
        isFunction(callback) && callback(this.state);
      }
    );
  };

  getValueFromState = (key) => {
    return this.state[key];
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setValueToState: this.setValueToState,
          getValueFromState: this.getValueFromState,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
