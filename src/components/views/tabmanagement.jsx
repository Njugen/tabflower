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
        try {
            const { isString } = validator;
            
            if(isString(obj)){
                if(obj === "refresh"){
                    let refreshFactor = this.state.refreshFactor;
                    refreshFactor++;

                    this.setState(
                        { refreshFactor },
                        () => {
                
                        }
                    )
                }
            } else {
                throw ValidatorError("tabManagement-view-101");
            }
            
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

   render = () => {
        return (
            <Fragment>
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <Moduleon>
                            
                        </Moduleon>
                    </div>    
                </div>
            </Fragment>
        );
   }
   
    
}

export default TabManagementView;