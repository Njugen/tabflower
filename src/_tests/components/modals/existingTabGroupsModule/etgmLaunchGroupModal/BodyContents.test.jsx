import React, { Fragment } from "react";
import { shallow, mount, render } from "enzyme";
import BodyContents from "../../../../../components/modals/existingTabGroupsModule/etgmLaunchGroupModal/BodyContents.jsx";
import * as ExceptionsHandler from "../../../../../components/utils/exceptionsAndHandler";
import * as validator from "../../../../../components/utils/inputValidators";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<BodyContents {...props} />, options);
  component.instance().render = jest.fn();
  return component;
};

let presetProps = {
  data: {},
  onRaiseToErrorOverlay: "",
  onDismiss: "",
};

let testComponent;
let componentInstance;

//jest.mock("./__mocks__/fetch");

const actualErrorReturns = {
  "ETGMLaunchGroupsModal-113": ExceptionsHandler.ValidatorError(
    "ETGMLaunchGroupsModal-113"
  ),
  "ETGMLaunchGroupsModal-114": ExceptionsHandler.ValidatorError(
    "ETGMLaunchGroupsModal-114"
  ),
};

const expectedErrorReturns = {
  "ETGMLaunchGroupsModal-113": {
    name: "ValidatorError",
    message: "The data key in props needs to be an object",
    code: "ETGMLaunchGroupsModal-113",
  },
  "ETGMLaunchGroupsModal-114": {
    name: "ValidatorError",
    message: "The onChange key in props needs to be a function",
    code: "ETGMLaunchGroupsModal-114",
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

const various_nonObjects = [
  ["a very weird looking text string"],
  [77],
  [false],
  [true],
  [undefined],
  [[1, 2, 3, 4]],
  [() => {}],
  [null],
];

const various_nonString = [
  [{ testkey: "test value" }],
  [32],
  [null],
  [undefined],
  [false],
  [true],
  [[12, 8, 3, 7]],
  [() => {}],
];

const various_nonBool = [
  ["a very weird looking text string"],
  [{ testkey: "test value" }],
  [32],
  [null],
  [undefined],
  [[12, 8, 3, 7]],
  [() => {}],
];

const various_nonString_nonUndefined = [
  [{ testkey: "test value" }],
  [32],
  [null],
  [false],
  [true],
  [[12, 8, 3, 7]],
  [() => {}],
];

const various_nonBool_nonUndefined = [
  [{ testkey: "test value" }],
  [32],
  [null],
  [[12, 8, 3, 7]],
  [() => {}],
];

const various_nonFunctions = [
  [{ testkey: "test value" }],
  [32],
  [null],
  [undefined],
  [false],
  [true],
  [[12, 8, 3, 7]],
  ["a text string"],
];

const various_nonArrays = [
  [{ testkey: "test value" }],
  [32],
  [null],
  [undefined],
  [false],
  [true],
  [() => {}],
  ["a text string"],
];

const various_nonArrays_nonUndefined = [
  [{ testkey: "test value" }],
  [32],
  [null],
  [false],
  [true],
  [() => {}],
  ["a text string"],
];

const various_nonNumber = [
  [{ testkey: "test value" }],
  [[12, 8, 3, 7]],
  [null],
  [undefined],
  [false],
  [true],
  [() => {}],
  ["a text string"],
];

describe("Test <BodyContents /> component behaviour at mount", () => {
  describe("Test verifyProps()", () => {
    describe("Examine function behaviour based on the value of this.props.data", () => {
      test('Run verifyProps(): If this.props.data is missing, throw an error "ETGMLaunchGroupsModal-113"', () => {
        const presetProps = {};
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).toThrowError(
          ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-113").message
        );
      });

      test.each(various_nonObjects)(
        'Run verifyProps(): If this.props.data = %p (is not an object), throw an error "ETGMLaunchGroupsModal-113"',
        (val) => {
          const presetProps = {
            data: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-113")
              .message
          );
        }
      );

      test('Run verifyProps(): If this.props.data = {}, do not throw error "ETGMLaunchGroupsModal-113"', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-113").message
        );
      });
    });

    describe("Examine function behaviour based on the value of this.props.onChange", () => {
      test('Run verifyProps(): If this.props.onChange is missing, throw an error "ETGMLaunchGroupsModal-114"', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).toThrowError(
          ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-114").message
        );
      });

      test.each(various_nonFunctions)(
        'Run verifyProps(): If this.props.onChange = %p (is not a function), throw an error "ETGMLaunchGroupsModal-114"',
        (val) => {
          const presetProps = {
            data: {},
            onChange: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-114")
              .message
          );
        }
      );

      test('Run verifyProps(): If this.props.onChange is a function, do not throw error "ETGMLaunchGroupsModal-114"', () => {
        const presetProps = {
          data: {},
          onChange: () => {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-114").message
        );
      });
    });
  });

  describe("Test getWindowCollection()", () => {
    describe("Examine function behaviour based on the value of this.props.data", () => {
      test("Run getWindowCollection(): If this.props.data is missing, return an empty array", () => {
        const presetProps = {};
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.getWindowCollection()).toStrictEqual([]);
      });

      test.each(various_nonObjects)(
        "Run getWindowCollection(): If this.props.data = %p (not an object), return an empty array",
        (val) => {
          const presetProps = {
            data: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(componentInstance.getWindowCollection()).toStrictEqual([]);
        }
      );
    });
  });

  describe("Test numberOfWindows()", () => {});

  describe("Test numberOfTabs()", () => {});

  describe("Test renderWarningMessage()", () => {});

  describe("Test renderLaunchOptions()", () => {
    describe("Examine the function based on the value of this.props.data", () => {
      test('Run renderLaunchOptions(): If "data" is missing in this.props, return a string informing the user about this', () => {
        const presetProps = {};
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.renderLaunchOptions()).toBe(
          "Information about the requested tab group was not provided to this modal. Please, contact the developer."
        );
      });

      test.each(various_nonObjects)(
        'Run renderLaunchOptions(): If "data" = %p (is not an object) in this.props, return a string informing the user about this',
        (val) => {
          const presetProps = {
            data: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(componentInstance.renderLaunchOptions()).toBe(
            "Information about the requested tab group was not provided to this modal. Please, contact the developer."
          );
        }
      );

      test('Run renderLaunchOptions(): If "data" is an object, do not trigger error handling', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.renderLaunchOptions()).not.toBe(
          "Information about the requested tab group was not provided to this modal. Please, contact the developer."
        );
      });
    });

    describe("Examine the function based on the value of this.props.data.params", () => {
      test('Run renderLaunchOptions(): If "params" is missing in this.props.data, return a string informing the user about this', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.renderLaunchOptions()).toBe(
          "The options could not be loaded because the relevant parameters were not provided with the group data. Please, contact the developer."
        );
      });

      test.each(various_nonObjects)(
        'Run renderLaunchOptions(): If "params" = %p (is not an object) in this.props.data, return a string informing the user about this',
        (val) => {
          const presetProps = {
            data: {
              params: val,
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(componentInstance.renderLaunchOptions()).toBe(
            "The options could not be loaded because the relevant parameters were not provided with the group data. Please, contact the developer."
          );
        }
      );

      test('Run renderLaunchOptions(): If the params key in "data" is an object, do not trigger error handling', () => {
        const presetProps = {
          data: {
            params: {},
          },
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.renderLaunchOptions()).not.toBe(
          "The options could not be loaded because the relevant parameters were not provided with the group data. Please, contact the developer."
        );
      });
    });

    describe("Examine the function, when this.props.data and this.props.data.params are valid", () => {
      /* Snapshot testing coming later */
    });
  });
});
