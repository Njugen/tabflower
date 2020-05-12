import React, { Fragment } from 'react';
import { shallow, mount, render } from 'enzyme';
import Module from './../../../../components/utils/moduleon/module';
import * as ExceptionsHandler from './../../../../components/utils/exceptionsAndHandler';
import * as validator from './../../../../components/utils/inputValidators';
require("../../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

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
        "module-110": ExceptionsHandler.ValidatorError("module-110"),
        "module-111": ExceptionsHandler.ValidatorError("module-111")
    };

    const expectedErrorReturns = {
        "module-110": {
            name: "ValidatorError",
            message: "The \"data\" parameter is not set as am object in raiseToErrorOverlay() of the Module component. Information could not be forwarded to the UI.",
            code: "module-110"
        },
        "module-111": {
            name: "ValidatorError",
            message: "The features of the raiseToErrorOverlay() function of the Module component could not be fully executed, because the props onRaiseToErrorOverlay is not a function or is missing.",
            code: "module-111"
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

    describe("Test raiseToErorOverlay(data)", () => {
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
                const presetProps = {
                    onRaiseToErrorOverlay: jest.fn()
                };
                testComponent = predefinedComponent(presetProps, { disableLifecycleMethods: true });
                componentInstance = testComponent.instance();

                const data_param = { testData: "test value" }

                componentInstance.raiseToErrorOverlay(data_param);

                expect(componentInstance.props.onRaiseToErrorOverlay).toHaveBeenCalledWith(data_param);
            });
        });
    });
}) 