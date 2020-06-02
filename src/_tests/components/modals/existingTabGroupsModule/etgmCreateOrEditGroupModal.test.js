import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import ETGMCreateNewGroupModal from './../../../../components/modals/existingTabGroupsModule/etgmCreateOrEditGroupModal';
import * as ExceptionsHandler from './../../../../components/utils/exceptionsAndHandler';
import * as validator from './../../../../components/utils/inputValidators';

const predefinedComponent = (props, options) => {
    props = props || {};

    const component = shallow(<ETGMCreateNewGroupModal {...props} />, options);
    component.instance().render = jest.fn()
    return component;
}

let presetProps = {
    data: { },
    onRaiseToErrorOverlay: "",
    onDismiss: ""
};

let testComponent;
let componentInstance;

//jest.mock("./__mocks__/fetch");

describe("Test <ETGMCreateNewGroupModal /> component behaviour at mount", () => {
    const actualErrorReturns = {
        "ETGMCreateNewGroupModal-101": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-101"),
        "ETGMCreateNewGroupModal-102": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-102"),
        "ETGMCreateNewGroupModal-115": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-115"),
        "ETGMCreateNewGroupModal-116": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-116"),
        "ETGMCreateNewGroupModal-117": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-117"),
        "ETGMCreateNewGroupModal-118": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-118"),
        "ETGMCreateNewGroupModal-119": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-119"),
        "ETGMCreateNewGroupModal-120": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-120"),
        "ETGMCreateNewGroupModal-121": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-121"),
        "ETGMCreateNewGroupModal-122": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-122"),
        "ETGMCreateNewGroupModal-123": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-123"),
        "ETGMCreateNewGroupModal-124": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-124"),
        "ETGMCreateNewGroupModal-125": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-125"),
        "ETGMCreateNewGroupModal-126": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-126"),
        "ETGMCreateNewGroupModal-127": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-127"),
        "ETGMCreateNewGroupModal-128": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-128"),
        "ETGMCreateNewGroupModal-129": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-129"),
        "ETGMCreateNewGroupModal-130": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-130"),
        "ETGMCreateNewGroupModal-131": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-131"),
        "ETGMCreateNewGroupModal-132": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-132"),
        "ETGMCreateNewGroupModal-133": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-133"),
        "ETGMCreateNewGroupModal-134": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-134"),
        "ETGMCreateNewGroupModal-135": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-135"),
        "ETGMCreateNewGroupModal-136": ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-136")
    };

    const expectedErrorReturns = {
        "ETGMCreateNewGroupModal-101": {
            name: "ValidatorError",
            message: "The callback parameter is not a function",
            code: "ETGMCreateNewGroupModal-101"
        },
        "ETGMCreateNewGroupModal-102": {
            name: "ValidatorError",
            message: "A tab group id must be a string. The requested tab group could not be retrieved.",
            code: "ETGMCreateNewGroupModal-102"
        },
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
        "ETGMCreateNewGroupModal-121": {
            name: "ValidatorError",
            message: "The predefined tabs and arrays were provided to this modal in an incorrect format. As a result, no tab groups can be created at this moment.",
            code: "ETGMCreateNewGroupModal-121"
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
        },
        "ETGMCreateNewGroupModal-125": {
            name: "ValidatorError",
            message: "The \"tabGroupDetails\" object is missing in the component state, or might already exist but not as a function. Check that this object gets added at component mount.",
            code: "ETGMCreateNewGroupModal-125"
        },
        "ETGMCreateNewGroupModal-126": {
            name: "ValidatorError",
            message: "The \"success\" callback parameter is not a function. Field validation aborted.",
            code: "ETGMCreateNewGroupModal-126"
        },
        "ETGMCreateNewGroupModal-127": {
            name: "ValidatorError",
            message: "No information about the targetted tab group could be found. Task aborted.",
            code: "ETGMCreateNewGroupModal-127"
        },
        "ETGMCreateNewGroupModal-128": {
            name: "ValidatorError",
            message: "No windows nor tabs in the targetted tab group could be retrieved. Task aborted.",
            code: "ETGMCreateNewGroupModal-128"
        },
        "ETGMCreateNewGroupModal-129": {
            name: "ValidatorError",
            message: "The tab arrangement could not be fulfilled at the moment. Please contact the developer.",
            code: "ETGMCreateNewGroupModal-129"
        },
        "ETGMCreateNewGroupModal-130": {
            name: "ValidatorError",
            message: "There are no stored windows to work with.",
            code: "ETGMCreateNewGroupModal-130"
        },
        "ETGMCreateNewGroupModal-131": {
            name: "ValidatorError",
            message: "The targetted window does not exist.",
            code: "ETGMCreateNewGroupModal-131"
        },
        "ETGMCreateNewGroupModal-132": {
            name: "ValidatorError",
            message: "The targetted tab does not exist.",
            code: "ETGMCreateNewGroupModal-132"
        },
        "ETGMCreateNewGroupModal-133": {
            name: "ValidatorError",
            message: "The targetted tab does not exist.",
            code: "ETGMCreateNewGroupModal-133"
        },
        "ETGMCreateNewGroupModal-134": {
            name: "ValidatorError",
            message: "The targetted window does not exist.",
            code: "ETGMCreateNewGroupModal-134"
        },
        "ETGMCreateNewGroupModal-135": {
            name: "ValidatorError",
            message: "The required parameters were not provided to the data props of this modal. The attempt to add/modify a tab group is neglected.",
            code: "ETGMCreateNewGroupModal-135"
        },
        "ETGMCreateNewGroupModal-136": {
            name: "ValidatorError",
            message: "The data props section is missing or not an object when attempting to add/modify a tab group. The attempt to add/modify a tab group is neglected.",
            code: "ETGMCreateNewGroupModal-136"
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

    const various_nonFunctions = [
        [{ testkey: "test value" }],
        [32],
        [null],
        [undefined],
        [false],
        [true],
        [[12,8,3,7]],
        ["a text string"]
    ];

    const various_nonArrays = [
        [{ testkey: "test value" }],
        [32],
        [null],
        [undefined],
        [false],
        [true],
        [() => {}],
        ["a text string"]
    ];

    const various_nonNumber = [
        [{ testkey: "test value" }],
        [[12,8,3,7]],
        [null],
        [undefined],
        [false],
        [true],
        [() => {}],
        ["a text string"]
    ];


    describe("Test verifyChildProps()", () => {
        

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
        
    });

    describe("Test saveModalHandler(callback)", () => {
        describe("Case 1: if either the \"data\" or \"data.params\" are invalid", () => {
            describe("Subcase 1: The callback is a function", () => {
                test("Run saveModalHandler(() => {}): Throw an error \"ETGMCreateNewGroupModal-123\", if this.props.data does not exist", () => {
                    const presetProps = {
                        
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    const callback = jest.fn();
    
                    componentInstance.saveModalHandler(callback);
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-123");
                });
    
                test.each(various_nonObjects)("Run saveModalHandler(() => {}): Throw an error \"ETGMCreateNewGroupModal-123\", if this.props.data is not an object", (val) => {
                    const presetProps = {
                        data: val
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    const callback = jest.fn();
    
                    componentInstance.saveModalHandler(callback);
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-123");
                })
    
                test("Run saveModalHandler(() => {}): Throw an error \"ETGMCreateNewGroupModal-124\", if params does not exist in this.props.data", () => {
                    const presetProps = {
                        data: {
                        
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    const callback = jest.fn();
    
                    componentInstance.saveModalHandler(callback);
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-124");
                });
    
                test.each(various_nonObjects)("Run saveModalHandler(() => {}): Throw an error \"ETGMCreateNewGroupModal-124\", if params is not an object in this.props.data", (val) => {
                    const presetProps = {
                        data: {
                            params: val
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    const callback = jest.fn();
    
                    componentInstance.saveModalHandler(callback);
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-124");
                })
            })
            
            describe("Subcase 2: The callback is not a function (there is no callback)", () => {
                test("Run saveModalHandler(): Throw an error \"ETGMCreateNewGroupModal-123\", if this.props.data does not exist", () => {
                    const presetProps = {
                        
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler();
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-123");
                });
    
                test.each(various_nonObjects)("Run saveModalHandler(): Throw an error \"ETGMCreateNewGroupModal-123\", if this.props.data is not an object", (val) => {
                    const presetProps = {
                        data: val
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler();
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-123");
                })
    
                test("Run saveModalHandler(): Throw an error \"ETGMCreateNewGroupModal-124\", if params does not exist in this.props.data", () => {
                    const presetProps = {
                        data: {
                        
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler();
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-124");
                });
    
                test.each(various_nonObjects)("Run saveModalHandler(): Throw an error \"ETGMCreateNewGroupModal-124\", if params is not an object in this.props.data", (val) => {
                    const presetProps = {
                        data: {
                            params: val
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler();
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-124");
                })
            })
        })

        describe("Case 2: if data and data.params are both valid", () => {
            test("Run saveModalHandler(() => {}): the function this.validateFields() should be called", () => {
                const presetProps = {
                    data: {
                        params: {}
                    }
                };

                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
                componentInstance.validateFields = jest.fn();
                const callback = jest.fn();

                componentInstance.saveModalHandler(callback);

                expect(componentInstance.validateFields).toHaveBeenCalledWith(expect.any(Function))
            });

            test("Run saveModalHandler(() => {}): the function this.validateFields() should be called, which runs clearModalData() with certain parameters certain parameters certain parameters  in its callback", (done) => {
                const presetProps = {
                    data: {
                        params: {}
                    }
                };

                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
                
                const callback = jest.fn();
                

                componentInstance.validateFields = jest.fn(input => {
                    componentInstance.clearModalData = jest.fn();
                    input();
                    
                    expect(componentInstance.clearModalData).toHaveBeenCalledWith(callback());
                    expect(callback).toHaveBeenCalledWith(componentInstance.state.tabGroupDetails);
                    done();
                })
                
                componentInstance.saveModalHandler(callback);
            });

            test("Run saveModalHandler(): the error \"ETGMCreateNewGroupModal-101\" should be thrown", () => {
                const presetProps = {
                    data: {
                        params: {}
                    }
                };

                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
                componentInstance.validateFields = jest.fn();

                componentInstance.saveModalHandler();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-101");
            })

            test.each(various_nonFunctions)("Run saveModalHandler(%p): the error \"ETGMCreateNewGroupModal-101\" should be thrown", (val) => {
                const presetProps = {
                    data: {
                        params: {}
                    }
                };

                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
                componentInstance.validateFields = jest.fn();

                componentInstance.saveModalHandler(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-101");
            })

            test("Run saveModalHandler(): If error.issue is an object (when any error occurs), trigger ExceptionsHandler.ErrorHandler()", () => {
                
                const presetProps = {
                    data: {
                        params: {}
                    }
                };

                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                componentInstance.saveModalHandler();
                
                expect(ExceptionsHandler.ErrorHandler).toHaveBeenCalledTimes(1);
            })
        })
    });

    describe("Test dismissModalHandler()", () => {
        test("Run dismissModalHandler(): the function this.clearModalData() should be called", () => {
            componentInstance.clearModalData = jest.fn();
            componentInstance.dismissModalHandler();

            expect(componentInstance.clearModalData).toHaveBeenCalledTimes(1);
        })
    });

    describe("Test validateFields(success)", () => {
        describe("Case 1: if either the \"data\", \"data.params\" or \"success\" parameter are invalid", () => {
            describe("Subcase 1: The success is a function", () => {
                test("Run validateFields(() => {}): Throw an error \"ETGMCreateNewGroupModal-123\", if this.props.data does not exist", () => {
                    const presetProps = {
                        
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    const success = jest.fn();
    
                    componentInstance.validateFields(success);
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-123");
                });
    
                test.each(various_nonObjects)("Run validateFields(() => {}): Throw an error \"ETGMCreateNewGroupModal-123\", if this.props.data is not an object", (val) => {
                    const presetProps = {
                        data: val
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    const success = jest.fn();
    
                    componentInstance.validateFields(success);
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-123");
                })
    
                test("Run validateFields(() => {}): Throw an error \"ETGMCreateNewGroupModal-124\", if params does not exist in this.props.data", () => {
                    const presetProps = {
                        data: {
                        
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    const success = jest.fn();
    
                    componentInstance.validateFields(success);
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-124");
                });
    
                test.each(various_nonObjects)("Run validateFields(() => {}): Throw an error \"ETGMCreateNewGroupModal-124\", if params is not an object in this.props.data", (val) => {
                    const presetProps = {
                        data: {
                            params: val
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    const success = jest.fn();
    
                    componentInstance.validateFields(success);
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-124");
                })
            })
            
            describe("Subcase 2: The success is not a function (there is no success)", () => {
                test("Run validateFields(): Throw an error \"ETGMCreateNewGroupModal-126\", if there is no success callback", () => {
                    const presetProps = {
                        
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.validateFields();
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-126");
                });

                test.each(various_nonFunctions)("Run validateFields(): Throw an error \"ETGMCreateNewGroupModal-126\", if success = %p (not a function)", (val) => {
                    const presetProps = {
                        
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    const success = val

                    componentInstance.validateFields(success);
    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-126");
                });
            })
        })

        describe("Case 2: if data and data.params are both valid, and there is a valid success callback() function", () => {
            describe("Examine the situation when \"tabGroupDetails\" is NOT an object", () => {
                test("Run validateFields(success): If a \"tabGroupDetails\" object is missing in the component state, throw an error \"ETGMCreateNewGroupModal-125\"", () => {
                    const presetProps = {
                        data: {
                            params: {}
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    const success = jest.fn();

                    componentInstance.validateFields(success);
                
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-125");
                })
    
                test.each(various_nonObjects)("Run validateFields(success): If a \"tabGroupDetails\" = %p (is not an object) component state, throw an error \"ETGMCreateNewGroupModal-125\"", (val) => {
                    const presetProps = {
                        data: {
                            params: {}
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.state.tabGroupDetails = val;
                    const success = jest.fn();

                    componentInstance.validateFields(success);
                
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-125");
                })
            });
            
            describe("Examine the situation when \"tabGroupDetails\" is an object", () => {
                test("Run validateFields(success): If \"tabGroupDetails\" object exists in the component state, do not trigger any ExceptionsHandler.ValidatorError() functions", () => {
                    const presetProps = {
                        data: {
                            params: {
                                
                            }
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.state.tabGroupDetails = {};
                    const success = jest.fn();

                    componentInstance.validateFields(success);
                
                    expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalled();
                })

                describe("Examine the \"tabGroupName\" key located in the \"tabGroupDetails\" state object", () => {
                    test("Run validateFields(success): If \"tabGroupName\" does not exist in component state, call this.saveFieldErrorsToState()", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {};
                        componentInstance.saveFieldErrorsToState = jest.fn();
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.saveFieldErrorsToState).toHaveBeenCalled();
                    }); 

                    test.each(various_nonString)("Run validateFields(success): If \"tabGroupName\" = %p (is not a string) in component state, call this.saveFieldErrorsToState()", (val) => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {
                            tabGroupName: val
                        };
                        componentInstance.saveFieldErrorsToState = jest.fn();
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.saveFieldErrorsToState).toHaveBeenCalled();
                    }); 
                    
                    test("Run validateFields(success): If \"tabGroupName\" does not exist in component state, ensure an error is added to fieldErrors[\"tabGroupName\"] in component state", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {};
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.state.fieldErrors["tabGroupName"]).toBe("A tab group needs to be given a name or a label before it can be saved.");
                    }); 

                    test.each(various_nonString)("Run validateFields(success): If \"tabGroupName\" = %p (is not a string) in component state, ensure an error is added to fieldErrors[\"tabGroupName\"] in component state", (val) => {
                        const presetProps = {
                            data: {
                                params: {
                                    tabGroupName: val
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {

                        };
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.state.fieldErrors["tabGroupName"]).toBe("A tab group needs to be given a name or a label before it can be saved.");
                    }); 

                    test("Run validateFields(() => {}): If \"tabGroupName\" exists in component state, verify fieldErrors[\"tabGroupName\"] to be undefind in component state", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {
                            tabGroupName: "My Tab Group"
                        };
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.state.fieldErrors["tabGroupName"]).toBeUndefined();
                    });

                });

                describe("Examine the \"tabGroupDescription\" key located in the \"tabGroupDetails\" state object", () => {
                    test("Run validateFields(success): If \"tabGroupDescription\" does not exist in component state, call this.saveFieldErrorsToState()", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {};
                        componentInstance.saveFieldErrorsToState = jest.fn();
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.saveFieldErrorsToState).toHaveBeenCalled();
                    }); 
                    
                    test.each(various_nonString)("Run validateFields(success): If \"tabGroupDescription\" = %p (is not a string) in component state, call this.saveFieldErrorsToState()", (val) => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {
                            tabGroupDescription: val
                        };
                        componentInstance.saveFieldErrorsToState = jest.fn();
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.saveFieldErrorsToState).toHaveBeenCalled();
                    }); 

                    test("Run validateFields(success): If \"tabGroupDescription\" does not exist in component state, ensure an error is added to fieldErrors[\"tabGroupDescription\"] in component state", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {};
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.state.fieldErrors["tabGroupDescription"]).toBe("A tab group needs to be given a short description before it can be saved.");
                    }); 

                    test.each(various_nonString)("Run validateFields(success): If \"tabGroupDescription\" = %p (is not a string) in component state, ensure an error is added to fieldErrors[\"tabGroupDescription\"] in component state", (val) => {
                        const presetProps = {
                            data: {
                                params: {
                                    tabGroupDescription: val
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {

                        };
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.state.fieldErrors["tabGroupDescription"]).toBe("A tab group needs to be given a short description before it can be saved.");
                    }); 

                    test("Run validateFields(success): If \"tabGroupDescription\" exists in component state, verify fieldErrors[\"tabGroupDescription\"] to be undefind in component state", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {
                            tabGroupDescription: "This is a tab group created solely for the test suite"
                        };
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.state.fieldErrors["tabGroupDescription"]).toBeUndefined();
                    });

                });
                
                describe("Examine the \"windowAndTabs\" key located in the \"tabGroupDetails\" state object", () => {
                    test("Run validateFields(success): If \"windowAndTabs\" does not exist in component state, call this.saveFieldErrorsToState()", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {};
                        componentInstance.saveFieldErrorsToState = jest.fn();
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.saveFieldErrorsToState).toHaveBeenCalled();
                    }); 
                    
                    test.each(various_nonArrays)("Run validateFields(success): If \"windowAndTabs\" = %p (is not an array) in component state, call this.saveFieldErrorsToState()", (val) => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {
                            windowAndTabs: val
                        };
                        componentInstance.saveFieldErrorsToState = jest.fn();
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.saveFieldErrorsToState).toHaveBeenCalled();
                    }); 

                    test("Run validateFields(success): If \"windowAndTabs\" does not exist in component state, ensure an error is added to fieldErrors[\"windowAndTabs\"] in component state", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {};
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.state.fieldErrors["windowAndTabs"]).toBe("A tab group must consist of at least one window.");
                    }); 

                    test.each(various_nonArrays)("Run validateFields(success): If \"windowAndTabs\" = %p (is not an array) in component state, ensure an error is added to fieldErrors[\"windowAndTabs\"] in component state", (val) => {
                        const presetProps = {
                            data: {
                                params: {
                                    windowAndTabs: val
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {

                        };
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.state.fieldErrors["windowAndTabs"]).toBe("A tab group must consist of at least one window.");
                    }); 

                    test("Run validateFields(success): If \"windowAndTabs\" exists in component state, verify fieldErrors[\"windowAndTabs\"] to be undefind in component state", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {
                            windowAndTabs: [
                                { id: 1 }, { id: 2 }
                            ]
                        };
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.state.fieldErrors["windowAndTabs"]).toBeUndefined();
                    });

                    test("Run validateFields(success): If \"windowAndTabs\" = [] in component state, ensure an error is added to fieldErrors[\"windowAndTabs\"] in component state", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {
                            windowAndTabs: [
                                
                            ]
                        };
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.state.fieldErrors["windowAndTabs"]).toBe("A tab group must consist of at least one window.");
                    });

                });

                describe("Examine the situation when there are field errors", () => {
                    test("Run validateFields(success): Check that this test setup generates 3 field errors", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {};
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(Object.keys(componentInstance.state.fieldErrors).length).toBe(3);
                    });
                    
                    test("Run validateFields(success): When there is field error, call this.saveFieldErrorsToState()", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {};
                        componentInstance.saveFieldErrorsToState = jest.fn();
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.saveFieldErrorsToState).toHaveBeenCalled();
                    }); 

                    test("Run validateFields(success): When there are field errors, call ExceptionsHandler.ErrorHandler()", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {};
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(ExceptionsHandler.ErrorHandler).toHaveBeenCalled();
                    }); 

                    test("Run validateFields(success): When there are field errors, do not call the success() callback", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {};
                        const success = jest.fn();
                        componentInstance.validateFields(success);

                        expect(success).not.toHaveBeenCalled();
                    }); 
                });

                describe("Examine the situation when there are no field errors", () => {
                    const tabGroupDetails = {
                        tabGroupName: "Test Group",
                        tabGroupDescription: "This is a tab group created for testing purposes",
                        windowAndTabs: [{ id: 1 }, { id: 2 }]
                    };

                    test("Run validateFields(success): Check that this test setup generates 0 field errors", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = tabGroupDetails;
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(Object.keys(componentInstance.state.fieldErrors).length).toBe(0);
                    });
                    
                    test("Run validateFields(success): When there are no field error, do not call this.saveFieldErrorsToState()", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = tabGroupDetails;
                        componentInstance.saveFieldErrorsToState = jest.fn();
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(componentInstance.saveFieldErrorsToState).not.toHaveBeenCalled();
                    }); 

                    test("Run validateFields(success): When there are no field errors, do not call ExceptionsHandler.ErrorHandler()", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = tabGroupDetails;
                        const success = jest.fn();

                        componentInstance.validateFields(success);

                        expect(ExceptionsHandler.ErrorHandler).not.toHaveBeenCalled();
                    }); 

                    test("Run validateFields(success): When there are no field errors, call the success() callback function", () => {
                        const presetProps = {
                            data: {
                                params: {
                                    
                                }
                            }
                        };
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
                        componentInstance.state.tabGroupDetails = {
                            tabGroupName: "Test Group",
                            tabGroupDescription: "This is a tab group created for testing purposes",
                            windowAndTabs: [{ id: 1 }, { id: 2 }]
                        };
                        const success = jest.fn();
                        componentInstance.validateFields(success);

                        expect(success).toHaveBeenCalled();
                    }); 

                })
            });
            
        });
    }); 

    describe("Test setGroupId(id)", () => {
        const various_nonString = [
            [{ testkey: "test value" }],
            [32],
            [null],
            [false],
            [true],
            [[12,8,3,7]],
            [() => {}]
        ];

        test("Run setGroupId(): There is no input parameter. The function should generate a new string and return it", () => {
            expect(componentInstance.setGroupId()).toEqual(expect.any(String));
        });

        test("Run setGroupId(\"test2idString\"): There is a string as input parameter. The same string should be returned by the function", () => {
            expect(componentInstance.setGroupId("test2idString")).toEqual("test2idString");
        })

        test.each(various_nonString)("Run setGroupId(%p): The input parameter is not a string, throw an error \"ETGMCreateNewGroupModal-102\"", (val) => {
            componentInstance.setGroupId(val);
            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-102");
        })
    });

    describe("Test childComponentDidMount()", () => {
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
            test("Run childComponentDidMount(): if this.props.data object is missing, throw an error \"ETGMCreateNewGroupModal-127\"", () => {
                const presetProps = {
               
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
                componentInstance.childComponentDidMount();
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-127");
            });
    
            test.each(various_nonObjects)("Run childComponentDidMount(): if this.props.data = %p (is not an object), throw an error \"ETGMCreateNewGroupModal-127\"", (val) => {
                const presetProps = {
                    data: val
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
                componentInstance.childComponentDidMount();
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-127");
            });

            describe("Examine the \"params\" object of this.props.data", () => {
                test("Run childComponentDidMount(): if this.props.data.params object is missing, throw an error \"ETGMCreateNewGroupModal-127\"", () => {
                    const presetProps = {
                        data: {}
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.childComponentDidMount();
        
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-127");
                });
        
                test.each(various_nonObjects)("Run childComponentDidMount(): if this.props.data.params = %p (is not an object), throw an error \"ETGMCreateNewGroupModal-127\"", (val) => {
                    const presetProps = {
                        data: {
                            params: val
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.childComponentDidMount();
        
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-127");
                });
            });

            describe("Examine the \"windowAndTabs\" array of this.props.data.params", () => {
                test("Run childComponentDidMount(): If this.props.data.params.windowAndTabs is missing, throw an error \"ETGMCreateNewGroupModal-128\"", () => {
                    const presetProps = {
                        data: {
                            params: {
                                
                            }
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.childComponentDidMount();
        
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-128");
                });

                test.each(various_nonArrays)("Run childComponentDidMount(): If this.props.data.params.windowAndTabs = %p (is not an array), throw an error \"ETGMCreateNewGroupModal-128\"", (val) => {
                    const presetProps = {
                        data: {
                            params: {
                                windowAndTabs: val
                            }
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.childComponentDidMount();
        
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-128");
                });

                test("Run childComponentDidMount(): If this.props.data.params.windowAndTabs is an array, pass it to this.saveToState() with correct parameters", () => {
                    const presetProps = {
                        data: {
                            params: {
                                windowAndTabs: []
                            }
                        }
                    };

                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.saveToState = jest.fn();
                    componentInstance.childComponentDidMount();
        
                    expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", presetProps.data.params.windowAndTabs, "tabGroupDetails");
                });

                test("Run childComponentDidMount(): If this.props.data.params.windowAndTabs is an array, do not throw an error \"ETGMCreateNewGroupModal-128\"", () => {
                    const presetProps = {
                        data: {
                            params: {
                                windowAndTabs: []
                            }
                        }
                    };

                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.saveToState = jest.fn();
                    componentInstance.childComponentDidMount();
        
                    expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMCreateNewGroupModal-128");
                });
            });

            describe("Examine the \"groupId\" string of this.props.data.params", () => {
                test("Run childComponentDidMount(): If this.props.data.params.windowAndTabs is missing or is not an array, the this.saveToState function which adds the groupId to component state will never be called", () => {
                    const presetProps = {
                        data: {
                            params: {
                                
                            }
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.saveToState = jest.fn();
                    componentInstance.childComponentDidMount();
        
                    expect(componentInstance.saveToState).not.toHaveBeenCalledWith("groupId", expect.anything(), "tabGroupDetails");
                });

                test("Run childComponentDidMount(): If this.props.data.params.windowAndTabs is an array, the this.saveToState function which adds the groupId to component state will be called", () => {
                    const presetProps = {
                        data: {
                            params: {
                                windowAndTabs: []
                            }
                        }
                    };

                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.saveToState = jest.fn();
                    componentInstance.childComponentDidMount();
        
                    expect(componentInstance.saveToState).toHaveBeenCalledWith("groupId", expect.anything(), "tabGroupDetails");
                });
            });
        });
    });

    describe("Test loadUrl(url, success, fail)", () => {
        describe("Examine the \"url\" parameter, while \"success\" and \"fail\" can be anything", () => {
            test("Run loadUrl(\"A text string\", ANYTHING, ANYTHING): Do not throw an error \"ETGMCreateNewGroupModal-104\" since \"url\" is a string", () => {
                componentInstance.loadUrl("A text string", expect.anything(), expect.anything());
    
                expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMCreateNewGroupModal-104");
            })

            test.each(various_nonString)("Run loadUrl(%p, ANYTHING, ANYTHING): Throw an error \"ETGMCreateNewGroupModal-104\" since \"url\" is not a string", (val) => {
                componentInstance.loadUrl(val, expect.anything(), expect.anything());
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-104");
            })
        });
           
        describe("Examine the \"success\" parameter, while \"url\" is a string and \"fail\" can be anything", () => {
            test("Run loadUrl(\"A text string\", () => {}, ANYTHING): Do not throw an error \"ETGMCreateNewGroupModal-105\" since \"success\" is a function", () => {
                componentInstance.loadUrl("A text string", () => {}, expect.anything());
    
                expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMCreateNewGroupModal-105");
            })

            test.each(various_nonFunctions)("Run loadUrl(\"A text string\", %p, ANYTHING): Throw an error \"ETGMCreateNewGroupModal-105\" since \"success\" is not a function", (val) => {
                componentInstance.loadUrl("A text string", val, expect.anything());
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-105");
            })
        });

        describe("Examine the \"fail\" parameter, while \"url\" is a string and \"success\" is a function", () => {
            test("Run loadUrl(\"A text string\", () => {}, () => {})): Do not throw an error \"ETGMCreateNewGroupModal-106\" since \"fail\" is a function", () => {
                componentInstance.loadUrl("A text string", () => {}, () => {});
    
                expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMCreateNewGroupModal-106");
            })

            test.each(various_nonFunctions)("Run loadUrl(\"A text string\", () => {}, %p): Throw an error \"ETGMCreateNewGroupModal-106\" since \"fail\" is not a function", (val) => {
                componentInstance.loadUrl("A text string", () => {}, val);
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-106");
            })
        });

        describe("Examine the ExceptionsHandler.ValidatorError() function, when one or more parameters are incorrect. That function is only called once when error is thrown", () => {
            test("Run loadUrl([], () => {}, () => {})): The \"url\" parameter is incorrect, ExceptionsHandler.ValidatorError() is called only once", () => {
                componentInstance.loadUrl([], () => {}, () => {});
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledTimes(1);
            })

            test("Run loadUrl([], \"blablabla\", () => {})): The \"url\" and \"success\" parameters are incorrect, ExceptionsHandler.ValidatorError() is called only once", () => {
                componentInstance.loadUrl([], "blablabla", () => {});
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledTimes(1);
            });

            test("Run loadUrl([], \"blablabla\", {}): all parameters are incorrect, ExceptionsHandler.ValidatorError() is called only once", () => {
                componentInstance.loadUrl([], "blablabla", {});
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledTimes(1);
            });

            test("Run loadUrl(\"A text string\", \"blablabla\", {}): only \"url\" parameter is correct, ExceptionsHandler.ValidatorError() is called only once", () => {
                componentInstance.loadUrl("A text string", "blablabla", {});
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledTimes(1);
            });
        });

        describe("Examine the fetch() response, and check that success/fail is correctly called depending on the circumstances", () => {
            global.fetch = jest.fn((url) => {
                console.log("ACDC", url);
                return new Promise((resolve, reject) => {
                    const response = {
                        ok: true,
                        text: () => {
                            return "This is a mocked response text";
                        }
                    };

                    process.nextTick(() => {
                        if(response.ok === true){
                            resolve(response);
                        } else {
                            reject(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-103"));   
                        }
                    }) 
                    
                })
            });

            test("Run loadUrl(\"A text string\", success, fail), where \"success\" and \"fail\" are both functions: call \"success\" with response.text() as parameter, if response.ok is truthy", () => {
                
                const success = jest.fn();
                const fail = jest.fn();
                
                global.fetch = jest.fn((url) => {
                    return new Promise((resolve, reject) => {
                        const response = {
                            ok: true,
                            text: () => {
                                return "This is a mocked response text";
                            }
                        };
    
                        process.nextTick(() => {
                            if(response.ok === true){
                                resolve(response);
                            } else {
                                reject(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-103"));   
                            }
                        }) 
                        
                    })
                });

                expect.assertions(1);

                return componentInstance.loadUrl("A text string", success, fail).then(() => {
                    expect(success).toHaveBeenCalledWith("This is a mocked response text");
                });
                
            }); 
            
            test("Run loadUrl(\"A text string\", success, fail), where \"success\" and \"fail\" are both functions: call \"fail\" with response.text() as parameter, if response.ok is truthy", () => {
                
                const success = jest.fn();
                const fail = jest.fn();
                
                global.fetch = jest.fn((url) => {
                    return new Promise((resolve, reject) => {
                        const response = {
                            ok: false,
                            text: () => {
                                return "This is a mocked response text";
                            }
                        };
    
                        process.nextTick(() => {
                            if(response.ok === true){
                                resolve(response);
                            } else {
                                reject(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-103"));   
                            }
                        }) 
                        
                    })
                });

                expect.assertions(1);

                return componentInstance.loadUrl("A text string", success, fail).then(() => {
                    expect(fail).toHaveBeenCalledWith(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-103"));
                });
                
            }); 
     
        });
    });

    describe("Test addNewWindow(inputUrl)", () => {
        describe("Examine inputUrl parameter", () => {
            test("Run addNewWindow(\"https://google.com\"): An error \"ETGMCreateNewGroupModal-104\" should not be thrown, because inputUrl is a string", () => {
                componentInstance.addNewWindow("https://google.com");

                expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMCreateNewGroupModal-104");
            });

            test.each(various_nonString)("Run addNewWindow(%p): An error \"ETGMCreateNewGroupModal-104\" should be thrown, because inputUrl is not a string", (val) => {
                componentInstance.addNewWindow(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-104");
            });

            describe("Examine the situations where inputUrl is a string", () => {
                test("Run addNewWindow(\"https://google.com\"), if \"tabGroupDetails\" is missing in component state: throw the error \"ETGMCreateNewGroupModal-125\"", () => {
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    componentInstance.addNewWindow(url);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-125");
                })

                test.each(various_nonObjects)("Run addNewWindow(\"https://google.com\"), if \"tabGroupDetails\" = %p (is not an object) in component state: throw the error \"ETGMCreateNewGroupModal-125\"", (val) => {
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    componentInstance.state.tabGroupDetails = val;
                    componentInstance.addNewWindow(url);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-125");
                })

                test("Run addNewWindow(\"https://google.com\"), if \"tabGroupDetails\" is an object in component state: call this.loadUrl(\"https://google.com\", ANYTHING, ANYTHING)", () => {
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    componentInstance.state.tabGroupDetails = {};
                    componentInstance.addNewWindow(url);
                    
                    expect(componentInstance.loadUrl).toHaveBeenCalledWith(url, expect.anything(), expect.anything());
                });

                test("Run addNewWindow(\"https://google.com\"), while \"tabGroupDetails\" is an empty object in component state: if this.loadUrl(ANY STRING, success, fail) triggers its success callback then this.saveToState(payload) should be triggered with test specified payload", () => {
                    /*
                        To note:

                        While tabGroupDetails is an empty object, only the new window will used as a parameter when calling
                        saveToState().
                    */
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    
                    componentInstance.state.tabGroupDetails = {};
                    componentInstance.saveToState = jest.fn();

                    const responseText = "A text string acting as responseText for this test";

                    componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
                        success(responseText);
                    });
                    componentInstance.addNewWindow(url);
                    expect(componentInstance.saveToState).toHaveBeenCalledWith(
                        "windowAndTabs",
                        [
                            {
                                tabs: [
                                    {
                                        title: expect.anything(),
                                        favIconUrl: url + "/favicon.ico",
                                        url: url
                                    }
                                ]
                            }
                        ],
                        "tabGroupDetails"
                    );
                  
                });

                test("Run addNewWindow(\"https://google.com\"), while \"tabGroupDetails\" is an object (which also consists of a filled \"windowAndTabs\" key) in component state: if this.loadUrl(ANY STRING, success, fail) triggers its success callback then this.saveToState(payload) should be triggered with test specified payload", () => {
                    /*
                        To note:

                        While tabGroupDetails.windowAndTabs exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling saveToState()
                    */
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    
                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [{ name: "window 1" }, { name: "window 2" }, { name: "window 3" }]
                    };
                    componentInstance.saveToState = jest.fn();

                    const responseText = "A text string acting as responseText for this test";

                    componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
                        success(responseText);
                    });
                    componentInstance.addNewWindow(url);
                    expect(componentInstance.saveToState).toHaveBeenCalledWith(
                        "windowAndTabs",
                        [
                            ...componentInstance.state.tabGroupDetails.windowAndTabs,
                            {
                                tabs: [
                                    {
                                        title: expect.anything(),
                                        favIconUrl: url + "/favicon.ico",
                                        url: url
                                    }
                                ]
                            }
                        ],
                        "tabGroupDetails"
                    );
                  
                });

                test("Run addNewWindow(\"https://google.com\"), while \"tabGroupDetails\" is an empty object in component state: if this.loadUrl(ANY STRING, success, fail) triggers its fail callback then this.saveToState(payload) should be triggered with test specified payload", () => {
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    
                    componentInstance.state.tabGroupDetails = {};
                    componentInstance.saveToState = jest.fn();

                    
                    componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
                        fail();
                    });
                    componentInstance.addNewWindow(url);
                    expect(componentInstance.saveToState).toHaveBeenCalledWith(
                        "windowAndTabs",
                        [
                            {
                                tabs: [
                                    {
                                        title: url,
                                        favIconUrl: url + "/favicon.ico",
                                        url: url
                                    }
                                ]
                            }
                        ],
                        "tabGroupDetails"
                    );
                  
                });

                test("Run addNewWindow(\"https://google.com\"), while \"tabGroupDetails\" is an object (which also consists of a filled \"windowAndTabs\" key) in component state: if this.loadUrl(ANY STRING, success, fail) triggers its fail callback then this.saveToState(payload) should be triggered with test specified payload", () => {
                    /*
                        To note:

                        While tabGroupDetails.windowAndTabs exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling saveToState()
                    */
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    
                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [{ name: "window 1" }, { name: "window 2" }, { name: "window 3" }]
                    };
                    componentInstance.saveToState = jest.fn();

                    const responseText = "A text string acting as responseText for this test";

                    componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
                        fail(responseText);
                    });
                    componentInstance.addNewWindow(url);
                    expect(componentInstance.saveToState).toHaveBeenCalledWith(
                        "windowAndTabs",
                        [
                            ...componentInstance.state.tabGroupDetails.windowAndTabs,
                            {
                                tabs: [
                                    {
                                        title: url,
                                        favIconUrl: url + "/favicon.ico",
                                        url: url
                                    }
                                ]
                            }
                        ],
                        "tabGroupDetails"
                    );
                  
                });
            })
                
        })
    });

    describe("Test addNewTab(inputUrl, index)", () => {
        describe("Examine inputUrl parameter", () => {
            test("Run addNewTab(\"https://google.com\"): An error \"ETGMCreateNewGroupModal-104\" should not be thrown, because inputUrl is a string", () => {
                componentInstance.addNewTab("https://google.com");

                expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMCreateNewGroupModal-108");
            });

            test.each(various_nonString)("Run addNewTab(%p): An error \"ETGMCreateNewGroupModal-104\" should be thrown, because inputUrl is not a string", (val) => {
                componentInstance.addNewTab(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-108");
            });

            test("Run addNewTab(\"https://google.com\", 10): An error \"ETGMCreateNewGroupModal-107\" should not be thrown, because inputUrl is a string and index is a number", () => {
                componentInstance.addNewTab("https://google.com", 10);

                expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMCreateNewGroupModal-107");
            })

            test.each(various_nonNumber)("Run addNewTab(\"https://google.com\", %p): An error \"ETGMCreateNewGroupModal-107\" should be thrown, because inputUrl is a string and index is not a number", (val) => {
                componentInstance.addNewTab("https://google.com", val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-107");
            });

            describe("Examine the situations where inputUrl is a string and index is a number (index = 0 in this test section)", () => {
                test("Run addNewTab(\"https://google.com\", 0), if \"tabGroupDetails\" is missing in component state: throw the error \"ETGMCreateNewGroupModal-125\"", () => {
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    componentInstance.addNewTab(url, 0);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-125");
                })

                test.each(various_nonObjects)("Run addNewTab(\"https://google.com\", 0), if \"tabGroupDetails\" = %p (is not an object) in component state: throw the error \"ETGMCreateNewGroupModal-125\"", (val) => {
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    componentInstance.state.tabGroupDetails = val;
                    componentInstance.addNewTab(url, 0);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-125");
                })

                test("Run addNewTab(\"https://google.com\", 0), if \"tabGroupDetails\" is an empty object in component state: throw an error \"ETGMCreateNewGroupModal-129\"", () => {
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    componentInstance.state.tabGroupDetails = {};
                    componentInstance.addNewTab(url, 0);
                    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-129");
                    //expect(componentInstance.loadUrl).toHaveBeenCalledWith(url, expect.anything(), expect.anything());
                });

                test("Run addNewTab(\"https://google.com\", 0), while \"tabGroupDetails\" is an empty object in component state: throw an error \"ETGMCreateNewGroupModal-129\"", () => {
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    
                    componentInstance.state.tabGroupDetails = {};
                    
                    componentInstance.addNewTab(url, 0);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-129");
                  
                });

                test("Run addNewTab(\"https://google.com\", 0), while \"tabGroupDetails\" is an object (which also consists of a filled \"windowAndTabs\" key) in component state: if this.loadUrl(ANY STRING, success, fail) triggers its success callback then this.saveToState(payload) should be triggered with test specified payload", () => {
                    /*
                        To note:

                        While tabGroupDetails.windowAndTabs exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling saveToState()
                    */
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    
                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [{ name: "window 1", tabs: [] }, { name: "window 2", tabs: []  }, { name: "window 3", tabs: []  }]
                    };
                    componentInstance.saveToState = jest.fn();

                    const responseText = "A text string acting as responseText for this test";

                    componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
                        success(responseText);
                    });
                    componentInstance.addNewTab(url, 0);

                    let parsedWindows = JSON.parse(JSON.stringify(componentInstance.state.tabGroupDetails.windowAndTabs));
                    parsedWindows[0].tabs.push({
                        title: expect.anything(),
                        favIconUrl: url + "/favicon.ico",
                        url: url
                    })

                    expect(componentInstance.saveToState).toHaveBeenCalledWith(
                        "windowAndTabs",
                        parsedWindows,
                        "tabGroupDetails"
                    );
                  
                });

                test("Run addNewTab(\"https://google.com\", 0), while \"tabGroupDetails\" is an object (which also consists of an empty \"windowAndTabs\" array key) in component state:  throw an error \"ETGMCreateNewGroupModal-129\"", () => {
                    /*
                        To note:

                        While tabGroupDetails.windowAndTabs exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling saveToState()
                    */
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    
                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: []
                    };
                    
                    componentInstance.addNewTab(url, 0);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-129");
                  
                });

                test.each(various_nonArrays)("Run addNewTab(\"https://google.com\", 0), while \"tabGroupDetails\" is an object (which also consists of a \"windowAndTabs\" key which is not an array) in component state:  throw an error \"ETGMCreateNewGroupModal-129\"", (val) => {
                    /*
                        To note:

                        While tabGroupDetails.windowAndTabs exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling saveToState()
                    */
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    
                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: val
                    };
                    
                    componentInstance.addNewTab(url, 0);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-129");
                  
                });


                test("Run addNewTab(\"https://google.com\", 0), while \"tabGroupDetails\" is an empty object (which also doesn't have windowAndTabs key) in component state: throw an error \"ETGMCreateNewGroupModal-129\"", () => {
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    
                    componentInstance.state.tabGroupDetails = {};
                    
                    componentInstance.addNewTab(url, 0);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-129");
                });

                test("Run addNewTab(\"https://google.com\", 0), while \"tabGroupDetails\" is an object (which also consists of a filled \"windowAndTabs\" key) in component state: if this.loadUrl(ANY STRING, success, fail) triggers its fail callback then this.saveToState(payload) should be triggered with test specified payload", () => {
                    /*
                        To note:

                        While tabGroupDetails.windowAndTabs exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling saveToState()
                    */
                    componentInstance.loadUrl = jest.fn();

                    const url = "https://google.com";
                    
                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [{ name: "window 1", tabs: [] }, { name: "window 2", tabs: []  }, { name: "window 3", tabs: []  }]
                    };
                    componentInstance.saveToState = jest.fn();

                    const responseText = "A text string acting as responseText for this test";

                    componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
                        fail(responseText);
                    });
                    componentInstance.addNewTab(url, 0);

                    let parsedWindows = JSON.parse(JSON.stringify(componentInstance.state.tabGroupDetails.windowAndTabs));
                    parsedWindows[0].tabs.push({
                        title: url,
                        favIconUrl: url + "/favicon.ico",
                        url: url
                    })

                    expect(componentInstance.saveToState).toHaveBeenCalledWith(
                        "windowAndTabs",
                        parsedWindows,
                        "tabGroupDetails"
                    );
                  
                });
            }) 
                
        })
    });

    describe("Test deleteTab(windowIndex, tabIndex)", () => {
        describe("Examine the windowIndex parameter", () => {

            test.each(various_nonNumber)("Run deleteTab(%p): Throw an error \"ETGMCreateNewGroupModal-110\", because windowIndex is NOT a number", (val) => {
                componentInstance.deleteTab(val);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-110");
            });

            test("Run deleteTab(): Throw an error \"ETGMCreateNewGroupModal-110\", because windowIndex is missing/undefined", () => {
                componentInstance.deleteTab();
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-110");
            });

            test("Run deleteTab(-1): Throw an error \"ETGMCreateNewGroupModal-110\", because windowIndex is a negative number", () => {
                componentInstance.deleteTab(-1);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-110");
            });

            test("Run deleteTab(0): do not throw an \"ETGMCreateNewGroupModal-110\" error, windowIndex is a number and is not negative", () => {
                componentInstance.deleteTab(0);
                
                expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMCreateNewGroupModal-110");
            });
        });

        describe("Examine the tabIndex parameter", () => {
            test("Run deleteTab(0): throw an error \"ETGMCreateNewGroupModal-109\", because tabIndex is missing/undefined", () => {
                componentInstance.deleteTab(0);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-109");
            })

            test.each(various_nonNumber)("Run deleteTab(0, %p): throw an error \"ETGMCreateNewGroupModal-109\", because tabIndex is not a number", (val) => {
                componentInstance.deleteTab(0, val);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-109");
            })

            test("Run deleteTab(0, -1): throw an error \"ETGMCreateNewGroupModal-109\", because tabIndex is a negative number", () => {
                componentInstance.deleteTab(0, -1);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-109");
            });

            test("Run deleteTab(0, 0): do not throw an error \"ETGMCreateNewGroupModal-109\", because tabIndex is not a negative number", () => {
                componentInstance.deleteTab(0, 0);
                
                expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMCreateNewGroupModal-109");
            });
        });

        describe("Examine various function scenarios using valid combinations of windowIndex and tabIndex", () => {
            describe("Examine the function, when windowIndex = 0", () => {    
                test("Run deleteTab(0, 0), when windowAndTabs array in component state is not filled: throw an error \"ETGMCreateNewGroupModal-130\"", () => {
                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: []
                    };

                    componentInstance.deleteTab(0, 0);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-130");
                });

                test("Run deleteTab(0, 0), when windowAndTabs array in component state is filled (targetted window has no tabs): call this.saveToState() with parameters conditioned in this this test", () => {
                    /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window does not have any more tabs after the targetted tab being closed, shut the window down
                        3. Check that saveToState is called with correctly manufactured parameters
                    */
            
                    const windowIndex = 0;
                    const tabIndex = 0;

                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [
                            { name: "window 1", tabs: [] }, 
                            { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 3", tabs: [{ name: "tab 1" }] }
                        ]
                    };

                    let windows = JSON.stringify(componentInstance.state.tabGroupDetails.windowAndTabs.map(value => value));
                    let testWindows = JSON.parse(windows);

                    componentInstance.saveToState = jest.fn();
                    componentInstance.deleteTab(windowIndex, tabIndex);

                    testWindows[windowIndex].tabs.splice(tabIndex, 1);

                    testWindows.splice(windowIndex, 1);


                    expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", testWindows, "tabGroupDetails");
                })

                test("Run deleteTab(0, 0), when windowAndTabs array in component state is filled (targetted window has one tab): call this.saveToState() with parameters conditioned in this this test", () => {
                    /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window does not have any more tabs after the targetted tab being closed, shut the window down
                        3. Check that saveToState is called with correctly manufactured parameters
                    */
            
                    const windowIndex = 0;
                    const tabIndex = 0;

                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [
                            { name: "window 1", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 3", tabs: [{ name: "tab 1" }] }
                        ]
                    };

                    let windows = JSON.stringify(componentInstance.state.tabGroupDetails.windowAndTabs.map(value => value));
                    let testWindows = JSON.parse(windows);

                    componentInstance.saveToState = jest.fn();
                    componentInstance.deleteTab(windowIndex, tabIndex);

                    testWindows[windowIndex].tabs.splice(tabIndex, 1);

                    testWindows.splice(windowIndex, 1);

                    expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", testWindows, "tabGroupDetails");
                })

                test("Run deleteTab(0, 0), when windowAndTabs array in component state is filled (targetted window has multiple tabs): call this.saveToState() with parameters conditioned in this test", () => {
                    /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window still has tabs after the targetted tab being closed, do not splice any windows
                        3. Check that saveToState is called with correctly manufactured parameters
                    */

                    const windowIndex = 0;
                    const tabIndex = 0;

                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [
                            { name: "window 1", tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }] }, 
                            { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 3", tabs: [{ name: "tab 1" }] }
                        ]
                    };

                    let windows = JSON.stringify(componentInstance.state.tabGroupDetails.windowAndTabs.map(value => value));
                    let testWindows = JSON.parse(windows);
                    componentInstance.saveToState = jest.fn();
                    
                    componentInstance.deleteTab(windowIndex, tabIndex);

                    testWindows[windowIndex].tabs.splice(tabIndex, 1);

                    expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", testWindows, "tabGroupDetails");
                }); 

                test("Run deleteTab(20, 0), when windowAndTabs array in component state is filled: throw error \"ETGMCreateNewGroupModal-131\" because the targetted window does not exist", () => {
                    /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window still has tabs after the targetted tab being closed, do not splice any windows
                        3. Check that saveToState is called with correctly manufactured parameters
                    */

                    const windowIndex = 20;
                    const tabIndex = 0;

                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [
                            { name: "window 1", tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }] }, 
                            { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 3", tabs: [{ name: "tab 1" }] }
                        ]
                    };

                    componentInstance.deleteTab(windowIndex, tabIndex);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-131");
                }); 

                test("Run deleteTab(0, 20), when windowAndTabs array in component state is filled (targetted window has multiple tabs): call this.saveToState() with parameters conditioned in this test", () => {
                    /*
                        Checking test:
                        1. A tab is targetted, but it does not exist. Save all the existing windowAndTabs to state unmodified
                    */

                    const windowIndex = 0;
                    const tabIndex = 20;

                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [
                            { name: "window 1", tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }] }, 
                            { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 3", tabs: [{ name: "tab 1" }] }
                        ]
                    };

                    let windows = JSON.stringify(componentInstance.state.tabGroupDetails.windowAndTabs.map(value => value));
                    let testWindows = JSON.parse(windows);
                    componentInstance.saveToState = jest.fn();
                    
                    componentInstance.deleteTab(windowIndex, tabIndex);

                    expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", testWindows, "tabGroupDetails");
                }); 
            });

            describe("Examine the function, when windowIndex = 1", () => {    
                test("Run deleteTab(1, 0), when windowAndTabs array in component state is not filled: throw an error \"ETGMCreateNewGroupModal-130\"", () => {
                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: []
                    };

                    componentInstance.deleteTab(1, 0);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-130");
                });

                test("Run deleteTab(1, 0), when windowAndTabs array in component state is filled (targetted window has no tabs): call this.saveToState() with parameters conditioned in this this test", () => {
                    /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window does not have any more tabs after the targetted tab being closed, shut the window down
                        3. Check that saveToState is called with correctly manufactured parameters
                    */
            
                    const windowIndex = 1;
                    const tabIndex = 0;

                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [
                            { name: "window 1", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 2", tabs: [] }, 
                            { name: "window 3", tabs: [{ name: "tab 1" }] }
                        ]
                    };

                    let windows = JSON.stringify(componentInstance.state.tabGroupDetails.windowAndTabs.map(value => value));
                    let testWindows = JSON.parse(windows);

                    componentInstance.saveToState = jest.fn();
                    componentInstance.deleteTab(windowIndex, tabIndex);

                    testWindows[windowIndex].tabs.splice(tabIndex, 1);

                    testWindows.splice(windowIndex, 1);


                    expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", testWindows, "tabGroupDetails");
                })

                test("Run deleteTab(1, 0), when windowAndTabs array in component state is filled (targetted window has one tab): call this.saveToState() with parameters conditioned in this this test", () => {
                    /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window does not have any more tabs after the targetted tab being closed, shut the window down
                        3. Check that saveToState is called with correctly manufactured parameters
                    */
            
                    const windowIndex = 1;
                    const tabIndex = 0;

                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [
                            { name: "window 1", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 3", tabs: [{ name: "tab 1" }] }
                        ]
                    };

                    let windows = JSON.stringify(componentInstance.state.tabGroupDetails.windowAndTabs.map(value => value));
                    let testWindows = JSON.parse(windows);

                    componentInstance.saveToState = jest.fn();
                    componentInstance.deleteTab(windowIndex, tabIndex);

                    testWindows[windowIndex].tabs.splice(tabIndex, 1);

                    testWindows.splice(windowIndex, 1);

                    expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", testWindows, "tabGroupDetails");
                })

                test("Run deleteTab(1, 0), when windowAndTabs array in component state is filled (targetted window has multiple tabs): call this.saveToState() with parameters conditioned in this test", () => {
                    /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window still has tabs after the targetted tab being closed, do not splice any windows
                        3. Check that saveToState is called with correctly manufactured parameters
                    */

                    const windowIndex = 1;
                    const tabIndex = 0;

                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [
                            { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 1", tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }] }, 
                            { name: "window 3", tabs: [{ name: "tab 1" }] }
                        ]
                    };

                    let windows = JSON.stringify(componentInstance.state.tabGroupDetails.windowAndTabs.map(value => value));
                    let testWindows = JSON.parse(windows);
                    componentInstance.saveToState = jest.fn();
                    
                    componentInstance.deleteTab(windowIndex, tabIndex);

                    testWindows[windowIndex].tabs.splice(tabIndex, 1);

                    expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", testWindows, "tabGroupDetails");
                }); 

                test("Run deleteTab(20, 0), when windowAndTabs array in component state is filled: throw error \"ETGMCreateNewGroupModal-131\" because the targetted window does not exist", () => {
                    /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window still has tabs after the targetted tab being closed, do not splice any windows
                        3. Check that saveToState is called with correctly manufactured parameters
                    */

                    const windowIndex = 20;
                    const tabIndex = 0;

                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [
                            { name: "window 2", tabs: [{ name: "tab 1" }] },
                            { name: "window 1", tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }] }, 
                            { name: "window 3", tabs: [{ name: "tab 1" }] }
                        ]
                    };

                    componentInstance.deleteTab(windowIndex, tabIndex);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-131");
                }); 

                test("Run deleteTab(1, 20), when windowAndTabs array in component state is filled (targetted window has multiple tabs): call this.saveToState() with parameters conditioned in this test", () => {
                    /*
                        Checking test:
                        1. A tab is targetted, but it does not exist. Save all the existing windowAndTabs to state unmodified
                    */

                    const windowIndex = 1;
                    const tabIndex = 20;

                    componentInstance.state.tabGroupDetails = {
                        windowAndTabs: [
                            { name: "window 1", tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }] }, 
                            { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                            { name: "window 3", tabs: [{ name: "tab 1" }] }
                        ]
                    };

                    let windows = JSON.stringify(componentInstance.state.tabGroupDetails.windowAndTabs.map(value => value));
                    let testWindows = JSON.parse(windows);
                    componentInstance.saveToState = jest.fn();
                    
                    componentInstance.deleteTab(windowIndex, tabIndex);

                    expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", testWindows, "tabGroupDetails");
                }); 
            });
        })
    })

    describe("Test deleteWindow(windowIndex)", () => {
        describe("Examine the windowIndex parameter", () => {
            test("Run deleteWindow(): Throw an error \"ETGMCreateNewGroupModal-111\", windowIndex is missing", () => {
                componentInstance.deleteWindow();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-111");
            })

            test.each(various_nonNumber)("Run deleteWindow(%p): Throw an error \"ETGMCreateNewGroupModal-111\", windowIndex is not a number", (val) => {
                componentInstance.deleteWindow(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-111");
            })

            test("Run deleteWindow(0): Do not throw an error \"ETGMCreateNewGroupModal-111\", windowIndex is 0", () => {
                componentInstance.deleteWindow(0);

                expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMCreateNewGroupModal-111");
            })

            test("Run deleteWindow(-1): Throw an error \"ETGMCreateNewGroupModal-111\", windowIndex is -1", () => {
                componentInstance.deleteWindow(-1);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-111");
            })

            test("Run deleteWindow(0): Throw an error \"ETGMCreateNewGroupModal-133\", if there are no windows stored in windowAndTabs in component state", () => {
                componentInstance.state.tabGroupDetails = {
                    windowAndTabs: []
                };
                componentInstance.deleteWindow(0);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-133");
            })

            test("Run deleteWindow(20): Throw an error \"ETGMCreateNewGroupModal-134\", if the targetted window does not exist in windowAndTabs section of component state", () => {
                componentInstance.state.tabGroupDetails = {
                    windowAndTabs: [
                        { name: "window 1", tabs: [{ name: "tab 1" }] }, 
                        { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                        { name: "window 3", tabs: [{ name: "tab 1" }] }
                    ]
                };
                componentInstance.deleteWindow(20);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMCreateNewGroupModal-134");
            })

            test("Run deleteWindow(0): call this.saveToState() with parameters conditioned in this test ", () => {
                const windowIndex = 0;
                
                componentInstance.state.tabGroupDetails = {
                    windowAndTabs: [
                        { name: "window 1", tabs: [{ name: "tab 1" }] }, 
                        { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                        { name: "window 3", tabs: [{ name: "tab 1" }] }
                    ]
                };

                let testWindows = componentInstance.state.tabGroupDetails.windowAndTabs.map(value => value);

                componentInstance.saveToState = jest.fn();
                componentInstance.deleteWindow(windowIndex);

                testWindows.splice(windowIndex, 1);

                expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", testWindows, "tabGroupDetails");
            })

            test("Run deleteWindow(1): call this.saveToState() with parameters conditioned in this test ", () => {
                const windowIndex = 1;
                
                componentInstance.state.tabGroupDetails = {
                    windowAndTabs: [
                        { name: "window 1", tabs: [{ name: "tab 1" }] }, 
                        { name: "window 2", tabs: [{ name: "tab 1" }] }, 
                        { name: "window 3", tabs: [{ name: "tab 1" }] }
                    ]
                };

                let testWindows = componentInstance.state.tabGroupDetails.windowAndTabs.map(value => value);

                componentInstance.saveToState = jest.fn();
                componentInstance.deleteWindow(windowIndex);

                testWindows.splice(windowIndex, 1);

                expect(componentInstance.saveToState).toHaveBeenCalledWith("windowAndTabs", testWindows, "tabGroupDetails");
            })
        })
    })

    describe("Test renderWindowsAndTabsSection(windowAndTabs, type, warning)", () => {
        describe("Examine the function as unit test", () => {
            test.each(various_nonArrays)("Run renderWindowsAndTabsSection(%p, ANYTHING, ANYTHING): throw an error \"ETGMCreateNewGroupModal-121\", because \"windowAndTabs\" is not an array", (val) => {
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

                    componentInstance.renderWindowsAndTabsSection(val, expect.anything(), expect.anything());
                }).toThrow(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-121"))

            })

            test("Run renderWindowsAndTabsSection([], ANYTHING, ANYTHING): do not throw an error \"ETGMCreateNewGroupModal-121\", because windowAndTabs is an array", () => {
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

                    componentInstance.renderWindowsAndTabsSection([], expect.anything(), expect.anything());
                }).not.toThrow(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-121"))

            })

            test.each(various_nonString)("Run renderWindowsAndTabsSection([], %p, ANYTHING): throw an error \"ETGMCreateNewGroupModal-112\", because \"type\" is not a string", (val) => {
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

                    componentInstance.renderWindowsAndTabsSection([], presetProps.data.params.type, expect.anything());
                }).toThrow(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-112"))

            })

            test("Run renderWindowsAndTabsSection([], undefined, ANYTHING): throw an error \"ETGMCreateNewGroupModal-112\", because \"type\" is explicitly missing as parameter", () => {
                expect(() => {
                    const presetProps = {
                        data: {
                            params: {
                                
                            }
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    componentInstance.renderWindowsAndTabsSection([], presetProps.data.params.type, expect.anything());
                }).toThrow(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-112"))

            })

            test("Run renderWindowsAndTabsSection([], \"currently-opened\", ANYTHING): do not throw an error \"ETGMCreateNewGroupModal-113\", because \"type\" is one of the three valid strings", () => {
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

                    componentInstance.renderWindowsAndTabsSection([], presetProps.data.params.type, expect.anything());
                }).not.toThrow(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-113"))
            })

            test("Run renderWindowsAndTabsSection([], \"existing-group\", ANYTHING): do not throw an error \"ETGMCreateNewGroupModal-113\", because \"type\" is one of the three valid strings", () => {
                expect(() => {
                    const presetProps = {
                        data: {
                            params: {
                                type: "existing-group"
                            }
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    
                    componentInstance.renderWindowsAndTabsSection([], presetProps.data.params.type, expect.anything());
                }).not.toThrow(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-113"))
            })

            test("Run renderWindowsAndTabsSection([], \"new-group\", ANYTHING): do not throw an error \"ETGMCreateNewGroupModal-113\", because \"type\" is one of the three valid strings", () => {
                expect(() => {
                    const presetProps = {
                        data: {
                            params: {
                                type: "new-group"
                            }
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    
                    componentInstance.renderWindowsAndTabsSection([], presetProps.data.params.type, expect.anything());
                }).not.toThrow(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-113"))
            })

            test("Run renderWindowsAndTabsSection([], \"donald duck\", ANYTHING): throw an error \"ETGMCreateNewGroupModal-113\", because \"type\" is NOT either one of the three valid strings", () => {
                expect(() => {
                    const presetProps = {
                        data: {
                            params: {
                                type: "donald duck"
                            }
                        }
                    };
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    
                    componentInstance.renderWindowsAndTabsSection([], presetProps.data.params.type, expect.anything());
                }).toThrow(ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-113"))
            })

            test("Run renderWindowsAndTabsSection([], \"new-group\", ANYTHING): The function should not return undefined", () => {
                const presetProps = {
                    data: {
                        params: {
                            type: "new-group"
                        }
                    }
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                expect(componentInstance.renderWindowsAndTabsSection([], presetProps.data.params.type, expect.anything())).not.toBeUndefined();
            })
        })

        describe("Examine the function as a snapshot of return statement (snapshot test):", () => {
            test("Run renderWindowsAndTabsSection([], \"new-group\", ANYTHING): The returned function should match this test snapshot", () => {
                const presetProps = {
                    data: {
                        params: {
                            type: "new-group"
                        }
                    }
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                expect(componentInstance.renderWindowsAndTabsSection([], presetProps.data.params.type, expect.anything())).toMatchSnapshot();
            })

            test("Run renderWindowsAndTabsSection([], \"existing-group\", ANYTHING): The returned function should match this test snapshot", () => {
                const presetProps = {
                    data: {
                        params: {
                            type: "existing-group"
                        }
                    }
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                expect(componentInstance.renderWindowsAndTabsSection([], presetProps.data.params.type, expect.anything())).toMatchSnapshot();
            })

            test("Run renderWindowsAndTabsSection([], \"currently-opened\", ANYTHING): The returned function should match this test snapshot", () => {
                const presetProps = {
                    data: {
                        params: {
                            type: "currently-opened"
                        }
                    }
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                expect(componentInstance.renderWindowsAndTabsSection([], presetProps.data.params.type, expect.anything())).toMatchSnapshot();
            })
        })
    })

    describe("Test renderModalBody()", () => {
        describe("Examine \"data\" key of this.props", () => {
            test("Run renderModalBody(): If \"data\" props is undefined, return the error message of \"ETGMCreateNewGroupModal-136\"", () => {
                const presetProps = {

                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalBody()).toBe(expectedErrorReturns["ETGMCreateNewGroupModal-136"].message);
                    
            });

            test.each(various_nonObjects)("Run renderModalBody(): If \"data\" = %p (not an object) in props, return the error message of \"ETGMCreateNewGroupModal-136\"", (val) => {
                const presetProps = {
                    data: val
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalBody()).toBe(expectedErrorReturns["ETGMCreateNewGroupModal-136"].message);
                    
            });

            test("Run renderModalBody(): If \"data\" props is an object, do not return the error message of \"ETGMCreateNewGroupModal-136\"", () => {
                const presetProps = {
                    data: {}
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalBody()).not.toBe(expectedErrorReturns["ETGMCreateNewGroupModal-136"].message);
                    
            });
        })

        describe("Examine \"params\" key of this.props.data, assuming data is an object", () => {
            test("Run renderModalBody(): If data.params is undefined, return the error message of \"ETGMCreateNewGroupModal-135\"", () => {
                const presetProps = {
                    data: {}
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalBody()).toBe(expectedErrorReturns["ETGMCreateNewGroupModal-135"].message);
                    
            });

            test.each(various_nonObjects)("Run renderModalBody(): If data.parans = %p (not an object) in props, return the error message of \"ETGMCreateNewGroupModal-135\"", (val) => {
                const presetProps = {
                    data: {
                        params: val
                    }
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalBody()).toBe(expectedErrorReturns["ETGMCreateNewGroupModal-135"].message);
                    
            });

            test("Run renderModalBody(): If data.params props is an object, do not return the error message of \"ETGMCreateNewGroupModal-135\"", () => {
                const presetProps = {
                    data: {
                        params: {}
                    }
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalBody()).not.toBe(expectedErrorReturns["ETGMCreateNewGroupModal-135"].message);
                    
            });
        })

        describe("Snapshot test of renderModalBody(), assuming information is available in this.props.data", () => {
            test("Run renderModalBody(), with all parameters intact: Check that the snapshot matches the example set by the first test run", () => {
                const presetProps = {
                    data : {
                        params: {
                            groupName: "Test suite specific tab group",
                            groupCloseAll: false,
                            groupCloseInactiveTabs: true,
                            groupDescription: "A tab group preset ub a test suite. This tab group is not real and is not actually stored anywhere.",
                            type: "new-group"
                        }
                    }
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();
                componentInstance.state.tabGroupDetails = {
                    windowAndTabs: []
                }

                // Build a list of window and tabs
                let windows = [...componentInstance.state.tabGroupDetails.windowAndTabs];
                const inputUrl = "http://google.com";
                
                windows.push({
                    tabs: [{
                        title: "A test tab in a test window",
                        favIconUrl: inputUrl + "/favicon.ico",
                        url: inputUrl
                    },
                    {
                        title: "Another test tab in a test window",
                        favIconUrl: inputUrl + "/favicon.ico",
                        url: inputUrl
                    }]
                })

                componentInstance.saveToState("windowAndTabs", windows, "tabGroupDetails");

                expect(componentInstance.renderModalBody()).toMatchSnapshot();
                    
            });
        }) 
    })

    describe("Test renderModalHeader()", () => {
        describe("Examine \"data\" key of this.props", () => {
            test("Run renderModalHeader(): If \"data\" props is undefined, return the error message stated in this test case", () => {
                const presetProps = {

                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalHeader()).toBe("Data section is missing in component props");
                    
            });

            test.each(various_nonObjects)("Run renderModalHeader(): If \"data\" = %p (not an object) in props, return the error message of \"ETGMCreateNewGroupModal-136\"", (val) => {
                const presetProps = {
                    data: val
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalHeader()).toBe("Data section is missing in component props");
                    
            });

            test("Run renderModalHeader(): If \"data\" props is an object, do not return the error message of \"ETGMCreateNewGroupModal-136\"", () => {
                const presetProps = {
                    data: {}
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalHeader()).not.toBe("Data section is missing in component props");
                    
            });
        });

        describe("Examine \"params\" key of this.props.data, assuming data is an object", () => {
            test("Run renderModalHeader(): If data.params is undefined, return the error message stated in this test case", () => {
                const presetProps = {
                    data: {}
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalHeader()).toBe("Data parameters are missing");
                    
            });

            test.each(various_nonObjects)("Run renderModalHeader(): If data.parans = %p (not an object) in props, return the error message stated in this test case", (val) => {
                const presetProps = {
                    data: {
                        params: val
                    }
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalHeader()).toBe("Data parameters are missing");
                    
            });

            test("Run renderModalHeader(): If data.params props is an object, do not return the error message stated in this test case", () => {
                const presetProps = {
                    data: {
                        params: {}
                    }
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalHeader()).not.toBe("Data parameters are missing");
                    
            });

            test("Run renderModalHeader(): If data.params.type = \"new-group\", return the error message given in this test case", () => {
                const presetProps = {
                    data: {
                        params: {
                            type: "new-group"
                        }
                    }
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalHeader()).toBe("Create a New Tab Group");
                    
            });

            test("Run renderModalHeader(): If data.params.type = \"currently-opened\", return the error message given in this test case", () => {
                const presetProps = {
                    data: {
                        params: {
                            type: "currently-opened"
                        }
                    }
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalHeader()).toBe("Create a New Tab Group");
                    
            });

            test("Run renderModalHeader(): If data.params.type = \"existing-group\", return the error message given in this test case", () => {
                const presetProps = {
                    data: {
                        params: {
                            type: "existing-group"
                        }
                    }
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalHeader()).toBe("Edit the \"" + (presetProps.data.params.groupName || "") + "\" tab group");
                    
            });

            test("Run renderModalHeader(): If data.params.type = \"existing-group\", return the error message given in this test case", () => {
                const presetProps = {
                    data: {
                        params: {
                            type: "existing-group",
                            groupName: "Testing tab group header title"
                        }
                    }
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true })
                componentInstance = testComponent.instance();

                expect(componentInstance.renderModalHeader()).toBe("Edit the \"" + (presetProps.data.params.groupName || "") + "\" tab group");
                    
            });
        })
    })
});