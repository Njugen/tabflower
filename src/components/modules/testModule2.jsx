import React, { Fragment } from "react";
import Module from '../utils/moduleon/module';

class TestModule2 extends Module {
    renderHeader = () => {
        return (
            <Fragment>
                <div className="float-left">
                     <h3>Test Module</h3>
                </div>
                <div className="float-right">
                     abc
                </div> 
            </Fragment>
        );
    }

    renderBody = () => {
        return (
            <strong>I am Iron Man</strong>
        );
    }

    renderFooter = () => {
        return (
            <button className="btn btn-tabeon">Save</button>
        );
    }
}

export default TestModule2;