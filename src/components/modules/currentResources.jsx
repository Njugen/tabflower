import React, { Fragment } from "react";
import Module from '../utils/moduleon/module';

class CurrentResourcesModule extends Module {
   settings = {
       moduleTitle: "Currently Opened Resources"
   }

   renderBody = () => {
        return (
            <Fragment>
                <div className="currently-opened-resources-module">
                    <ul className="window-listing col-12">
                        <li>Window 1
                            <ul className="list-item-options">
                                <li>^</li>
                            </ul>
                        </li>
                            <ul className="tab-listing">
                                <li>
                                    <span>Tab 1</span>
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