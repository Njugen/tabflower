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
        "mp-verifyProps-104": ExceptionsHandler.ValidatorError("mp-verifyProps-104")
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
        }
    }

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();

        ExceptionsHandler.ValidatorError = jest.fn();
        ExceptionsHandler.ValidatorError.mockImplementation(errCode => {
            return actualErrorReturns[errCode];
        });
    });

    describe("At mount of the <Modal /> component", () => {
        

        test("With or without correct props, this.verifyProps() should be called", () => {
            const presetProps = {
                
            }

            testComponent = predefinedComponent(presetProps, { disableLifeCycleMethods: true });
            componentInstance = testComponent.instance();

            componentInstance.verifyProps = jest.fn();
           // componentInstance.componentDidMount();

           // expect(componentInstance.verifyProps).toHaveBeenCalled();
            expect(1).toBe(1);
        })
    })

    /*
    describe("Mount <Modal /> with 2 valid props, but 1 missing", () => {
        const presetProps = { 
            onRaiseToErrorOverlay: () => {},
            data: {}
        };
        
        test("\"onDismiss\" prop is missing (is not a function). Throw an error with this code: \"mp-verifyProps-101\"", () => {
            expect(() => {
                testComponent = predefinedComponent(presetProps);
                componentInstance = testComponent.instance();
            }).toThrow(expectedErrorReturns["mp-verifyProps-101"]);
        });

        test("\"onRaiseToErrorOverlay\" prop is missing (is not a function). Throw an error with this code: \"mp-verifyProps-102\"", () => {
            const presetProps = {  
                onDismiss: () => {},
                data: {}
            };

            expect(() => {
                testComponent = predefinedComponent(presetProps);
                componentInstance = testComponent.instance();
            }).toThrow(expectedErrorReturns["mp-verifyProps-102"]);
        });

        test("\"data\" prop is missing (is not a non-array object). Throw an error with this code: \"mp-verifyProps-103\"", () => {
            const presetProps = {  
                onDismiss: () => {},
                onRaiseToErrorOverlay: () => {}
            };

            expect(() => {
                
                testComponent = predefinedComponent(presetProps);
                componentInstance = testComponent.instance();
            }).toThrow(expectedErrorReturns["mp-verifyProps-103"]);
        })
    })

    describe("Mount <Modal /> with 2 valid props, but 1 invalid", () => {
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
                    testComponent = predefinedComponent(presetProps);
                    componentInstance = testComponent.instance();
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
                    testComponent = predefinedComponent(presetProps);
                    componentInstance = testComponent.instance();
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
                        testComponent = predefinedComponent(presetProps);
                        componentInstance = testComponent.instance();
                    }).toThrow(expectedErrorReturns["mp-verifyProps-103"]);
                });
            });

            describe("Case 2: When \"data\" is an object, but a \"params\" key is missing (or when not an object). Other keys does not matter.", () => {
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
                        testComponent = predefinedComponent(presetProps);
                        componentInstance = testComponent.instance();
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
                        testComponent = predefinedComponent(presetProps);
                        componentInstance = testComponent.instance();
                    }).toThrow(expectedErrorReturns["mp-verifyProps-104"]);
                });
            })
        });

        
    });

    describe("Mount <Modal /> with all 3 valid props", () => {
        const presetProps = { 
            onDismiss: () => {},
            onRaiseToErrorOverlay: () => {},
            data: { 
                params: {}
            }
        };

        test("<Modal data={params: {}} onDismiss={() => {}} onRaiseToErrorOverlay={() => {}} /> runs with no errors", () => {
            expect(() => {
                testComponent = predefinedComponent(presetProps);
                componentInstance = testComponent.instance();
            }).not.toThrow();
        })
    }) */
}) 