import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import Module from './../../../../components/utils/moduleon/module';
import * as ExceptionsHandler from './../../../../components/utils/exceptionsAndHandler';
import * as validator from './../../../../components/utils/inputValidators';
//require("../../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

const predefinedComponent = (props, options) => {
    props = props || {};

    const component = shallow(<Module {...props} />, options);
    return component;
}

const presetProps = {
    onRaiseToErrorOverlay: "",
    onDragOver: "",
    onDrop: "",
    onDragStart: "",
    onRaiseToModal: "",
};

let testComponent;
let componentInstance;

describe("Test <Module /> component behaviour at mount", () => {
    

    const actualErrorReturns = {
        "module-101": ExceptionsHandler.ValidatorError("module-101"),
        "module-102": ExceptionsHandler.ValidatorError("module-102"),
        "module-103": ExceptionsHandler.ValidatorError("module-103"),
        "module-104": ExceptionsHandler.ValidatorError("module-104"),
        "module-110": ExceptionsHandler.ValidatorError("module-110"),
        "module-111": ExceptionsHandler.ValidatorError("module-111"),
        "module-112": ExceptionsHandler.ValidatorError("module-112"),
        "module-113": ExceptionsHandler.ValidatorError("module-113")
    };

    const expectedErrorReturns = {
        "module-101": {
            name: "ValidatorError",
            message: "The componentEvent parameter in handleDragOver() does not target anything.",
            code: "module-101"
        },
        "module-102": {
            name: "ValidatorError",
            message: "The componentEvent parameter in handleDragOver() is not an object.",
            code: "module-102"
        },
        "module-103": {
            name: "ValidatorError",
            message: "The componentEvent parameter in handleDrop() does not target anything.",
            code: "module-103"
        },
        "module-104": {
            name: "ValidatorError",
            message: "The componentEvent parameter in handleDrop() is not an object.",
            code: "module-104"
        },
        "module-110": {
            name: "ValidatorError",
            message: "The \"data\" parameter is not set as am object in raiseToErrorOverlay() of the Module component. Information could not be forwarded to the UI.",
            code: "module-110"
        },
        "module-111": {
            name: "ValidatorError",
            message: "The features of the raiseToErrorOverlay() function of the Module component could not be fully executed, because the props onRaiseToErrorOverlay is not a function or is missing.",
            code: "module-111"
        },
        "module-112": {
            name: "ValidatorError",
            message: "The ID of the targetted DOM Element was not provided as expected to the handleDragOver() function of the Module component",
            code: "module-112"
        },
        "module-113": {
            name: "ValidatorError",
            message: "The parentElement of the targetted DOM Element was not provided as expected to the handleDrop() function of the Module component",
            code: "module-113"
        }
    }

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();

        const presetProps = {
          //  onRaiseToErrorOverlay: jest.fn()
        }
        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
        componentInstance = testComponent.instance();
        
        ExceptionsHandler.ErrorHandler = jest.fn();
        ExceptionsHandler.ValidatorError = jest.fn();
        ExceptionsHandler.ValidatorError.mockImplementation(errCode => {
            return actualErrorReturns[errCode];
        });
    });

    describe("Test raiseToErrorOverlay(data)", () => {
        const various_data = [
            ["A string representing a dummy data variable"],
            [32],
            [null],
            [undefined],
            [false],
            [true],
            [[12,8,3,7]],
            [() => {}]
        ];

        describe("Case 1: When the \"data\" parameter is NOT an object", () => {
            test("Run raiseToErrorOverlay(): Throw an error ExceptionsHandler.ValidatorError(\"module-110\")", () => {
                componentInstance.raiseToErrorOverlay();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-110");
            });

            test.each(various_data)("Run raiseToErrorOverlay(%p): Throw an error ExceptionsHandler.ValidatorError(\"module-110\")", (val) => {
                componentInstance.raiseToErrorOverlay(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-110");
            });
        });

        describe("Case 2: When the \"data\" parameter is an object, but the onRaiseToErrorOverlay props is not a function", () => {
            const various_props_onRaiseToErrorOverlay = [
                ["A string representing a dummy data variable"],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                [{ testItem: "nothing here" }]
            ];
            
            test.each(various_props_onRaiseToErrorOverlay)("Run raiseToErrorOverlay({ testData: \"test value\" }) when this.props.onRaiseToErrorOverlay = %p: Throw an error ExceptionsHandler.ValidatorError(\"module-111\")", (val) => {
                const presetProps = {
                    onRaiseToErrorOverlay: val
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                const data_param = { testData: "test value" }

                componentInstance.raiseToErrorOverlay(data_param);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-111");
            });

            test("Run raiseToErrorOverlay({ testData: \"test value\" }) when this.props.onRaiseToErrorOverlay does not exist: Throw an error ExceptionsHandler.ValidatorError(\"module-111\")", () => {
                const presetProps = {
              
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                const data_param = { testData: "test value" }

                componentInstance.raiseToErrorOverlay(data_param);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-111");
            });
        })
        
        describe("Case 3: When the \"data\" parameter is an object, and the onRaiseToErrorOverlay props IS a function", () => {
            test("Run raiseToErrorOverlay({ testData: \"test value\" }) when this.props.onRaiseToErrorOverlay is a function: Call this.props.onRaseToErrorOverlay(data) using the same \"data\" parameter", () => {
                jest.useFakeTimers();
                
                const presetProps = {
                    onRaiseToErrorOverlay: jest.fn()
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                const data_param = { testData: "test value" }

                componentInstance.raiseToErrorOverlay(data_param);
                jest.runAllTimers();

                expect(componentInstance.props.onRaiseToErrorOverlay).toHaveBeenCalledWith(data_param);

                jest.useRealTimers();
            });
        });
    });

    describe("Test handleDragOver(componentEvent)", () => {
        describe("Case 1: componentEvent is not an object or is missing", () => {
            const various_componentEvent = [
                ["A string representing a dummy componentEvent variable"],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                [() => {}]
            ];

            test("Run handleDragOver(): throw an error ExceptionsHandler.ValidatorError(\"module-102\")", () => {
                componentInstance.handleDragOver();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-102");
            });

            test.each(various_componentEvent)("Run handleDragOver(%p): throw an error ExceptionsHandler.ValidatorError(\"module-102\")", (val) => {
                componentInstance.handleDragOver(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-102");
            })
        });

        describe("Case 2: componentEvent is an object", () => {
            test("Run handleDragOver(componentEvent), with preventDefault() included in componentEvent: componentEvent.preventDefault() should get called", () => {
                const componentEvent = {
                    preventDefault: jest.fn()
                }

                componentInstance.handleDragOver(componentEvent);

                expect(componentEvent.preventDefault).toHaveBeenCalled();
            });

            describe("Subcase 1: componentEvent.target is NOT an object", () => {
                const various_componentEvent_target = [
                    ["A string representing a dummy componentEvent.target variable"],
                    [32],
                    [null],
                    [undefined],
                    [false],
                    [true],
                    [[12,8,3,7]],
                    [() => {}]
                ];

                test("Run handleDragOver(componentEvent), with \"target\" not being included in componentEvent: Throw an error ExceptionsHandler.ValidatorError(\"module-101\")", () => {
                    const componentEvent = {
                        preventDefault: jest.fn()
                    }

                    componentInstance.handleDragOver(componentEvent);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-101");
                });

                test.each(various_componentEvent_target)("Run handleDragOver(componentEvent), with \"target\" = %p included in componentEvent: Throw an error ExceptionsHandler.ValidatorError(\"module-101\")", (val) => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: val
                    }

                    componentInstance.handleDragOver(componentEvent);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-101");
                });
            })

            describe("Subcase 2: componentEvent.target is an object", () => {
                const various_componentEvent_target_children = [
                    ["A string representing a dummy componentEvent.target variable"],
                    [32],
                    [null],
                    [undefined],
                    [false],
                    [true],
                    [{ options: null }],
                    [() => {}]
                ];

                const various_componentEvent_target_children_id = [
                    [[1,2,3,4]],
                    [32],
                    [null],
                    [undefined],
                    [false],
                    [true],
                    [{ options: null }],
                    [() => {}]
                ];

                test("Run handleDragOver(componentEvent): If componentEvent.target.children does not exist, throw an error  ExceptionsHandler.ValidatorError(\"module-112\")", () => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: "tabeon-module-container"
                        }
                    }

                    componentInstance.handleDragOver(componentEvent);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-112");
                });

                test.each(various_componentEvent_target_children)("Run handleDragOver(componentEvent): If componentEvent.target.children = %p is not an array, throw an error ExceptionsHandler.ValidatorError(\"module-112\")", (val) => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: "tabeon-module-container",
                            children: val
                        }
                    }

                    componentInstance.handleDragOver(componentEvent);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-112");
                });

                test.each(various_componentEvent_target_children_id)("Run handleDragOver(componentEvent): If componentEvent.target.children[0].id = %p (not a string), throw an error ExceptionsHandler.ValidatorError(\"module-112\")", (val) => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: "tabeon-module-container",
                            children: [
                                { 
                                    id: val
                                }
                            ]
                        }
                    }

                    componentInstance.handleDragOver(componentEvent);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-112");
                });

                test("Run handleDragOver(componentEvent): Trigger this.props.onDragOver(), if the target CSS-selector includes \".tabeon-module-container\" and a target ID is correctly provided", () => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: "tabeon-module-container",
                            children: [
                                { 
                                    id: "test-123"
                                }
                            ]
                        }
                    }

                    const presetProps = {
                        onDragOver: jest.fn()
                    }
 
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    
                    componentInstance.handleDragOver(componentEvent);
                    expect(componentInstance.props.onDragOver).toHaveBeenCalled();
                })

                test("Run handleDragOver(componentEvent): Do NOT trigger this.props.onDragOver(), if the target CSS-selector does not include \".tabeon-module-container\"", () => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: {
                                includes: jest.fn().mockReturnValue(false)
                            },
                            children: [
                                { 
                                    id: "test-123"
                                }
                            ]
                        }
                    }

                    const presetProps = {
                        onDragOver: jest.fn()
                    }
 
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    testComponent.update();
                    componentInstance = testComponent.instance();
                    
                    componentInstance.handleDragOver(componentEvent);
                    expect(componentInstance.props.onDragOver).not.toHaveBeenCalled();
                });

                test("Run handleDragOver(componentEvent): Do NOT trigger any ExceptionsHandler.ValidatorError() functions, if the target CSS-selector includes \".tabeon-module-container\"", () => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: "tabeon-module-container",
                            children: [
                                { 
                                    id: "test-123"
                                }
                            ]
                        }
                    }

                    const presetProps = {
                        onDragOver: jest.fn()
                    }
 
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    testComponent.update();
                    componentInstance = testComponent.instance();
                    
                    componentInstance.handleDragOver(componentEvent);
                    expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalled();
                });
            }); 
        })
    });

    describe("Test handleDrop(componentEvent)", () => {
        describe("Case 1: componentEvent is not an object or is missing", () => {
            const various_componentEvent = [
                ["A string representing a dummy componentEvent variable"],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                [() => {}]
            ];

            test("Run handleDrop(): throw an error ExceptionsHandler.ValidatorError(\"module-104\")", () => {
                componentInstance.handleDrop();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-104");
            });

            test.each(various_componentEvent)("Run handleDrop(%p): throw an error ExceptionsHandler.ValidatorError(\"module-104\")", (val) => {
                componentInstance.handleDrop(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-104");
            })
        });

        describe("Case 2: componentEvent is an object", () => {
            test("Run handleDrop(componentEvent), with preventDefault() included in componentEvent: componentEvent.preventDefault() should get called", () => {
                const componentEvent = {
                    preventDefault: jest.fn()
                }

                componentInstance.handleDrop(componentEvent);

                expect(componentEvent.preventDefault).toHaveBeenCalled();
            });

            describe("Subcase 1: componentEvent.target is NOT an object", () => {
                const various_componentEvent_target = [
                    ["A string representing a dummy componentEvent.target variable"],
                    [32],
                    [null],
                    [undefined],
                    [false],
                    [true],
                    [[12,8,3,7]],
                    [() => {}]
                ];

                test("Run handleDrop(componentEvent), with \"target\" not being included in componentEvent: Throw an error ExceptionsHandler.ValidatorError(\"module-103\")", () => {
                    const componentEvent = {
                        preventDefault: jest.fn()
                    }

                    componentInstance.handleDrop(componentEvent);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-103");
                });

                test.each(various_componentEvent_target)("Run handleDrop(componentEvent), with \"target\" = %p included in componentEvent: Throw an error ExceptionsHandler.ValidatorError(\"module-103\")", (val) => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: val
                    }

                    componentInstance.handleDrop(componentEvent);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-103");
                });
            });

            describe("Subcase 2: componentEvent.target is an object", () => {
                const various_componentEvent_target_parentElement = [
                    ["A string representing a dummy componentEvent.target.parentElement variable"],
                    [32],
                    [null],
                    [undefined],
                    [false],
                    [true],
                    [[1,2,3,4]],
                    [() => {}]
                ];

                test("Run handleDrop(componentEvent): If componentEvent.target.parentElement does not exist, throw an error  ExceptionsHandler.ValidatorError(\"module-113\")", () => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: "tabeon-module-container"
                        }
                    }

                    componentInstance.handleDrop(componentEvent);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-113");
                });

                test.each(various_componentEvent_target_parentElement)("Run handleDrop(componentEvent): If componentEvent.target.parentElement = %p is not an object, throw an error ExceptionsHandler.ValidatorError(\"module-113\")", (val) => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: "tabeon-module-container",
                            parentElement: val
                        }
                    }

                    componentInstance.handleDrop(componentEvent);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-113");
                });
                
                
                test("Run handleDrop(componentEvent): Trigger this.props.onDrop(), if componentEvent.target.parentelement is provided as an object", () => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: "tabeon-module-container",
                            parentElement: {
                                info1: "blablabla",
                                info2: "blablabla"
                            }
                        }
                    }

                    const presetProps = {
                        onDrop: jest.fn()
                    }
 
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    
                    componentInstance.handleDrop(componentEvent);
                    expect(componentInstance.props.onDrop).toHaveBeenCalled();
                })
                
                test.each(various_componentEvent_target_parentElement)("Run handleDrop(componentEvent): If componentEvent.target.parentElement = %p (is not an object), do not call this.props.onDrop()", (val) => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: "tabeon-module-container",
                            parentElement: val
                        }
                    }

                    const presetProps = {
                        onDrop: jest.fn()
                    }
 
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    
                    componentInstance.handleDrop(componentEvent);
                    expect(componentInstance.props.onDrop).not.toHaveBeenCalled();
                });

                test("Run handleDrop(componentEvent): do NOT trigger any ExceptionsHandler.ValidatorError(), if componentEvent.target.parentelement is provided as an object", () => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: "tabeon-module-container",
                            parentElement: {
                                info1: "blablabla",
                                info2: "blablabla"
                            }
                        }
                    }
                    
                    componentInstance.handleDrop(componentEvent);
                    expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalled();
                })
            }); 
        });
    });
}) 