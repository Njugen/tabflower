import React, { Fragment } from "react";
import Module from '../utils/moduleon/module';
//import WindowsList from './../utils/windowsList';
//import { sendToBackground } from "../../services/webextension/APIBridge";
import * as validator from './../utils/inputValidators';
//import { ValidatorError, ErrorHandler } from '../utils/exceptionsAndHandler';
import { ValidatorError } from '../utils/exceptionsAndHandler';
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class AboutTabflowerModule extends Module {
   /*
        Settings
        - moduleTitle: Title of the module (string)
   */
    settings = {
        moduleTitle: "About Tabflower"
    }

    verifyChildProps = () => {
        const { isObject, isString } = validator;

        if(isObject(this.settings)){
            const { moduleTitle } = this.settings;

            if(!isString(moduleTitle)){
                throw ValidatorError("atfm-module-102");
            }
        } else {
            throw ValidatorError("atfm-module-102");
        }
    }

   renderBody = () => {
        return (
            <Fragment>
                <div className="active-tabs-module">
                    <p>
                        Tabflower is a webextension for managing browser windows and tabs. It is intended for people who have
                        problems keeping their browser and all its tabs - and therefore resource consumption - in check. Tabflower is also
                        intended for people who - for whatever reason - needs to schedule or group their activities on the web, as it offers
                        the tools to do so. 
                    </p>
                    <p>
                        Tabflower is created by me, Thai Nguyen, and is under constant development. If you have found bugs, or have somekind of 
                        feedback (e.g. suggestions for new features), please contact me at <a href="mailto:privat_thai_nguyen@hotmail.com">privat_thai_nguyen@hotmail.com</a>
                    </p>
                </div>
            </Fragment>
        );
   }


   
    
}

export default AboutTabflowerModule;