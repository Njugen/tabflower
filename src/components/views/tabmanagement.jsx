import React, {Fragment} from 'react';
import View from './view';

import Moduleon from "../utils/moduleon/moduleon";
import ModuleColumn from '../utils/moduleon/moduleColumn';
import ActiveTabsModule from './../modules/activeTabs';

class TabManagementView extends View {

    render = () => {

        return(
            <Fragment>
                
                <div className="row">
                    <Moduleon>
                        <ModuleColumn colspan="12">
                            <ActiveTabsModule id="active-tabs-module" onRaiseToModal={(data) => this.raiseToModal(data)}></ActiveTabsModule>
                        </ModuleColumn>
                        
                    </Moduleon>
                </div>
            </Fragment>
        );
    }
}

export default TabManagementView;