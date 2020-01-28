import React, {Fragment} from 'react';
import View from './view';

import Moduleon from "../utils/moduleon/moduleon";
import ModuleColumn from '../utils/moduleon/moduleColumn';
import TestModule from './../modules/testModule';
import TestModule2 from './../modules/testModule2';

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
                    <div className="col-12">
                        <h1>{this.props.label ? this.props.label : "Dashboard"}</h1>
                    </div>
                </div>
                <div className="row">
                    <Moduleon>
                        <ModuleColumn colspan="8">
                            <TestModule id="a" onRaiseToModal={(data) => this.raiseToModal(data)}></TestModule>
                            <TestModule2 id="b"></TestModule2>
                            <TestModule id="dsa2"></TestModule>
                            <TestModule2 id="dss9d"></TestModule2>
                            <TestModule id="ddaaasd2"></TestModule>
                            <TestModule2 id="d9ddasdd"></TestModule2>
                        </ModuleColumn>
                        <ModuleColumn colspan="4">
                            <TestModule id="d2"></TestModule>
                            <TestModule2 id="d9d"></TestModule2>
                            <TestModule id="ddasd2"></TestModule>
                            <TestModule2 id="d9asdd"></TestModule2>
                            <TestModule id="dasd2"></TestModule>
                            <TestModule2 id="dw9d"></TestModule2>
                            <TestModule id="dw2"></TestModule>
                            <TestModule2 id="dw9d"></TestModule2>
                        </ModuleColumn>
                    </Moduleon>
                </div>
            </Fragment>
        );
    }
}

export default DashboardView;