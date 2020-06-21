import React, { Fragment, Component } from "react";

/* Import Error Boundary */

import ErrorBoundary from "./components/utils/errorBoundary";

/* Import Modals */

import CalendarDateSettingsModal from "./components/modals/calendarModule/calendarDateSettingsModal";
import ConfirmationModal from "./components/modals/calendarModule/confirmationModal";

import ETGMLaunchGroupModal from "./components/modals/existingTabGroupsModule/etgmLaunchGroupModal";
import ETGMRemoveGroupModal from "./components/modals/existingTabGroupsModule/etgmRemoveGroupModal";
import ETGMCreateOrEditGroupModal from "./components/modals/existingTabGroupsModule/etgmCreateOrEditGroupModal";

import COTMRemoveUnresponsiveTabsModal from "./components/modals/currentlyOpenedTabsModule/cotmRemoveUnresponsiveTabsModal";
import COTMRemoveWindowModal from "./components/modals/currentlyOpenedTabsModule/cotmRemoveWindowModal";
import COTMRemoveTabModal from "./components/modals/currentlyOpenedTabsModule/cotmRemoveTabModal";

import ErrorOverlay from "./components/modals/errorOverlay";

/* Import Routes */
import RouteList from "./components/routes/routeList";

/* Import Sidebars */
import MainNavBar from "./components/sidebars/mainNavBar/mainNavBar";

/* Import Utilities */
import FullWidthLoadbar from "./components/utils/fullWidthLoadbar";

/* Import Footer */
import ViewFooter from "./components/views/components/viewFooter";

/* Import CSS generated by create-react-app */
import "./styles/react-generated/App.css";

/* Import Tabeon app specific CSS */
import "./styles/tabeon/style.css";

/* Import Tabeon */
import * as validator from "./components/utils/inputValidators";

import * as ExceptionsHandler from "./components/utils/exceptionsAndHandler";
import AppContext from "./components/contexts/AppContextProvider";

class App extends Component {
  static contextType = AppContext;

  state = {
    currentView: {},
    routes: [],
    modal: {},
    errors: [],
    MainNavBar: {},
    refreshFactor: 0,
  };

