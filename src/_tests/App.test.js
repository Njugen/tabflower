import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './../App';
import * as ExceptionsHandler from './../components/utils/exceptionsAndHandler';
import * as validator from './../components/utils/inputValidators';
import ViewFooter from './../components/views/components/viewFooter';
import ErrorBoundary from './../components/utils/errorBoundary';
import MainNavBar from './../components/sidebars/mainNavBar/mainNavBar';
import RouteList from './../components/routes/routeList';
import FullWidthLoadbar from './../components/utils/fullWidthLoadbar';

const predefinedComponent = () => {
    const component = shallow(<App />);
    return component;
}

let testComponent;
let componentInstance;
let nonsenseTest = 0;


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

    describe("Test basic <App /> render", () => {
        describe("<Fragment> is the root component in this render", () => {
            test("It occurs as the first component", () => {
                expect(testComponent.at(0).name()).toBe("Fragment");
            });
            
            test("A sibling component does not exist at index 1 in the render", () => {
                expect(testComponent.at(1).exists()).toBe(false);
            }); 

            test("The first and the last components are strictly identical (\"Fragment\")", () => {
                expect(testComponent.first()).toStrictEqual(testComponent.last());
            });
        });

        describe("<ErrorBoundary> is the only direct child component to <Fragment>", () => {
            test("It occurs as the first child component", () => {
                expect(testComponent.childAt(0).name()).toBe("ErrorBoundary");
            });
            
            test("A sibling component does not exist", () => {
                expect(testComponent.childAt(1).exists()).toBe(false);
            }); 

            test("The first and the last components are strictly identical (\"ErrorBoundary\")", () => {
                expect(testComponent.children().first()).toStrictEqual(testComponent.children().last());
            }); 
        });

        describe("These components need to be used in the <App> component", () => {
            test("<MainNavBar /> is being used somewhere", () => {
                expect(testComponent.find(MainNavBar).exists()).toBe(true);
            });

            test("<RouteList /> is being used somewhere", () => {
                expect(testComponent.find(RouteList).exists()).toBe(true);
            });

            test("<ViewFooter /> is being used somewhere", () => {
               expect(testComponent.find(ViewFooter).exists()).toBe(true);
            });

            test("<FullWidthLoadbar /> is being used somewhere", () => {
                expect(testComponent.find(FullWidthLoadbar).exists()).toBe(true);
            });
        });
    }) 
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
        "app-106": ExceptionsHandler.ValidatorError("app-106"),
        "app-107": ExceptionsHandler.ValidatorError("app-107"),
        "app-108": ExceptionsHandler.ValidatorError("app-108"),
        "app-109": ExceptionsHandler.ValidatorError("app-109"),
        "app-110": ExceptionsHandler.ValidatorError("app-110"),
        "app-112": ExceptionsHandler.ValidatorError("app-112"),
        "app-113": ExceptionsHandler.ValidatorError("app-113")
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
        },
        "app-107": {
            name: "ValidatorError",
            message: "The \"data\" parameter in the App component's launchModal() function needs to be a an object (but not an array).",
            code: "app-107"
        },
        "app-108": {
            name: "ValidatorError",
            message: "The \"data\" parameter in the App component's launchModal() function does not contain the necessary keys",
            code: "app-108"
        },
        "app-109": {
            name: "ValidatorError",
            message: "The \"data\" parameter in the App component's launchErrorOverlay() function needs to be a an object (but not an array).",
            code: "app-109"
        },
        "app-110": {
            name: "ValidatorError",
            message: "The \"data\" parameter in the App component's launchErrorOverlay() function does not contain the necessary keys",
            code: "app-110"
        },
        "app-112": {
            name: "ValidatorError",
            message: "The \"routesArray\" parameter in the App component's validateRouteArrayFormat() function needs to be an array, with each element being an object containing at least the following keys: { label: \"name of the route\", path: \"/path of the route\", key: index number }",
            code: "app-112"
        },
        "app-113": {
            name: "ValidatorError",
            message: "The \"data\" parameter in the App component's handleRouteListReady() function needs to be an array, containing different route objects",
            code: "app-113"
        }
    }

    const expectedPossibleModalIds = [
        "confirm-action",
        "date-settings",
        "etgmlaunchgroupmodal",
        "etgmremovegroupmodal",
        "cotmremoveunresponsivetabsmodal",
        "cotmremovewindowmodal",
        "cotmremovetabmodal"
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();

        testComponent = predefinedComponent();
        componentInstance = testComponent.instance();
        
        componentInstance.setState = jest.fn();

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
                test.each(various_newProps)("Run updateState(%p, " + various_showLoadbar[i][0] + "): ExceptionsHandler.ValidatorError(\"app-102\") should be called once", (val) => {
                    componentInstance.updateState(val, various_showLoadbar[i][0]);
                    
                    expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
                });

            }

        });

        describe("\"newProps\" (not a non-array object), \"showLoadbar\" (various values), \"callback\" (various values)", () => {
            for(let i = 0; i < various_showLoadbar.length; i++){
                for(let j = 0; j < various_callback.length; j++){
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

                    if(various_showLoadbar[i][0] === true){
                        if(isFunction(various_callback[j][0])){
                            test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): this.setState(newProps, callback) should be called with correct parameters, refreshFactor increased by 1.", (val) => {
                                componentInstance.updateState(val, various_showLoadbar[i][0], various_callback[j][0]);
                                val.refreshFactor = componentInstance.state.refreshFactor + 1;

                                expect(componentInstance.setState).toHaveBeenCalledWith(val, various_callback[j][0]);
                            });
                        } else if(isUndefined(various_callback[j][0])){
                            test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): this.setState(newProps) should be called with correct parameters, refreshFactor increased by 1.", (val) => {
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
                            test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): this.setState(newProps, callback) should be called with correct parameters", (val) => {
                                componentInstance.updateState(val, various_showLoadbar[i][0], various_callback[j][0]);
                                
                                expect(componentInstance.setState).toHaveBeenCalledWith(val, various_callback[j][0]);
                            });
                        } else if(isUndefined(various_callback[j][0])){
                            test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + ", " + various_callback[j][0] + "): this.setState(newProps) should be called", (val) => {
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
                    test.each(various_viewData)("Run handleNavigation({ viewData: %p, metaData: " + various_metaData[i][0] + " }): ExceptionsHandler.ValidatorError(\"app-103\") should be called", (val) => {
                        componentInstance.handleNavigation({ viewData: val, metaData: various_metaData[i][0] });

                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
                    });

                }
            });

            describe("\"viewProps\" contains \"viewData\" and \"refreshFactor\" with various values.", () => {
                for(let i = 0; i < various_refreshFactor.length; i++){
                    test.each(various_viewData)("Run handleNavigation({ viewData: %p, refreshFactor: " + various_refreshFactor[i][0] + " }): ExceptionsHandler.ValidatorError(\"app-103\") should be called", (val) => {
                        componentInstance.handleNavigation({ viewData: val, refreshFactor: various_refreshFactor[i][0] });

                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
                    });

                }
            });

            describe("\"viewProps\" contains \"metaData\" and \"refreshFactor\" with various values.", () => {
                for(let i = 0; i < various_refreshFactor.length; i++){
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

                test.each(assumedValid_viewProps_inputs)("Run handleNavigation(%p): this.updateState() should be called with correct parameters", (val) => {
                    componentInstance.updateState = jest.fn();
                    componentInstance.handleNavigation(val);

                    expect(componentInstance.updateState).toHaveBeenCalledWith({
                        currentView: val
                    }, true);
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

            test.each(various_sidebarProps)("Run handldeMainNavBarClick(%p): ExceptionsHandler.ValidatorError(\"app-105\") should be called", (val) => {
                componentInstance.handleMainNavBarClick(val);
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-105");
            })
        });


        describe("\"sidebarProps\" contains the key \"activeNavLinkKey\" in its first level.", () => {    
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

            test.each(various_activeNavLinkKey_notNumbers)("Run handleMainNavBarClick({ activeNavLinkKey: %p}): ExceptionsHandler.ValidatorError(\"app-106\") should be called", (val) => {
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

            test.each(various_activeNavLinkKey_numbers)("Run handleMainNavBarClick({ activeNavLinkKey: %p}): componentInstance.updateState should be called with correct parameters", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleMainNavBarClick({ activeNavLinkKey: val });
    
                expect(componentInstance.updateState).toHaveBeenCalledWith({
                    MainNavBar: {
                        "activeNavLinkKey": val
                    }
                }, false);
            });
        });

        describe("Check when \"sidebarProps\" contains various objects with no valid keys", () => {
            const various_objects_invalid_keys = [
                [{ key1: "abc", key2: "def", key3: 8, key4: "ghi", key5: "jklmnop" }],
                [{ key6: false, key7: true, key8: [], key9: undefined, key10: 13 }],
                [{ key11: 25, key12: false, key13: 8, key14: "ghasdadi", key15: {} }],
                [{ key16: "abc", key17: "def", key18: 8, key19: "ghi", key20: "jklmnop" }]
            ];

            test.each(various_objects_invalid_keys)("Run handleMainNavBarClick(%p): ExceptionsHandler.ValidatorError(\"app-106\") should be called", (val) => {
                componentInstance.handleMainNavBarClick(val);
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-106");
            });
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

    describe("Test launchModal(data)", () => {
        describe("\"data\" is not a non-array object", () => {
            const various_data = [
                ["This is a test string passed to launchModal through data"],
                [454],
                [true],
                [false],
                [undefined],
                [null],
                [() => {}],
                [[1, 2 ,3, "4"]]
            ];  
                      
            test.each(various_data)("Run launchModal(%p): ExceptionsHandler.ValidatorError(\"app-107\") should be called", (val) => {
                componentInstance.launchModal(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-107");
            });
        });

        describe("\"data\" is a non-array object with no valid keys", () => {
            const various_data = [
                [{orange_amount: 21, apple_amount: 31, perch_amount: false, tomato_amount: null, cucumber_amount: "No info"}],
                [{orange2_amount: "247", apple_amount2: true, perch_amount2: null, tomato_amount2: 65, cucumber_amount2: false}],
                [{orange_amount3: false, apple_amount3: "no info", perch_amount3: 7, tomato_amount3: true, cucumber_amount3: null}],
                [{orange_amount4: null, apple_amount4: false, perch_amount4: "no info provided", tomato_amount4: null, cucumber_amount4: ["empty"]}]
            ];  
                      
            test.each(various_data)("Run launchModal(%p): ExceptionsHandler.ValidatorError(\"app-108\") should be called", (val) => {
                componentInstance.launchModal(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-108");
            });
        })

        describe("\"data\" is a non-array object with valid keys, but invalid value combinations", () => {
            const various_data = [
                [{id: false, action: 514, params: ["blablabla"] }],
                [{id: null, action: () => {}, params: {} }],
                [{id: 218, action: true, params: null }],
                [{id: "test", action: "24", params: () => {} }],
                [{id: "test", action: "24", params: () => {}, tomato_amount4: null, cucumber_amount4: ["empty"]}]
            ];  
                      
            test.each(various_data)("Run launchModal(%p): ExceptionsHandler.ValidatorError(\"app-108\") should be called", (val) => {
                componentInstance.launchModal(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-108");
            });
        });

        describe("\"data\" is a non-array object with valid keys and valid typeof combinations", () => {
            const various_data = [
                [{id: "test", action: () => {}, params: { testkey1: "abcd" } }],
                [{id: "test2", action: () => {}, params: { testkey2: 842, testkey3: "idg", testkey4: null }, tomato_amount4: null, cucumber_amount4: ["empty"]}],
                [{id: "etgmlaunchgroupmodal", action: () => {}, params: {apple: 1, ign: 2}, tomato_amount4: null, cucumber_amount4: ["empty"]}],
                [{id: "cotmremovewindowmodal", action: () => {}, params: {apple: 1, ign: 2}, tomato_amount4: false, cucumber_amount4: ["empty"]}]
            ];  
                      
            test.each(various_data)("Run launchModal(%p): this.setState() should be called with correct parameters", (val) => {
                componentInstance.launchModal(val);

                expect(componentInstance.setState).toHaveBeenCalledWith({ 
                    modal: {
                        launched: true,
                        ...val
                    }
                });
            });

        });

        describe("Check that correct error messages are caught", () => {
            test("Running launchModal({}) will throw an error and pass it to launchErrorOverlay(err), where err.code = \"app-108\"", () => {
                componentInstance.launchErrorOverlay = jest.fn();
                componentInstance.launchModal({});

                expect(componentInstance.launchErrorOverlay).toHaveBeenCalledWith(expectedErrorReturns["app-108"]);
            })

            test("Running launchModal(\"Not an object\") will throw an error and pass it to launchErrorOverlay(err), where err.code = \"app-107\"", () => {
                componentInstance.launchErrorOverlay = jest.fn();
                componentInstance.launchModal("Not an object");
                
                expect(componentInstance.launchErrorOverlay).toHaveBeenCalledWith(expectedErrorReturns["app-107"]);
            })
        })
    });

    describe("Test launchErrorOverlay(data)", () => {
        describe("\"data\" is not a non-array object", () => {
            const various_data = [
                [true],
                ["Passing this to launchErrorOverlay()"],
                [undefined],
                [false],
                [454],
                [[1, 2 ,3, "4"]],
                [() => {}],
                [null]
            ];  

            test.each(various_data)("Run launchErrorOverlay(%p): ExceptionsHandler.ValidatorError(\"app-109\") should be called", (val) => {
                componentInstance.launchErrorOverlay(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-109");
            });
        }); 

        describe("\"data\" is a non-array object with no valid keys", () => {
            const various_data = [
                [{orange_amount: 15, apple_amount: 20, perch_amount: false, tomato_amount: null, cucumber_amount: "No info"}],
                [{orange2_amount: "247", apple_amount2: true, perch_amount2: null, tomato_amount2: 65, cucumber_amount2: false}],
                [{orange_amount3: false, apple_amount3: "no info  2", perch_amount3: 7, tomato_amount3: true, cucumber_amount3: null}],
                [{orange_amount4: null, apple_amount4: false, perch_amount4: "no info provided 2", tomato_amount4: null, cucumber_amount4: ["empty"]}]
            ];  
                      
            test.each(various_data)("Run launchErrorOverlay(%p): ExceptionsHandler.ValidatorError(\"app-110\") should be called", (val) => {
                componentInstance.launchErrorOverlay(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-110");
            });
        });

        describe("\"data\" is a non-array object with valid keys, but invalid value combinations", () => {
            const various_data = [
                [{code: false, message: 514, name: ["blablabla"] }],
                [{code: null, message: () => {}, name: {} }],
                [{code: 218, message: true, name: null }],
                [{code: "test", message: "24", name: () => {} }],
                [{code: "test", message: "24", name: () => {}, tomato_amount8: null, cucumber_amount6: ["empty"]}]
            ];  
                      
            test.each(various_data)("Run launchErrorOverlay(%p): ExceptionsHandler.ValidatorError(\"app-110\") should be called", (val) => {
                componentInstance.launchErrorOverlay(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-110");
            });
        });

        describe("\"data\" is a non-array object with valid keys and valid typeof combinations", () => {
            const various_data = [
                [{code: "testCode-101", message: "Lorem ipsum dolor sit amet", name: "Mock Error 1" }],
                [{code: "testCode-102", message: "consectetur adipiscing elit", name: "Mock Error 2" }],
                [{code: "testCode-103", message: "facilisis a lacinia sit amet", name: "Mock Error 3" }],
                [{code: "testCode-104", message: "Sed pretium magna eget", name: "Mock Error 4" }],
                [{code: "testCode-105", message: "Nunc maximus vitae urna sed", name: "Mock Error 5", tomato_amount8: null, cucumber_amount6: ["empty"]}]
            ];  

            
            test.each(various_data)("Run launchErrorOverlay(%p): this.setState() should be called with correct parameters", (val) => {
                let errors = [];
                errors.push(val);
                
                componentInstance.launchErrorOverlay(val);

                expect(componentInstance.setState).toHaveBeenCalledWith({ 
                    errors
                });
            }); 
        });

        describe("Check that correct error messages are caught", () => {
            test("Running launchErrorOverlay({}) will throw an error err object and pass it to setState({errors: [{}, err]}), where err.code = \"app-110\"", () => {
                componentInstance.launchErrorOverlay({});

                expect(componentInstance.setState).toHaveBeenCalledWith({
                    errors: [{}, expectedErrorReturns["app-110"]]
                });
            })

            test("Running launchErrorOverlay(\"Not an object\") will throw an error object err and pass it to setState({errors: [\"Not an object\", err]}), where err.code = \"app-109\"", () => {
                componentInstance.launchErrorOverlay("Not an object");
                
                expect(componentInstance.setState).toHaveBeenCalledWith({
                    errors: ["Not an object", expectedErrorReturns["app-109"]]
                });
            })
        })
    });

    describe("Test clearModal()", () => {
        const timer = 500;

        test("Run clearModal(): The callback function used in setTimeout() should get called after " + timer + "ms", () => {
            jest.useFakeTimers();
            
            componentInstance.clearModal();
            
            expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), timer)
            jest.useRealTimers();
        });

        test("Run clearModal(): When the setTimeout callback function triggers so does this.setState({ modal: {} }).", () => {
            jest.useFakeTimers();

            componentInstance.clearModal();
            jest.runAllTimers();
            
            expect(componentInstance.setState).toHaveBeenCalledWith({ modal: {} });
            jest.useRealTimers();
        });
    });

    describe("Test clearErrors()", () => {
        test("Run clearErrors(): This should call this.setState({ errors: [] })", () => {
            componentInstance.clearErrors();

            expect(componentInstance.setState).toHaveBeenCalledWith({ errors: [] });
        })
    });

    describe("Test handleRouteListReady(data)", () => {
        describe("\"data\" is not an array", () => {
            const various_data = [
                ["A short text string"],
                [25],
                [false],
                [true],
                [undefined],
                [null],
                [{ isApple: false, isGoldenRetriever: true, age: 5 }],
                [() => {}]
            ];
            
            test.each(various_data)("Run handleRouteListReady(%p): ExceptionsHandler.Validator(\"app-113\") should be called", (val) => {
                componentInstance.handleRouteListReady(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-113");
            });

            test("Run handleRouteListReady(): ExceptionsHandler.Validator(\"app-113\") should be called", () => {
                componentInstance.handleRouteListReady();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-113");
            });
        });
        
        describe("\"data\" is an array", () => {
            describe("Contains route objects with at least these keys: \"label\" (string), \"path\" (string), \"key\" (number) ", () => {
                const various_data = [
                    [{ label: "About", path: "/about", key: 0 }, { label: "Settings", path: "/settings", key: 1 }, { label: "Quit", path: "/quit", key: 2 }],
                    [{ label: "Settings", path: "/settings", key: 0, randomkey: () => {} }, { label: "Browse Pages", path: "/browse-pages", key: 1, randomkey: true }, { label: "About", path: "/about", key: 3, randomkey: false }],
                    [{ label: "Browse Pages", path: "/browse-pages", key: 0, randomkey: false }, { label: "Settings", path: "/settings", key: 1 }],
                    [{ label: "Download", path: "/download", key: 0}, { label: "Browse Pages", path: "/browse-pages", key: 1, randomkey: false }]
                ];

                for(let i = 0; i < various_data.length; i++){
                    test("Run handleRouteListReady({ routes: " + JSON.stringify(various_data[i]) + " }): this.setState({ routes: " + JSON.stringify(various_data[i]) + " }) should be called with correct array", () => {
                        componentInstance.handleRouteListReady(various_data[i]);

                        expect(componentInstance.setState).toHaveBeenCalledWith({ routes: various_data[i] });
                    })
                }
            })

            describe("Contains route objects with at least these keys: \"label\", \"path\" and \"key\". But for each object, one or more of those keys being in wrong format ", () => {
                const various_data = [
                    [{ label: 30, path: "/about", key: 0 }, { label: "Settings", path: "/settings", key: 1 }, { label: false, path: "/quit", key: 2 }],
                    [{ label: "Settings", path: 20, key: null, randomkey: () => {} }, { label: true, path: "/browse-pages", key: false, randomkey: true }, { label: "About", path: "/about", key: 3, randomkey: false }],
                    [{ label: undefined, path: false, key: [], randomkey: false }, { label: {}, path: 9, key: "test" }],
                    [{ label: "Download", path: "/download", key: "0"}, { label: "Browse Pages", path: "/browse-pages", key: "1", randomkey: false }]
                ];

                for(let i = 0; i < various_data.length; i++){
                    test("Run handleRouteListReady({ routes: " + JSON.stringify(various_data[i]) + " }): ExceptionsHandler.ValidatorError(\"app-112\") should be called", () => {
                        componentInstance.handleRouteListReady(various_data[i]);

                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-112");
                    })
                }
            })

            describe("Contains route objects with one or more of the following keys missing in each object: \"label\", \"path\" and \"key\"", () => {
                const various_data = [
                    [{ apple: "test value", thanos: false, avengers: "endgame" }, { }, { label: false, path: "/quit" }],
                    [{ label: "Settings", key: null, randomkey: () => {} }, { label: true, path: "/browse-pages", randomkey: true }, { label: "About", path: "/about", key: 3, randomkey: false }],
                    [{ path: "/download", key: 0}, { label: "Browse Pages", key: 1, randomkey: false }, { label: "About", path: "/about"}],
                    [{ donkey: "Download", flag: "/download", vm: "0"}, { randomkey: false }]
                ];

                for(let i = 0; i < various_data.length; i++){
                    test("Run handleRouteListReady({ routes: " + JSON.stringify(various_data[i]) + " }): ExceptionsHandler.ValidatorError(\"app-112\") should be called", () => {
                        componentInstance.handleRouteListReady(various_data[i]);

                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-112");
                    })
                }
            })

            test("Run handleRouteListReady({ routes: [] }): ExceptionsHandler.ValidatorError(\"app-113\") should be called because of the routes array being empty", () => {
                componentInstance.handleRouteListReady({ routes: [] });

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-113");
            })
        }); 
    });
}); 
