import React, { Fragment } from "react";
import Module from './../utils/moduleon/module';

class TabManagementModule extends Module {
   settings = {
       moduleTitle: "Tab Management"
   }

   renderBody = () => {
        return (
            <Fragment>
                <div className="browser-resource-status">
                    <h4>Status</h4>
                    <p>Currently you have the following resources active in your browser:</p>
                    <ul>
                        <li>[X] windows</li>
                        <li>[Y] tabs in total</li>
                    </ul>
                </div>
                <div className="currently-opened-resources">
                    <h4>Currently opened resources</h4>
                    <p></p>
                    <ul>
                        <li>[X] windows</li>
                        <li>[Y] tabs in total</li>
                    </ul>
                </div>
            </Fragment>
        );
   }

   renderFooter = () => {
       return (
        <Fragment>
            <button className="btn btn-tabeon">Save</button>
        </Fragment>
       );
   }

    
}

export default TabManagementModule;