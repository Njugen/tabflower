import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import COTMRemoveTabModal from './../../../../components/modals/currentlyOpenedTabsModule/cotmRemoveTabModal';
import * as ExceptionsHandler from './../../../../components/utils/exceptionsAndHandler';
import * as validator from './../../../../components/utils/inputValidators';


const predefinedComponent = (props, options) => {
    props = props || {};

    const component = shallow(<COTMRemoveTabModal {...props} />, options);
    return component;
}

let presetProps = {
    data: { },
    onRaiseToErrorOverlay: "",
    onDismiss: ""
};

let testComponent;
let componentInstance;

describe("Test <COTMRemoveTabModal /> component behaviour at mount", () => {
    

    const actualErrorReturns = {
        "COTMRemoveTabModal-102": ExceptionsHandler.ValidatorError("COTMRemoveTabModal-102"),
        "COTMRemoveTabModal-105": ExceptionsHandler.ValidatorError("COTMRemoveTabModal-105")
    };

    const expectedErrorReturns = {
        "COTMRemoveTabModal-102": {
            name: "ValidatorError",
            message: "No information about the targetted tab could be retrieved, therefore the tab cannot be closed at this point.",
            code: "COTMRemoveTabModal-102"
        },
        "COTMRemoveTabModal-105": {
            name: "ValidatorError",
            message: "No information about the targetted tab could be retrieved, therefore the tab cannot be closed at this point.",
            code: "COTMRemoveTabModal-105"
        }
    }

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();

        presetProps = {
           
        };
        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
        componentInstance = testComponent.instance();

        ExceptionsHandler.ErrorHandler = jest.fn();
        ExceptionsHandler.ValidatorError = jest.fn();
        ExceptionsHandler.ValidatorError.mockImplementation(errCode => {
            return actualErrorReturns[errCode];
        });
    });

 
    describe("Test verifyChildProps()", () => {
        const various_nonObjects = [
            ["a very weird looking text string"],
            [77],
            [false],
            [true],
            [undefined],
            [[1,2,3,4]],
            [() => {}],
            [null]
        ];

        describe("Examine the data object of this.props", () => {
            test("Run verifyChildProps(): If this.props.data is missing, throw an error \"COTMRemoveTabModal-105\"", () => {
                 expect(() => {
                    const testSpecificProps = {
                        ...presetProps
                    };
                    testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveTabModal-105"]); 
            });

            test.each(various_nonObjects)("Run verifyChildProps(): If this.props.data is not an object, throw an error \"COTMRemoveTabModal-105\"", (val) => {
                expect(() => {
                    const testSpecificProps = {
                        ...presetProps,
                        data: val
                    };
                    testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveTabModal-105"]);
            });

            test("Run verifyChildProps(): If params is missing in this.props.data, throw an error \"COTMRemoveTabModal-105\"", () => {
                expect(() => {
                    const testSpecificProps = {
                        ...presetProps,
                        data: {}
                    };
                    testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveTabModal-105"]);
            });

            test.each(various_nonObjects)("Run verifyChildProps(): If params is not an object in in this.props.data, throw an error \"COTMRemoveTabModal-105\"", (val) => {
                expect(() => {
                    const testSpecificProps = {
                        ...presetProps,
                        data: {
                            params: val
                        }
                    };
                    testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveTabModal-105"]);
            }); 
            
        });

        describe("Examine the tabInfo of this.props.data.params", () => {
            test.each(various_nonObjects)("Run verifyChildProps(): If tabInfo is not an object in in this.props.data.params, throw an error \"COTMRemoveTabModal-102\"", (val) => {
                expect(() => {
                    const testSpecificProps = {
                        ...presetProps,
                        data: {
                            params: val
                        }
                    };
                    testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveTabModal-102"]);
            });
        }); 
        
    })



}) 