import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Module from '../utils/moduleon/module';
import WindowsList from '../utils/windowsList';
import { sendToBackground } from "../../services/webextension/APIBridge";
import * as validator from '../utils/inputValidators';
import { ValidatorError, ErrorHandler } from '../utils/exceptionsAndHandler';
require("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")

class ExtensionSettingsModule extends Module {
   /*
        Settings
        - moduleTitle: Title of the module (string)
   */
    settings = {
        moduleTitle: "Settings"
    }

    verifyChildProps = () => {
        const { isObject, isString } = validator;

        if(isObject(this.settings)){
            const { moduleTitle } = this.settings;

            if(!isString(moduleTitle)){
                throw ValidatorError("settings-module-102");
            }
        } else {
            throw ValidatorError("settings-module-102");
        }
    }

   renderBody = () => {
        return (
            <Fragment>
                <div className="active-tabs-module">
                    <p>Blablabla</p>
                </div>
            </Fragment>
        );
   }


   
    
}

export default ExtensionSettingsModule;