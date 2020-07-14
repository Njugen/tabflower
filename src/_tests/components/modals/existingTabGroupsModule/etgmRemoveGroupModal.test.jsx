import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import ETGMRemoveGroupsModal from '../../../../components/modals/existingTabGroupsModule/etgmRemoveGroupModal';
import * as ExceptionsHandler from '../../../../components/utils/exceptionsAndHandler';
import * as validator from '../../../../components/utils/inputValidators';


const predefinedComponent = (props, options) => {
    props = props || {};

    const component = shallow(<ETGMRemoveGroupsModal {...props} />, options);
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

describe("Test <ETGMRemoveGroupsModal /> component behaviour at mount", () => {
    const actualErrorReturns = {
        "ETGMRemoveGroupsModal-101": ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-101"),
        "ETGMRemoveGroupsModal-102": ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-102"),
        "ETGMRemoveGroupsModal-103": ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-103"),
        "ETGMRemoveGroupsModal-104": ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-104"),
        "ETGMRemoveGroupsModal-105": ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-105")
    };

    const expectedErrorReturns = {
        "ETGMRemoveGroupsModal-101": {
            name: "ValidatorError",
            message: "The callback parameter is not a function.",
            code: "ETGMRemoveGroupsModal-101"
        },
        "ETGMRemoveGroupsModal-102": {
            name: "ValidatorError",
            message: "A group id needs to be provided as a text string in order to identify what tab group to delete. If all tab groups are meant to be deleted, please do not provide any group id when calling this modal. As a result of this, no tab groups can be deleted at this point.",
            code: "ETGMRemoveGroupsModal-102"
        },
        "ETGMRemoveGroupsModal-103": {
            name: "ValidatorError",
            message: "A tab group name needs to be provided to this modal for user convenience. The tab group name needs to be a text string",
            code: "ETGMRemoveGroupsModal-103"
        },
        "ETGMRemoveGroupsModal-104": {
            name: "ValidatorError",
            message: "The \"params\" key in this.props.data is not an object. The required parameters could not be read.",
            code: "ETGMRemoveGroupsModal-104"
        },
        "ETGMRemoveGroupsModal-105": {
            name: "ValidatorError",
            message: "The \"data\" key in this.props is not an object. The data key needs to be an object, which provides parameters and other data required by the modal",
            code: "ETGMRemoveGroupsModal-105"
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

    const various_nonBool = [
        ["a very weird looking text string"],
        [{ testkey: "test value" }],
        [32],
        [null],
        [undefined],
        [[12,8,3,7]],
        [() => {}]
    ];

    const various_nonString_nonUndefined = [
        [{ testkey: "test value" }],
        [32],
        [null],
        [false],
        [true],
        [[12,8,3,7]],
        [() => {}]
    ];

    const various_nonBool_nonUndefined = [
        [{ testkey: "test value" }],
        [32],
        [null],
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

    const various_nonArrays_nonUndefined = [
        [{ testkey: "test value" }],
        [32],
        [null],
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
        describe("Examine the function based on the value of this.props.data", () => {
            test("Run verifyChildProps(): If \"data\" is missing in this.props, throw an error \"ETGMRemoveGroupsModal-105\"", () => {
                expect(() => {
                    const presetProps = {
                     
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.verifyChildProps();
                }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-105"));    
            })
    
            test.each(various_nonObjects)("Run verifyChildProps(): If \"data\" = %p (is not an object) in this.props, throw an error \"ETGMRemoveGroupsModal-105\"", (val) => {
                expect(() => {
                    const presetProps = {
                        data: val
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.verifyChildProps();
                }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-105"));    
            })

            test("Run verifyChildProps(): If \"data\" is an object, do NOT throw error \"ETGMRemoveGroupsModal-105\"", () => {
                expect(() => {
                    const presetProps = {
                        data: {}
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.verifyChildProps();
                }).not.toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-105"));    
            })
        })
        
        describe("Examine the function based on the value of this.props.data.params", () => {
            test("Run verifyChildProps(): If \"params\" is missing in this.props.data, throw an error \"ETGMLaunchGroupsModal-108\"", () => {
                expect(() => {
                    const presetProps = {
                        data: {

                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.verifyChildProps();
                }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-104"));    
            })
    
            test.each(various_nonObjects)("Run verifyChildProps(): If \"params\" = %p (is not an object) in this.props.data, throw an error \"ETGMRemoveGroupsModal-104\"", (val) => {
                expect(() => {
                    const presetProps = {
                        data: {
                            params: val
                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.verifyChildProps();
                }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-104"));    
            })

            test("Run verifyChildProps(): If \"data\" is an object, do NOT throw error \"ETGMRemoveGroupsModal-104\"", () => {
                expect(() => {
                    const presetProps = {
                        data: {
                            params: {}
                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.verifyChildProps();
                }).not.toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-104"));    
            })
        })

        describe("Examine the function based on keys given in this.props.data.params", () => {
            const presetTestInfo = {
                groupId: "ABCD-1234",
                groupName: "Test Group for ETGM Launch Group Modal",
            }

            describe("Examine the function, when this.props.data.params.removeAll is undefined", () => {
                describe("Examine the \"groupId\" key located in this.props.data.params", () => {
                    test.each(various_nonString)("Run verifyChildProps(): If \"groupId\" key is not a string, throw an error \"ETGMRemoveGroupsModal-102\"", (val) => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        groupId: val
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-102"));  
                    });
    
                    test("Run verifyChildProps(): If \"groupId\" key is missing, throw an error \"ETGMRemoveGroupsModal-102\"", () => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                              
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-102"));  
                    });
    
                    test("Run verifyChildProps(): If \"groupId\" key is a string (e.g. \"ABCD-1234\" set in this case), do not throw an error \"ETGMRemoveGroupsModal-102\"", () => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        groupId: presetTestInfo.groupId
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).not.toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-102"));  
                    });
                });
    
                describe("Examine the \"groupName\" key located in this.props.data.params", () => {
                    test.each(various_nonString_nonUndefined)("Run verifyChildProps(): If \"groupName\" key is not a string, throw an error \"ETGMRemoveGroupsModal-103\"", (val) => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        groupId: presetTestInfo.groupId,
                                        groupName: val
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-103"));  
                    });
    
                    test("Run verifyChildProps(): If \"groupName\" key is missing, do not throw an error \"ETGMRemoveGroupsModal-103\"", () => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        groupId: presetTestInfo.groupId
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-103"));  
                    });
    
                    test("Run verifyChildProps(): If \"groupName\" key is a string, do not throw an error \"ETGMRemoveGroupsModal-103\"", () => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        groupId: presetTestInfo.groupId,
                                        groupName: presetTestInfo.groupName
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).not.toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-103"));  
                    });
                });
            })
            
            describe("Examine the function, when this.props.data.params.removeAll = false", () => {
                describe("Examine the \"groupId\" key located in this.props.data.params", () => {
                    test.each(various_nonString)("Run verifyChildProps(): If \"groupId\" key is not a string, throw an error \"ETGMRemoveGroupsModal-102\"", (val) => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        groupId: val,
                                        removeAll: false
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-102"));  
                    });
    
                    test("Run verifyChildProps(): If \"groupId\" key is missing, throw an error \"ETGMRemoveGroupsModal-102\"", () => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        removeAll: false
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-102"));  
                    });
    
                    test("Run verifyChildProps(): If \"groupId\" key is a string (e.g. \"ABCD-1234\" set in this case), do not throw an error \"ETGMRemoveGroupsModal-102\"", () => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        groupId: presetTestInfo.groupId,
                                        removeAll: false
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).not.toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-102"));  
                    });
                });
    
                describe("Examine the \"groupName\" key located in this.props.data.params", () => {
                    test.each(various_nonString_nonUndefined)("Run verifyChildProps(): If \"groupName\" key is not a string, throw an error \"ETGMRemoveGroupsModal-103\"", (val) => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        groupId: presetTestInfo.groupId,
                                        groupName: val,
                                        removeAll: false
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-103"));  
                    });
    
                    test("Run verifyChildProps(): If \"groupName\" key is missing, do not throw an error \"ETGMRemoveGroupsModal-103\"", () => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        groupId: presetTestInfo.groupId,
                                        removeAll: false
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-103"));  
                    });
    
                    test("Run verifyChildProps(): If \"groupName\" key is a string, do not throw an error \"ETGMRemoveGroupsModal-103\"", () => {
                        expect(() => {
                            const presetProps = {
                                data: {
                                    params: {
                                        groupId: presetTestInfo.groupId,
                                        groupName: presetTestInfo.groupName,
                                        removeAll: false
                                    }
                                }
                            }
                            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                            componentInstance = testComponent.instance();
            
                            componentInstance.verifyChildProps();
                        }).not.toThrow(ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-103"));  
                    });
                });
            });

            describe("Examine the function, when this.props.data.params.removeAll = true", () => {
                test("Run verifyChildProps: No errors get thrown", () => {
                    expect(() => {
                        const presetProps = {
                            data: {
                                params: {
                                    removeAll: true
                                }
                            }
                        }
                        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                        componentInstance = testComponent.instance();
        
                        componentInstance.verifyChildProps();
                    }).not.toThrow();  
                })
            })
        });


    });

    describe("Test saveModalHandler(callback)", () => {
        describe("Case 1: When callback is a function", () => {
            const callback = () => {};

            describe("Examine the function based on the value of this.props.data", () => {
                
                test("Run saveModalHandler(callback): If \"data\" is missing in this.props, throw an error \"ETGMRemoveGroupsModal-105\"", () => {

                    const presetProps = {
                         
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMRemoveGroupsModal-105");
                })
        
                test.each(various_nonObjects)("Run saveModalHandler(callback): If \"data\" = %p (is not an object) in this.props, throw an error \"ETGMRemoveGroupsModal-105\"", (val) => {
                    const presetProps = {
                        data: val
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);
                    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMRemoveGroupsModal-105");
                })
    
                test("Run saveModalHandler(callback): If \"data\" is an object, do NOT throw error \"ETGMRemoveGroupsModal-105\"", () => {
                    const presetProps = {
                        data: {}
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);
                    
                    expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMRemoveGroupsModal-105");
                })
            })
            
            describe("Examine the function based on the value of this.props.data.params", () => {
                test("Run saveModalHandler(callback): If \"params\" is missing in this.props.data, throw an error \"ETGMRemoveGroupsModal-104\"", () => {
                    const presetProps = {
                        data: {

                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMRemoveGroupsModal-104");
                })
        
                test.each(various_nonObjects)("Run saveModalHandler(callback): If \"params\" = %p (is not an object) in this.props.data, throw an error \"ETGMRemoveGroupsModal-104\"", (val) => {
                    const presetProps = {
                        data: {
                            params: val
                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMRemoveGroupsModal-104");
                })
    
                test("Run saveModalHandler(callback): If \"data\" is an object, do NOT throw error \"ETGMRemoveGroupsModal-104\"", () => {
                    const presetProps = {
                        data: {
                            params: {}
                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);
                    expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMRemoveGroupsModal-104");   
                })
            });

            describe("Examine the function based on the value of \"callback\" input parameter", () => {
                test("Run saveModalHandler(callback): If this.props.data and this.props.data.params are valid, call this.clearModalData()", () => {
                    const presetProps = {
                        data: {
                            params: {}
                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.clearModalData = jest.fn();

                    componentInstance.saveModalHandler(callback); 

                    expect(componentInstance.clearModalData).toHaveBeenCalled();
                })

                test("Run saveModalHandler(callback): If this.props.data and this.props.data.params are valid, call this.clearModalData(callback) which in turns calls the callback function", () => {
                    const presetProps = {
                        data: {
                            params: {}
                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();

                    const callback = jest.fn();

                    componentInstance.clearModalData = jest.fn();

                    componentInstance.saveModalHandler(callback); 

                    expect(componentInstance.clearModalData).toHaveBeenCalledWith(callback(expect.anything()));
                })
                
                test("Run saveModalHandler(callback): If this.props.data and this.props.data.params are valid, call this.clearModalData(callback) which in turns calls the callback function (the callback function receives an object input defined in this test case)", () => {
                    const presetProps = {
                        data: {
                            params: {
                                groupId: "ABCD-1234",
                                groupName: "Test Group for ETGM Remove Group Modal",
                                groupDescription: "This test group is only preset in the test suite. It is not preset in the real extension.",
                                groupCloseAll: false,
                                groupCloseInactiveTabs: false,
                                windowAndTabs: []
                            }
                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();


                    const callback = jest.fn();

                    componentInstance.clearModalData = jest.fn();

                    componentInstance.saveModalHandler(callback); 

                    expect(componentInstance.clearModalData).toHaveBeenCalledWith(callback());
                    expect(callback).toHaveBeenCalledWith(componentInstance.props.data.params);
                }) 
            });
        })

        describe("Case 2: When callback is NOT a function", () => {
            const callback = "Test non function variable string";

            describe("Examine the function based on the value of this.props.data", () => {
                
                test("Run saveModalHandler(callback): If \"data\" is missing in this.props, throw an error \"ETGMRemoveGroupsModal-105\"", () => {

                    const presetProps = {
                         
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMRemoveGroupsModal-105");
                })
        
                test.each(various_nonObjects)("Run saveModalHandler(callback): If \"data\" = %p (is not an object) in this.props, throw an error \"ETGMRemoveGroupsModal-105\"", (val) => {
                    const presetProps = {
                        data: val
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);
                    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMRemoveGroupsModal-105");
                })
    
                test("Run saveModalHandler(callback): If \"data\" is an object, do NOT throw error \"ETGMRemoveGroupsModal-105\"", () => {
                    const presetProps = {
                        data: {}
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);
                    
                    expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMRemoveGroupsModal-105");
                })
            })
            
            describe("Examine the function based on the value of this.props.data.params", () => {
                test("Run saveModalHandler(callback): If \"params\" is missing in this.props.data, throw an error \"ETGMRemoveGroupsModal-104\"", () => {
                    const presetProps = {
                        data: {

                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMRemoveGroupsModal-104");
                })
        
                test.each(various_nonObjects)("Run saveModalHandler(callback): If \"params\" = %p (is not an object) in this.props.data, throw an error \"ETGMRemoveGroupsModal-104\"", (val) => {
                    const presetProps = {
                        data: {
                            params: val
                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMRemoveGroupsModal-104");
                })
    
                test("Run saveModalHandler(callback): If \"data\" is an object, do NOT throw error \"ETGMRemoveGroupsModal-104\"", () => {
                    const presetProps = {
                        data: {
                            params: {}
                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
    
                    componentInstance.saveModalHandler(callback);
                    expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith("ETGMRemoveGroupsModal-104");   
                })
            });

            describe("Examine the function based on the value of \"callback\" input parameter", () => {
                test("Run saveModalHandler(callback): If this.props.data and this.props.data.params are valid, throw an error \"ETGMRemoveGroupsModal-101\"", () => {
                    const presetProps = {
                        data: {
                            params: {}
                        }
                    }
                    testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                    componentInstance = testComponent.instance();
                    componentInstance.clearModalData = jest.fn();

                    componentInstance.saveModalHandler(callback); 

                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("ETGMRemoveGroupsModal-101");
                })
            });
        })
    })

    describe("Test dismissModalHandler()", () => {
        test("Run dismissModalHandler(): the function this.clearModalData() should be called", () => {
            componentInstance.clearModalData = jest.fn();
            componentInstance.dismissModalHandler();

            expect(componentInstance.clearModalData).toHaveBeenCalledTimes(1);
        })
    });

    describe("Test renderModalBody()", () => {
        test("Run renderModalHandler(): If \"data\" is missing in props, return a string \"ETGMRemoveGroupsModal-105\"", () => {
            const presetProps = {
                
            };
            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
            componentInstance = testComponent.instance();
            
            expect(componentInstance.renderModalBody()).toBe("ETGMRemoveGroupsModal-105");
        });

        test.each(various_nonObjects)("Run rendermMdalHandler(): If \"data\" = %p (not an object) in props, return a string \"ETGMRemoveGroupsModal-105\"", (val) => {
            const presetProps = {
                data: val
            };
            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
            componentInstance = testComponent.instance();
            
            expect(componentInstance.renderModalBody()).toBe("ETGMRemoveGroupsModal-105");
        })

        test("Run renderModalHandler(): If \"data\" is an object in props, do not return the string \"ETGMRemoveGroupsModal-105\"", () => {
            const presetProps = {
                data: {}
            };
            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
            componentInstance = testComponent.instance();
            
            expect(componentInstance.renderModalBody()).not.toBe("ETGMRemoveGroupsModal-105");
        });
    })
});