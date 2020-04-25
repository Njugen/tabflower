import React, { Fragment, Component } from 'react';

/* Import Error Boundary */

import ErrorBoundary from './components/utils/errorBoundary';

/* Import Modals */

import CalendarDateSettingsModal from "./components/modals/calendarModule/calendarDateSettingsModal";
import ConfirmationModal from "./components/modals/calendarModule/confirmationModal";

import ETGMLaunchGroupModal from './components/modals/existingTabGroupsModule/etgmLaunchGroupModal';
import ETGMRemoveGroupModal from './components/modals/existingTabGroupsModule/etgmRemoveGroupModal';
import ETGMCreateOrEditGroupModal from './components/modals/existingTabGroupsModule/etgmCreateOrEditGroupModal';

import COTMRemoveUnresponsiveTabsModal from './components/modals/currentlyOpenedTabsModule/cotmRemoveUnresponsiveTabsModal';
import COTMRemoveWindowModal from './components/modals/currentlyOpenedTabsModule/cotmRemoveWindowModal';
import COTMRemoveTabModal from './components/modals/currentlyOpenedTabsModule/cotmRemoveTabModal';

import ErrorOverlay from './components/modals/errorOverlay';

/* Import Routes */
import RouteList from './components/routes/routeList';

/* Import Sidebars */
import MainNavBar from './components/sidebars/mainNavBar/mainNavBar';

/* Import Utilities */
import FullWidthLoadbar from './components/utils/fullWidthLoadbar';

/* Import Footer */
import ViewFooter from './components/views/components/viewFooter';

/* Import CSS generated by create-react-app */
import './styles/react-generated/App.css';

/* Import Tabeon app specific CSS */
import './styles/tabeon/style.css';

/* Import Tabeon */
import * as validator from './components/utils/inputValidators';

import * as ExceptionsHandler from './components/utils/exceptionsAndHandler';

class App extends Component{
  state = {
    currentView: {},
    routes: [],
    modal: {},
    errors: [],
    MainNavBar: {},
    refreshFactor: 0
  };

 
  updateState = (newProps, showLoadbar, callback) => {
    /* 
      Used to update the App state itself. This function works the same way as this.setState(), 
      but also increases the refreshFactor (the FullWidthLoadbar uses this to determine whether to launch the loadbar
        or not)
    */
    const { isObject, isArray, isFunction, isUndefined } = validator;
    
    try {
      if(isObject(newProps) && !isArray(newProps)){
        let newState = {
          ...newProps
        }

        if(showLoadbar && showLoadbar === true){
          let { refreshFactor } = this.state;
          refreshFactor++;

          newState.refreshFactor = refreshFactor;
        }

        if(isFunction(callback)){
          this.setState(newState, callback);
        } else if(isUndefined(callback)) {
          this.setState(newState);
        } else {
          throw ExceptionsHandler.ValidatorError("app-101");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("app-102");
      }
    } catch(err){
        this.launchErrorOverlay(err);
    }
  }

handleNavigation = (viewProps) => {
    const { isObject, isNumber } = validator;

    try {
      if(isObject(viewProps)){
        if(isObject(viewProps.viewData) && isObject(viewProps.metaData) && isNumber(viewProps.refreshFactor)){

          this.updateState(
            {
              currentView: viewProps
            },
            true
          )
        } else {
          throw ExceptionsHandler.ValidatorError("app-103");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("app-104");
      }
    } catch(err){
      this.launchErrorOverlay(err);
    }
  }


  handleNavigation = (viewProps) => {
    const { isObject, isNumber } = validator;

    try {
      if(isObject(viewProps)){
        if(isObject(viewProps.viewData) && isObject(viewProps.metaData) && isNumber(viewProps.refreshFactor)){

          this.updateState(
            {
              currentView: viewProps
            },
            true
          )
        } else {
          throw ExceptionsHandler.ValidatorError("app-103");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("app-104");
      }
    } catch(err){
      this.launchErrorOverlay(err);
    }
  }

  handleMainNavBarClick = (sidebarProps) => {
    this.updateState(
      {
        MainNavBar: sidebarProps,
      
      },
      false
    )
  }

  modalHandler = (data) => {
    
    if(data.clear && data.clear === true){
      this.clearModal();
    } else {
      this.launchModal(data);
    }
  }

  errorOverlayHandler = (data) => {
    
    if(data.clear && data.clear === true){
      this.clearModal();
    } else {
      this.launchErrorOverlay(data);
    }
  }

  launchErrorOverlay = (data) => {
    let errors = this.state.errors;
    errors.push(data);

    this.setState({
      errors
    }, () => {
      
    });
  }

  clearErrors = () => {
    const errors = [];
    
    this.setState({errors});
  }
 
  launchModal = (data) => {
    const modal = {
      launched: true,
      ...data
    }

    if(this.state.modal.launched !== true){
    this.setState({
      modal
    });
  }
  }

  clearModal = () => {
    const modal = {};
    
    setTimeout(() => {
      this.setState({ modal }); 
    }, 500)
    
  }
  
  handleRouteListReady = (data) => {
    const routes = data;

    this.setState({ routes });
  }
  

  render = () => {
    const { launched: modalLaunched, id: modalId } = this.state.modal;
    const { errors } = this.state;
    
    
    return (
      <Fragment>
        <ErrorBoundary>
          {(modalLaunched && modalId === "confirm-action") && <ConfirmationModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></ConfirmationModal>}
          {(modalLaunched && modalId === "date-settings") && <CalendarDateSettingsModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></CalendarDateSettingsModal>}
          {(modalLaunched && modalId === "etgmlaunchgroupmodal") && <ETGMLaunchGroupModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></ETGMLaunchGroupModal>}
          {(modalLaunched && modalId === "etgmremovegroupmodal") && <ETGMRemoveGroupModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></ETGMRemoveGroupModal>}
          {(modalLaunched && modalId === "etgmcreateoreditgroupmodal") && <ETGMCreateOrEditGroupModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></ETGMCreateOrEditGroupModal>}
          {(modalLaunched && modalId === "cotmremoveunresponsivetabsmodal") && <COTMRemoveUnresponsiveTabsModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></COTMRemoveUnresponsiveTabsModal>}
          {(modalLaunched && modalId === "cotmremovewindowmodal") && <COTMRemoveWindowModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></COTMRemoveWindowModal>}
          {(modalLaunched && modalId === "cotmremovetabmodal") && <COTMRemoveTabModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></COTMRemoveTabModal>}
          {errors.length > 0 && <ErrorOverlay data={errors} onSave={() => ""} onDismiss={() => this.clearErrors()}></ErrorOverlay>}
        
        <div className="container-fluid">
          <MainNavBar routes={this.state.routes} onMainNavBarClick={(data) => this.handleMainNavBarClick(data)} />
          <div className="row">
            <div className="col-md-12 py-2" id="tabeon-view-container">
                <RouteList onRaisedRoutesInfo={(data) => this.handleRouteListReady(data)} onRaiseToModal={(data) => this.modalHandler(data)} onNavigation={(data) => this.handleNavigation(data)} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} />
                <ViewFooter />
            </div>
          </div>
          
        </div>
        <FullWidthLoadbar refreshFactor={this.state.refreshFactor} />
        </ErrorBoundary>

      </Fragment>
    );
  }

}

export default App;
