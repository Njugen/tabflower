import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import Modal from './../../../components/modals/modal';
import * as ExceptionsHandler from './../../../components/utils/exceptionsAndHandler';
import * as validator from './../../../components/utils/inputValidators';


const predefinedComponent = (props, options) => {
    props = props || {};

    const component = shallow(<Modal {...props} />, options);
    return component;
}

const presetProps = {
    data: { },
    onRaiseToErrorOverlay: "",
    onDismiss: ""
};

let testComponent;
let componentInstance;

describe("Test <Modal /> component behaviour at mount", () => {
    

    const actualErrorReturns = {
        "mp-verifyProps-101": ExceptionsHandler.ValidatorError("mp-verifyProps-101"),
        "mp-verifyProps-102": ExceptionsHandler.ValidatorError("mp-verifyProps-102"),
        "mp-verifyProps-103": ExceptionsHandler.ValidatorError("mp-verifyProps-103"),
        "mp-verifyProps-104": ExceptionsHandler.ValidatorError("mp-verifyProps-104"),
        "mp-verifyProps-105": ExceptionsHandler.ValidatorError("mp-verifyProps-105"),
        "mp-verifyProps-106": ExceptionsHandler.ValidatorError("mp-verifyProps-106"),
        "mp-verifyProps-107": ExceptionsHandler.ValidatorError("mp-verifyProps-107"),
        "mp-verifyProps-108": ExceptionsHandler.ValidatorError("mp-verifyProps-108"),

        "mp-fadeIn-101": ExceptionsHandler.ValidatorError("mp-fadeIn-101"),
        "mp-fadeIn-102": ExceptionsHandler.ValidatorError("mp-fadeIn-102")
    };

    const expectedErrorReturns = {
        "mp-verifyProps-101": {
            name: "ValidatorError",
            message: "The \"onDismiss\" props function is missing in the requested modal. Request aborted.",
            code: "mp-verifyProps-101"
        },
        "mp-verifyProps-102": {
            name: "ValidatorError",
            message: "The \"onRaiseToErrorOverlay\" props function is missing in the requested modal. Request aborted.",
            code: "mp-verifyProps-102"
        },
        "mp-verifyProps-103": {
            name: "ValidatorError",
            message: "The \"data\" props is either not an object, or is missing, in the requested modal. Request aborted.",
            code: "mp-verifyProps-103"
        },
        "mp-verifyProps-104": {
            name: "ValidatorError",
            message: "A modal always need to be requested using an \"params\" object. Request aborted",
            code: "mp-verifyProps-104"
        },
        "mp-verifyProps-105": {
            name: "ValidatorError",
            message: "A state object is missing in the \"Modal\" component. Request aborted",
            code: "mp-verifyProps-105"
        },
        "mp-verifyProps-106": {
            name: "ValidatorError",
            message: "A ui object is missing in the state object of the \"Modal\" component. Request aborted",
            code: "mp-verifyProps-106"
        },
        "mp-verifyProps-107": {
            name: "ValidatorError",
            message: "A fieldErrors object is missing in the state object of the \"Modal\" component. Request aborted",
            code: "mp-verifyProps-107"
        },
        "mp-verifyProps-108": {
            name: "ValidatorError",
            message: "The \"errorData\" parameter in the raiseToErrorOverlay() needs to be an object. The attempt to forward the error data failed",
            code: "mp-verifyProps-108"
        },

        "mp-fadeIn-101": {
            name: "ValidatorError",
            message: "A style object is missing in the modal's jsx component. Style cannot be set",
            code: "mp-fadeIn-101"
        },
        "mp-fadeIn-102": {
            name: "ValidatorError",
            message: "A reference to the JSX element representing the modal is missing or is invalid",
            code: "mp-fadeIn-102"
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

    /*
    describe("Test componentDidMount() lifecycle method (as a unit)", () => {
        
        
        
        
        test("this.verifyProps() should be called", () => {
            

            componentInstance.fadeIn = jest.fn();
            componentInstance.verifyChildProps = jest.fn();
            componentInstance.handleOverflow = jest.fn();
            componentInstance.childComponentDidMount = jest.fn();
            componentInstance.verifyProps = jest.fn();
            componentInstance.verifyState = jest.fn();

            componentInstance.componentDidMount();

            expect(componentInstance.verifyProps).toHaveBeenCalled();
        })


        test("this.verifyState() should be called", () => {

        })
    }) */

    // ATTENTION: Figure out how to call props mock...
  /*  describe("Test raiseToErrorOverlay(error)", () => {
        describe("When \"errorData\" is not an object", () => {
            const various_err = [
                ["A string representing a dummy err variable"],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                [() => {}]
            ];

            test.each(various_err)("Run raiseToErrorOverlay(%p): ExceptionsHandler.ValidatorError(\"mp-verifyProps-108\") should be called", (val) => {
                componentInstance.raiseToErrorOverlay(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-verifyProps-108");
            })
        });

        describe("When \"errorData\" is an object", () => {
            test("Run raiseToErrorOverlay({}): The this.dismissModalHandler() function should be called", () => {
                componentInstance.dismissModalHandler = jest.fn();
                componentInstance.raiseToErrorOverlay({});

                expect(componentInstance.dismissModalHandler).toHaveBeenCalledTimes(1);
            });

            describe("\"onRaiseToErrorOverlay\" as a preset prop", () => {
                test("Run raiseToErrorOverlay({}), when \"onRaiseToErrorOverlay\" is a function: Call \"onRaiseToErrorOverlay\" after 1 second", () => {
            
                    const presetProps = {
                        onRaiseToErrorOverlay: jest.fn()
                    };

                    const testMockFunction = jest.fn();

                   // const testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    const testComponent = shallow(<Modal onRaiseToErrorOverlay={testMockFunction} />, { disableLifecycleMethods: true })
                    const componentInstance = testComponent.instance();
                   // console.log(componentInstance.props.onRaiseToErrorOverlay);
                    componentInstance.raiseToErrorOverlay({});
                  
                   expect(testMockFunction).toHaveBeenCalledTimes(1);

                 
                })
            })
        })
    }) */

    describe("Test fadeIn()", () => {
        describe("this.modalRef is not an object", () => {
            const various_modalRef = [
                ["A string representing this.modalRef"],
                [247],
                [null],
                [false],
                [true],
                [undefined],
                [[1,2,3,4]],
                [() => {}]
            ];

            test.each(various_modalRef)("Run fadeIn(), when this.modalRef = %p . ExceptionsHandler.ValidatorError(\"mp-fadeIn-102\") should be called", (val) => {
                componentInstance.modalRef = val;
                componentInstance.fadeIn();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-fadeIn-102");;
            })
        });

        describe("this.modalRef is an object, but this.modal.current is not", () => {
            const various_modalRef_current = [
                ["A string representing this.modalRef.current"],
                [2417],
                [null],
                [false],
                [true],
                [undefined],
                [[1,2,3,4]],
                [() => {}]
            ];

            test.each(various_modalRef_current)("Run fadeIn(), when this.modalRef.current = %p . ExceptionsHandler.ValidatorError(\"mp-fadeIn-101\") should be called", (val) => {
                componentInstance.modalRef = { 
                    current: val
                };
                
                componentInstance.fadeIn();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-fadeIn-102");
            })
        });

        describe("this.modalRef is an object. this.modalRef.current is also an object", () => {

            test("Run fadeIn(): Confirm that both this.modalRef and this.modalRef.current are objects", () => {
                componentInstance.modalRef = { 
                    current: {}
                };
                componentInstance.fadeIn();

                const condition = (typeof componentInstance.modalRef === "object" && typeof componentInstance.modalRef.current === "object");
                expect(condition).toBe(true);
            })

            describe("Check that the \"style\" object exists in this.modalRef.current", () => {
                const various_style = [
                    ["A string representing this.modalRef.current.style"],
                    [2417],
                    [null],
                    [false],
                    [true],
                    [undefined],
                    [[1,2,3,4]],
                    [() => {}]
                ];
                
                test("this.modalRef.current.style does not exist, throw a \"mp-fadeIn-101\" error", () => {
                    componentInstance.modalRef = { 
                        current: {
                            
                        }
                    };
                    componentInstance.fadeIn();

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-fadeIn-101");
                })

                test.each(various_style)("this.modalRef.current.style = %p, which is not an object. Throw a \"mp-fadeIn-101\" error", (val) => {
                    componentInstance.modalRef = { 
                        current: {
                            style: val
                        }
                    };
                    componentInstance.fadeIn();

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-fadeIn-101");
                })
            },
            
            );
        });
    })

    describe("Test verifyProps()", () => {

        describe("Run this.verifyProps() using 2 valid props, and 1 missing", () => {

            const presetProps = { 
                onRaiseToErrorOverlay: () => {},
                data: {}
            };
            
            test("\"onDismiss\" prop is missing (is not a function). Throw an error with this code: \"mp-verifyProps-101\"", () => {
                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyProps();
                }).toThrow(expectedErrorReturns["mp-verifyProps-101"]);
            });

            test("\"onRaiseToErrorOverlay\" prop is missing (is not a function). Throw an error with this code: \"mp-verifyProps-102\"", () => {
                const presetProps = {  
                    onDismiss: () => {},
                    data: {}
                };

                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyProps();
                }).toThrow(expectedErrorReturns["mp-verifyProps-102"]);
            });

            test("\"data\" prop is missing (is not a non-array object). Throw an error with this code: \"mp-verifyProps-103\"", () => {
                const presetProps = {  
                    onDismiss: () => {},
                    onRaiseToErrorOverlay: () => {}
                };

                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyProps();
                }).toThrow(expectedErrorReturns["mp-verifyProps-103"]);
            })
        })

        describe("Run this.verifyProps() using 2 valid props, and 1 invalid", () => {
            describe("\"onDismiss\" prop is invalid (when not a function).", () => {
                const various_onDismiss = [
                    [0],
                    ["Text String"],
                    [null],
                    [undefined],
                    [false],
                    [true],
                    [{ item1: "abc", item2: 845, item3: "japan" }],
                    [["idg", "ign", "html", "scss"]]
                ];
                
                test.each(various_onDismiss)("<Modal onDismiss={%p} ... />, throw an error with this code: \"mp-verifyProps-101\"", (val) => {
                    const presetProps = { 
                        onDismiss: val,
                        onRaiseToErrorOverlay: () => {},
                        data: {}
                    };

                    expect(() => {  
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();

                        componentInstance.verifyProps();
                    }).toThrow(expectedErrorReturns["mp-verifyProps-101"]);
                });
            });

            describe("\"onRaiseToErrorOverlay\" prop is invalid (when not a function).", () => {
                const various_onRaiseToErrorOverlay = [
                    [5],
                    ["Text String"],
                    [null],
                    [undefined],
                    [false],
                    [true],
                    [{ item1: "abcdef", item2: 5, item3: "china" }],
                    [[1,2,3,4,5,6]]
                ];
                
                test.each(various_onRaiseToErrorOverlay)("<Modal onRaiseToErrorOverlay={%p} ... />, throw an error with this code: \"mp-verifyProps-102\"", (val) => {
                    const presetProps = { 
                        onDismiss: () => {},
                        onRaiseToErrorOverlay: val,
                        data: {}
                    };

                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();

                        componentInstance.verifyProps();
                    }).toThrow(expectedErrorReturns["mp-verifyProps-102"]);
                });
            });

            describe("\"data\" prop is invalid in two cases:", () => {
                describe("Case 1: when \"data\" is not an object", () => {
                    const various_data = [
                        [5],
                        ["Text String"],
                        [null],
                        [undefined],
                        [false],
                        [true],
                        [() => {}],
                        [[1,2,3,4,5,6]]
                    ];
                    
                    test.each(various_data)("<Modal data={%p} ... />, throw an error with this code: \"mp-verifyProps-103\"", (val) => {
                        const presetProps = { 
                            onDismiss: () => {},
                            onRaiseToErrorOverlay: () => {},
                            data: val
                        };
                        expect(() => {
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();

                            componentInstance.verifyProps();
                        }).toThrow(expectedErrorReturns["mp-verifyProps-103"]);
                    });
                });

                describe("Case 2: When \"data\" is an object, but a \"params\" key is missing (or when not an object). Other keys does not affect the result.", () => {
                    const various_data = [
                        [{aRandomKey1: "Data", smoothieRecipe: "none", instManualInStock: 0}],
                        [{aRandomKey2: "Data", pizzaRecipe: "blablabla", coffeeCupsInStock: 10}],
                        [{aRandomKey3: "Nothing", education: "none", symptoms: null}],
                        [{appleBrand: "Granny Smith", pieRequired: false}]
                    ];

                    const various_data_params = [
                        [5],
                        ["Text String"],
                        [null],
                        [undefined],
                        [false],
                        [true],
                        [() => {}],
                        [[1,2,3,4,5,6]]
                    ];

                    test.each(various_data)("<Modal data={%p} ... />, throw an error with this code: \"mp-verifyProps-104\"", (val) => {
                        const presetProps = { 
                            onDismiss: () => {},
                            onRaiseToErrorOverlay: () => {},
                            data: val
                        };
                        expect(() => {
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();

                            componentInstance.verifyProps();
                        }).toThrow(expectedErrorReturns["mp-verifyProps-104"]);
                    });

                    test.each(various_data_params)("<Modal data={params: %p, ...} ... />, throw an error with this code: \"mp-verifyProps-104\"", (val) => {
                        const presetProps = { 
                            onDismiss: () => {},
                            onRaiseToErrorOverlay: () => {},
                            data: {
                                params: val
                            }
                        };
                        expect(() => {
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();

                            componentInstance.verifyProps();
                        }).toThrow(expectedErrorReturns["mp-verifyProps-104"]);
                    });
                })
            });

            
        });

        describe("Run this.verifyProps() using all 3 valid props", () => {
            const presetProps = { 
                onDismiss: () => {},
                onRaiseToErrorOverlay: () => {},
                data: { 
                    params: {}
                }
            };

            test("<Modal data={params: {}} onDismiss={() => {}} onRaiseToErrorOverlay={() => {}} /> runs with no errors", () => {
                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyProps();
                }).not.toThrow();
            })
        }) 
    });

    describe("Test verifyState()", () => {
        describe("when this.state is not an object", () => {
            const various_state = [
                ["a very weird looking text string"],
                [77],
                [false],
                [true],
                [undefined],
                [[1,2,3,4]],
                [() => {}],
                [null]
            ];
            test.each(various_state)("Run verifyState(), when this.state = %p: Error \"mp-verifyProps-105\" should be thrown", (val) => {
                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.state = val;
                    componentInstance.verifyState();
                }).toThrow(expectedErrorReturns["mp-verifyProps-105"])
            })
        });

        describe("when this.state is an object", () => {
            test("Run verifyState() when this.state = {}: Error \"mp-verifyProps-105\" should NOT be thrown", () => {
                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.state = {};
                    componentInstance.verifyState();
                }).not.toThrow(expectedErrorReturns["mp-verifyProps-105"]);
            })

            describe("Check the object keys of this.state", () => {
                test("Run verifyState() when both \"ui\" or \"fieldErrors\" keys are missing: An error should be thrown", () => {
                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state = {};
                        componentInstance.verifyState();
                    }).toThrow();
                });
                
                test("Run verifyState() when both \"ui\" and \"fieldErrors\" keys are objects. No errors should be thrown", () => {
                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state = { 
                            ui: {}, 
                            fieldErrors: {}
                        };
                        componentInstance.verifyState();
                    }).not.toThrow();
                });

                describe("when both \"ui\" and \"fieldErrors\" are not objects", () => {
                    const various_state_ui = [
                        ["A string representing state ui"],
                        [2],
                        [[1,2,3,4]],
                        [null],
                        [undefined],
                        [true],
                        [false],
                        [() => {}]
                    ];

                    const various_state_fieldErrors = [
                        ["A string representing state fieldErrors"],
                        [24],
                        [[5,6,7,8]],
                        [null],
                        [undefined],
                        [true],
                        [false],
                        [() => {}]
                    ];

                    for(let i = 0; i < various_state_fieldErrors.length; i++){
                        test.each(various_state_ui)("Run verifyTest(), when \"ui\" = %p and " + various_state_fieldErrors[i][0] + ": An error should be thrown", (val) => {
                            expect(() => {
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
                                componentInstance.state = {
                                    ui: val,
                                    fieldErrors: various_state_fieldErrors[i][0]
                                };
                                componentInstance.verifyState();
                            }).toThrow();
                        })
                    }
                });

                describe("when \"fieldErrors\" is an object, while \"ui\" is not", () => {
                    const various_state_ui = [
                        ["A string representing state ui"],
                        [2],
                        [[1,2,3,4]],
                        [null],
                        [undefined],
                        [true],
                        [false],
                        [() => {}]
                    ];

                    test.each(various_state_ui)("Run verifyTest(), when \"ui\" = %p and \"fieldErrors\" = {}: Error \"mp-verifyProps-106\" should be thrown", (val) => {
                        expect(() => {
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
                            componentInstance.state = {
                                ui: val,
                                fieldErrors: {}
                            };
                            componentInstance.verifyState();
                        }).toThrow(expectedErrorReturns["mp-verifyProps-106"]);
                    })
                });

                describe("when \"ui\" is an object, while \"fieldErrors\" is not", () => {
                    const various_state_fieldErrors = [
                        ["A string representing state fieldErrors"],
                        [2],
                        [[1,2,3,4]],
                        [null],
                        [undefined],
                        [true],
                        [false],
                        [() => {}]
                    ];

                    test.each(various_state_fieldErrors)("Run verifyTest(), when \"ui\" = {} and \"fieldErrors\" = %p: Error \"mp-verifyProps-107\" should be thrown", (val) => {
                        expect(() => {
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
                            componentInstance.state = {
                                ui: {},
                                fieldErrors: val
                            };
                            componentInstance.verifyState();
                        }).toThrow(expectedErrorReturns["mp-verifyProps-107"]);
                    })
                });
            });
        });
    });
}) 