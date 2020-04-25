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

describe("<App />: Unit test of individual methods located in this component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        testComponent = predefinedComponent();
        
        componentInstance = testComponent.instance();
        componentInstance.setState = jest.fn();
        componentInstance.launchErrorOverlay = jest.fn();

        ExceptionsHandler.ValidatorError = jest.fn();
    });
     
    describe("updateState(newProps, showLoadbar, callback): Test this method with various typeof inputs as \"newProps\". Only call this.setState() if the \"newProps\" parameter is an object (excluding arrays), AND if the \"callback\" parameter is a function or undefined. The \"showLoadbar\" parameter does not affect what function gets called", () => {
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

        for(let i = 0; i < various_showLoadbar.length; i++){
            test.each(various_newProps)("Run updateState(%p, " + various_showLoadbar[i][0] + "): this.launchErrorOverlay() should be called once, because \"newProps\" is not an object. \"showLoadbar\" does not change the expected result.", (val) => {
                const testComponent = predefinedComponent();
                const componentInstance = testComponent.instance();
                componentInstance.launchErrorOverlay = jest.fn();

                componentInstance.updateState(val, various_showLoadbar[i][0]);
                
                expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
            });
        }

        
        for(let i = 0; i < various_showLoadbar.length; i++){
            if(various_showLoadbar[i][0] === true){
                test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + "): this.setState(%p) should be called, because \"newProps\" is an object and there is no callback specified. \"showLoadbar\" does not change the expected result.", (val) => {
                    const testComponent = predefinedComponent();
                    const componentInstance = testComponent.instance();
                    componentInstance.setState = jest.fn();

                    componentInstance.updateState(val, various_showLoadbar[i][0]);
                    val.refreshFactor = 1;

                    expect(componentInstance.setState).toHaveBeenCalledWith(val);
                });
            } else {
                test.each(various_newProps_objects)("Run updateState(%p, " + various_showLoadbar[i][0] + "): this.setState(%p) should be called, because \"newProps\" is an object and there is no callback specified. \"showLoadbar\" does not change the expected result.", (val) => {
                    const testComponent = predefinedComponent();
                    const componentInstance = testComponent.instance();
                    componentInstance.setState = jest.fn();

                    componentInstance.updateState(val, various_showLoadbar[i][0]);
                    
                    expect(componentInstance.setState).toHaveBeenCalledWith(val);
                });
            }
        };

        test("Run updateState({}, false): this.setState(testParam_newProps) should be called because \"newProps\" is an object, and \"callback\" parameter being undefined.", () => {
            const testParam_newProps = {};
            componentInstance.updateState(testParam_newProps, false);

            expect(componentInstance.setState).toHaveBeenCalledWith(testParam_newProps);
        });

        test("Run updateState({ key1: 1, key2: \"hello\", key3: false }, false): this.setState(testParam_newProps) should be called because \"newProps\" is an object, and \"callback\" parameter being undefined.", () => {
            const testParam_newProps = { key1: 1, key2: "hello", key3: false };
            componentInstance.updateState(testParam_newProps, false);

            expect(componentInstance.setState).toHaveBeenCalledWith(testParam_newProps);
        });

        test("Run updateState({}, false, () => {}): this.setState(testParam_newProps, testParam_callback) should be called because \"newProps\" is an object, and \"callback\" is a function.", () => {
            const testParam_newProps = {};
            const testParam_callback = jest.fn();

            componentInstance.updateState(testParam_newProps, false, testParam_callback);

            expect(componentInstance.setState).toHaveBeenCalledWith(testParam_newProps, testParam_callback);
        });

        test("Run updateState({ key1: 1, key2: \"hello\", key3: false }, false, () => {}): this.setState(testParam_newProps, testParam_callback) should be called because \"newProps\" is an object, and \"callback\" is a function.", () => {
            const testParam_newProps = { key1: 1, key2: "hello", key3: false };
            const testParam_callback = jest.fn();

            componentInstance.updateState(testParam_newProps, false, testParam_callback);

            expect(componentInstance.setState).toHaveBeenCalledWith(testParam_newProps, testParam_callback);
        });

        test("Run updateState({}, false, \"test\"): this.launchErrorOverlay() should be called because \"newProps\" is an object, but \"callback\" is neither a function nor undefined", () => {
            componentInstance.updateState({}, false, "test");

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState({}, false, 380): this.launchErrorOverlay() should be called because \"newProps\" is an object, but \"callback\" is neither a function nor undefined", () => {
            componentInstance.updateState({}, false, 380);

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState({}, false, true): this.launchErrorOverlay() should be called because \"newProps\" is an object, but \"callback\" is neither a function nor undefined", () => {
            componentInstance.updateState({}, false, true);

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState({}, false, null): this.launchErrorOverlay() should be called because \"newProps\" is an object, but \"callback\" is neither a function nor undefined", () => {
            componentInstance.updateState({}, false, null);

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState({}, false, { testobjectname: \"Just passing by\", age: 20 }): this.launchErrorOverlay() should be called because \"newProps\" is an object, but \"callback\" is neither a function nor undefined", () => {
            componentInstance.updateState({}, false, { testobjectname: "Just passing by", age: 20 });

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState({}, false, [\"testarray\", 14]): this.launchErrorOverlay() should be called because \"newProps\" is an object, but \"callback\" is neither a function nor undefined", () => {
            componentInstance.updateState({}, false, ["testarray", 14]);

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        describe("Check that the error ExceptionsHandler.ValidatorError(\"app-101\") is thrown, when \"newProps\" is an object containing anything (excluding array) AND \"callback\" is neither a function nor undefined", () => {
            test("Run updateState({}, false, \"test string\"): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                componentInstance.updateState({}, false, "test string");
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

            test("Run updateState({}, false, 22): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                componentInstance.updateState({}, false, 22);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

            test("Run updateState({}, false, null): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                componentInstance.updateState({}, false, null);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

            test("Run updateState({}, false, [true, false, 12]): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                componentInstance.updateState({}, false, [true, false, 12]);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

            test("Run updateState({}, false, { testkey: \"test string input\" }): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                componentInstance.updateState({}, false, { testkey: "test string input" });
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

            test("Run updateState({}, false, true): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                componentInstance.updateState({}, false, true);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

    
        });

        describe("Check that the error ExceptionsHandler.ValidatorError(\"app-102\") is thrown, when \"newProps\" is not an object, regardless of the \"callback\" parameter", () => {
            test("Run updateState(12, false): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                componentInstance.updateState(12, false);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
    
            test("Run updateState(\"test string\", false, () => {}): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                componentInstance.updateState("test string", false, () => {});
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
    
            test("Run updateState(true, false, \"test string input\"): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                componentInstance.updateState(true, false, "test string input");
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
    
            test("Run updateState(null, false, 30): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                componentInstance.updateState(null, false, 30);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
    
            test("Run updateState(undefined, false, true): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                componentInstance.updateState(undefined, false, true);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
    
            test("Run updateState([12, 20], false, true): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                componentInstance.updateState([12, 20], false, true);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
        })
    });

    describe("Test handleNavigation(viewProps)", () => {
        describe("Check that the error ExceptionsHandler.ValidatorError(\"app-104\") is thrown, if \"viewProps\" is not an object", () => {
            const variousInputs = [
                ["test string"], 
                [30], 
                [true], 
                [false], 
                [["donald duck", "mickey mouse", 5, false]],
                [null],
                [undefined],
            ];
            
            test.each(variousInputs)("Run handleNavigation(%p): ExceptionsHandler.ValidatorError(\"app-104\") should be called, because \"viewProps\" is not an object", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-104");
            })
            
            test("Run handleNavigation(): ExceptionsHandler.ValidatorError(\"app-104\") should be called, because \"viewProps\" is not an object", () => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-104");
            })

        });

        describe("Test this method using various non-array objects as \"viewProps\". The objects should vary to cover as many permutations as possible. this.updateState() should get called only if the \"viewProps\" object contains all valid keys (all valid keys being \"viewData\" (object), \"metaData\" (object) and \"refreshFactor\" (number)). Otherwise, throw ExceptionsHandler.ValidatorError(\"app-103\").", () => {
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

            test.each(various_viewData)("Run handleNavigation({ viewData: %p }): ExceptionsHandler.ValidatorError(\"app-103\") should be called, because \"viewProps\" does not contain all valid keys (valid keys being \"viewData\" (object), \"metaData\" (object) and \"refreshFactor\" (number))", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ viewData: val });

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
            });

            test.each(various_metaData)("Run handleNavigation({ metaData: %p }): ExceptionsHandler.ValidatorError(\"app-103\") should be called, because \"viewProps\" does not contain all valid keys (valid keys being \"viewData\" (object), \"metaData\" (object) and \"refreshFactor\" (number))", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ metaData: val });

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
            });

            test.each(various_refreshFactor)("Run handleNavigation({ refreshFactor: %p }): ExceptionsHandler.ValidatorError(\"app-103\") should be called, because \"viewProps\" does not contain all valid keys (valid keys being \"viewData\" (object), \"metaData\" (object) and \"refreshFactor\" (number))", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ refreshFactor: val });

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
            });

            describe("Test various combinations of \"viewData\" and \"metaData\" provided by \"viewProps\". this.updateState() should not get called since \"viewProps\" does not contain all valid keys in correct format.", () => {
                for(let i = 0; i < various_metaData.length; i++){
                    test.each(various_viewData)("Run handleNavigation({ viewData: %p, metaData: " + various_metaData[i][0] + " }): ExceptionsHandler.ValidatorError(\"app-103\") should be called, because \"viewProps\" does not contain all valid keys (valid keys being \"viewData\" (object), \"metaData\" (object) and \"refreshFactor\" (number))", (val) => {
                        const testComponent = predefinedComponent();
                        const componentInstance = testComponent.instance();

                        componentInstance.updateState = jest.fn();
                        componentInstance.handleNavigation({ viewData: val, metaData: various_metaData[i][0] });

                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
                    });
                }
            });

            describe("Test various combinations of \"viewData\" and \"refreshFactor\" provided by \"viewProps\". this.updateState() should not get called since \"viewProps\" does not contain all valid keys in correct format.", () => {
                for(let i = 0; i < various_refreshFactor.length; i++){
                    test.each(various_viewData)("Run handleNavigation({ viewData: %p, refreshFactor: " + various_refreshFactor[i][0] + " }): ExceptionsHandler.ValidatorError(\"app-103\") should be called, because \"viewProps\" does not contain all valid keys (valid keys being \"viewData\" (object), \"metaData\" (object) and \"refreshFactor\" (number))", (val) => {
                        const testComponent = predefinedComponent();
                        const componentInstance = testComponent.instance();

                        componentInstance.updateState = jest.fn();
                        componentInstance.handleNavigation({ viewData: val, refreshFactor: various_refreshFactor[i][0] });

                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
                    });
                }
            });

            describe("Test various combinations of \"metaData\" and \"refreshFactor\" provided by \"viewProps\". this.updateState() should not get called since \"viewProps\" does not contain all valid keys in correct format.", () => {
                for(let i = 0; i < various_refreshFactor.length; i++){
                    test.each(various_metaData)("Run handleNavigation({ metaData: %p, refreshFactor: " + various_refreshFactor[i][0] + " }): ExceptionsHandler.ValidatorError(\"app-103\") should be called, because \"viewProps\" does not contain all valid keys (valid keys being \"viewData\" (object), \"metaData\" (object) and \"refreshFactor\" (number))", (val) => {
                        const testComponent = predefinedComponent();
                        const componentInstance = testComponent.instance();

                        componentInstance.updateState = jest.fn();
                        componentInstance.handleNavigation({ metaData: val, refreshFactor: various_refreshFactor[i][0] });
                      
                        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-103");
                    });
                }
            });
 
            describe("Test various combinations of \"metaData\", \"viewData\" and \"refreshFactor\" provided by \"viewProps\". this.updateState() should get called only if \"metaData\" and \"viewData\" are non-array objects AND refreshFactor is a number", () => {
                const { isObject, isNumber } = validator;

                for(let i = 0; i < various_metaData.length; i++){
                    for(let k = 0; k < various_viewData.length; k++){
                        for(let j = 0; j < various_refreshFactor.length; j++){
                            if(!(isObject(various_metaData[i][0]) && isObject(various_viewData[k][0]) && isNumber(various_refreshFactor[j][0]))){
                                test("Run handleNavigation({ metaData: " + various_metaData[i][0] + ", viewData: " + various_viewData[k][0] + ", refreshFactor: " + various_refreshFactor[j][0] + " }): ExceptionsHandler.ValidatorError(\"app-103\") should be called. There are correct keys in the \"viewProps\" object, but one or more of their values are in wrong format", () => {
                                    const testComponent = predefinedComponent();
                                    const componentInstance = testComponent.instance();

                                    componentInstance.updateState = jest.fn();
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

                test.each(assumedValid_viewProps_inputs)("Run handleNavigation(%p): this.updateState() should be called, because \"viewProps\" contains \"viewData\" (non-array object), \"metaData\" (non-array object) and \"refreshFactor\" (number)", (val) => {
                    const testComponent = predefinedComponent();
                    const componentInstance = testComponent.instance();

                    componentInstance.updateState = jest.fn();
                    componentInstance.handleNavigation(val);

                    expect(componentInstance.updateState).toHaveBeenCalled();
                }); 
            });

        })
    });
});