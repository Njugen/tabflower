import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import COTMRemoveWindowModal from './../../../../components/modals/currentlyOpenedTabsModule/cotmRemoveWindowModal';


import * as ExceptionsHandler from '../../../../components/utils/exceptionsAndHandler';
import * as validator from '../../../../components/utils/inputValidators';


const predefinedComponent = (props, options) => {
    props = props || {};

    const component = shallow(<COTMRemoveWindowModal {...props} />, options);
    return component;
}

let presetProps = {
    data: { },
    onRaiseToErrorOverlay: "",
    onDismiss: ""
};

let testComponent;
let componentInstance;

describe("Test <COTMRemoveWindowModal /> component behaviour at mount", () => {
    

    const actualErrorReturns = {
        "COTMRemoveWindowModal-101": ExceptionsHandler.ValidatorError("COTMRemoveWindowModal-101"),
        "COTMRemoveWindowModal-102": ExceptionsHandler.ValidatorError("COTMRemoveWindowModal-102"),
        "COTMRemoveWindowModal-103": ExceptionsHandler.ValidatorError("COTMRemoveWindowModal-103"),
        "COTMRemoveWindowModal-104": ExceptionsHandler.ValidatorError("COTMRemoveWindowModal-104")
    };

    const expectedErrorReturns = {
        "COTMRemoveWindowModal-101": {
            name: "ValidatorError",
            message: "The targetted window could not be identified since its unique identification number is missing or provided in wrong format. This might be caused if the window information has been modified per request. Please, make sure the window information has not been modified after being retrieved directly from the browser. As a result, the targetted window cannot be deleted at this time.",
            code: "COTMRemoveWindowModal-101"
        },
        "COTMRemoveWindowModal-102": {
            name: "ValidatorError",
            message: "No specific information about the targetted window could be retrieved, therefore the window cannot be closed at this point.",
            code: "COTMRemoveWindowModal-102"
        },
        "COTMRemoveWindowModal-103": {
            name: "ValidatorError",
            message: "The callback function is missing.",
            code: "COTMRemoveWindowModal-103"
        },
        "COTMRemoveWindowModal-104": {
            name: "ValidatorError",
            message: "No information about the targetted window could be retrieved, therefore the window cannot be closed at this point.",
            code: "COTMRemoveWindowModal-104"
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
            test("Run verifyChildProps(): If this.props.data is missing, throw an error \"COTMRemoveWindowModal-104\"", () => {
                 expect(() => {
                    const presetProps = {
                        
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveWindowModal-104"]); 
            });

            test.each(various_nonObjects)("Run verifyChildProps(): If this.props.data = %p (is not an object), throw an error \"COTMRemoveWindowModal-104\"", (val) => {
                expect(() => {
                    const presetProps = {
                        data: val
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveWindowModal-104"]);
            });

            test("Run verifyChildProps(): If \"params\" is missing in this.props.data, throw an error \"COTMRemoveWindowModal-104\"", () => {
                expect(() => {
                    const presetProps = {
                        data: {}
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveWindowModal-104"]);
            });

            test.each(various_nonObjects)("Run verifyChildProps(): If \"params\" = %p (is not an object) in in this.props.data, throw an error \"COTMRemoveWindowModal-104\"", (val) => {
                expect(() => {
                    const presetProps = {
                        data: {
                            params: val
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveWindowModal-104"]);
            }); 
            
        }); 

        describe("Examine the \"windowInfo\" of this.props.data.params", () => {
            test.each(various_nonObjects)("Run verifyChildProps(): If \"windowInfo\" = %p (is not an object) in in this.props.data.params, throw an error \"COTMRemoveWindowModal-102\"", (val) => {
                const presetProps = {
                    data: {
                        params: {
                            windowInfo: val
                        }
                    }
                };

                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveWindowModal-102"]);
            });

            test("Run verifyChildProps(): If \"windowInfo\" is missing in this.props.data.params, throw an error \"COTMRemoveWindowModal-102\"", () => {
                const presetProps = {
                    data: {
                        params: {
                      
                        }
                    }
                };

                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["COTMRemoveWindowModal-102"]);
            });

            describe("Examine this.props.data.params.windowInfo.id", () => {
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

                test("Run verifyChildProps(): If \"id\" is not provided by this.props.data.params.windowInfo, throw an error \"COTMRemoveWindowModal-101\"", () => {
                    const presetProps = {
                        data: {
                            params: {
                                windowInfo: {}
                            }
                        }
                    };
    
                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyChildProps();
                    }).toThrow(expectedErrorReturns["COTMRemoveWindowModal-101"]);
                });

                test.each(various_nonNumber)("Run verifyChildProps(): If the \"id\" = %p (provided by this.props.data.params.windowInfo is not a number), throw an error \"COTMRemoveWindowModal-101\"", (val) => {
                    const presetProps = {
                        data: {
                            params: {
                                windowInfo: {
                                    id: val
                                }
                            }
                        }
                    };
    
                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyChildProps();
                    }).toThrow(expectedErrorReturns["COTMRemoveWindowModal-101"]);
                });
            })
            
        }); 
        
    });

    describe("Test childComponentMount()", () => {
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

        describe("Examine the \"data\" object of this.props", () => {
            test("Run childComponentDidMount(): if this.props.data object is missing, throw an error \"COTMRemoveWindowModal-104\"", () => {
                const presetProps = {
               
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
                componentInstance.childComponentDidMount();
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("COTMRemoveWindowModal-104");
            });
    
            test.each(various_nonObjects)("Run childComponentDidMount(): if this.props.data = %p (is not an object), throw an error \"COTMRemoveWindowModal-104\"", (val) => {
                const presetProps = {
                    data: val
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
                componentInstance.childComponentDidMount();
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("COTMRemoveWindowModal-104");
            });

            describe("Examine the \"params\" object of this.props.data", () => {
                test("Run childComponentDidMount(): if this.props.data.params object is missing, throw an error \"COTMRemoveWindowModal-104\"", () => {
                    const presetProps = {
                        data: {}
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.childComponentDidMount();
        
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("COTMRemoveWindowModal-104");
                });
        
                test.each(various_nonObjects)("Run childComponentDidMount(): if this.props.data.params = %p (is not an object), throw an error \"COTMRemoveWindowModal-104\"", (val) => {
                    const presetProps = {
                        data: {
                            params: val
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.childComponentDidMount();
        
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("COTMRemoveWindowModal-104");
                });
            });

            describe("Examine the \"windowInfo\" object of this.props.data.params", () => {
                test("Run childComponentDidMount(): If this.props.data.params.windowInfo is missing, throw an error \"COTMRemoveWindowModal-102\"", () => {
                    const presetProps = {
                        data: {
                            params: {
                                
                            }
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.childComponentDidMount();
        
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("COTMRemoveWindowModal-102");
                });

                test.each(various_nonObjects)("Run childComponentDidMount(): If this.props.data.params.windowInfo = %p (is not an object), throw an error \"COTMRemoveWindowModal-102\"", (val) => {
                    const presetProps = {
                        data: {
                            params: {
                                windowInfo: val
                            }
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.childComponentDidMount();
        
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("COTMRemoveWindowModal-102");
                });

                test.each(various_nonObjects)("Run childComponentDidMount(): If this.props.data.params.windowInfo is an object, pass it to this.setState()", (val) => {
                    const presetProps = {
                        data: {
                            params: {
                                windowInfo: {}
                            }
                        }
                    };

                    const data = presetProps.data.params.windowInfo;

                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.setState = jest.fn();
                    componentInstance.childComponentDidMount();
        
                    expect(componentInstance.setState).toHaveBeenCalledWith({ data });
                });
            })
        })
        
    })

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

        test("Run saveModalHandler(): Throw an error \"COTMRemoveWindowModal-103\"", () => {
            componentInstance.saveModalHandler();

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("COTMRemoveWindowModal-103");
        });

        test.each(various_nonFunctions)("Run saveModalHandler(%p): Throw an error \"COTMRemoveWindowModal-103\"", (val) => {
            componentInstance.saveModalHandler(val);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("COTMRemoveWindowModal-103");
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
        test("Run renderModalHeader(): The function should return \"Close Window\"", () => {
            expect(componentInstance.renderModalHeader()).toBe("Close Window");
        });
    });

}) 