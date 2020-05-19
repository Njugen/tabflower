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
            message: "No data container nor data parameter containers were found in the props, therefore the tab cannot be closed at this point.",
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

            test("Run verifyChildProps(): If \"params\" is missing in this.props.data, throw an error \"COTMRemoveTabModal-105\"", () => {
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

            test.each(various_nonObjects)("Run verifyChildProps(): If \"params\" is not an object in in this.props.data, throw an error \"COTMRemoveTabModal-105\"", (val) => {
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

        describe("Examine the \"tabinfo\" of this.props.data.params", () => {
            test.each(various_nonObjects)("Run verifyChildProps(): If \"tabinfo\" is not an object in in this.props.data.params, throw an error \"COTMRemoveTabModal-102\"", (val) => {
                const testSpecificProps = {
                    ...presetProps,
                    data: {
                        params: {
                            tabInfo: val
                        }
                    }
                };

                expect(() => {
                    testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveTabModal-102"]);
            });

            test("Run verifyChildProps(): If \"tabinfo\" is missing in this.props.data.params, throw an error \"COTMRemoveTabModal-102\"", () => {
                const testSpecificProps = {
                    ...presetProps,
                    data: {
                        params: {
                      
                        }
                    }
                };

                expect(() => {
                    testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveTabModal-102"]);
            });

            describe("Examine this.props.data.params.tabInfo.id", () => {
                const various_nonNumber = [
                    ["a very weird looking text string"],
                    [{ item: 123 }],
                    [false],
                    [true],
                    [undefined],
                    [[1,2,3,4]],
                    [() => {}],
                    [null]
                ]

                test("Run verifyChildProps(): If \"id\" is not provided by this.props.data.params.tabInfo, throw an error \"COTMRemoveTabModal-101\"", () => {
                    const testSpecificProps = {
                        ...presetProps,
                        data: {
                            params: {
                                tabInfo: {}
                            }
                        }
                    };
    
                    expect(() => {
                        testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyChildProps();
                    }).toThrow(expectedErrorReturns["COTMRemoveTabModal-101"]);
                });

                test.each(various_nonNumber)("Run verifyChildProps(): If the \"id\" provided by this.props.data.params.tabInfo is not a number, throw an error \"COTMRemoveTabModal-101\"", (val) => {
                    const testSpecificProps = {
                        ...presetProps,
                        data: {
                            params: {
                                tabInfo: {
                                    id: val
                                }
                            }
                        }
                    };
    
                    expect(() => {
                        testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyChildProps();
                    }).toThrow(expectedErrorReturns["COTMRemoveTabModal-101"]);
                });
            })
            
            describe("Examine this.props.data.params.tabInfo.title", () => {
                const various_nonString = [
                    [20],
                    [{ item: 123 }],
                    [false],
                    [true],
                    [undefined],
                    [[1,2,3,4]],
                    [() => {}],
                    [null]
                ]

                test("Run verifyChildProps(): If \"title\" is not provided by this.props.data.params.tabInfo, throw an error \"COTMRemoveTabModal-104\"", () => {
                    const testSpecificProps = {
                        ...presetProps,
                        data: {
                            params: {
                                tabInfo: {}
                            }
                        }
                    };
    
                    expect(() => {
                        testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyChildProps();
                    }).toThrow(expectedErrorReturns["COTMRemoveTabModal-104"]);
                });

                test.each(various_nonString)("Run verifyChildProps(): If the \"title\" provided by this.props.data.params.tabInfo is not a string, throw an error \"COTMRemoveTabModal-104\"", (val) => {
                    const testSpecificProps = {
                        ...presetProps,
                        data: {
                            params: {
                                tabInfo: {
                                    title: val
                                }
                            }
                        }
                    };
    
                    expect(() => {
                        testComponent = predefinedComponent(testSpecificProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyChildProps();
                    }).toThrow(expectedErrorReturns["COTMRemoveTabModal-104"]);
                });
            })
        }); 
        
    });



}) 