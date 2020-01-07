import React from 'react';
import View from './view';

import ModuleRow from './../modules/moduleRow';
import TestModule from './../modules/testModule';

class DashboardView extends View {
    state = {
        title: "Dashboard"
    }

    render = () => {
        return(
            <ModuleRow onRenderedModules={(numberOfModules) => this.handleRenderedModules(numberOfModules)}>
                <TestModule cols="3" id="a"></TestModule>
                <TestModule cols="3" id="b"></TestModule>
                <TestModule cols="3" id="c"></TestModule>
                <TestModule cols="3" id="d"></TestModule>
            </ModuleRow>
        );
    }
}

export default DashboardView;