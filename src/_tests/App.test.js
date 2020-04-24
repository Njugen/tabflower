import React from 'react';
import { shallow } from 'enzyme';
import App from './../App';
import * as ExceptionsHandler from './../components/utils/exceptionsAndHandler';

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
    });
     
    describe("updateState(newProps, showLoadbar, callback): Test this method with various typeof inputs as \"newProps\". Only call this.setState() if the \"newProps\" parameter is an object (excluding arrays), AND if the \"callback\" parameter is a function or undefined. The \"showLoadbar\" parameter does not affect what function gets called", () => {
        
        test("Run updateState(\"Test string\", false): this.launchErrorOverlay() should be called once, because \"newProps\" is not an object.", () => {
            componentInstance.updateState("Test string", false);
            
            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState(5, false): this.launchErrorOverlay() should be called once, because \"newProps\" is not an object.", () => {
            componentInstance.updateState(5, false);
            
            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState(true, false): this.launchErrorOverlay() should be called once, because \"newProps\" is not an object.", () => {
            componentInstance.updateState(true, false);

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState(null, false): this.launchErrorOverlay() should be called once, because \"newProps\" is not an object.", () => {
            componentInstance.updateState(null, false);

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState(undefined, false): this.launchErrorOverlay() should be called once, because \"newProps\" is not an object.", () => {
            componentInstance.updateState(undefined, false);

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState([\"abcd\", 48, false, undefined, null, () => {}, {testkey: \"value\"}, [48, 22, 5.47]], false): this.launchErrorOverlay() should be called once, because \"newProps\" is not an object.", () => {
            const testParam_newProps = ["abcd", 48, false, undefined, null, () => {}, {testkey: "value"}, [48, 22, 5.47]];
            componentInstance.updateState(testParam_newProps, false);

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

        test("Run updateState(() => {}, false): this.launchErrorOverlay() should be called once, because \"newProps\" is not an object.", () => {
            componentInstance.updateState(() => {}, false);

            expect(componentInstance.launchErrorOverlay).toHaveBeenCalledTimes(1);
        });

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
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState({}, false, "test string");
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

            test("Run updateState({}, false, 22): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState({}, false, 22);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

            test("Run updateState({}, false, null): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState({}, false, null);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

            test("Run updateState({}, false, [true, false, 12]): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState({}, false, [true, false, 12]);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

            test("Run updateState({}, false, { testkey: \"test string input\" }): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState({}, false, { testkey: "test string input" });
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

            test("Run updateState({}, false, true): ExceptionsHandler.ValidatorError(\"app-101\") should be called because \"callback\" is neither a function nor undefined, while \"newProps\" being an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState({}, false, true);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-101");
            });

    
        });

        describe("Check that the error ExceptionsHandler.ValidatorError(\"app-102\") is thrown, when \"newProps\" is not an object, regardless of the \"callback\" parameter", () => {
            test("Run updateState(12, false): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState(12, false);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
    
            test("Run updateState(\"test string\", false, () => {}): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState("test string", false, () => {});
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
    
            test("Run updateState(true, false, \"test string input\"): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState(true, false, "test string input");
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
    
            test("Run updateState(null, false, 30): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState(null, false, 30);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
    
            test("Run updateState(undefined, false, true): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState(undefined, false, true);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
    
            test("Run updateState([12, 20], false, true): ExceptionsHandler.ValidatorError(\"app-102\") should be called because \"newProps\" is not an object", () => {
                ExceptionsHandler.ValidatorError = jest.fn();
                componentInstance.updateState([12, 20], false, true);
                
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("app-102");
            });
        })
    });

    describe("Test handleNavigation(viewProps)", () => {
        describe("Test this method using various inputs as \"viewProps\". this.updateState() should not get called, if \"viewProps\" does not contain all valid keys (all valid keys being \"viewData\" (object), \"metaData\" (object) and \"refreshFactor\" (number))", () => {
            const variousInputs = [
                ["test string"], 
                [30], 
                [true], 
                [false], 
                [["donald duck", "mickey mouse", 5, false]],
                [null],
                [undefined],
                [{}]
            ];
            
            test.each(variousInputs)("Run handleNavigation(%p): this.updateState() should not be called, because \"viewProps\" is not an object with valid keys", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation(val);

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            })

            test("Run handleNavigation(): this.updateState() should not be called, because \"viewProps\" is not an object with valid keys", () => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation();

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            })

            test("Run handleNavigation(): this.updateState() should not be called, because \"viewProps\" is not an object with valid keys", () => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation();

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            });
        });

        describe("Test this method using various non-array objects as \"viewProps\". The objects should vary to cover as many permutations as possible. this.updateState() should not get called, if \"viewProps\" does not contain all valid keys (all valid keys being \"viewData\" (object), \"metaData\" (object) and \"refreshFactor\" (number))", () => {
            const various_viewData = [
                ["test string for view data"], 
                [30], 
                [true], 
                [false], 
                [["tiger", "winnie", 5, false]],
                [null],
                [undefined],
                [{testObj1: "contents of test object 1"}]
            ];

            const various_metaData = [
                ["test string for meta data"], 
                [45], 
                [true], 
                [false], 
                [["daisy duck", "goofy", 52, true]],
                [null],
                [undefined],
                [{testObj2: "contents of test object 2"}]
            ];

            const various_refreshFactor = [
                ["test string for refreshFactor"], 
                [14], 
                [true], 
                [false], 
                [["darkwing duck", "simba", false, 247]],
                [null],
                [undefined],
                [{testObj3: "contents of test object 3"}]
            ];

            test.each(various_viewData)("Run handleNavigation({ viewData: %p }): this.updateState() should not be called, because \"viewProps\" does not contain \"metaData\" (object) and \"refreshFactor\" (number)", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ viewData: val });

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            });

            test.each(various_metaData)("Run handleNavigation({ metaData: %p }): this.updateState() should not be called, because \"viewProps\" does not contain \"viewData\" (object) and \"refreshFactor\" (number)", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ metaData: val });

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            });

            test.each(various_refreshFactor)("Run handleNavigation({ refreshFactor: %p }): this.updateState() should not be called, because \"viewProps\" does not contain \"viewData\" (object) and \"refreshFactor\" (number)", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ refreshFactor: val });

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            });

            describe("Test various combinations of \"viewData\" and \"metaData\" provided by \"viewProps\". this.updateState() should not get called during any circumstance", () => {
                for(let i = 0; i < various_metaData.length; i++){
                    test.each(various_viewData)("Run handleNavigation({ viewData: %p, metaData: " + various_metaData[i][0] + " }): this.updateState() should not be called, because \"viewProps\" does not contain \"refreshFactor\" (number)", (val) => {
                        const testComponent = predefinedComponent();
                        const componentInstance = testComponent.instance();

                        componentInstance.updateState = jest.fn();
                        componentInstance.handleNavigation({ viewData: val, metaData: various_metaData[i][0] });

                        expect(componentInstance.updateState).not.toHaveBeenCalled();
                    });
                }
            });

            describe("Test various combinations of \"viewData\" and \"refreshFactor\" provided by \"viewProps\". this.updateState() should not get called during any circumstance", () => {
                for(let i = 0; i < various_refreshFactor.length; i++){
                    test.each(various_viewData)("Run handleNavigation({ viewData: %p, refreshFactor: " + various_refreshFactor[i][0] + " }): this.updateState() should not be called, because \"viewProps\" does not contain \"metaData\" (object)", (val) => {
                        const testComponent = predefinedComponent();
                        const componentInstance = testComponent.instance();

                        componentInstance.updateState = jest.fn();
                        componentInstance.handleNavigation({ viewData: val, refreshFactor: various_refreshFactor[i][0] });

                        expect(componentInstance.updateState).not.toHaveBeenCalled();
                    });
                }
            });

            describe("Test various combinations of \"metaData\" and \"refreshFactor\" provided by \"viewProps\". this.updateState() should not get called during any circumstance", () => {
                for(let i = 0; i < various_refreshFactor.length; i++){
                    test.each(various_metaData)("Run handleNavigation({ metaData: %p, refreshFactor: " + various_refreshFactor[i][0] + " }): this.updateState() should not be called, because \"viewProps\" does not contain \"viewData\" (object)", (val) => {
                        const testComponent = predefinedComponent();
                        const componentInstance = testComponent.instance();

                        componentInstance.updateState = jest.fn();
                        componentInstance.handleNavigation({ metaData: val, refreshFactor: various_refreshFactor[i][0] });

                        expect(componentInstance.updateState).not.toHaveBeenCalled();
                    });
                }
            });

            describe("Test various combinations of \"metaData\", \"viewData\" and \"refreshFactor\" provided by \"viewProps\". this.updateState() should get called only if \"metaData\" and \"viewData\" are non-array objects AND refreshFactor is a number", () => {
                for(let i = 0; i < various_metaData.length; i++){
                    for(let k = 0; k < various_viewData.length; k++){
                        test.each(various_refreshFactor)("Run handleNavigation({ metaData: " + various_metaData[i][0] + ", viewData: " + various_viewData[k][0] + ", refreshFactor: %p }): this.updateState() should not be called, because \"viewProps\" does not contain \"viewData\" (object)", (val) => {
                            const testComponent = predefinedComponent();
                            const componentInstance = testComponent.instance();

                            componentInstance.updateState = jest.fn();
                            componentInstance.handleNavigation({ metaData: various_metaData[i][0], viewData: various_viewData[k][0], refreshFactor: val });

                            expect(componentInstance.updateState).not.toHaveBeenCalled();
                        });
                    }
                }
            });

            /*
            test.each(various_metaData)("Run handleNavigation({ viewData: {}, metaData: %p }): this.updateState() should not be called, because \"viewProps\" does not contain \"refreshFactor\" (number)", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ viewData: {}, metaData: val });

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            });

            test.each(various_viewData)("Run handleNavigation({ viewData: %p, refreshFactor: 0 }): this.updateState() should not be called, because \"viewProps\" does not contain \"metaData\" (object)", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ viewData: val, refreshFactor: 0 });

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            });

            test.each(various_metaData)("Run handleNavigation({ metaData: %p, refreshFactor: 0 }): this.updateState() should not be called, because \"viewProps\" does not contain \"viewData\" (object)", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ metaData: val, refreshFactor: 0 });

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            });

            test.each(various_refreshFactor)("Run handleNavigation({ viewData: {}, refreshFactor: %p }): this.updateState() should not be called, because \"viewProps\" does not contain \"metaData\" (object)", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ viewData: {}, refreshFactor: val });

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            });

            test.each(various_refreshFactor)("Run handleNavigation({ metaData: {}, refreshFactor: %p }): this.updateState() should not be called, because \"viewProps\" does not contain \"viewData\" (object)", (val) => {
                componentInstance.updateState = jest.fn();
                componentInstance.handleNavigation({ metaData: {}, refreshFactor: val });

                expect(componentInstance.updateState).not.toHaveBeenCalled();
            }); */
        })
    });
});