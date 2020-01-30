import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Module from '../utils/moduleon/module';
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class ActiveTabsModule extends Module {
   settings = {
       moduleTitle: "Currently Opened Windows and Tabs"
   }

   renderBody = () => {
        return (
            <Fragment>
                <div className="active-tabs-module">
                    <p>Tab Flower offers you an oversight over all opened tabs, making it easier
                        to remove tabs and windows you seldom use. You may also scan for unresponsive websites and remove them.
                    </p>
                    <ul className="window-listing col-12">
                        <li className="mt-2">Window 1
                            <ul className="list-item-options">
                                <li><span className="fas fa-chevron-up"></span></li>
                                <li><span className="fas fa-times"></span></li>
                            </ul>
                        </li>
                            <ul className="tab-listing">
                                <li className="col-2">
                                    <span>Tab 1</span>
                                    <ul className="list-item-options">
                                        <li><span className="fas fa-times"></span></li>
                                    </ul>
                                </li>
                                <li className="col-2">
                                    <span>Tab 2</span>
                                    <ul className="list-item-options">
                                        <li><span className="fas fa-times"></span></li>
                                    </ul>
                                </li>
                                <li className="col-2">Tab 3</li>
                                <li className="col-2">Tab 2</li>
                                <li className="col-2">Tab 3</li>
                                <li className="col-2">Tab 2</li>
                                <li className="col-2">Tab 3</li>
                            </ul>
                        <li className="mt-2">Window 2
                            <ul className="list-item-options">
                                <li><span className="fas fa-chevron-up"></span></li>
                                <li><span className="fas fa-times"></span></li>
                            </ul>
                        </li>
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
                
                    <p class="tabeon-module-footer-text small d-inline-block">Need to archive these windows and tabs for future browsing? Save them to Tab Flower!</p>
                    <button className="btn btn-tabeon d-inline-block">Remove unresponsive tabs</button>
                    <button className="btn btn-tabeon d-inline-block">Save listed tabs</button>
              
            </Fragment>
        );
   }

   
    
}

export default ActiveTabsModule;