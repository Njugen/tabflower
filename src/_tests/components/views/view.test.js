import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import View from './../../../components/views/view';
import * as ExceptionsHandler from './../../../components/utils/exceptionsAndHandler';
import * as validator from './../../../components/utils/inputValidators';



const predefinedComponent = (props, options) => {
    props = props || {};

    const component = shallow(<View {...props} />, options);
    return component;
}

const presetProps = {
    onRaiseToErrorOverlay: "",
    onRaiseToModal: "",
    onViewMount: ""
};

let testComponent;
let componentInstance;

describe("Test <View /> component behaviour at mount", () => {
    

    const actualErrorReturns = {
        "mp-verifyProps-101": ExceptionsHandler.ValidatorError("mp-verifyProps-101"),
        
    };

    const expectedErrorReturns = {
        "mp-verifyProps-101": {
            name: "ValidatorError",
            message: "The \"onDismiss\" props function is missing in the requested modal. Request aborted.",
            code: "mp-verifyProps-101"
        }
        
    }

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();

        const presetProps = {};
        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
        componentInstance = testComponent.instance();
    
        ExceptionsHandler.ValidatorError = jest.fn();
        ExceptionsHandler.ValidatorError.mockImplementation(errCode => {
            return actualErrorReturns[errCode];
        });
    });

    
}) 