import React, { Fragment } from "react";
import Module from '../utils/moduleon/module';

class CurrentResourcesModule extends Module {
   settings = {
       moduleTitle: "Currently Opened Resources"
   }

   renderBody = () => {
        return (
            <Fragment>
                <div className="currently-opened-resources">
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

   

    
}


export default CurrentResourcesModule;