import React, { Fragment } from "react";
import Module from '../utils/moduleon/module';

class BrowserStatusModule extends Module {
   settings = {
       moduleTitle: "Browser Status"
   }

   renderBody = () => {
        return (
            <Fragment>
                <div className="browser-resource-status">
                    <p>Currently you have the following resources active in your browser:</p>
                    <ul>
                        <li>[X] windows</li>
                        <li>[Y] tabs in total</li>
                    </ul>
                </div>
            </Fragment>
        );
   }

   
    
}

export default BrowserStatusModule;