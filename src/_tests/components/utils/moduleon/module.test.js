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
        "module-105": ExceptionsHandler.ValidatorError("module-105"),
        "module-106": ExceptionsHandler.ValidatorError("module-106"),
        "module-107": ExceptionsHandler.ValidatorError("module-107"),
        "module-108": ExceptionsHandler.ValidatorError("module-108"),
        "module-109": ExceptionsHandler.ValidatorError("module-109"),
        "module-110": ExceptionsHandler.ValidatorError("module-110"),
        "module-111": ExceptionsHandler.ValidatorError("module-111"),
        "module-112": ExceptionsHandler.ValidatorError("module-112"),
        "module-113": ExceptionsHandler.ValidatorError("module-113"),
        "module-115": ExceptionsHandler.ValidatorError("module-115"),


        "module-verifyProps-101": ExceptionsHandler.ValidatorError("module-verifyProps-101"),
        "module-verifyProps-102": ExceptionsHandler.ValidatorError("module-verifyProps-102"),
        "module-verifyProps-103": ExceptionsHandler.ValidatorError("module-verifyProps-103"),
        "module-verifyProps-104": ExceptionsHandler.ValidatorError("module-verifyProps-104"),
        "module-verifyProps-105": ExceptionsHandler.ValidatorError("module-verifyProps-105"),
        "module-verifyProps-106": ExceptionsHandler.ValidatorError("module-verifyProps-106"),
        "module-verifyProps-107": ExceptionsHandler.ValidatorError("module-verifyProps-107"),
        "module-verifyProps-108": ExceptionsHandler.ValidatorError("module-verifyProps-108"),
        "module-verifyProps-109": ExceptionsHandler.ValidatorError("module-verifyProps-109"),
        "module-verifyProps-110": ExceptionsHandler.ValidatorError("module-verifyProps-110"),
        "module-verifyProps-111": ExceptionsHandler.ValidatorError("module-verifyProps-111"),
        "module-verifyProps-112": ExceptionsHandler.ValidatorError("module-verifyProps-112"),
        "module-verifyProps-113": ExceptionsHandler.ValidatorError("module-verifyProps-113"),
        "module-verifyProps-114": ExceptionsHandler.ValidatorError("module-verifyProps-114")
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
        "module-105": {
            name: "ValidatorError",
            message: "The componentEvent parameter in handleDragStart() does not target anything.",
            code: "module-105"
        },
        "module-106": {
            name: "ValidatorError",
            message: "The componentEvent parameter in handleDragStart() is not an object.",
            code: "module-106"
        },
        "module-107": {
            name: "ValidatorError",
            message: "The parameters input in changeStateSettings() is not an object.",
            code: "module-107"
        },
        "module-108": {
            name: "ValidatorError",
            message: "The parameters input in changeStateModuleData() is not an object.",
            code: "module-108"
        },
        "module-109": {
            name: "ValidatorError",
            message: "The sectionName parameter in createStateModuleDataSection() is not a string consisting of at least 1 character.",
            code: "module-109"
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
        },
        "module-115": {
            name: "ValidatorError",
            message: "The data parameter provided to the raiseToModal() function is not an object.",
            code: "module-115"
        },

        "module-verifyProps-101": {
            name: "ValidatorError",
            message: "The onRaiseToModal prop of the \"Module\" component is either not a function or is missing.",
            code: "module-verifyProps-101"
        },
        "module-verifyProps-102": {
            name: "ValidatorError",
            message: "The onDragOver prop of the \"Module\" component is either not a function or is missing.",
            code: "module-verifyProps-102"
        },
        "module-verifyProps-103": {
            name: "ValidatorError",
            message: "The onDrop prop of the \"Module\" component is either not a function or is missing.",
            code: "module-verifyProps-103"
        },
        "module-verifyProps-104": {
            name: "ValidatorError",
            message: "The onDragStart prop of the \"Module\" component is either not a function or is missing.",
            code: "module-verifyProps-104"
        },
        "module-verifyProps-105": {
            name: "ValidatorError",
            message: "The onClick prop of the \"Module\" component is either not a function or is missing.",
            code: "module-verifyProps-105"
        },
        "module-verifyProps-106": {
            name: "ValidatorError",
            message: "The onRaiseToErrorOverlay prop of the \"Module\" component is either not a function or is missing.",
            code: "module-verifyProps-106"
        },
        "module-verifyProps-107": {
            name: "ValidatorError",
            message: "The id prop of the \"Module\" component is either not a string or is missing.",
            code: "module-verifyProps-107"
        },
        "module-verifyProps-108": {
            name: "ValidatorError",
            message: "A settings object is missing in the \"Module\" component.",
            code: "module-verifyProps-108"
        },
        "module-verifyProps-109": {
            name: "ValidatorError",
            message: "A state object is missing in the \"Module\" component.",
            code: "module-verifyProps-109"
        },
        "module-verifyProps-110": {
            name: "ValidatorError",
            message: "A dropDownGrid object is missing in the state of the \"Module\" component.",
            code: "module-verifyProps-110"
        },
        "module-verifyProps-111": {
            name: "ValidatorError",
            message: "A moduleData object is missing in the state of the \"Module\" component.",
            code: "module-verifyProps-111"
        },
        "module-verifyProps-112": {
            name: "ValidatorError",
            message: "A settings object is missing in the state of the \"Module\" component.",
            code: "module-verifyProps-112"
        },
        "module-verifyProps-113": {
            name: "ValidatorError",
            message: "The draggedOverModuleId is missing or is not a string in the dropDownGrid located in the state of \"Module\" component.",
            code: "module-verifyProps-113"
        },
        "module-verifyProps-114": {
            name: "ValidatorError",
            message: "The moduleBeingDraggedId is missing or is not a string in the dropDownGrid located in the state of \"Module\" component.",
            code: "module-verifyProps-114"
        }
    }

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();

        const presetProps = {
         
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
                    [[1,2,3,4]],
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

                test.each(various_componentEvent_target_children)("Run handleDragOver(componentEvent): If componentEvent.target.children = %p is not an object, throw an error ExceptionsHandler.ValidatorError(\"module-112\")", (val) => {
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
                            children: {
                                0: { 
                                    id: val
                                }
                            }
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
                            children: {
                                0: { 
                                    id: "test-123"
                                }
                            }
                        }
                    }

                    const presetProps = {
                        onDragOver: jest.fn()
                    }
 
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    
                    componentInstance.handleDragOver(componentEvent);
                    expect(componentInstance.props.onDragOver).toHaveBeenCalledWith(componentEvent.target.children[0].id);
                })

                test("Run handleDragOver(componentEvent): Do NOT trigger this.props.onDragOver(), if the target CSS-selector does not include \".tabeon-module-container\"", () => {
                    const componentEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            className: {
                                includes: jest.fn().mockReturnValue(false)
                            },
                            children: {
                                0: { 
                                    id: "test-123"
                                }
                            }
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
                            children: {
                                0: { 
                                    id: "test-123"
                                }
                            }
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

                test.each(various_componentEvent_target)("Run handleDrop(componentEvent), with \"target\" = %p included in componentEvent (not being an object): Throw an error ExceptionsHandler.ValidatorError(\"module-103\")", (val) => {
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
                
                
                test("Run handleDrop(componentEvent): Trigger this.props.onDrop(), if componentEvent.target.parentElement is provided as an object", () => {
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
                    expect(componentInstance.props.onDrop).toHaveBeenCalledWith(componentEvent.target.parentElement);
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

                test("Run handleDrop(componentEvent): do NOT trigger any ExceptionsHandler.ValidatorError(), if componentEvent.target.parentElement is provided as an object", () => {
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

    describe("Test handleDragStart(componentEvent)", () => {
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

            test("Run handleDragStart(): throw an error ExceptionsHandler.ValidatorError(\"module-106\")", () => {
                componentInstance.handleDragStart();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-106");
            });

            test.each(various_componentEvent)("Run handleDragStart(%p): throw an error ExceptionsHandler.ValidatorError(\"module-104\")", (val) => {
                componentInstance.handleDragStart(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-106");
            })
        });

        describe("Case 2: componentEvent is an object", () => {
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

                test("Run handleDragStart(componentEvent), with \"target\" not being included in componentEvent: Throw an error ExceptionsHandler.ValidatorError(\"module-103\")", () => {
                    const componentEvent = {
                      
                    }

                    componentInstance.handleDragStart(componentEvent);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-105");
                });

                test.each(various_componentEvent_target)("Run handleDragStart(componentEvent), with \"target\" = %p included in componentEvent (not being an object): Throw an error ExceptionsHandler.ValidatorError(\"module-103\")", (val) => {
                    const componentEvent = {
                        target: val
                    }

                    componentInstance.handleDragStart(componentEvent);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-105");
                });
            });

            describe("Subcase 2: componentEvent.target is an object", () => {

                test("Run handleDragStart(componentEvent): If componentEvent.target is an object, trigger this.propsonDragStart", () => {
                    const componentEvent = {
                        target: {
                          
                        }
                    }

                    const presetProps = {
                        onDragStart: jest.fn()
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                    componentInstance = testComponent.instance();

                    componentInstance.handleDragStart(componentEvent);
                    expect(componentInstance.props.onDragStart).toHaveBeenCalledWith(componentEvent.target);
                });

                
            }); 
        });
    })
    
    describe("Test handleModuleMinimize()", () => {
        test("this.changeStateSettings is called with the parameter expected in this test", () => {
            componentInstance.changeStateSettings = jest.fn();

            componentInstance.handleModuleMinimize();

            const expectedParam = {
                minimized: true
            }

            expect(componentInstance.changeStateSettings).toHaveBeenCalledWith(expectedParam)
        })
    });

    describe("Test handleModuleExpand()", () => {
        test("this.changeStateSettings is called with the parameter expected in this test", () => {
            componentInstance.changeStateSettings = jest.fn();

            componentInstance.handleModuleExpand();

            const expectedParam = {
                minimized: false
            }

            expect(componentInstance.changeStateSettings).toHaveBeenCalledWith(expectedParam)
        })
    })

    describe("Test changeStateSettings(parameters)", () => {
        describe("Case 1: \"parameters\" is NOT an object or is missing", () => {
            const various_parameters = [
                ["A string representing a dummy parameters variable"],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                [() => {}]
            ]
            test("Run changeStateSettings(), when \"parameters\" is missing: throw an error ExceptionsHandler.ValidatorError(\"module-107\")", () => {
                componentInstance.changeStateSettings();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-107");
            })

            test.each(various_parameters)("Run changeStateSettings(), when \"parameters\" = %p (is not an object): throw an error ExceptionsHandler.ValidatorError(\"module-107\")", (val) => {
                componentInstance.changeStateSettings(val);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-107");
            })
        });

        describe("Case 2: \"parameters\" is an object", () => {
            test("Run changeStateSettings({ option1: \"test\", option2: 20 }). Check that this.setState is called with the same input values as stated in this test", () => {
                const changeStateSettingsInput = { option1: "test", option2: 20 };

                componentInstance.setState = jest.fn();

                const settings = {
                    ...componentInstance.state.settings,
                    ...changeStateSettingsInput
                }

                componentInstance.changeStateSettings(changeStateSettingsInput);
                
                expect(componentInstance.setState).toHaveBeenCalledWith({ settings });
            })
        })
    });

    describe("Test changeStateModuleData(parameters)", () => {
        describe("Case 1: \"parameters\" is NOT an object or is missing", () => {
            const various_parameters = [
                ["A string representing a dummy parameters variable"],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                [() => {}]
            ]
            test("Run changeStateModuleData(), when \"parameters\" is missing: throw an error ExceptionsHandler.ValidatorError(\"module-107\")", () => {
                componentInstance.changeStateModuleData();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-108");
            })

            test.each(various_parameters)("Run changeStateModuleData(), when \"parameters\" = %p (is not an object): throw an error ExceptionsHandler.ValidatorError(\"module-107\")", (val) => {
                componentInstance.changeStateModuleData(val);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-108");
            })
        });

        describe("Case 2: \"parameters\" is an object", () => {
            test("Run changeStateModuleData({ option1: \"test\", option2: 20 }). Check that this.setState is called with the same input values as stated in this test", () => {
                const changeStateModuleDataInput = { option1: "test", option2: 20 };

                componentInstance.setState = jest.fn();

                const moduleData = {
                    ...componentInstance.state.moduleData,
                    ...changeStateModuleDataInput
                }

                componentInstance.changeStateModuleData(changeStateModuleDataInput);

                expect(componentInstance.setState).toHaveBeenCalledWith({ moduleData });
            })
        })
    });

    describe("Test createStateModuleDataSection(sectionName)", () => {
        describe("Case 1: \"sectionName\" is NOT a string or is missing", () => {
            const various_sectionName = [
                [{ testkey: "test value" }],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                [() => {}]
            ];
            
            test("Run createStateModuleDataSection(), when \"sectionName\" is missing: throw an error ExceptionsHandler.ValidatorError(\"module-107\")", () => {
                componentInstance.createStateModuleDataSection();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-109");
            })

            test.each(various_sectionName)("Run createStateModuleDataSection(), when \"sectionName\" = %p (is not an object): throw an error ExceptionsHandler.ValidatorError(\"module-107\")", (val) => {
                componentInstance.createStateModuleDataSection(val);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-109");
            })
        });

        describe("Case 2: \"sectionName\" is a string", () => {
            test("Run createStateModuleDataSection(\"finnish_history\") once: call this.changeStateModuleData() with the same parameters specified in this test", () => {
                componentInstance.changeStateModuleData = jest.fn();

                let data = {};

                componentInstance.createStateModuleDataSection("finnish_history");

                data["finnish_history"] = {};

                expect(componentInstance.changeStateModuleData).toHaveBeenCalledWith(data);
            })

            test("Run createStateModuleDataSection(\"finnish_history\") more than once: call ExceptionsHandler.ValidatorError(\"module-114\")", () => {

                componentInstance.createStateModuleDataSection("finnish_history");

                componentInstance.changeStateModuleData = jest.fn();

                componentInstance.createStateModuleDataSection("finnish_history");

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-114");
            });

            test("Run createStateModuleDataSection(\"finnish_history\") more than once: the this.changeStateModuleData() function is only called once", () => {
                componentInstance.changeStateModuleData = jest.fn((parameters) => {
                    try {
                        const { isObject } = validator;
            
                        if(isObject(parameters)){
                            const moduleData = {
                                ...componentInstance.state.moduleData, ...parameters
                            }
            
                            componentInstance.setState({
                                moduleData
                            });
                        } else {
                            throw ExceptionsHandler.ValidatorError("module-108");
                        }
                    } catch(err){
                        ExceptionsHandler.ErrorHandler(err, componentInstance.raiseToErrorOverlay);
                    }
                });

                componentInstance.createStateModuleDataSection("finnish_history");

                componentInstance.createStateModuleDataSection("finnish_history");
                componentInstance.createStateModuleDataSection("finnish_history");
        
                expect(componentInstance.changeStateModuleData).toHaveBeenCalledTimes(1);
            })
        });
    });

    describe("Test this.componentDidMount() lifecycle method (as a unit)", () => {
        beforeEach(() => {
            jest.clearAllMocks();
            jest.useRealTimers();
    
            const presetProps = {};
            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps = jest.fn();
            componentInstance.childComponentDidMount = jest.fn();
            componentInstance.verifyProps = jest.fn();
            componentInstance.changeStateSettings = jest.fn();
            componentInstance.verifyState = jest.fn();

            ExceptionsHandler.ErrorHandler = jest.fn();
            ExceptionsHandler.ValidatorError = jest.fn();
            ExceptionsHandler.ValidatorError.mockImplementation(errCode => {
                return actualErrorReturns[errCode];
            });
        });

        test("this.verifyChildProps() should be called by this.componentDidMount()", () => {
            componentInstance.componentDidMount();

            expect(componentInstance.verifyChildProps).toHaveBeenCalledTimes(1);
        });

        test("this.changeStateSettings(this.settings) should be called by this.componentDidMount()", () => {
            componentInstance.settings = {
                marshmallow: 123
            };
            componentInstance.componentDidMount();

            expect(componentInstance.changeStateSettings).toHaveBeenCalledWith(componentInstance.settings);
        });

        test("this.childComponentDidMount() should be called by this.componentDidMount()", () => {
            componentInstance.componentDidMount();

            expect(componentInstance.childComponentDidMount).toHaveBeenCalledTimes(1);
        });

        test("this.verifyProps() should be called by this.componentDidMount()", () => {
            componentInstance.componentDidMount();

            expect(componentInstance.verifyProps).toHaveBeenCalledTimes(1);
        });

        test("this.verifyState() should be called by this.componentDidMount()", () => {
            componentInstance.componentDidMount();

            expect(componentInstance.verifyState).toHaveBeenCalledTimes(1);
        })
    })

    describe("Test this.componentWillMount() lifecycle method (as a unit)", () => {
        test("this.childComponentWillMount() should be called by componentWillMount()", () => {
            componentInstance.childComponentWillMount = jest.fn();
            componentInstance.componentWillMount();

            expect(componentInstance.childComponentWillMount).toHaveBeenCalledTimes(1);
        })
    })

    describe("Test raiseToModal(data)", () => {
        describe("Case 1: The data parameter is not an object", () => {
            const various_data = [
                ["test value"],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                [() => {}]
            ];

            test.each(various_data)("Run raiseToModal(%p): Throw an error ExceptionsHandler.ValidatorError(\"module-115\")", (val) => {
                componentInstance.raiseToModal(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-115");
            });

            test("Run raiseToModal(): Throw an error ExceptionsHandler.ValidatorError(\"module-115\")", () => {
                componentInstance.raiseToModal();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("module-115");
            });
        });

        describe("Case 2: The data parameter is an object", () => {
            test("Run raiseToModal({ abc: 123 }): call onRaiseToModal() with the same input provided", () => {
                const input = { abc: 123 };
                const presetProps = {
                    onRaiseToModal: jest.fn()
                }

                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
                
                componentInstance.raiseToModal(input);

                expect(componentInstance.props.onRaiseToModal).toHaveBeenCalledWith(input);
            });
        });
    });

    describe("Test verifyProps()", () => {
        describe("Run this.verifyProps() using 5 valid props, and 1 missing", () => {
            test("\"onRaiseToModal\" prop is missing (is not a function). Throw an error with this code: \"module-verifyProps-101\"", () => {
                const presetProps = { 
                    onDragOver: () => {},
                    onDrop: () => {},
                    onDragStart: () => {},
                    onRaiseToErrorOverlay: () => {},
                    id: "A string"
                };

                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyProps();
                }).toThrow(expectedErrorReturns["module-verifyProps-101"]);
            });

            test("\"onDragOver\" prop is missing (is not a function). Throw an error with this code: \"module-verifyProps-102\"", () => {
                const presetProps = { 
                    onRaiseToModal: () => {},
                    onDrop: () => {},
                    onDragStart: () => {},
                    onRaiseToErrorOverlay: () => {},
                    id: "A string"
                };

                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyProps();
                }).toThrow(expectedErrorReturns["module-verifyProps-102"]);
            });

            test("\"onDrop\" prop is missing (is not a function). Throw an error with this code: \"module-verifyProps-103\"", () => {
                const presetProps = { 
                    onRaiseToModal: () => {},
                    onDragOver: () => {},
                    onDragStart: () => {},
                    onRaiseToErrorOverlay: () => {},
                    id: "A string"
                };

                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyProps();
                }).toThrow(expectedErrorReturns["module-verifyProps-103"]);
            });

            test("\"onDragStart\" prop is missing (is not a function). Throw an error with this code: \"module-verifyProps-104\"", () => {
                const presetProps = { 
                    onRaiseToModal: () => {},
                    onDragOver: () => {},
                    onDrop: () => {},
                    onRaiseToErrorOverlay: () => {},
                    id: "A string"
                };

                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyProps();
                }).toThrow(expectedErrorReturns["module-verifyProps-104"]);
            });

            test("\"onRaiseToErrorOverlay\" prop is missing (is not a function). Throw an error with this code: \"module-verifyProps-106\"", () => {
                const presetProps = { 
                    onRaiseToModal: () => {},
                    onDragOver: () => {},
                    onDrop: () => {},
                    onDragStart: () => {},
                    id: "A string"
                };

                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyProps();
                }).toThrow(expectedErrorReturns["module-verifyProps-106"]);
            });

            test("\"id\" prop is missing (is not a string). Throw an error with this code: \"module-verifyProps-107\"", () => {
                const presetProps = { 
                    onRaiseToModal: () => {},
                    onDragOver: () => {},
                    onDrop: () => {},
                    onDragStart: () => {},
                    onRaiseToErrorOverlay: () => {}
                };

                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyProps();
                }).toThrow(expectedErrorReturns["module-verifyProps-107"]);
            });
        });

        describe("Run this.verifyProps() using 5 valid props, and 1 invalid", () => {
            const various_nonFunctions_variables = [
                [{ testkey: "test value" }],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                ["text string"]
            ];

            const various_nonString_variables = [
                [{ testkey: "test value" }],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                [() => {}]
            ];

            describe("\"onRaiseToModal\" prop is invalid (not a function)", () => {
                test.each(various_nonFunctions_variables)("<Module onRaiseToModal={%p} ... />, throw an error with this code: \"module-verifyProps-101\"", (val) => { 
                    const presetProps = {
                        onRaiseToModal: val,
                        onDragOver: () => {},
                        onDrop: () => {},
                        onDragStart: () => {},
                        onRaiseToErrorOverlay: () => {},
                        id: "A string"
                    }

                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyProps();
                    }).toThrow(expectedErrorReturns["module-verifyProps-101"]);
                });
            });

            describe("\"onDragOver\" prop is invalid (not a function)", () => {
                test.each(various_nonFunctions_variables)("<Module onDragOver={%p} ... />, throw an error with this code: \"module-verifyProps-102\"", (val) => { 
                    const presetProps = {
                        onRaiseToModal: () => {},
                        onDragOver: val,
                        onDrop: () => {},
                        onDragStart: () => {},
                        onRaiseToErrorOverlay: () => {},
                        id: "A string"
                    }

                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyProps();
                    }).toThrow(expectedErrorReturns["module-verifyProps-102"]);
                });
            });

            describe("\"onDrop\" prop is invalid (not a function)", () => {
                test.each(various_nonFunctions_variables)("<Module onDrop={%p} ... />, throw an error with this code: \"module-verifyProps-103\"", (val) => { 
                    const presetProps = {
                        onRaiseToModal: () => {},
                        onDragOver: () => {},
                        onDrop: val,
                        onDragStart: () => {},
                        onRaiseToErrorOverlay: () => {},
                        id: "A string"
                    }

                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyProps();
                    }).toThrow(expectedErrorReturns["module-verifyProps-103"]);
                });
            });

            describe("\"onDragStart\" prop is invalid (not a function)", () => {
                test.each(various_nonFunctions_variables)("<Module onDragStart={%p} ... />, throw an error with this code: \"module-verifyProps-104\"", (val) => { 
                    const presetProps = {
                        onRaiseToModal: () => {},
                        onDragOver: () => {},
                        onDrop: () => {},
                        onDragStart: val,
                        onRaiseToErrorOverlay: () => {},
                        id: "A string"
                    }

                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyProps();
                    }).toThrow(expectedErrorReturns["module-verifyProps-104"]);
                });
            });

            describe("\"onRaiseToErrorOverlay\" prop is invalid (not a function)", () => {
                test.each(various_nonFunctions_variables)("<Module onRaiseToErrorOverlay={%p} ... />, throw an error with this code: \"module-verifyProps-106\"", (val) => { 
                    const presetProps = {
                        onRaiseToModal: () => {},
                        onDragOver: () => {},
                        onDrop: () => {},
                        onDragStart: () => {},
                        onRaiseToErrorOverlay: val,
                        id: "A string"
                    }

                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyProps();
                    }).toThrow(expectedErrorReturns["module-verifyProps-106"]);
                });
            });

            describe("\"id\" prop is invalid (not a function)", () => {
                test.each(various_nonString_variables)("<Module id={%p} ... />, throw an error with this code: \"module-verifyProps-107\"", (val) => { 
                    const presetProps = {
                        onRaiseToModal: () => {},
                        onDragOver: () => {},
                        onDrop: () => {},
                        onDragStart: () => {},
                        onRaiseToErrorOverlay: () => {},
                        id: val
                    }

                    expect(() => {
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyProps();
                    }).toThrow(expectedErrorReturns["module-verifyProps-107"]);
                });
            });
        });

        describe("Run this.verifyProps() using all 6 valid props", () => {
            const presetProps = { 
                onRaiseToModal: () => {},
                onDragOver: () => {},
                onDrop: () => {},
                onDragStart: () => {},
                onRaiseToErrorOverlay: () => {},
                id: "A string"
            };
    
            test("<Module onRaiseToModal={() => {}} onDragOver={() => {}} onDrop={() => {}} onDragStart={() => {}} onRaiseToErrorOverlay={() => {}} id={\"A string\"} /> runs with no errors", () => {
                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.verifyProps();
                }).not.toThrow();
            })
        });
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
            test.each(various_state)("Run verifyState(), when this.state = %p: Error \"module-verifyProps-109\" should be thrown", (val) => {
                expect(() => {
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.state = val;
                    componentInstance.verifyState();
                }).toThrow(expectedErrorReturns["module-verifyProps-109"])
            })
        });

        describe("when this.state is an object", () => {
            describe("when this.state.dropDownGrid is not an object", () => {
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

                test.each(various_state)("Run verifyState(), when this.state.dropDownGrid = %p (is not an object): Error \"module-verifyProps-110\" should be thrown", (val) => {
                    expect(() => {
                        componentInstance.state.dropDownGrid = val;
                        componentInstance.verifyState(); 
                    }).toThrow(expectedErrorReturns["module-verifyProps-110"]);
                })
            });

            describe("when this.state.dropDownGrid is an object", () => {
                const various_nonString_variable = [
                    [{item: "1234"}],
                    [77],
                    [false],
                    [true],
                    [undefined],
                    [[1,2,3,4]],
                    [() => {}],
                    [null]
                ];

                test("Run verifyState(), when this.state.dropDownGrid = {} (is an object): Error \"module-verifyProps-110\" should NOT be thrown", () => {
                    expect(() => {
                        componentInstance.state.dropDownGrid = {};
                        componentInstance.verifyState(); 
                    }).not.toThrow(expectedErrorReturns["module-verifyProps-110"]);
                });

                test.each(various_nonString_variable)("Run verifyState(), when this.state.dropDownGrid.draggedOverModuleId = %p (is not a string): Error \"module-verifyProps-113\" should be thrown", (val) => {
                    expect(() => {
                        componentInstance.state.dropDownGrid.draggedOverModuleId = val;
                        componentInstance.verifyState(); 
                    }).toThrow(expectedErrorReturns["module-verifyProps-113"]);
                });

                test("Run verifyState(), when this.state.dropDownGrid.draggedOverModuleId = \"test string\" (is a string): Error \"module-verifyProps-113\" should NOT be thrown", () => {
                    expect(() => {
                        componentInstance.state.dropDownGrid.draggedOverModuleId = "test string";
                        componentInstance.verifyState(); 
                    }).not.toThrow(expectedErrorReturns["module-verifyProps-113"]);
                });

                test.each(various_nonString_variable)("Run verifyState(), when this.state.dropDownGrid.moduleBeingDraggedId = %p (is not a string): Error \"module-verifyProps-114\" should be thrown", (val) => {
                    expect(() => {
                        componentInstance.state.dropDownGrid.moduleBeingDraggedId = val;
                        componentInstance.verifyState(); 
                    }).toThrow(expectedErrorReturns["module-verifyProps-114"]);
                });

                test("Run verifyState(), when this.state.dropDownGrid.moduleBeingDraggedId = \"test string\" (is a string): Error \"module-verifyProps-114\" should NOT be thrown", () => {
                    expect(() => {
                        componentInstance.state.dropDownGrid.moduleBeingDraggedId = "test string";
                        componentInstance.verifyState(); 
                    }).not.toThrow(expectedErrorReturns["module-verifyProps-114"]);
                });
            });

            describe("when this.state.moduleData is not an object", () => {
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

                test.each(various_state)("Run verifyState(), when this.state.moduleData = %p (is not an object): Error \"module-verifyProps-111\" should be thrown", (val) => {
                    expect(() => {
                        componentInstance.state.moduleData = val;
                        componentInstance.verifyState(); 
                    }).toThrow(expectedErrorReturns["module-verifyProps-111"]);
                });
            });

            describe("when this.state.settings is not an object", () => {
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

                test.each(various_state)("Run verifyState(), when this.state.settings = %p (is not an object): Error \"module-verifyProps-112\" should be thrown", (val) => {
                    expect(() => {
                        componentInstance.state.settings = val;
                        componentInstance.verifyState(); 
                    }).toThrow(expectedErrorReturns["module-verifyProps-112"]);
                });
            });
        });
    })
}) 