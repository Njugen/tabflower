import React from 'react';
import { shallow } from 'enzyme';
import App from './../App';
import * as ExceptionsHandler from './../components/utils/exceptionsAndHandler';
import * as validator from './../components/utils/inputValidators';


const predefinedComponent = () => {
    const component = shallow(<App />);
    return component;
}

let testComponent;
let componentInstance;

describe("Test <App /> component behaviour at mount", () => {
    
    beforeEach(() => {
        testComponent = predefinedComponent();
    });

    test("The state is correctly preset according to template with no modifications, when no functions change the state at mount", () => {
        const componentInstance = testComponent.instance();
        const templateState = {
            currentView: {},
            routes: [],
            modal: {},
            errors: [],
            MainNavBar: {},
            refreshFactor: 0
        };
        
        expect(componentInstance.state).toStrictEqual(templateState);
    });
});

describe("Test functions in <App />", () => {
    let ExceptionsHandler = jest.requireActual("./../components/utils/exceptionsAndHandler");

    // Copy our error messages from exceptionsAndHandler.js. These messages are to be mocked.
    const actualErrorReturns = {
        "app-101": ExceptionsHandler.ValidatorError("app-101"),
        "app-102": ExceptionsHandler.ValidatorError("app-102"),
        "app-103": ExceptionsHandler.ValidatorError("app-103"),
        "app-104": ExceptionsHandler.ValidatorError("app-104"),
        "app-105": ExceptionsHandler.ValidatorError("app-105"),
        "app-106": ExceptionsHandler.ValidatorError("app-106")
    };

    // The error messages we expect to catch and be used as parameter in componentInstance.launchErrorOverlay, if an error has occured
    const expectedErrorReturns = {
        "app-101": {
            name: "ValidatorError",
            message: "The \"callback\" parameter in the App component's updateState() function needs to be a function, or undefined.",
            code: "app-101"
        },
        "app-102": {
            name: "ValidatorError",
            message: "The \"newProps\" parameter in the App component's updateState() function needs to be a an object (but not an array).",
            code: "app-102"
        },
        "app-103": {
            name: "ValidatorError",
            message: "The \"viewProps\" parameter in the App component's handleNavigation() function needs to be an object (but not an array), containing the following keys: \"metaData\" (object), \"viewData\" (object) and \"refreshFactor\" (number).",
            code: "app-103"
        },
        "app-104": {
            name: "ValidatorError",
            message: "The \"viewProps\" parameter in the App component's handleNavigation() function needs to be a an object (but not an array).",
            code: "app-104"
        },
        "app-105": {
            name: "ValidatorError",
            message: "The \"sidebarProps\" parameter in the App component's handleMainNavBarClick() function needs to be a an object (but not an array).",
            code: "app-105"
        },
        "app-106": {
            name: "ValidatorError",
            message: "The \"sidebarProps\" parameter in the App component's handleMainNavBarClick() function is missing an \"activeNavLinkKey\" key (as an integer) in its object.",
            code: "app-106"
        }
    }

    beforeEach(() => {
        jest.clearAllMocks();
        testComponent = predefinedComponent();
        
        componentInstance = testComponent.instance();
        componentInstance.setState = jest.fn();
        componentInstance.launchErrorOverlay = jest.fn();

        ExceptionsHandler.ValidatorError = jest.fn();
        ExceptionsHandler.ValidatorError.mockImplementation(errCode => {
            return actualErrorReturns[errCode];
        });
    });

    describe("Test updateState(newProps, showLoadbar, callback)", () => {
        const various_newProps = [
            ["Test inserting a string"],
            [454],
            [["multidimensional array", "gamma ray bursts", "super novae", 45, false]],
            [true],
            [false],
            [undefined],
            [null],
            [() => {}]
        ];

        const various_newProps_objects = [
            [{testkey: 1, testkey2: "text", testkey3: false}],
            [{testkey4: "randomtext", testkey5: null, testkey6: true}],
            [{testkey7: "magnetar", testkey8: ["gamma", "radio", "nuclear", false], testkey9: false}],
            [{testkey10: "super novae", testkey8: false, testkey9: undefined}]
        ]

        const various_showLoadbar = [
            [true],
            [false],
            ["test inserting another string"],
            [null],
            [undefined],
            [() => {}],
            [{testkey: 1, testkey2: "text", testkey3: false}],
            [["apple", "pearch", "orange", "strawberry"]],
            [77]
        ];

        const various_callback = [
            [() => {}],
            [true],
            [false],
            ["test inserting another string"],
            [null],
            [undefined],
            [{testkey: 7, testkey2: "text", testkey3: true}],
            [["apple", "pearch", "pineapple", "berry"]],
            [241]
        ];

        describe("\"newProps\" (not a non-array object), \"showLoadbar\" (various values), \"callback\" (undefined)", () => {
            for(let i = 0; i < various_showLoadbar.length; i++){
                const testComponent = predefinedComponent();
                const componentInstance = testComponent.instance();

                test.each(various_newProps)("Run updateState(%p, " + various_showLoadbar[i][0] + "): ExceptionsHandler.ValidatorError(\"app-102\") should be called once", (val) => {
                    componentInstance.updateState(val, various_showLoadbar[i][0]);
                    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
                });
            }

        });

        describe("\"newProps\" (not a non-array object), \"showLoadbar\" (various values), \"callback\" (various values)", () => {
            for(let i = 0; i < various_showLoadbar.length; i++){
                for(let j = 0; j < various_callback.length; j++){
                    const testComponent = predefinedComponent();
                    const componentInstance = testComponent.instance();

                    test.each(various_newProps)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): ExceptionsHandler.ValidatorError(\"app-102\") should be called once.", (val) => {
                        componentInstance.updateState(val, various_showLoadbar[i][0], various_callback[j][0]);
                        
                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
                    });

                }
            }
        });

        describe("\"newProps\" (non-array object with various keys), \"showLoadbar\" (various values), \"callback\" (various values)", () => {
            const { isUndefined, isFunction } = validator;

            for(let i = 0; i < various_showLoadbar.length; i++){
                for(let j = 0; j < various_callback.length; j++){  
                    const testComponent = predefinedComponent();
                    const componentInstance = testComponent.instance();

                    if(various_showLoadbar[i][0] === true){
                        if(isFunction(various_callback[j][0])){
                            test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): this.setState(newProps, callback) should be called, refreshFactor increased by 1.", (val) => {
                                componentInstance.setState = jest.fn();

                                componentInstance.updateState(val, various_showLoadbar[i][0], various_callback[j][0]);
                                val.refreshFactor = componentInstance.state.refreshFactor + 1;

                                expect(componentInstance.setState).toHaveBeenCalledWith(val, various_callback[j][0]);
                            });
                        } else if(isUndefined(various_callback[j][0])){
                            test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): this.setState(newProps) should be called, refreshFactor increased by 1.", (val) => {
                                componentInstance.setState = jest.fn();

                                componentInstance.updateState(val, various_showLoadbar[i][0], various_callback[j][0]);
                                val.refreshFactor = componentInstance.state.refreshFactor + 1;

                                expect(componentInstance.setState).toHaveBeenCalledWith(val);
                            });
                        } else {
                            test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): ExceptionsHandler.ValidatorError(\"app-101\") should be called", (val) => {
                                componentInstance.updateState(val, various_showLoadbar[i][0], various_callback[j][0]);
                                val.refreshFactor = componentInstance.state.refreshFactor + 1;

                                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
                            });
                        }
                    } else {
                        if(isFunction(various_callback[j][0])){
                            test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): this.setState(newProps, callback) should be called", (val) => {
                                componentInstance.setState = jest.fn();

                                componentInstance.updateState(val, various_showLoadbar[i][0], various_callback[j][0]);
                                
                                expect(componentInstance.setState).toHaveBeenCalledWith(val, various_callback[j][0]);
                            });
                        } else if(isUndefined(various_callback[j][0])){
                            test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): this.setState(newProps) should be called", (val) => {
                                componentInstance.setState = jest.fn();

                                componentInstance.updateState(val, various_showLoadbar[i][0], various_callback[j][0]);
                                
                                expect(componentInstance.setState).toHaveBeenCalledWith(val);
                            });
                        } else {
                            test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): ExceptionsHandler.ValidatorError(\"app-101\") should be called", (val) => {
                                componentInstance.updateState(val, various_showLoadbar[i][0], various_callback[j][0]);
                                
                                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
                            });

                        }
                    }
                }
            };
        });

        describe("Check that correct error messages are caught", () => {
            test("Running updateState({}, false, false) will throw an error and pass it to launchErrorOverlay(err), where err.code = \"app-101\"", () => {
                componentInstance.launchErrorOverlay = jest.fn();
                componentInstance.updateState({}, false, false);

                expect(componentInstance.launchErrorOverlay).toHaveBeenCalledWith(expectedErrorReturns["app-101"]);
            })

            test("Running updateState(\"This is definetly not an object\", false, false) will throw an error and pass it to launchErrorOverlay(err), where err.code = \"app-102\"", () => {
                componentInstance.launchErrorOverlay = jest.fn();
                componentInstance.updateState("This is definetly not an object", false, false);

                expect(componentInstance.launchErrorOverlay).toHaveBeenCalledWith(expectedErrorReturns["app-102"]);
            })
        })
    });

    describe("Test handleNavigation(viewProps)", () => {
        describe("\"viewProps\" (not a non-array object)", () => {
            const variousInputs = [
                ["test string"], 
                [30], 
                [true], 
                [false], 
                [["donald duck", "mickey mouse", 5, false]],
                [null],
                [undefined],
            ];
            
            test.each(variousInputs)("Run handleNavigation(%p): ExceptionsHandler.ValidatorError(\"app-104\") should be called", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-104");
            })

            test("Run handleNavigation(): ExceptionsHandler.ValidatorError(\"app-104\") should be called", () => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-104");
            })
        });

        describe("\"viewProps\" (various non-array objects)", () => {
            const various_viewData = [
                ["test string for view data"], 
                [30], 
                [true], 
                [false], 
                [["tiger", "winnie", 5, false]],
                [null],
                [undefined],
                [{testObj1: "contents of test object 1"}],
                [{testObj4: "contents of test object 1", anotherTestObj: 41}]
            ];

            const various_metaData = [
                ["test string for meta data"], 
                [45], 
                [true], 
                [false], 
                [["daisy duck", "goofy", 52, true]],
                [null],
                [undefined],
                [{testObj2: "contents of test object 2"}],
                [{testObj21: "contents of test object 2", anotherTestObj2: false, anotherTestObj3: null}]
            ];

            const various_refreshFactor = [
                ["test string for refreshFactor"], 
                [14], 
                [true], 
                [false], 
                [["darkwing duck", "simba", false, 247]],
                [null],
                [undefined],
                [{testObj3: "contents of test object 3"}],
                [{testObj32: "contents of test object 3", imagination1: 0, anotherTestObj4: "test string", anotherTestObj5: () => {}}]
            ];


            test.each(various_viewData)("Run handleNavigation({ viewData: %p }): ExceptionsHandler.ValidatorError(\"app-103\") should be called", (val) => {
                componentInstance.handleNavigation({ viewData: val });

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
            });


            test.each(various_metaData)("Run handleNavigation({ metaData: %p }): ExceptionsHandler.ValidatorError(\"app-103\") should be called", (val) => {
                componentInstance.handleNavigation({ metaData: val });

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
            });

            test.each(various_refreshFactor)("Run handleNavigation({ refreshFactor: %p }): ExceptionsHandler.ValidatorError(\"app-103\") should be called", (val) => {
                componentInstance.handleNavigation({ refreshFactor: val });

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
            });

            test("Run handleNavigation({}): ExceptionsHandler.ValidatorError(\"app-103\") should be called", () => {
                componentInstance.handleNavigation({});

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
            });

            describe("\"viewProps\" contains \"viewData\" and \"metaData\" with various values.", () => {
                for(let i = 0; i < various_metaData.length; i++){
                    const testComponent = predefinedComponent();
                    const componentInstance = testComponent.instance();

                    test.each(various_viewData)("Run handleNavigation({ viewData: %p, metaData: " + various_metaData[i][0] + " }): ExceptionsHandler.ValidatorError(\"app-103\") should be called", (val) => {
                        componentInstance.handleNavigation({ viewData: val, metaData: various_metaData[i][0] });

                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
                    });

                }
            });

            describe("\"viewProps\" contains \"viewData\" and \"refreshFactor\" with various values.", () => {
                for(let i = 0; i < various_refreshFactor.length; i++){
                    const testComponent = predefinedComponent();
                    const componentInstance = testComponent.instance();

                    test.each(various_viewData)("Run handleNavigation({ viewData: %p, refreshFactor: " + various_refreshFactor[i][0] + " }): ExceptionsHandler.ValidatorError(\"app-103\") should be called", (val) => {
                        componentInstance.handleNavigation({ viewData: val, refreshFactor: various_refreshFactor[i][0] });

                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
                    });

                }
            });

            describe("\"viewProps\" contains \"metaData\" and \"refreshFactor\" with various values.", () => {
                for(let i = 0; i < various_refreshFactor.length; i++){
                    const testComponent = predefinedComponent();
                    const componentInstance = testComponent.instance();

                    test.each(various_metaData)("Run handleNavigation({ metaData: %p, refreshFactor: " + various_refreshFactor[i][0] + " }): ExceptionsHandler.ValidatorError(\"app-103\") should be called", (val) => {
                        componentInstance.handleNavigation({ metaData: val, refreshFactor: various_refreshFactor[i][0] });
                      
                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
                    });
                }
            });
 
            describe("\"viewProps\" contains \"metaData\", \"viewData\" and \"refreshFactor\" with various values.", () => {
                const { isObject, isNumber } = validator;

                for(let i = 0; i < various_metaData.length; i++){
                    for(let k = 0; k < various_viewData.length; k++){
                        for(let j = 0; j < various_refreshFactor.length; j++){
                            if(!(isObject(various_metaData[i][0]) && isObject(various_viewData[k][0]) && isNumber(various_refreshFactor[j][0]))){
                                const testComponent = predefinedComponent();
                                const componentInstance = testComponent.instance();
                                
                                test("Run handleNavigation({ metaData: " + various_metaData[i][0] + ", viewData: " + various_viewData[k][0] + ", refreshFactor: " + various_refreshFactor[j][0] + " }): ExceptionsHandler.ValidatorError(\"app-103\") should be called", () => {
                                    componentInstance.handleNavigation({ metaData: various_metaData[i][0], viewData: various_viewData[k][0], refreshFactor: various_refreshFactor[j][0] });

                                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
                                });

                            }
                        }
                    }
                }

                const assumedValid_viewProps_inputs = [
                    [{ metaData: {}, viewData: {}, refreshFactor: 21 }],
                    [{ metaData: {}, viewData: {}, refreshFactor: 17 }],
                    [{ metaData: {}, viewData: {}, refreshFactor: 85 }],
                    [{ metaData: {}, viewData: {}, refreshFactor: 61 }],
                    [{ metaData: {}, viewData: {}, refreshFactor: 18 }],
                    [{ metaData: {}, viewData: {}, refreshFactor: 28, randomKey1: {}, randomKey2: () => {}, randomKey3: ["test string"], randomKey4: false }],
                    [{ metaData: {}, viewData: {}, refreshFactor: 42, randomKey1: null, randomKey2: true, randomKey3: ["test string again"], randomKey4: () => {} }],
                    [{ metaData: {}, viewData: {}, refreshFactor: 94, randomKey1: false, randomKey2: [3,2,4], randomKey4: ["test string again"], randomKey3: 248 }]
                ];

                test.each(assumedValid_viewProps_inputs)("Run handleNavigation(%p): this.updateState() should be called", (val) => {
                    const testComponent = predefinedComponent();
                    const componentInstance = testComponent.instance();

                    componentInstance.updateState = jest.fn();
                    componentInstance.handleNavigation(val);

                    expect(componentInstance.updateState).toHaveBeenCalled();
                }); 
            });

        });

        describe("Check that correct error messages are caught", () => {
            test("Running handleNavigation({}) will throw an error and pass it to launchErrorOverlay(err), where err.code = \"app-103\"", () => {
                componentInstance.launchErrorOverlay = jest.fn();
                componentInstance.handleNavigation({});

                expect(componentInstance.launchErrorOverlay).toHaveBeenCalledWith(expectedErrorReturns["app-103"]);
            })

            test("Running handleNavigation(\"This is absolutely not an object\") will throw an error and pass it to launchErrorOverlay(err), where err.code = \"app-104\"", () => {
                componentInstance.launchErrorOverlay = jest.fn();
                componentInstance.handleNavigation("This is absolutely not an object");

                expect(componentInstance.launchErrorOverlay).toHaveBeenCalledWith(expectedErrorReturns["app-104"]);
            })
        }); 
    });

    describe("Test handleMainNavBarClick(sidebarProps)", () => {

        describe("\"sidebarProps\" is not an object", () => {
            const various_sidebarProps = [
                ["A very random input string"],
                [2.47],
                [false],
                [true],
                [null],
                [undefined],
                [[20, 15, "hello"]],
                [() => {}]
            ];

            test("Run handleMainNavBarClick(): ExceptionsHandler.ValidatorError(\"app-105\") should be called", () => {
                componentInstance.handleMainNavBarClick();
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-105");
            })
        });

        describe("Test when \"sidebarProps\" parameter is an object with various keys.", () => {
            describe("Check that \"sidebarProps\" contains the key \"activeNavLinkKey\" in its first level, and that it contains a number. If not, throw an error", () => {    
                const various_activeNavLinkKey_notNumbers = [
                    ["test string"],
                    [true],
                    [false],
                    [undefined],
                    [null],
                    [{ anotherSetup: "ofObjects", test: true }],
                    [[2,3,4,5]],
                    [() => {}]
                ];

                test.each(various_activeNavLinkKey_notNumbers)("Run handleMainNavBarClick({ activeNavLinkKey: %p}): ExceptionsHandler.ValidatorError(\"app-106\") should be called, because \"activeNavLinkKey\" is not a number in \"sidebarProps\".", (val) => {
                    componentInstance.handleMainNavBarClick({ activeNavLinkKey: val });
        
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-106");
                });

                const various_activeNavLinkKey_numbers = [
                    [77],
                    [48],
                    [120],
                    [5],
                    [9]
                ];

                test.each(various_activeNavLinkKey_numbers)("Run handleMainNavBarClick({ activeNavLinkKey: %p}): componentInstance.updateState should be called, because \"sidebarProps\" contains \"activeNavLinkKey\" with a number in its first level.", (val) => {
                    componentInstance.updateState = jest.fn();
                    componentInstance.handleMainNavBarClick({ activeNavLinkKey: val });
        
                    expect(componentInstance.updateState).toHaveBeenCalled();
                });
            });

            describe("Check that \"sidebarProps\" contains various objects with no valid keys", () => {
                const various_objects_invalid_keys = [
                    [{ key1: "abc", key2: "def", key3: 8, key4: "ghi", key5: "jklmnop" }],
                    [{ key6: false, key7: true, key8: [], key9: undefined, key10: 13 }],
                    [{ key11: 25, key12: false, key13: 8, key14: "ghasdadi", key15: {} }],
                    [{ key16: "abc", key17: "def", key18: 8, key19: "ghi", key20: "jklmnop" }]
                ];

                test.each(various_objects_invalid_keys)("Run handleMainNavBarClick(%p): ExceptionsHandler.ValidatorError(\"app-106\") should be called, because \"activeNavLinkKey\" is missing in the first level of \"sidebarProps\".", (val) => {
                    componentInstance.handleMainNavBarClick(val);
        
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-106");
                });
            })
            
        })
        
        describe("Check that correct error messages are caught", () => {
            test("Running handleMainNavBarClick({}) will throw an error and pass it to launchErrorOverlay(err), where err.code = \"app-106\"", () => {
                componentInstance.launchErrorOverlay = jest.fn();
                componentInstance.handleMainNavBarClick({});

                expect(componentInstance.launchErrorOverlay).toHaveBeenCalledWith(expectedErrorReturns["app-106"]);
            })

            test("Running handleMainNavBarClick(\"Not an object\") will throw an error and pass it to launchErrorOverlay(err), where err.code = \"app-105\"", () => {
                componentInstance.launchErrorOverlay = jest.fn();
                componentInstance.handleMainNavBarClick("Not an object");

                expect(componentInstance.launchErrorOverlay).toHaveBeenCalledWith(expectedErrorReturns["app-105"]);
            })
        })
    });
});