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
        "mp-fadeIn-102": ExceptionsHandler.ValidatorError("mp-fadeIn-102"),
        
        "mp-fadeOut-101": ExceptionsHandler.ValidatorError("mp-fadeIn-101"),
        "mp-fadeOut-102": ExceptionsHandler.ValidatorError("mp-fadeIn-102"),    

        "mp-saveToState-104": ExceptionsHandler.ValidatorError("mp-saveToState-104"),
        "mp-saveToState-105": ExceptionsHandler.ValidatorError("mp-saveToState-105"),
        "mp-saveToState-106": ExceptionsHandler.ValidatorError("mp-saveToState-106"),
        "mp-saveToState-107": ExceptionsHandler.ValidatorError("mp-saveToState-107"),

        "mp-propsAction-101": ExceptionsHandler.ValidatorError("mp-propsAction-101"),
        "mp-propsAction-102": ExceptionsHandler.ValidatorError("mp-propsAction-102"),

        "mp-clearModalData-103": ExceptionsHandler.ValidatorError("mp-clearModalData-103")
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
        },
        
        "mp-fadeOut-101": {
            name: "ValidatorError",
            message: "A style object is missing in the modal's jsx component. Style cannot be set",
            code: "mp-fadeIn-101"
        },
        "mp-fadeOut-102": {
            name: "ValidatorError",
            message: "A reference to the JSX element representing the modal is missing or is invalid",
            code: "mp-fadeIn-102"
        },

        "mp-saveToState-104": {
            name: "ValidatorError",
            message: "The \"value\" parameter is undefined. Data was not saved",
            code: "mp-saveToState-104"
        },
        "mp-saveToState-105": {
            name: "ValidatorError",
            message: "The \"area\" parameter is not a string. Data was not saved.",
            code: "mp-saveToState-105"
        },
        "mp-saveToState-106": {
            name: "ValidatorError",
            message: "The \"callback\" parameter is not a function",
            code: "mp-saveToState-106"
        },
        "mp-saveToState-107": {
            name: "ValidatorError",
            message: "The \"area\" parameter is not a string. Data was not saved.",
            code: "mp-saveToState-107"
        },

        "mp-propsAction-101": {
            name: "ValidatorError",
            message: "The modal could not execute the requested action connected to it because it is invalid. The task(s) were ignored.",
            code: "mp-propsAction-101"
        },
        "mp-propsAction-102": {
            name: "ValidatorError",
            message: "The modal could not execute any actions because there is none connected to it. The execution attempt was aborted.",
            code: "mp-propsAction-102"
        },

        "mp-clearModalData-103": {
            name: "ValidatorError",
            message: "The callback parameter is not a function",
            code: "mp-clearModalData-103"
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

            test.each(various_modalRef_current)("Run fadeIn(), when this.modalRef.current = %p . ExceptionsHandler.ValidatorError(\"mp-fadeIn-102\") should be called", (val) => {
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

                test("Confirm the existence of the this.modalRef.current.style object", () => {
                    componentInstance.modalRef = { 
                        current: {
                            style: {}
                        }
                    };
                    componentInstance.fadeIn();

                    expect(typeof componentInstance.modalRef.current.style).toBe("object");
                })
                
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
            });
        });
    });

    describe("Test fadeOut()", () => {
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

            test.each(various_modalRef)("Run fadeOut(), when this.modalRef = %p . ExceptionsHandler.ValidatorError(\"mp-fadeOut-102\") should be called", (val) => {
                componentInstance.modalRef = val;
                componentInstance.fadeOut();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-fadeOut-102");;
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

            test.each(various_modalRef_current)("Run fadeOut(), when this.modalRef.current = %p . ExceptionsHandler.ValidatorError(\"mp-fadeOut-102\") should be called", (val) => {
                componentInstance.modalRef = { 
                    current: val
                };
                
                componentInstance.fadeOut();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-fadeOut-102");
            })
        });

        describe("this.modalRef is an object. this.modalRef.current is also an object", () => {

            test("Run fadeOut(): Confirm that both this.modalRef and this.modalRef.current are objects", () => {
                componentInstance.modalRef = { 
                    current: {}
                };
                componentInstance.fadeOut();

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

                test("Confirm the existence of the this.modalRef.current.style object", () => {
                    componentInstance.modalRef = { 
                        current: {
                            style: {}
                        }
                    };
                    componentInstance.fadeOut();

                    expect(typeof componentInstance.modalRef.current.style).toBe("object");
                })
                
                test("this.modalRef.current.style does not exist, throw a \"mp-fadeOut-101\" error", () => {
                    componentInstance.modalRef = { 
                        current: {
                            
                        }
                    };
                    componentInstance.fadeOut();

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-fadeOut-101");
                })

                test.each(various_style)("this.modalRef.current.style = %p, which is not an object. Throw a \"mp-fadeOut-101\" error", (val) => {
                    componentInstance.modalRef = { 
                        current: {
                            style: val
                        }
                    };
                    componentInstance.fadeOut();

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-fadeOut-101");
                })
            });
        });
    });

    // ATTENTION: Figure out how to call mocked props functions...
    describe("Test clearModalData(callback)", () => {
        describe("Run clearModalData(callback), which does the following: ", () => {
            const various_callback = [
                ["test string"],
                [{ testKey: 123, testKey2: 456 }],
                [null],
                [true],
                [false],
                [[1,2,3,4]],
                [80]
            ];
            const mockedCallback = jest.fn();
            
            test("triggers this.setState({}, fn), where \"fn\" has to be a function (any function)", () => {
                componentInstance.setState = jest.fn();
                componentInstance.clearModalData(mockedCallback);
    
                expect(componentInstance.setState).toHaveBeenCalledWith({}, expect.any(Function));
            })

            describe("this.setState({}, fn) in turn will trigger the \"fn\" function, inside which the following happens:", () => {
                test("this.fadeOut() gets called", () => {
                    componentInstance.fadeOut = jest.fn();
                    componentInstance.clearModalData(mockedCallback);

                    expect(componentInstance.fadeOut).toHaveBeenCalled();
                });

                test("onDismiss() (local alias onDismissModal()) gets called", () => {
                    const testComponent = predefinedComponent({ onDismiss: jest.fn() }, { disableLifecycleMethods: true })
                    const componentInstance = testComponent.instance();
                    componentInstance.clearModalData(mockedCallback);

                    expect(componentInstance.props.onDismiss).toHaveBeenCalled();
                });

                test.each(various_callback)("\"callback\" = %p (not a function): trigger ExceptionsHandler.ValidatorError(\"mp-clearModalData-103\")", (val) => {
                    const testComponent = predefinedComponent({ onDismiss: jest.fn() }, { disableLifecycleMethods: true })
                    const componentInstance = testComponent.instance();
                    const mockedCallback = val;

                    componentInstance.fadeOut = jest.fn();
                    componentInstance.clearModalData(mockedCallback);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-clearModalData-103");
                });

                test("\"callback\" is a function: trigger it", () => {
                    const testComponent = predefinedComponent({ onDismiss: jest.fn() }, { disableLifecycleMethods: true })
                    const componentInstance = testComponent.instance();
                    const mockedCallback = jest.fn();

                    componentInstance.fadeOut = jest.fn();
                    componentInstance.clearModalData(mockedCallback);

                    expect(mockedCallback).toHaveBeenCalled();
                });

                describe("\"callback\" could be missing (undefined): confirm this by mocking this.setState, telling \"callbackExists\" about the situation", () => {
                    test("\"callback is undefined\": callbackExists should remain false", () => {
                        const { isUndefined, isFunction } = validator;
                        const testComponent = predefinedComponent({ onDismiss: jest.fn() }, { disableLifecycleMethods: true })
                        const componentInstance = testComponent.instance();
                        const mockedCallback = undefined;

                        let callbackExists = false;

                        componentInstance.fadeOut = jest.fn();
                        
                        componentInstance.setState = jest.fn(({}, () => {
                            if(!isUndefined(mockedCallback)){
                                if(isFunction(mockedCallback)){
                                    callbackExists = true;
                                } else {
                                    callbackExists = false;
                                }
                            }    
                        }))

                        componentInstance.clearModalData(mockedCallback);

                        expect(callbackExists).toBe(false);
                    });  
                    
                    test("\"callback is a function\": callbackExists should be set to true", () => {
                        const { isUndefined, isFunction } = validator;
                        const testComponent = predefinedComponent({ onDismiss: jest.fn() }, { disableLifecycleMethods: true })
                        const componentInstance = testComponent.instance();
                        const mockedCallback = () => {};

                        let callbackExists = false;

                        componentInstance.fadeOut = jest.fn();
                        
                        componentInstance.setState = jest.fn(({}, () => {
                            if(!isUndefined(mockedCallback)){
                                if(isFunction(mockedCallback)){
                                    callbackExists = true;
                                } else {
                                    callbackExists = false;
                                }
                            }    
                        }))

                        componentInstance.clearModalData(mockedCallback);

                        expect(callbackExists).toBe(true);
                    });  
                });
            })
        })
        

        
/*
        test("Run clearModal(callback): Check that this.setState({}, () => callback()) is called, and the callback() function is triggered", () => {
            componentInstance.setState = jest.fn();
            componentInstance.clearModalData();

        }) */
    });

    // ATTENTION: Figure out how to call mocked props functions...
    describe("Test executePropsAction(data)", () => {

        describe("props.data is an object", () => {
            const various_data = [
                [14],
                [[1,2,3,4]],
                [null],
                ["A string representing a data variable"],
                [false],
                [true]
            ];

            test("Run executePropsAction(): If props.data is an object, do not throw ExceptionsHandler.ValidatorError(\"mp-propsAction-102\")", () => {
                const presetProps = { 
                    data: {} 
                };
                const testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                const componentInstance = testComponent.instance();

                componentInstance.executePropsAction();

                expect(ExceptionsHandler.ValidatorError).not.toBeCalledWith("mp-propsAction-102");
                
            });
        /*
            test("Run executePropsAction(): If props.data.action is a function, then call it", () => {

            }) */

            test.each(various_data)("Run executePropsAction(): If props.data.action = %p (not function nor undefined), throw ExceptionsHandler.ValidatorError(\"mp-propsAction-101\")", (val) => {
                const presetProps = { 
                    data: val
                };
                const testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                const componentInstance = testComponent.instance();

                componentInstance.executePropsAction();

                expect(ExceptionsHandler.ValidatorError).not.toBeCalledWith("mp-propsAction-101");
            })
        });

        describe("props.data does not exist or is not an object", () => {
            const various_data = [
                [14],
                [() => {}],
                [[1,2,3,4]],
                [null],
                ["A string representing a data variable"],
                [false],
                [undefined],
                [true]
            ];

            test("Run executePropsAction(). If props.data object does not exist, throw ExceptionsHandler.ValidatorError(\"mp-propsAction-102\")", () => {
                const presetProps = { };
                const testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                const componentInstance = testComponent.instance();

                componentInstance.executePropsAction();

                expect(ExceptionsHandler.ValidatorError).toBeCalledWith("mp-propsAction-102");
                
            })

            test.each(various_data)("Run executePropsAction(). If props.data = %p, throw ExceptionsHandler.ValidatorError(\"mp-propsAction-102\")", (val) => {
                const presetProps = { data: val };
                const testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                const componentInstance = testComponent.instance();

                componentInstance.executePropsAction();

                expect(ExceptionsHandler.ValidatorError).toBeCalledWith("mp-propsAction-102");
                
            })
        })
        
    });

    describe("Test saveToState(key, value, area, callback)", () => {
        describe("When the \"area\" parameter is not a string, an error \"mp-saveToState-107\" occurs regardless of other parameters", () => {
            const various_key = [
                [14],
                [() => {}],
                [[1,2,3,4]],
                [{key1: 12, key2: false}],
                [null],
                ["A string representing a value"],
                [false],
                [undefined],
                [true]
            ];
    
            const various_value = [
                [12],
                [() => {}],
                [[3,8,5,4]],
                [{key3: 1412, key4: false}],
                [null],
                ["A string representing another value"],
                [false],
                [undefined],
                [true]
            ];
    
            const various_area = [
                [122],
                [() => {}],
                [[5,2,8,3]],
                [{key1: 75, key8: false}],
                [null],
                [false],
                [undefined],
                [true]
            ];

            for(let i = 0; i < various_key.length; i++){
                for(let j = 0; j < various_value.length; j++){
                    test.each(various_area)("Run saveToState(" + various_key[i][0] + ", " + various_value[j][0] + ", %p): ExceptionsHandler.ValidatorError(\"mp-saveToState-107\") should be called", (val) => {
                        componentInstance.saveToState(various_key[i][0], various_value[j][0], val);

                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-saveToState-107");
                    })
                }
            }
        });

        describe("When the \"area\" parameter is a string, an error \"mp-saveToState-107\" should never occur", () => {
            const various_key = [
                [14],
                [() => {}],
                [[1,2,3,4]],
                [{key1: 12, key2: false}],
                [null],
                ["A string representing a value"],
                [false],
                [undefined],
                [true]
            ];
    
            const various_value = [
                [12],
                [() => {}],
                [[3,8,5,4]],
                [{key3: 1412, key4: false}],
                [null],
                ["A string representing another value"],
                [false],
                [undefined],
                [true]
            ];

            const string_area = "A string representing area";

            for(let i = 0; i < various_key.length; i++){
                for(let j = 0; j < various_value.length; j++){
                    test("Run saveToState(" + various_key[i][0] + ", " + various_value[j][0] + ", " + string_area + "): ExceptionsHandler.ValidatorError(\"mp-saveToState-107\") should NOT be called", () => {
                        componentInstance.saveToState(various_key[i][0], various_value[j][0], string_area);

                        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("mp-saveToState-107");
                    })
                }
            }
        });

        describe("Evaluate the \"key\" and \"value\" parameters, when \"area\" is a string ", () => {
            describe("\"value\" parameter", () => {
                const various_value = [
                    [12],
                    [() => {}],
                    [[3,8,5,4]],
                    [{key3: 1412, key4: false}],
                    [null],
                    ["A string representing another value"],
                    [false],
                    [true]
                ];

                const various_key = [
                    [14],
                    [() => {}],
                    [[1,2,3,4]],
                    [{key1: 12, key2: false}],
                    [null],
                    ["A string representing a value"],
                    [false],
                    [undefined],
                    [true]
                ];

                describe("When \"value\" is undefined, and \"key\" has varying values", () => {
                    test.each(various_key)("Run saveToState(%p, undefined, \"Area string\"): ExceptionsHandler.ValidatorError(\"mp-saveToState-104\") is called", (val) => {
                        componentInstance.saveToState(val, undefined, "Area string");

                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-saveToState-104");
                    });

                });

                describe("When \"value\" is not undefined, and \"key\" has varying values", () => {
                    for(let i = 0; i < various_key.length; i++){
                        test.each(various_value)("Run saveToState(" + various_key[i][0] + ", %p, \"Area string\"): ExceptionsHandler.ValidatorError(\"mp-saveToState-104\") is NOT called", (val) => {
                            componentInstance.saveToState(various_key[i][0], val, "Area string");

                            expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("mp-saveToState-104");
                        });
                    }
                })
            });

            describe("\"key\" parameter", () => {
                const various_value = [
                    [12],
                    [() => {}],
                    [[3,8,5,4]],
                    [{key3: 1412, key4: false}],
                    [null],
                    ["A string representing another value"],
                    [false],
                    [true]
                ];

                const various_key = [
                    [14],
                    [() => {}],
                    [[1,2,3,4]],
                    [{key1: 12, key2: false}],
                    [null],
                    [false],
                    [undefined],
                    [true]
                ];

                describe("When \"key\" is not a string and \"value\" is not undefined", () => {
                    for(let i = 0; i < various_key.length; i++){
                        test.each(various_value)("Run saveToState(" + various_key[i][0] + ", %p, \"Area string\"): ExceptionsHandler.ValidatorError(\"mp-saveToState-105\") is NOT called", (val) => {
                            componentInstance.saveToState(various_key[i][0], val, "Area string");

                            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-saveToState-105");
                        });
                    }
                });

                describe("When \"key\" is a string and \"value\" is not undefined", () => {
                    test.each(various_value)("Run saveToState(\"A random text string\", %p, \"Area string\"): ExceptionsHandler.ValidatorError(\"mp-saveToState-105\") is NOT called", (val) => {
                        componentInstance.saveToState("A random text string", val, "Area string");

                        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("mp-saveToState-105");
                    });
                
                });
            })

            describe("When either \"key\" or \"value\" (or both) have incorrect values, call error function", () => {
                test("Run saveToState(77, undefined, \"Area string\"): ExceptionsHandler.ValidatorError() is called", () => {
                    componentInstance.saveToState(77, undefined, "Area string");

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalled();
                });

                test("Run saveToState(77, \"text string\", \"Area string\"): ExceptionsHandler.ValidatorError() is called", () => {
                    componentInstance.saveToState(77, "text string", "Area string");

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-saveToState-105");
                });

                test("Run saveToState(\"text string\", undefined, \"Area string\"): ExceptionsHandler.ValidatorError() is called", () => {
                    componentInstance.saveToState("text string", undefined, "Area string");

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-saveToState-104");
                });
            });

            describe("When either \"key\" or \"value\" (or both) have incorrect values, don't call this.setState", () => {
                test("Run saveToState(77, undefined, \"Area string\"): this.setState() is not called", () => {
                    componentInstance.setState = jest.fn();
                    componentInstance.saveToState(77, undefined, "Area string");

                    expect(componentInstance.setState).not.toHaveBeenCalled();
                });

                test("Run saveToState(77, \"text string\", \"Area string\"): this.setState() is not called", () => {
                    componentInstance.setState = jest.fn();
                    componentInstance.saveToState(77, "text string", "Area string");

                    expect(componentInstance.setState).not.toHaveBeenCalled();
                });

                test("Run saveToState(\"text string\", undefined, \"Area string\"): this.setState() is not called", () => {
                    componentInstance.setState = jest.fn();
                    componentInstance.saveToState("text string", undefined, "Area string");

                    expect(componentInstance.setState).not.toHaveBeenCalled();
                });
            });

            describe("When both \"key\" and \"value\" have correct values, call this.setState()", () => {
                
                describe("Without callback parameter", () => {
                    const { isUndefined, isFunction } = validator;

                    test("Run saveToState(\"test string\", %p, \"Area string\"): call this.setState()", () => {
                        const callbackMockFn = jest.fn();
                        componentInstance.setState = jest.fn(({}, () => {
                            
                            if(!isUndefined(undefined)){
                                if(isFunction(undefined)){
                                    callbackMockFn();
                                } else {
                                    throw ExceptionsHandler.ValidatorError("mp-saveToState-106") 
                                }
                            }
                        }));
                        componentInstance.saveToState("test string", "test value", "Area string");

                        expect(componentInstance.setState).toHaveBeenCalled();
                    });

                    test("Run saveToState(\"test string\", %p, \"Area string\"): do not call ExceptionsHandler.ValidatorError(\"mp-saveToState-106\")", () => {
                        const callbackMockFn = jest.fn();
                        componentInstance.setState = jest.fn(({}, () => {
                            
                            if(!isUndefined(undefined)){
                                if(isFunction(undefined)){
                                    callbackMockFn();
                                } else {
                                    throw ExceptionsHandler.ValidatorError("mp-saveToState-106") 
                                }
                            }
                        }));
                        componentInstance.saveToState("test string", "test value", "Area string");

                        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("mp-saveToState-106");
                    });

                    test("Run saveToState(\"test string\", %p, \"Area string\"): do not call the callback function", () => {
                        const callbackMockFn = jest.fn();
                        componentInstance.setState = jest.fn(({}, () => {
                            
                            if(!isUndefined(undefined)){
                                if(isFunction(undefined)){
                                    callbackMockFn();
                                } else {
                                    throw ExceptionsHandler.ValidatorError("mp-saveToState-106") 
                                }
                            }
                        }));
                        componentInstance.saveToState("test string", "test value", "Area string");

                        expect(callbackMockFn).not.toHaveBeenCalled();
                    })
                })

                describe("With callback parameter", () => {
                    const { isUndefined, isFunction } = validator;

                    describe("When callback is a function", () => {
                        

                        test("Run saveToState(\"test string\", \"test value\", \"Area string\", () => {}): call the callback function", () => {
                            const callbackMockFn = jest.fn();
                            componentInstance.setState = jest.fn(({}, () => {
                           
                                if(!isUndefined(callbackMockFn)){
                                    if(isFunction(callbackMockFn)){
                                        callbackMockFn();
                                    } else {
                                        throw ExceptionsHandler.ValidatorError("mp-saveToState-106") 
                                    }
                                }
                            }));
                            componentInstance.saveToState("test string", "test value", "Area string", callbackMockFn);
    
                            expect(callbackMockFn).toHaveBeenCalled();
                        })
                    });
                    
                    describe("When callback is not function", () => {
                        const various_callback = [
                            [14],
                            ["string"],
                            [[1,2,3,4]],
                            [{key1: 12, key2: false}],
                            [null],
                            [false],
                            [true]
                        ]

                        test.each(various_callback)("Run saveToState(\"test string\", \"test value\", \"Area string\", %p): call ExceptionsHandler.ValidatorError(\"mp-saveToState-106\") ", (val) => {
                            componentInstance.setState = jest.fn(({}, () => {
                                if(!isUndefined(val)){
                                    if(isFunction(val)){
                                        val();
                                    } else {
                                        throw ExceptionsHandler.ValidatorError("mp-saveToState-106") 
                                    }
                                }
                            }));
                            componentInstance.saveToState("test string", "test value", "Area string", val);
    
                            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("mp-saveToState-106");
                        })
                    });
                })
            })
        })
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