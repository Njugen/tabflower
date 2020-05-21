import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import ETGMCreateNewGroupModal from './../../../../components/modals/existingTabGroupsModule/etgmCreateOrEditGroupModal';
import * as ExceptionsHandler from './../../../../components/utils/exceptionsAndHandler';
import * as validator from './../../../../components/utils/inputValidators';

const predefinedComponent = (props, options) => {
    props = props || {};

    const component = shallow(<ETGMCreateNewGroupModal {...props} />, options);
    return component;
}

let presetProps = {
    data: { },
    onRaiseToErrorOverlay: "",
    onDismiss: ""
};

let testComponent;
let componentInstance;

describe("Test <ETGMCreateNewGroupModal /> component behaviour at mount", () => {
    const actualErrorReturns = {
        "ETGMCreateNewGroupModal-115": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-115"),
        "ETGMCreateNewGroupModal-116": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-116"),
        "ETGMCreateNewGroupModal-117": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-117"),
        "ETGMCreateNewGroupModal-118": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-118"),
        "ETGMCreateNewGroupModal-119": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-119"),
        "ETGMCreateNewGroupModal-120": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-120"),
        "ETGMCreateNewGroupModal-122": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-122"),
        "ETGMCreateNewGroupModal-123": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-123"),
        "ETGMCreateNewGroupModal-124": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-124")
    };

    const expectedErrorReturns = {
        "ETGMCreateNewGroupModal-115": {
            name: "ValidatorError",
            message: "The \"type\" parameter in this.props.data.params needs to have either of the following values: \"currently-opened\", \"existing-group\" or \"new-group\". As a result, tab groups cannot be added nor edited at this time.",
            code: "ETGMCreateNewGroupModal-115"
        },
        "ETGMCreateNewGroupModal-116": {
            name: "ValidatorError",
            message: "The \"groupName\" parameter in this.props.data.params needs to be a text string if given. If a string is not available, remove \"groupName\" from props. As a result of this error, tab groups cannot be added nor edited at this time.",
            code: "ETGMCreateNewGroupModal-116"
        },
        "ETGMCreateNewGroupModal-117": {
            name: "ValidatorError",
            message: "The \"groupDescription\" parameter in this.props.data.params needs to be a text string if given. If a string is not available, remove \"groupDescription\" from props. As a result of this error, tab groups cannot be added nor edited at this time.",
            code: "ETGMCreateNewGroupModal-117"
        },
        "ETGMCreateNewGroupModal-118": {
            name: "ValidatorError",
            message: "The \"groupCloseAll\" parameter in this.props.data.params needs to be a boolean value (true or false) if given. If such a value is not available, remove \"groupCloseAll\" from props. As a result of this error, tab groups cannot be added nor edited at this time.",
            code: "ETGMCreateNewGroupModal-118"
        },
        "ETGMCreateNewGroupModal-119": {
            name: "ValidatorError",
            message: "The \"windowAndTabs\" parameter needs to be an object in this.props.data.params, containing information about all windows and tabs in a tab group. If there is no such information available, this parameter should be an empty object. As a result of this error, tab groups cannot be added nor edited at this time.",
            code: "ETGMCreateNewGroupModal-119"
        },
        "ETGMCreateNewGroupModal-120": {
            name: "ValidatorError",
            message: "The \"groupId\" parameter needs to be a string in this.props.data.params, containing an id string of the requested tab group. If such an id does not exist as a text string, refrain from providing the groupId variable when calling this modal. As a result of this error, the requested tab group cannot be identified and can therefore not be edited.",
            code: "ETGMCreateNewGroupModal-120"
        },
        "ETGMCreateNewGroupModal-122": {
            name: "ValidatorError",
            message: "The \"groupCloseInactiveTabs\" parameter in this.props.data.params needs to be a boolean value (true or false) if given. If such a value is not available, remove \"groupCloseInactiveTabs\" from props. As a result of this error, tab groups cannot be added nor edited at this time.",
            code: "ETGMCreateNewGroupModal-122"
        },
        "ETGMCreateNewGroupModal-123": {
            name: "ValidatorError",
            message: "The \"data\" variable either does not currently exist, nor is it currently an object, in this.props",
            code: "ETGMCreateNewGroupModal-123"
        },
        "ETGMCreateNewGroupModal-124": {
            name: "ValidatorError",
            message: "The \"params\" variable either does not currently exist, nor is it currently an object, in this.props.data",
            code: "ETGMCreateNewGroupModal-124"
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

        const various_nonString = [
            [{ testkey: "test value" }],
            [32],
            [null],
            [undefined],
            [false],
            [true],
            [[12,8,3,7]],
            [() => {}]
        ];

        const various_nonString_except_undefined = [
            [{ testkey: "test value" }],
            [32],
            [null],
            [false],
            [true],
            [[12,8,3,7]],
            [() => {}]
        ];

        const various_nonBool_except_undefined = [
            ["a very weird looking text string"],
            [{ testkey: "test value" }],
            [32],
            [null],
            [[12,8,3,7]],
            [() => {}]
        ];

        const various_nonArray_except_undefined = [
            ["a very weird looking text string"],
            [{ testkey: "test value" }],
            [32],
            [null],
            [false],
            [true],
            [() => {}]
        ];

        describe("Examine this.props.data passed to the component", () => {
            test("Run verifyChildProps(): Throw an error \"ETGMCreateNewGroupModal-123\" if the data variable does not exist in this.props", () => {
                expect(() => {
                    const presetProps = {
          
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-123"])
                
            });

            test.each(various_nonObjects)("Run verifyChildProps(): Throw an error \"ETGMCreateNewGroupModal-123\" if the data variable = %p (is not an object) in this.props", (val) => {
                expect(() => {
                    const presetProps = {
                        data: val
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-123"])
                

            })

            describe("When this.props.data is an object, examine this.props.data.params", () => {
                test("Run verifyChildProps(): Throw an error \"ETGMCreateNewGroupModal-124\" if the params variable does not exist in this.props.data", () => {
                    expect(() => {
                        const presetProps = {
                            data: {}
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyChildProps();
                    }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-124"])
                    
                });
    
                test.each(various_nonObjects)("Run verifyChildProps(): Throw an error \"ETGMCreateNewGroupModal-124\" if the params variable = %p (is not an object) in this.props.data", (val) => {
                    expect(() => {
                        const presetProps = {
                            data: {
                                params: val
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
    
                        componentInstance.verifyChildProps();
                    }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-124"])
                    
                });

                describe("When this.props.data.params, examine its contents and expect results accordingly", () => {
                    describe("Examine this.props.data.params.type", () => {
                        const expected_valid_type_string = [
                            ["currently-opened"],
                            ["new-group"],
                            ["existing-group"]
                        ];

                        const expected_invalid_type_string = [
                            ["Lorem ipsum dolor sit amet"],
                            ["consectetur adipiscing elit"],
                            ["Nunc rutrum lacinia dignissim"],
                            ["Curabitur ligula eros"],
                            ["Vestibulum efficitur euismod velit"],
                            ["Etiam quis nibh non arcu congue porttitor"]
                        ];

                        test("Run verifyChildProps(): If this.props.data.params.type is not a string, throw an error \"ETGMCreateNewGroupModal-114\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: 1234
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-114"])
                        })
                        
                        test.each(expected_valid_type_string)("Run verifyChildProps(): If this.props.data.params.type = %p (an expected string), do NOT throw an error \"ETGMCreateNewGroupModal-115\"", (val) => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: val
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-115"])
                        });

                        test.each(expected_invalid_type_string)("Run verifyChildProps(): If this.props.data.params.type = %p (not an expected string), throw an error \"ETGMCreateNewGroupModal-115\"", (val) => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: val
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-115"])
                        });

                    })
                    
                    describe("Examine this.props.data.params.groupId", () => {
                    
                        test("Run verifyChildProps(): If this.props.data.params.groupId does not exist, do not throw an error \"ETGMCreateNewGroupModal-120\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened"
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-120"])
                        });

                        test("Run verifyChildProps(): If this.props.data.params.groupId = \"any id string\", do not throw an error \"ETGMCreateNewGroupModal-120\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string"
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-120"])
                        });

                        test.each(various_nonString_except_undefined)("Run verifyChildProps(): If this.props.data.params.groupId = %p (not a string), throw an error \"ETGMCreateNewGroupModal-120\"", (val) => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: val
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-120"])
                        })
                    });

                    describe("Examine this.props.data.params.groupName", () => {
                    
                        test("Run verifyChildProps(): If this.props.data.params.groupName does not exist, do not throw an error \"ETGMCreateNewGroupModal-116\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string"
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-116"])
                        });

                        test("Run verifyChildProps(): If this.props.data.params.groupName = \"any name string\", do not throw an error \"ETGMCreateNewGroupModal-116\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string"
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-116"])
                        });

                        test.each(various_nonString_except_undefined)("Run verifyChildProps(): If this.props.data.params.groupName = %p (not a string), throw an error \"ETGMCreateNewGroupModal-116\"", (val) => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: val
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-116"])
                        })
                    });
                    
                    describe("Examine this.props.data.params.groupDescription", () => {
                    
                        test("Run verifyChildProps(): If this.props.data.params.groupDescription does not exist, do not throw an error \"ETGMCreateNewGroupModal-117\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string"
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-117"])
                        });

                        test("Run verifyChildProps(): If this.props.data.params.groupDescription = \"any description string\", do not throw an error \"ETGMCreateNewGroupModal-117\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string"
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-117"])
                        });

                        test.each(various_nonString_except_undefined)("Run verifyChildProps(): If this.props.data.params.groupDescription = %p (not a string), throw an error \"ETGMCreateNewGroupModal-117\"", (val) => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: val
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-117"])
                        })
                    });

                    describe("Examine this.props.data.params.groupCloseAll", () => {
                    
                        test("Run verifyChildProps(): If this.props.data.params.groupCloseAll does not exist, do not throw an error \"ETGMCreateNewGroupModal-118\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string"
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-118"])
                        });

                        test("Run verifyChildProps(): If this.props.data.params.groupCloseAll = true, do not throw an error \"ETGMCreateNewGroupModal-118\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string",
                                            groupCloseAll: true
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-118"])
                        });

                        test("Run verifyChildProps(): If this.props.data.params.groupCloseAll = false, do not throw an error \"ETGMCreateNewGroupModal-118\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string",
                                            groupCloseAll: false
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-118"])
                        });

                        test.each(various_nonBool_except_undefined)("Run verifyChildProps(): If this.props.data.params.groupCloseAll = %p (not a boolean), throw an error \"ETGMCreateNewGroupModal-118\"", (val) => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string",
                                            groupCloseAll: val
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-118"])
                        })
                    });

                    describe("Examine this.props.data.params.groupCloseInactiveTabs", () => {
                    
                        test("Run verifyChildProps(): If this.props.data.params.groupCloseInactiveTabs does not exist, do not throw an error \"ETGMCreateNewGroupModal-122\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string",
                                            groupCloseAll: true
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-122"])
                        });

                        test("Run verifyChildProps(): If this.props.data.params.groupCloseInactiveTabs = true, do not throw an error \"ETGMCreateNewGroupModal-122\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string",
                                            groupCloseAll: true,
                                            groupCloseInactiveTabs: true
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-122"])
                        });

                        test("Run verifyChildProps(): If this.props.data.params.groupCloseInactiveTabs = false, do not throw an error \"ETGMCreateNewGroupModal-122\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string",
                                            groupCloseAll: true,
                                            groupCloseInactiveTabs: false
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-122"])
                        });

                        test.each(various_nonBool_except_undefined)("Run verifyChildProps(): If this.props.data.params.groupCloseInactiveTabs = %p (not a boolean), throw an error \"ETGMCreateNewGroupModal-122\"", (val) => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string",
                                            groupCloseAll: true,
                                            groupCloseInactiveTabs: val
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-122"])
                        })
                    });

                    describe("Examine this.props.data.params.windowAndTabs", () => {
                    
                        test("Run verifyChildProps(): If this.props.data.params.windowAndTabs does not exist, do not throw an error \"ETGMCreateNewGroupModal-119\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string",
                                            groupCloseAll: true,
                                            groupCloseInactiveTabs: true
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-119"])
                        });

                        test("Run verifyChildProps(): If this.props.data.params.windowAndTabs is an array, do not throw an error \"ETGMCreateNewGroupModal-119\"", () => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string",
                                            groupCloseAll: true,
                                            groupCloseInactiveTabs: true,
                                            windowAndTabs: ["test array 1", "test array 2", "test array 3"]
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
            
                                componentInstance.verifyChildProps();
                            }).not.toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-119"])
                        });

                        test.each(various_nonArray_except_undefined)("Run verifyChildProps(): If this.props.data.params.windowAndTabs = %p (not an array), throw an error \"ETGMCreateNewGroupModal-119\"", (val) => {
                            expect(() => {
                                const presetProps = {
                                    data: {
                                        params: {
                                            type: "currently-opened",
                                            groupId: "any id string",
                                            groupName: "any name string",
                                            groupDescription: "any description string",
                                            groupCloseAll: true,
                                            groupCloseInactiveTabs: true,
                                            windowAndTabs: val
                                        }
                                    }
                                };
                                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                                componentInstance = testComponent.instance();
                                console.log(validator.isArray(val))
                                componentInstance.verifyChildProps();
                            }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-119"])
                        })
                    });
                })
            })
        })
        
    })
});