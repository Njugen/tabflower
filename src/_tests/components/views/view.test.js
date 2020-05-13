import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import View from './../../../components/views/view';
import * as ExceptionsHandler from './../../../components/utils/exceptionsAndHandler';
import * as validator from './../../../components/utils/inputValidators';



const predefinedComponent = (props, options) => {
    props = props || {};

    const component = shallow(<View {...props} />, options);
    return component;
}

const presetProps = {
    onRaiseToErrorOverlay: "",
    onRaiseToModal: "",
    onViewMount: ""
};

let testComponent;
let componentInstance;

describe("Test <View /> component behaviour at mount", () => {
    

    const actualErrorReturns = {
        "view-101": ExceptionsHandler.ValidatorError("view-101"),
        "view-102": ExceptionsHandler.ValidatorError("view-102"),
        "view-103": ExceptionsHandler.ValidatorError("view-103"),
        "view-104": ExceptionsHandler.ValidatorError("view-104")
    };

    const expectedErrorReturns = {
        "view-101": {
            name: "ValidatorError",
            message: "The \"onViewMount\" parameter is not set in this view. Any view inserted into Tabflower must have this parameter set as a function.",
            code: "view-101"
        },
        "view-102": {
            name: "ValidatorError",
            message: "The \"data\" parameter is not set in raiseToErrorOverlay() of the View component. Information could not be forwarded to the UI.",
            code: "view-102"
        },
        "view-103": {
            name: "ValidatorError",
            message: "The features of the raiseToErrorOverlay() function of the View component could not be fully executed, because the props onRaiseToErrorOverlay is not a function or is missing.",
            code: "view-103"
        },
        "view-104": {
            name: "ValidatorError",
            message: "The \"data\" parameter is not set as an object in raiseToModal() of the View component. Information could not be forwarded to the UI.",
            code: "view-104"
        }
    }

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();

        const presetProps = {};
        testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
        componentInstance = testComponent.instance();
    
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
            test("Run raiseToErrorOverlay(): Throw an error ExceptionsHandler.ValidatorError(\"view-102\")", () => {
                componentInstance.raiseToErrorOverlay();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("view-102");
            });

            test.each(various_data)("Run raiseToErrorOverlay(%p): Throw an error ExceptionsHandler.ValidatorError(\"view-102\")", (val) => {
                componentInstance.raiseToErrorOverlay(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("view-102");
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
            
            test.each(various_props_onRaiseToErrorOverlay)("Run raiseToErrorOverlay({ testData: \"test value\" }) when this.props.onRaiseToErrorOverlay = %p: Throw an error ExceptionsHandler.ValidatorError(\"view-103\")", (val) => {
                const presetProps = {
                    onRaiseToErrorOverlay: val
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                const data_param = { testData: "test value" }

                componentInstance.raiseToErrorOverlay(data_param);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("view-103");
            });

            test("Run raiseToErrorOverlay({ testData: \"test value\" }) when this.props.onRaiseToErrorOverlay does not exist: Throw an error ExceptionsHandler.ValidatorError(\"view-103\")", () => {
                const presetProps = {
              
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                const data_param = { testData: "test value" }

                componentInstance.raiseToErrorOverlay(data_param);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("view-103");
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

    describe("Test handleViewMount()", () => {
        const various_props_onViewMount = [
            ["A string representing a dummy data variable"],
            [32],
            [null],
            [undefined],
            [false],
            [true],
            [[12,8,3,7]],
            [{ item: "test" }]
        ];

        test.each(various_props_onViewMount)("Run handleViewMount(), when this.props.onViewMount = %p: Throw an error ExceptionsHandler.ValidatorError(\"view-101\")", (val) => {
            const presetProps = {
                onViewMount: val
            }
            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
            componentInstance = testComponent.instance();

            componentInstance.handleViewMount();
            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("view-101");
        });

        test("Run handleViewMount(), when this.props.onViewMount is a function: Call this.props.onViewMount() with the component state as input parameter", () => {
            const presetProps = {
                onViewMount: jest.fn()
            }
            testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
            componentInstance = testComponent.instance();

            componentInstance.handleViewMount();
            expect(componentInstance.props.onViewMount).toHaveBeenCalledWith(componentInstance.state);
        })
    });

    describe("Test raiseToModal(data)", () => {
        describe("Case 1: When the \"data\" parameter is NOT an object", () => {
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

            test("Run raiseToModal(): Throw an error ExceptionsHandler.ValidatorError(\"view-104\")", () => {
                componentInstance.raiseToModal();

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("view-104");
            });

            test.each(various_data)("Run raiseToModal(%p): Throw an error ExceptionsHandler.ValidatorError(\"view-104\")", (val) => {
                componentInstance.raiseToModal(val);

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("view-104");
            });
        });
        
        describe("Case 2: When the \"data\" parameter is an object, but the onRaiseToModal props is NOT a function", () => {
            const various_props_onRaiseToModal = [
                ["A string representing a dummy data variable"],
                [32],
                [null],
                [undefined],
                [false],
                [true],
                [[12,8,3,7]],
                [{ testItem: "test" }]
            ];
    
            test("Run raiseToModal({ testData: \"test value\" }), while this.props.onRaiseToModal does not exist: Throw an error ExceptionsHandler.ValidatorError(\"view-105\")", () => {
                const presetProps = {
                  
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
    
                const data_param = { testData: "test value" };
                componentInstance.raiseToModal(data_param);
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("view-105");
            });
    
            test.each(various_props_onRaiseToModal)("Run raiseToModal({ testData: \"test value\" }), while this.props.onRaiseToModal does not exist: Throw an error ExceptionsHandler.ValidatorError(\"view-105\")", (val) => {
                const presetProps = {
                    onRaiseToModal: val
                }
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
    
                const data_param = { testData: "test value" };
                componentInstance.raiseToModal(data_param);
    
                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith("view-105");
            })
        });
    
        describe("Case 3: When the \"data\" parameter is an object, and the onRaiseToModal props is a function", () => {
            test("Run raiseToModal({ testData: \"test value\" }) when this.props.onRaiseToModal is a function: Call this.props.onRaseToModal(data) using the same \"data\" parameter", () => {

                const presetProps = {
                    onRaiseToModal: jest.fn()
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();
    
                const data_param = { testData: "test value" }
    
                componentInstance.raiseToModal(data_param);

                expect(componentInstance.props.onRaiseToModal).toHaveBeenCalledWith(data_param);

            });
        });
    
    });

    describe("Test componentDidMount()", () => {
        test("Run componentDidMount, when this.childComponentDidMount is a function: Call this.childComponentDidMount()", () => {
            componentInstance.handleViewMount = jest.fn();
            componentInstance.childComponentDidMount = jest.fn();
            componentInstance.componentDidMount();

            expect(componentInstance.childComponentDidMount).toHaveBeenCalled();
        });
    })

    describe("Test render()", () => {
        test("Run render(): Nothing should be rendered at all, no JSX. Nothing. Just return \"null\"", () => {
            expect(componentInstance.render()).toBeNull();
        })
    })
}) 