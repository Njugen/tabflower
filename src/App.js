import React, { Fragment, Component } from 'react';

/* Import Error Boundary */

import ErrorBoundary from './components/utils/errorBoundary';

/* Import Modals */

import CalendarDateSettingsModal from "./components/modals/calendarDateSettingsModal";
import ConfirmationModal from "./components/modals/confirmationModal";

import ETGMLaunchGroupsModal from './components/modals/existingTabGroupsModule/etgmLaunchGroupsModal';
import ETGMRemoveGroupsModal from './components/modals/existingTabGroupsModule/etgmRemoveGroupsModal';
import ETGMCreateOrEditGroupModal from './components/modals/existingTabGroupsModule/etgmCreateOrEditGroupModal';

import COTMRemoveUnresponsiveTabsModal from './components/modals/currentlyOpenedTabsModule/cotmRemoveUnresponsiveTabsModal';
import COTMRemoveWindowModal from './components/modals/currentlyOpenedTabsModule/cotmRemoveWindowModal';
import COTMRemoveTabModal from './components/modals/currentlyOpenedTabsModule/cotmRemoveTabModal';

import ErrorOverlay from './components/modals/errorOverlay';

/* Import Routes */
import RouteList from './components/routes/routeList';

/* Import Sidebars */
import MainSidebar from './components/sidebars/mainSidebar/mainSidebar';

/* Import Utilities */
import FullWidthLoadbar from './components/utils/fullWidthLoadbar';

/* Import Footer */
import ViewFooter from './components/views/components/viewFooter';

/* Import Form Utils */
import TBCheckBox from './components/utils/form/tbCheckbox';

/* Import CSS generated by create-react-app */
import './styles/react-generated/App.css';

/* Import Tabeon app specific CSS */
import './styles/tabeon/style.css';
import { ReactDOM } from 'react-dom';


class App extends Component{
  state = {
    currentView: {},
    routes: [],
    modal: {},
    mainSidebar: {},
    refreshFactor: 0
  };

 
  updateState = (newProps, showLoadbar, callback) => {
    /* 
      Used to update the App state itself. This function works the same way as this.setState(), 
      but also increases the refreshFactor (the FullWidthLoadbar uses this to determine whether to launch the loadbar
        or not)
    */
    let newState = {
      ...newProps
    }

    if(showLoadbar && showLoadbar === true){
      let { refreshFactor } = this.state;
      refreshFactor++;

      newState.refreshFactor = refreshFactor;
    }

    this.setState(newState, callback);
  }
  
  handleNavigation = (viewProps) => {

    this.updateState(
      {
        currentView: viewProps
      },
      true
    )
  }

  handleMainSidebarClick = (sidebarProps) => {
    this.updateState(
      {
        mainSidebar: sidebarProps,
      
      },
      false
    )
  }

  modalHandler = (data) => {
    console.log("BATMAN", data);
    if(data.clear && data.clear === true){
      this.clearModal();
    } else {
      this.launchModal(data);
    }
  }

  errorOverlayHandler = (data) => {
    console.log("BATMAN2", data);
    if(data.clear && data.clear === true){
      this.clearModal();
    } else {
      this.launchModal(data);
    }
  }

  launchModal = (data) => {
    const modal = {
      launched: true,
      ...data
    }

    this.setState({
      modal
    });
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
    console.log("MMMM", this.state.modal);
    return (
      <Fragment>
        <ErrorBoundary>
        {(modalLaunched && modalId === "confirm-action") && <ConfirmationModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></ConfirmationModal>}
        {(modalLaunched && modalId === "date-settings") && <CalendarDateSettingsModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></CalendarDateSettingsModal>}
        {(modalLaunched && modalId === "etgmlaunchgroupsmodal") && <ETGMLaunchGroupsModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></ETGMLaunchGroupsModal>}
        {(modalLaunched && modalId === "etgmremovegroupsmodal") && <ETGMRemoveGroupsModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></ETGMRemoveGroupsModal>}
        {(modalLaunched && modalId === "etgmcreateoreditgroupmodal") && <ETGMCreateOrEditGroupModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></ETGMCreateOrEditGroupModal>}
        {(modalLaunched && modalId === "cotmremoveunresponsivetabsmodal") && <COTMRemoveUnresponsiveTabsModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></COTMRemoveUnresponsiveTabsModal>}
        {(modalLaunched && modalId === "cotmremovewindowmodal") && <COTMRemoveWindowModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></COTMRemoveWindowModal>}
        {(modalLaunched && modalId === "cotmremovetabmodal") && <COTMRemoveTabModal data={this.state.modal} onRaiseToErrorOverlay={(data) => this.errorOverlayHandler(data)} onDismiss={() => this.clearModal()}></COTMRemoveTabModal>}
        {(modalLaunched && modalId === "erroroverlay") && <ErrorOverlay data={this.state.modal} onSave={() => ""} onDismiss={() => this.clearModal()}></ErrorOverlay>}
        </ErrorBoundary>
        <div className="container-fluid">
          <div className="row">
            <MainSidebar routes={this.state.routes} onMainSidebarClick={(data) => this.handleMainSidebarClick(data)} />
            <div className="col-md-10 py-2" id="tabeon-view-container">
                <RouteList onRaisedRoutesInfo={(data) => this.handleRouteListReady(data)} onRaiseToModal={(data) => this.modalHandler(data)} onNavigation={(data) => this.handleNavigation(data)} />
                <ViewFooter />
            </div>
          </div>
          
        </div>
        <FullWidthLoadbar refreshFactor={this.state.refreshFactor} />
      </Fragment>
    );
  }

}

export default App;
