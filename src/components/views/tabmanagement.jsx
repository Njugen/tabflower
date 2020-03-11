import React, { Fragment } from "react";
import View from './view';

import Moduleon from "../utils/moduleon/moduleon";
import ModuleColumn from '../utils/moduleon/moduleColumn';
import CurrentlyOpenedTabsModule from "../modules/currentlyOpenedTabs";
import ExistingTabGroupsModule from '../modules/existingTabGroups';
import { ValidatorError, ErrorHandler } from '../utils/exceptionsAndHandler';
import * as validator from '../utils/inputValidators'
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class TabManagementView extends View {

    handleRaisedData = (obj) => {
        console.log(obj);
        if(obj){
            if(typeof obj === "string"){
                if(obj === "refresh"){
                    const existingState = this.state;
                    let refreshFactor = this.state.refreshFactor;
                    refreshFactor++;
                    console.log("R", refreshFactor);
                    this.setState(
                        { refreshFactor },
                        () => {
                            console.log("MAR", this.state);
                        }
                    )
                }
            } else {

            }
        }
    }

   render = () => {
        return (
            <Fragment>
                <div className="row d-flex justify-content-center">
                    <div className="col-8">
                        <Moduleon>
                            <ModuleColumn colspan="12">
                                <CurrentlyOpenedTabsModule refresh={this.state.refreshFactor} onRaiseToView={(data) => this.handleRaisedData(data)} id="active-tabs-module" onRaiseToModal={(data) => this.raiseToModal(data)} onRaiseToErrorOverlay={(data) => this.raiseToErrorOverlay(data)}></CurrentlyOpenedTabsModule>
                                <ExistingTabGroupsModule id="existing-tab-groups-module" refresh={this.state.refreshFactor} onRaiseToView={(data) => this.handleRaisedData(data)} onRaiseToModal={(data) => this.raiseToModal(data)} onRaiseToErrorOverlay={(data) => this.raiseToErrorOverlay(data)}></ExistingTabGroupsModule>
                            </ModuleColumn> 
                        </Moduleon>
                    </div>    
                </div>
            </Fragment>
        );
   }
   
    
}

export default TabManagementView;