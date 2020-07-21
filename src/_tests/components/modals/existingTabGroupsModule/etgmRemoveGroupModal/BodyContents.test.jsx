import React, { Fragment } from "react";
import { shallow, mount, render } from "enzyme";
import BodyContents from "../../../../../components/modals/existingTabGroupsModule/etgmRemoveGroupModal/BodyContents.jsx";
import * as ExceptionsHandler from "../../../../../components/utils/exceptionsAndHandler";
import * as validator from "../../../../../components/utils/inputValidators";
import { dummyWindowsAndTabs } from "./../../../../../services/webextension/dummyService/data";

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
  "ETGMRemoveGroupsModal-b1": ExceptionsHandler.ValidatorError(
    "ETGMRemoveGroupsModal-b1"
  ),
  "ETGMRemoveGroupsModal-b2": ExceptionsHandler.ValidatorError(
    "ETGMRemoveGroupsModal-b2"
  ),
};

const expectedErrorReturns = {
  "ETGMRemoveGroupsModal-b1": {
    name: "ValidatorError",
    message: "The data key in props needs to be an object",
    code: "ETGMRemoveGroupsModal-b1",
  },
  "ETGMRemoveGroupsModal-b2": {
    name: "ValidatorError",
    message: "The params key is not an object",
    code: "ETGMRemoveGroupsModal-b2",
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
      test('Run verifyProps(): If this.props.data is missing, throw an error "ETGMRemoveGroupsModal-b1"', () => {
        const presetProps = {};
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).toThrowError(
          ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-b1").message
        );
      });

      test.each(various_nonObjects)(
        'Run verifyProps(): If this.props.data = %p (is not an object), throw an error "ETGMRemoveGroupsModal-b1"',
        (val) => {
          const presetProps = {
            data: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-b1").message
          );
        }
      );

      test('Run verifyProps(): If this.props.data = {}, do not throw error "ETGMRemoveGroupsModal-b1"', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-b1").message
        );
      });
    });

    describe("Examine function behaviour based on the value of this.props.data.params", () => {
      test('Run verifyProps(): If this.props.data.params is missing, throw an error "ETGMRemoveGroupsModal-b2"', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).toThrowError(
          ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-b2").message
        );
      });

      test.each(various_nonObjects)(
        'Run verifyProps(): If this.props.data.params = %p (is not an object), throw an error "ETGMRemoveGroupsModal-b2"',
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

          expect(() => componentInstance.verifyProps()).toThrowError(
            ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-b2").message
          );
        }
      );

      test('Run verifyProps(): If this.props.data.params = {}, do not throw error "ETGMRemoveGroupsModal-b2"', () => {
        const presetProps = {
          data: {
            params: {},
          },
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          ExceptionsHandler.ValidatorError("ETGMRemoveGroupsModal-b2").message
        );
      });
    });
  });
});
