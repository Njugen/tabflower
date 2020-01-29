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

   renderFooter = () => {
        return (
            <Fragment>
                <p class="warning-paragraph">
                    <small>
                        You have more than 10 tabs open. We recommend you manage them to lessen the stress on your computer.
                    </small>   
                </p>
                <button className="btn btn-tabeon">Manage tabs</button>
            </Fragment>
        );
   }

   
    
}

export default BrowserStatusModule;