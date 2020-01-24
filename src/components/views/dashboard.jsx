import React, {Fragment} from 'react';
import View from './view';

import Moduleon from "../utils/moduleon/moduleon";
import ModuleColumn from '../utils/moduleon/moduleColumn';
import TestModule from './../modules/testModule';
import TestModule2 from './../modules/testModule2';

class DashboardView extends View {
    render = () => {
     
        return(
            <Fragment>
                <div className="row">
                    <div className="col-12">
                        <h1>Dashboard</h1>
                    </div>
                </div>
                <div className="row">
                    <Moduleon>
                        <ModuleColumn colspan="8">
                            <TestModule id="a"></TestModule>
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