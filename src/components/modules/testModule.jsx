import React, { Fragment } from "react";
import Module from '../utils/moduleon/module';

class TestModule extends Module {
    renderHeader = () => {
        return (
            <Fragment>
                <div className="float-left">
                     <h4>Iron Man</h4>
                </div>
            </Fragment>
        );
    }

    renderBody = () => {
        return (
            ""
        );
    }

    renderFooter = () => {
        return (
            <Fragment>
                <button className="btn btn-tabeon">Save</button>
                <button className="btn btn-tabeon btn-tabeon-cancel">Reset</button>
            </Fragment>
        );
    }
}

export default TestModule;