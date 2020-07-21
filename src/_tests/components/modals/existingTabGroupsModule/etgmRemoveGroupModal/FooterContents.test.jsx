import React from "react";
import { shallow } from "enzyme";
import FooterContents from "./../../../../../components/modals/existingTabGroupsModule/etgmRemoveGroupModal/FooterContents.jsx";
import * as ExceptionsHandler from "./../../../../../components/utils/exceptionsAndHandler";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<FooterContents {...props} />, options);
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

describe("Test <FooterContents /> component behaviour at mount", () => {
  const actualErrorReturns = {
    "ETGMRemoveGroupsModal-f1": ExceptionsHandler.ValidatorError(
      "ETGMRemoveGroupsModal-f1"
    ),
    "ETGMRemoveGroupsModal-f2": ExceptionsHandler.ValidatorError(
      "ETGMRemoveGroupsModal-f2"
    ),
    "ETGMRemoveGroupsModal-f3": ExceptionsHandler.ValidatorError(
      "ETGMRemoveGroupsModal-f3"
    ),
    "ETGMRemoveGroupsModal-f4": ExceptionsHandler.ValidatorError(
      "ETGMRemoveGroupsModal-f4"
    ),
    "ETGMRemoveGroupsModal-f5": ExceptionsHandler.ValidatorError(
      "ETGMRemoveGroupsModal-f5"
    ),
    "ETGMRemoveGroupsModal-f6": ExceptionsHandler.ValidatorError(
      "ETGMRemoveGroupsModal-f6"
    ),
  };

  const expectedErrorReturns = {
    "ETGMRemoveGroupsModal-f1": {
      name: "ValidatorError",
      message: 'The "data" props is missing or not an object',
      code: "ETGMRemoveGroupsModal-f1",
    },
    "ETGMRemoveGroupsModal-f2": {
      name: "ValidatorError",
      message: 'The "onConfirm" props is missing or not a function',
      code: "ETGMRemoveGroupsModal-f2",
    },
    "ETGMRemoveGroupsModal-f3": {
      name: "ValidatorError",
      message: 'The "onDismiss" props is missing or not a function',
      code: "ETGMRemoveGroupsModal-f3",
    },
    "ETGMRemoveGroupsModal-f4": {
      name: "ValidatorError",
      message:
        "The required parameters were not provided to the data props of this modal. The attempt to add/modify a tab group is neglected.",
      code: "ETGMRemoveGroupsModal-f4",
    },
    "ETGMRemoveGroupsModal-f5": {
      name: "ValidatorError",
      message:
        "The data props section is missing or not an object when attempting to add/modify a tab group. The attempt to add/modify a tab group is neglected.",
      code: "ETGMRemoveGroupsModal-f5",
    },
    "ETGMRemoveGroupsModal-f6": {
      name: "ValidatorError",
      message: 'The "params" key in the data props is missing or not an object',
      code: "ETGMRemoveGroupsModal-f6",
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

  const various_values = [
    ["a very weird looking text string"],
    [77],
    [false],
    [true],
    [undefined],
    [[1, 2, 3, 4]],
    [() => {}],
    [null],
    [{}],
  ];

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

  const various_nonBool = [
    ["a very weird looking text string"],
    [32],
    [null],
    [[12, 8, 3, 7]],
    [() => {}],
    [undefined],
  ];

  const various_nonBool_nonUndefined = [
    ["a very weird looking text string"],
    [32],
    [null],
    [[12, 8, 3, 7]],
    [() => {}],
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

  const various_nonString_nonUndefined = [
    [{ testkey: "test value" }],
    [32],
    [null],
    [false],
    [true],
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

  describe("Test verifyProps()", () => {
    describe("Try out different this.props.data values", () => {
      test('Run verifyProps(): If this.props.data is missing, throw error "ETGMRemoveGroupsModal-f1"', () => {
        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMRemoveGroupsModal-f1"].message
        );
      });

      test.each(various_nonObjects)(
        'Run verifyProps(): If this.props.data = %p (not an object), throw error "ETGMRemoveGroupsModal-f1"',
        (val) => {
          const presetProps = {
            data: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMRemoveGroupsModal-f1"].message
          );
        }
      );

      test('Run verifyProps(): If this.props.data is an object, do not throw error "ETGMRemoveGroupsModal-f1"', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          expectedErrorReturns["ETGMRemoveGroupsModal-f1"].message
        );
      });
    });

    describe("Try out different this.props.onConfirm values", () => {
      test('Run verifyProps(): If this.props.onConfirm is missing, throw error "ETGMRemoveGroupsModal-f2"', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();
        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMRemoveGroupsModal-f2"].message
        );
      });

      test.each(various_nonFunctions)(
        'Run verifyProps(): If this.props.onConfirm = %p (not afunction), throw error "ETGMRemoveGroupsModal-f2"',
        (val) => {
          const presetProps = {
            data: {},
            onConfirm: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMRemoveGroupsModal-f2"].message
          );
        }
      );

      test('Run verifyProps(): If this.props.onConfirm is a function, do not throw error "ETGMRemoveGroupsModal-f2"', () => {
        const presetProps = {
          data: {},
          onConfirm: () => {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          expectedErrorReturns["ETGMRemoveGroupsModal-f2"].message
        );
      });
    });

    describe("Try out different this.props.onDismiss values", () => {
      test('Run verifyProps(): If this.props.onDismiss is missing, throw error "ETGMRemoveGroupsModal-f3"', () => {
        const presetProps = {
          data: {},
          onConfirm: () => {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();
        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMRemoveGroupsModal-f3"].message
        );
      });

      test.each(various_nonFunctions)(
        'Run verifyProps(): If this.props.onDismiss = %p (not afunction), throw error "ETGMRemoveGroupsModal-f3"',
        (val) => {
          const presetProps = {
            data: {},
            onConfirm: () => {},
            onDismiss: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMRemoveGroupsModal-f3"].message
          );
        }
      );

      test('Run verifyProps(): If this.props.onDismiss is a function, do not throw error "ETGMRemoveGroupsModal-f3"', () => {
        const presetProps = {
          data: {},
          onConfirm: () => {},
          onDismiss: () => {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          expectedErrorReturns["ETGMRemoveGroupsModal-f3"].message
        );
      });
    });

    describe("Try out different this.props.data.params values (given that data is an object", () => {
      test('Run verifyProps(): If this.props.data.params is missing, throw error "ETGMRemoveGroupsModal-f6"', () => {
        const presetProps = {
          onConfirm: () => {},
          onDismiss: () => {},
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMRemoveGroupsModal-f6"].message
        );
        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMRemoveGroupsModal-f6"].message
        );
      });

      test.each(various_nonObjects)(
        'Run verifyProps(): If this.props.data.params = %p (not an object), throw error "ETGMRemoveGroupsModal-f6"',
        (val) => {
          const presetProps = {
            onConfirm: () => {},
            onDismiss: () => {},
            data: {
              params: val,
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMRemoveGroupsModal-f6"].message
          );
        }
      );

      test('Run verifyProps(): If this.props.data.params is an object, do not throw error "ETGMRemoveGroupsModal-f6"', () => {
        const presetProps = {
          onConfirm: () => {},
          onDismiss: () => {},
          data: {
            params: {},
          },
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          expectedErrorReturns["ETGMRemoveGroupsModal-f6"].message
        );
      });
    });
  });

  describe("Test componentDidUpdate()", () => {
    test("Run componentDidUpdate(): It should always trigger this.verifyProps()", () => {
      componentInstance.verifyProps = jest.fn();
      componentInstance.componentDidUpdate();

      expect(componentInstance.verifyProps).toHaveBeenCalled();
    });
  });

  describe("Test componentDidMount()", () => {
    test("Run componentDidMount(): It should always trigger this.verifyProps()", () => {
      componentInstance.verifyProps = jest.fn();
      componentInstance.componentDidMount();

      expect(componentInstance.verifyProps).toHaveBeenCalled();
    });
  });
});
