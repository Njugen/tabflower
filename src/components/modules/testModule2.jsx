import React, { Fragment } from "react";
import Module from '../utils/moduleon/module';

class TestModule2 extends Module {
    settings = {
        moduleTitle: "Scheduler"
    }

    renderHeader = () => {
        return (
            <Fragment>
                <div className="float-left">
                     <h4>Test Module</h4>
                </div>
            </Fragment>
        );
    }

    renderBody = () => {
        
    }

    renderFooter = () => {
        return (
            <button className="btn btn-tabeon">Save</button>
        );
    }
}

export default TestModule2;