  updateState = (newProps, showLoadbar, callback) => {
    /* 
      Used to update the App state itself. This function works the same way as this.setState(), 
      but also increases the refreshFactor (the FullWidthLoadbar uses this to determine whether to launch the loadbar
        or not)
    */
    const { isObject, isFunction, isUndefined } = validator;

    try {
      if (isObject(newProps)) {
        let newState = {
          ...newProps,
        };

        if (showLoadbar && showLoadbar === true) {
          let { refreshFactor } = this.state;
          refreshFactor++;

          newState.refreshFactor = refreshFactor;
        }

        if (isFunction(callback)) {
          this.setState(newState, callback);
        } else if (isUndefined(callback)) {
          this.setState(newState);
        } else {
          throw ExceptionsHandler.ValidatorError("app-101");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("app-102");
      }
    } catch (err) {
      this.launchErrorOverlay(err);
    }
  };
  /*
  handleNavigation = (viewProps) => {
    const { isObject, isNumber } = validator;
    const { setValueToState, getValueFromState } = this.context;

    try {
      if (isObject(viewProps)) {
        if (
          isObject(viewProps.viewData) &&
          isObject(viewProps.metaData) &&
          isNumber(viewProps.refreshFactor)
        ) {
        
          this.updateState(
            {
              currentView: viewProps,
            },
            true
          ); 

          setValueToState("currentView", viewProps, true, () => {
            console.log("RR", getValueFromState("refreshFactor"));
          });
        } else {
          throw ExceptionsHandler.ValidatorError("app-103");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("app-104");
      }
    } catch (err) {
      this.launchErrorOverlay(err);
    }
  }; */

  handleMainNavBarClick = (sidebarProps) => {
    const { isObject, isNumber } = validator;

    try {
      if (isObject(sidebarProps)) {
        if (isNumber(sidebarProps.activeNavLinkKey)) {
          this.updateState(
            {
              MainNavBar: sidebarProps,
            },
            false
          );
        } else {
          throw ExceptionsHandler.ValidatorError("app-106");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("app-105");
      }
    } catch (err) {
      this.launchErrorOverlay(err);
    }
  };

  launchModal = (data) => {
    const { isObject, isFunction, isString } = validator;
    const { setValueToState } = this.context;

    try {
      if (isObject(data)) {
        if (
          isString(data.id) &&
          isFunction(data.action) &&
          isObject(data.params)
        ) {
          const modal = {
            launched: true,
            ...data,
          };

          /*
          this.setState({
            modal,
          }); */

          setValueToState("modal", modal);
        } else {
          throw ExceptionsHandler.ValidatorError("app-108");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("app-107");
      }
    } catch (err) {
      this.launchErrorOverlay(err);
    }
  };

  launchErrorOverlay = (data) => {
    const { isObject, isString } = validator;
    const { setValueToState, getValueFromState } = this.context;

    try {
      if (isObject(data)) {
        if (
          isString(data.code) &&
          isString(data.message) &&
          isString(data.name)
        ) {
          // let errors = this.state.errors;

          /*
          this.setState({
            errors,
          }); */
          console.log("BLA");
          let errors = getValueFromState("errors");
          errors.push(data);

          setValueToState("errors", errors);
        } else {
          throw ExceptionsHandler.ValidatorError("app-110");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("app-109");
      }
    } catch (err) {
      this.setState({
        errors: [data, err],
      });
    }
  };
  /*
  clearModal = () => {
    const modal = {};
    const { setValueToState } = this.context;

    setTimeout(() => {
      setValueToState("modal", modal);
    }, 500);
  }; */

  clearErrors = () => {
    const { setValueToState } = this.context;
    const errors = [];

    //this.setState({ errors });

    setValueToState("errors", errors);
  };

  /* handleRaisedRoutesInfo = (data) => {
    const { isNumber, isString, isArray, isObject } = validator;

    try {
      if (isArray(data) && data.length > 0) {
        const routes = data;
        let errors = 0;

        for (let i = 0; i < routes.length; i++) {
          if (isObject(routes[i])) {
            if (
              !isString(routes[i].label) ||
              !isString(routes[i].path) ||
              !isNumber(routes[i].key)
            ) {
              errors++;
            }
          } else {
            errors++;
          }
        }

        if (errors === 0) {
          this.setState({ routes });
        } else {
          throw ExceptionsHandler.ValidatorError("app-112");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("app-113");
      }
    } catch (err) {
      this.launchErrorOverlay(err);
    }
  };*/

  render = () => {
    const { getValueFromState } = this.context;
    const modalData = getValueFromState("modal");

    const { launched: modalLaunched, id: modalId } = modalData;
    const errors = getValueFromState("errors");
    const routes = getValueFromState("routes");

    console.log("REE", errors.length);
    return (
      <Fragment>
        <ErrorBoundary>
          {modalLaunched && modalId === "confirm-action" && (
            <ConfirmationModal
              data={modalData}
              onRaiseToErrorOverlay={(data) => this.launchErrorOverlay(data)}
              // onDismiss={() => this.clearModal()}
            ></ConfirmationModal>
          )}
          {modalLaunched && modalId === "date-settings" && (
            <CalendarDateSettingsModal
              data={modalData}
              onRaiseToErrorOverlay={(data) => this.launchErrorOverlay(data)}
              // onDismiss={() => this.clearModal()}
            ></CalendarDateSettingsModal>
          )}
          {modalLaunched && modalId === "etgmlaunchgroupmodal" && (
            <ETGMLaunchGroupModal
              data={modalData}
              onRaiseToErrorOverlay={(data) => this.launchErrorOverlay(data)}
              //  onDismiss={() => this.clearModal()}
            ></ETGMLaunchGroupModal>
          )}
          {modalLaunched && modalId === "etgmremovegroupmodal" && (
            <ETGMRemoveGroupModal
              data={modalData}
              onRaiseToErrorOverlay={(data) => this.launchErrorOverlay(data)}
              // onDismiss={() => this.clearModal()}
            ></ETGMRemoveGroupModal>
          )}
          {modalLaunched && modalId === "etgmcreateoreditgroupmodal" && (
            <ETGMCreateOrEditGroupModal
              data={modalData}
              onRaiseToErrorOverlay={(data) => this.launchErrorOverlay(data)}
              // onDismiss={() => this.clearModal()}
            ></ETGMCreateOrEditGroupModal>
          )}
          {modalLaunched && modalId === "cotmremoveunresponsivetabsmodal" && (
            <COTMRemoveUnresponsiveTabsModal
              data={modalData}
              onRaiseToErrorOverlay={(data) => this.launchErrorOverlay(data)}
              // onDismiss={() => this.clearModal()}
            ></COTMRemoveUnresponsiveTabsModal>
          )}
          {modalLaunched && modalId === "cotmremovewindowmodal" && (
            <COTMRemoveWindowModal
              data={modalData}
              onRaiseToErrorOverlay={(data) => this.launchErrorOverlay(data)}
              // onDismiss={() => this.clearModal()}
            ></COTMRemoveWindowModal>
          )}
          {modalLaunched && modalId === "cotmremovetabmodal" && (
            <COTMRemoveTabModal
              data={modalData}
              onRaiseToErrorOverlay={(data) => this.launchErrorOverlay(data)}
              // onDismiss={() => this.clearModal()}
            ></COTMRemoveTabModal>
          )}
          {errors.length > 0 && (
            <ErrorOverlay
              data={errors}
              onSave={() => ""}
              onDismiss={() => this.clearErrors()}
            ></ErrorOverlay>
          )}

          <div className="container-fluid">
            <MainNavBar
              routes={routes}
              onMainNavBarClick={(data) => this.handleMainNavBarClick(data)}
            />
            <div className="row">
              <div className="col-md-12 py-2" id="tabeon-view-container">
                <RouteList
                  /* onRaisedRoutesInfo={(data) =>
                    this.handleRaisedRoutesInfo(data)
                  } */
                  //onRaiseToModal={(data) => this.launchModal(data)}
                  //  onNavigation={(data) => this.handleNavigation(data)}
                  onRaiseToErrorOverlay={(data) =>
                    this.launchErrorOverlay(data)
                  }
                />
                <ViewFooter />
              </div>
            </div>
          </div>
          <FullWidthLoadbar
            refreshFactor={getValueFromState("refreshFactor")}
          />
        </ErrorBoundary>
      </Fragment>
    );
  };
}

export default App;
