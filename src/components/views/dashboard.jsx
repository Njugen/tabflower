import React, {Fragment} from 'react';
import View from './view';

import Moduleon from "../utils/moduleon/moduleon";
import ModuleColumn from '../utils/moduleon/moduleColumn';
import BrowserStatusModule from '../modules/browserStatus';
import CurrentResourcesModule from './../modules/currentResources';

/*
    For information on how common processes for all views, this included, work
    check the comments in src/components/views/view.jsx
*/

/*
    The DashboardView

    This view represents and render the dashboard view. As of now, it
    runs the same basic features as any other views deriving from the View component.

    In the future, the dashboard will give the user a full oversight of what has happened
    in the Tabeon extension. These oversight will be divided into their own modules for easier
    browsing and checking information of interest.

    Contents will be movable with the help of the Moduleon Grid (work in progress), and the choices
    will be saved to the extension.
*/


class DashboardView extends View {

    render = () => {
        /*
            Render the Dashboard view by using JSX/HTML. There are no limitations and the view may look
            like anything. Only imagination sets the limit!
        */
        return(
            <Fragment>
                
                <div className="row">
                    <Moduleon>
                        <ModuleColumn colspan="6">
                            <BrowserStatusModule id="tabmanagement-module" onRaiseToModal={(data) => this.raiseToModal(data)}></BrowserStatusModule>
                        </ModuleColumn>
                        <ModuleColumn colspan="6">
                            <CurrentResourcesModule id="current-resource-module" onRaiseToModal={(data) => this.raiseToModal(data)}></CurrentResourcesModule>
                        </ModuleColumn>
                    </Moduleon>
                </div>
            </Fragment>
        );
    }
}

export default DashboardView;