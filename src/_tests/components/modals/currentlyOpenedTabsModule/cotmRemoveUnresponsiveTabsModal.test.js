import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import COTMRemoveUnresponsiveTabsModal from './../../../../components/modals/currentlyOpenedTabsModule/cotmRemoveUnresponsiveTabsModal';

import * as ExceptionsHandler from '../../../../components/utils/exceptionsAndHandler';
import * as validator from '../../../../components/utils/inputValidators';


const predefinedComponent = (props, options) => {
    props = props || {};

    const component = shallow(<COTMRemoveUnresponsiveTabsModal {...props} />, options);
    return component;
}

let presetProps = {
    data: { },
    onRaiseToErrorOverlay: "",
    onDismiss: ""
};

let testComponent;
let componentInstance;

describe("Test <COTMRemoveUnresponsiveTabs /> component behaviour at mount", () => {
    

    const actualErrorReturns = {
        "COTMRemoveUnresponsiveTabs-101": ExceptionsHandler.ValidatorError("COTMRemoveUnresponsiveTabs-101")
    };

    const expectedErrorReturns = {
        "COTMRemoveUnresponsiveTabs-101": {
            name: "ValidatorError",
            message: "The callback parameter is not a function.",
            code: "COTMRemoveUnresponsiveTabs-101"
        }
    }

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();

        const presetProps = {
          
        };
        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
        componentInstance = testComponent.instance();

        ExceptionsHandler.ErrorHandler = jest.fn();
        ExceptionsHandler.ValidatorError = jest.fn();
        ExceptionsHandler.ValidatorError.mockImplementation(errCode => {
            return actualErrorReturns[errCode];
        });
    });


    describe("Test saveModalHandler(callback)", () => {
        const various_nonFunctions = [
            ["a very weird looking text string"],
            [77],
            [false],
            [true],
            [undefined],
            [[1,2,3,4]],
            [{ key: "value" }],
            [null]
        ];

        test("Run saveModalHandler(): Throw an error \"COTMRemoveUnresponsiveTabs-101\"", () => {
            componentInstance.saveModalHandler();

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("COTMRemoveUnresponsiveTabs-101");
        });

        test.each(various_nonFunctions)("Run saveModalHandler(%p): Throw an error \"COTMRemoveUnresponsiveTabs-101\"", (val) => {
            componentInstance.saveModalHandler(val);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("COTMRemoveUnresponsiveTabs-101");
        });

        test("Run saveModalHandler(callbackFunction), where callbackFunction is a function: The callbackFunction() should get called, with this.state as its payload", () => {
            const callbackFunction = jest.fn();
            componentInstance.saveModalHandler(callbackFunction);

            expect(callbackFunction).toHaveBeenCalledWith(componentInstance.state);
        });
    });

    describe("Test dismissModalHandler()", () => {
        test("Run dismissModalHandler(): the function this.clearModalData() should be called", () => {
            componentInstance.clearModalData = jest.fn();
            componentInstance.dismissModalHandler();

            expect(componentInstance.clearModalData).toHaveBeenCalledTimes(1);
        })
    });

    describe("Test renderModalBody()", () => {

        describe("Examine the data object of this.props", () => {
            test("Run renderModalBody(): Whatever it returns should match the snapshot", () => {

                expect(componentInstance.renderModalBody()).toMatchSnapshot();
            });

           
            
        }); 

    });

    describe("Test renderModalHeader()", () => {
        test("Run renderModalHeader(): The function should return \"Close unresponsive tabs\"", () => {
            expect(componentInstance.renderModalHeader()).toBe("Close unresponsive tabs");
        });
    });

}) 