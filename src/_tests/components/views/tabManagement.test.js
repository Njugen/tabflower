import React from "react";
import { shallow } from "enzyme";
import TabManagementView from "./../../../components/views/tabManagement";
import * as ExceptionsHandler from "./../../../components/utils/exceptionsAndHandler";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<TabManagementView {...props} />, options);
  return component;
};

const presetProps = {};

let testComponent;
let componentInstance;

describe("Test <TabManagementView /> component behaviour at mount", () => {
  const actualErrorReturns = {
    "tabManagement-view-101": ExceptionsHandler.ValidatorError(
      "tabManagement-view-101"
    ),
    "tabManagement-view-102": ExceptionsHandler.ValidatorError(
      "tabManagement-view-102"
    ),
  };

  const expectedErrorReturns = {
    "tabManagement-view-101": {
      name: "ValidatorError",
      message:
        "An error has occured when attempting to reload the user interface. However, the requested data changes have been made successfully. Please, reload this page manually to see these changes.",
      code: "tabManagement-view-101",
    },
    "tabManagement-view-102": {
      name: "ValidatorError",
      message:
        "The command raised to the TabManagementView component could not be executed, because it is invalid.",
      code: "tabManagement-view-102",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();

    const presetProps = {};
    testComponent = predefinedComponent(presetProps, {
      disableLifecycleMethods: true,
    });
    componentInstance = testComponent.instance();

    ExceptionsHandler.ErrorHandler = jest.fn();
    ExceptionsHandler.ValidatorError = jest.fn();
    ExceptionsHandler.ValidatorError.mockImplementation((errCode) => {
      return actualErrorReturns[errCode];
    });
  });

  describe("test handleRaiseToView(data)", () => {
    describe('Case 1: When "data" is NOT a string', () => {
      const various_nonString_values = [
        [13],
        [null],
        [undefined],
        [true],
        [false],
        [() => {}],
        [{ items: 0 }],
        [["a", "b", "c"]],
      ];

      test('Run handleRaiseToView(): The error ExceptionsHandler.ValidatorError("tabManagement-view-101") should be thrown', () => {
        componentInstance.handleRaiseToView();

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "tabManagement-view-101"
        );
      });

      test.each(various_nonString_values)(
        'Run handleRaiseToView(%p): The error ExceptionsHandler.ValidatorError("tabManagement-view-101") should be thrown',
        (val) => {
          componentInstance.handleRaiseToView(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "tabManagement-view-101"
          );
        }
      );
    });

    describe('Case 2: When "data" is a string, but the string is invalid (invalid means data != "refresh")', () => {
      test('Run handleRaiseToView("buyMeSweets"): The error The error ExceptionsHandler.ValidatorError("tabManagement-view-102") should b e thrown', () => {
        componentInstance.handleRaiseToView("buyMeSweets");

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "tabManagement-view-102"
        );
      });
    });

    describe('Case 3: When "data" is a string AND the string is valid (valid means data = "refresh")', () => {
      test('Run handleRaiseToView("refresh"): The this.refreshView() function should be called', () => {
        componentInstance.refreshView = jest.fn();
        componentInstance.handleRaiseToView("refresh");

        expect(componentInstance.refreshView).toHaveBeenCalled();
      });

      test('Run handleRaiseToView("refresh"): The component\'s refresh factor should increase by one', () => {
        const initialRefreshFactor = componentInstance.state.refreshFactor;
        componentInstance.handleRaiseToView("refresh");

        expect(componentInstance.state.refreshFactor).toBe(
          initialRefreshFactor + 1
        );
      });
    });
  });
});
