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
                    <ul className="window-listing">
                        <li>Window 1
                            <ul className="list-item-options">
                                <li>x</li>
                                <li>^</li>
                            </ul>
                        </li>
                            <ul className="tab-listing">
                                <li>
                                    <span>Tab 1</span>
                                    <ul className="list-item-options">
                                        <li>x</li>
                                    </ul>
                                </li>
                                <li>Tab 2</li>
                                <li>Tab 3</li>
                            </ul>
                        <li>Window 2</li>
                            <ul className="tab-listing">
                                <li>Tab 4</li>
                                <li>Tab 5</li>
                                <li>Tab 6</li>
                                <li>Tab 7</li>
                            </ul>
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