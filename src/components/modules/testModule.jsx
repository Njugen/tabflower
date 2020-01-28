import React, { Fragment } from "react";
import Module from '../utils/moduleon/module';

class TestModule extends Module {
    settings = {
        moduleTitle: "Test Module"
    }

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

    blablabla = () => {
        console.log("This is for test module");
    }

    renderFooter = () => {
        return (
            <Fragment>
                <button className="btn btn-tabeon" onClick={() => this.raiseToModal({ id: "date-settings", action: this.blablabla.bind(this)})}>Save</button>
                <button className="btn btn-tabeon btn-tabeon-cancel">Reset</button>
            </Fragment>
        );
    }
}

export default TestModule;