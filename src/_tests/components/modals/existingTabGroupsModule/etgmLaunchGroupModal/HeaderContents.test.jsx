import React from "react";
import { shallow } from "enzyme";
import HeaderContents from "./../../../../../components/modals/existingTabGroupsModule/etgmLaunchGroupModal/HeaderContents.jsx";
import * as ExceptionsHandler from "./../../../../../components/utils/exceptionsAndHandler";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<HeaderContents {...props} />, options);
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

describe("Test <BodyContents /> component behaviour at mount", () => {
  const actualErrorReturns = {
    "ETGMLaunchGroupsModal-h1": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-h1"
    ),
    "ETGMLaunchGroupsModal-h2": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-h2"
    ),
    "ETGMLaunchGroupsModal-h3": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-h3"
    ),
    "ETGMLaunchGroupsModal-h4": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-h4"
    ),
  };

  const expectedErrorReturns = {
    "ETGMLaunchGroupsModal-h1": {
      name: "ValidatorError",
      message: 'The "data" props is missing or not an object',
      code: "ETGMLaunchGroupsModal-h1",
    },
    "ETGMLaunchGroupsModal-h2": {
      name: "ValidatorError",
      message:
        'The "params" key in this.props.data is missing or not an object',
      code: "ETGMLaunchGroupsModal-h2",
    },
    "ETGMLaunchGroupsModal-h3": {
      name: "ValidatorError",
      message:
        'The "groupName" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.',
      code: "ETGMLaunchGroupsModal-h3",
    },
    "ETGMLaunchGroupsModal-h4": {
      name: "ValidatorError",
      message:
        'The "type" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.',
      code: "ETGMLaunchGroupsModal-h4",
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

  describe("Test determineTitle()", () => {
    const defaultTitle = "Confirm launch of this tab group";

    test("Run determineTitle(): If the this.props.data is missing, then return the string expected in this test", () => {
      const presetProps = {};
      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });
      componentInstance = testComponent.instance();

      expect(componentInstance.determineTitle()).toBe(defaultTitle);
    });

    test.each(various_nonObjects)(
      "Run determineTitle(): If the this.props.data = %p (not an object), then return the string expected in this test",
      (val) => {
        const presetProps = {
          data: val,
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.determineTitle()).toBe(defaultTitle);
      }
    );

    test('Run determineTitle(): If the this.props.data object exists but its "params" is missing, then return the string expected in this test', () => {
      const presetProps = {
        data: {},
      };
      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });
      componentInstance = testComponent.instance();

      expect(componentInstance.determineTitle()).toBe(defaultTitle);
    });

    test.each(various_nonObjects)(
      "Run determineTitle(): If the this.props.data.params = %p, then return the string expected in this test",
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

        expect(componentInstance.determineTitle()).toBe(defaultTitle);
      }
    );

    test("Run determineTitle(): If the this.props.data.groupName exists, then return the string expected in this test", () => {
      const groupName = "Dummy Group Name";

      const presetProps = {
        data: {
          params: {
            groupName: groupName,
          },
        },
      };
      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });
      componentInstance = testComponent.instance();

      expect(componentInstance.determineTitle()).toBe(
        'Confirm launch of tab group "' + groupName + '"'
      );
    });
  });

  describe("Test verifyProps()", () => {
    describe("Try out different this.props.data values", () => {
      test('Run verifyProps(): If this.props.data is missing, throw error "ETGMLaunchGroupsModal-h1"', () => {
        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMLaunchGroupsModal-h1"].message
        );
      });

      test.each(various_nonObjects)(
        'Run verifyProps(): If this.props.data = %p (not an object), throw error "ETGMLaunchGroupsModal-h1"',
        (val) => {
          const presetProps = {
            data: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMLaunchGroupsModal-h1"].message
          );
        }
      );

      test('Run verifyProps(): If this.props.data is an object, do not throw error "ETGMLaunchGroupsModal-h1"', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          expectedErrorReturns["ETGMLaunchGroupsModal-h1"].message
        );
      });
    });

    describe("Try out different values of the keys inside this.props.data.", () => {
      describe("Try out different this.props.data.params values", () => {
        test('Run verifyProps(): If this.props.data.params is missing, throw error "ETGMLaunchGroupsModal-h2"', () => {
          const presetProps = {
            data: {},
          };

          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });

          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMLaunchGroupsModal-h2"].message
          );
        });

        test.each(various_nonObjects)(
          'Run verifyProps(): If this.props.data.params = %p (not an object), throw error "ETGMLaunchGroupsModal-h2"',
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
              expectedErrorReturns["ETGMLaunchGroupsModal-h2"].message
            );
          }
        );

        test('Run verifyProps(): If this.props.data.params is an object, do not throw error "ETGMLaunchGroupsModal-h2"', () => {
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
            expectedErrorReturns["ETGMLaunchGroupsModal-h2"].message
          );
        });
      });

      describe("Try out different keys inside of the this.props.data.params object", () => {
        describe('Try out different this.props.data.params.groupName (in the following called "groupName") values', () => {
          test('Run verifyProps(): If "groupName" is missing, do not throw error "ETGMLaunchGroupsModal-h3"', () => {
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
              expectedErrorReturns["ETGMLaunchGroupsModal-h3"].message
            );
          });

          test('Run verifyProps(): If "groupName" is a string, do not throw error "ETGMLaunchGroupsModal-h3"', () => {
            const presetProps = {
              data: {
                params: {
                  groupName: "Dummy tab group name",
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMLaunchGroupsModal-h3"].message
            );
          });

          test.each(various_nonString_nonUndefined)(
            'Run verifyProps(): If "groupName" = %p (is neither a string nor undefined), throw error "ETGMLaunchGroupsModal-h3"',
            (val) => {
              const presetProps = {
                data: {
                  params: {
                    groupName: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              expect(() => componentInstance.verifyProps()).toThrowError(
                expectedErrorReturns["ETGMLaunchGroupsModal-h3"].message
              );
            }
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
