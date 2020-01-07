import React from 'react';
import View from './view';

import ModuleRow from './../modules/moduleRow';
import TestModule from './../modules/testModule';
import TestModule2 from './../modules/testModule2';
import TestModule3 from './../modules/testModule3';
import TestModule4 from './../modules/testModule4';

class DashboardView extends View {
    state = {
        title: "Dashboard"
    }

    render = () => {
        return(
            <ModuleRow onRenderedModules={(numberOfModules) => this.handleRenderedModules(numberOfModules)}>
                <TestModule cols="4" id="a" onDragStart={(e) => this.handleDragStart(e)} onDragOver={(e) => this.handleDragOver(e)}></TestModule>
                <TestModule2 cols="4" id="b" onDragStart={(e) => this.handleDragStart(e)} onDragOver={(e) => this.handleDragOver(e)}></TestModule2>
                <TestModule3 cols="4" id="c" onDragStart={(e) => this.handleDragStart(e)} onDragOver={(e) => this.handleDragOver(e)}></TestModule3>
            </ModuleRow>
        );
    }
}

export default DashboardView;