import React, { Fragment } from "react";
import View from './view';

import Moduleon from "../utils/moduleon/moduleon";
import ModuleColumn from '../utils/moduleon/moduleColumn';
import CurrentlyOpenedTabsModule from "../modules/currentlyOpenedTabs";
import ExistingTabGroupsModule from '../modules/existingTabGroups';
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class TabManagementView extends View {


   render = () => {
        return (
            <Fragment>
                <div className="row">
                    <Moduleon>
                        <ModuleColumn colspan="12">
                            <CurrentlyOpenedTabsModule id="active-tabs-module" onRaiseToModal={(data) => this.raiseToModal(data)}></CurrentlyOpenedTabsModule>
                            <ExistingTabGroupsModule id="existing-tab-groups-module" onRaiseToModal={(data) => this.raiseToModal(data)}></ExistingTabGroupsModule>
                        </ModuleColumn> 
                    </Moduleon>
                </div>
            </Fragment>
        );
   }
   
    
}

export default TabManagementView;