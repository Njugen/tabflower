import React, { Fragment } from "react";
import { shallow, mount, render } from "enzyme";
import BodyContents from "../../../../../components/modals/existingTabGroupsModule/etgmLaunchGroupModal/BodyContents.jsx";
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

    describe("Examine function behaviour based on the value of this.props.data.params", () => {
      test("Run getWindowCollection(): If this.props.data.params is missing, return an empty array", () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.getWindowCollection()).toStrictEqual([]);
      });

      test.each(various_nonObjects)(
        "Run getWindowCollection(): If this.props.data.params = %p (not an object), return an empty array",
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

          expect(componentInstance.getWindowCollection()).toStrictEqual([]);
        }
      );
    });

    describe("Examine function behaviour based on the value of this.props.data.params.windowCollection", () => {
      test("Run getWindowCollection(): If this.props.data.params.windowCollection is missing, return an empty array", () => {
        const presetProps = {
          data: {
            params: {},
          },
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.getWindowCollection()).toStrictEqual([]);
      });

      test.each(various_nonArrays)(
        "Run getWindowCollection(): If this.props.data.params = %p (not an array), return an empty array",
        (val) => {
          const presetProps = {
            data: {
              params: {
                windowCollection: val,
              },
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(componentInstance.getWindowCollection()).toStrictEqual([]);
        }
      );

      test("Run getWindowCollection(): If this.props.data.params.windowCollection= [], return an empty array", () => {
        const presetProps = {
          data: {
            params: {
              windowCollection: [],
            },
          },
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.getWindowCollection()).toStrictEqual([]);
      });
    });

    describe("Examine function behaviour based on all used props (data, data.params and data.params.windowCollection) being valid", () => {
      test("Run getWindowCollection(): If this.props.data.params.windowCollection is a filled array, return it.", () => {
        const expectedArray = dummyWindowsAndTabs;

        const presetProps = {
          data: {
            params: {
              windowCollection: expectedArray,
            },
          },
        };

        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });

        componentInstance = testComponent.instance();

        expect(componentInstance.getWindowCollection()).toStrictEqual(
          expectedArray
        );
      });
    });
  });

  describe("Test numberOfWindows()", () => {
    test("Run numberOfWindows(): It should return a number representing the number of windows located in this.props.data.params.windowCollection", () => {
      const expectedArray = dummyWindowsAndTabs;

      const presetProps = {
        data: {
          params: {
            windowCollection: expectedArray,
          },
        },
      };

      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });

      componentInstance = testComponent.instance();

      expect(componentInstance.numberOfWindows()).toStrictEqual(
        expectedArray.length
      );
    });
  });

  describe("Test numberOfTabs()", () => {
    test("Run numberOfTabs(): It should return a number representing the total number of tabs in this.props.data.params.windowCollection (meaning, the sum of all tabs from each window)", () => {
      const expectedArray = dummyWindowsAndTabs;

      const presetProps = {
        data: {
          params: {
            windowCollection: expectedArray,
          },
        },
      };

      // The expected number of tabs
      const expectedNumberOfTabs = () => {
        const windows = presetProps.data.params.windowCollection;

        if (windows.length === 0) return 0;

        let numberOfTabs = 0;

        windows.map((window) => (numberOfTabs += window.tabs.length));
        console.log("CINDERELLA", numberOfTabs);
        return numberOfTabs;
      };

      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });

      componentInstance = testComponent.instance();

      expect(componentInstance.numberOfTabs()).toStrictEqual(
        expectedNumberOfTabs()
      );
    });
  });

  describe("Test renderWarningMessage()", () => {
    test("Run renderWarningMessage(numberOfWindows, numberOfTabs). It should return the same message written in this test, in which the input parameters are present", () => {
      const getRandomNumber = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
      };

      const mockedNumberOfWindows = getRandomNumber(1000);
      const mockedNumberOfTabs = getRandomNumber(1000);

      componentInstance.numberOfWindows = jest.fn(() => {
        return mockedNumberOfWindows;
      });
      componentInstance.numberOfTabs = jest.fn(() => {
        return mockedNumberOfTabs;
      });

      expect(
        componentInstance.renderWarningMessage(
          mockedNumberOfWindows,
          mockedNumberOfTabs
        )
      ).toStrictEqual(
        <p>
          Warning: You are about to launch a group consisting of{" "}
          <strong>{mockedNumberOfWindows} windows</strong> and{" "}
          <strong>{mockedNumberOfTabs} tabs</strong>. This might stress your
          computer down in the long run, or cause confusion in your work. Are
          you sure you want to launch this group?
        </p>
      );
    });

    test.each(various_nonNumber)(
      "Run renderWarningMessage(numberOfWindows, numberOfTabs), where numberOfWindows = %p (not a number). This should be represented in the returned text",
      (val) => {
        const getRandomNumber = (max) => {
          return Math.floor(Math.random() * Math.floor(max));
        };

        const mockedNumberOfWindows = val;
        const mockedNumberOfTabs = getRandomNumber(1000);

        componentInstance.numberOfWindows = jest.fn(() => {
          return mockedNumberOfWindows;
        });
        componentInstance.numberOfTabs = jest.fn(() => {
          return mockedNumberOfTabs;
        });

        expect(
          componentInstance.renderWarningMessage(
            mockedNumberOfWindows,
            mockedNumberOfTabs
          )
        ).toStrictEqual(
          <p>
            Warning: You are about to launch a group consisting of{" "}
            <strong>{"an undefined number of"} windows</strong> and{" "}
            <strong>{mockedNumberOfTabs} tabs</strong>. This might stress your
            computer down in the long run, or cause confusion in your work. Are
            you sure you want to launch this group?
          </p>
        );
      }
    );

    test.each(various_nonNumber)(
      "Run renderWarningMessage(numberOfWindows, numberOfTabs), where numberOfTabs = %p (not a number). This should be represented in the returned text",
      (val) => {
        const getRandomNumber = (max) => {
          return Math.floor(Math.random() * Math.floor(max));
        };

        const mockedNumberOfWindows = getRandomNumber(1000);
        const mockedNumberOfTabs = val;

        componentInstance.numberOfWindows = jest.fn(() => {
          return mockedNumberOfWindows;
        });
        componentInstance.numberOfTabs = jest.fn(() => {
          return mockedNumberOfTabs;
        });

        expect(
          componentInstance.renderWarningMessage(
            mockedNumberOfWindows,
            mockedNumberOfTabs
          )
        ).toStrictEqual(
          <p>
            Warning: You are about to launch a group consisting of{" "}
            <strong>{mockedNumberOfWindows} windows</strong> and{" "}
            <strong>{"an undefined number of"} tabs</strong>. This might stress
            your computer down in the long run, or cause confusion in your work.
            Are you sure you want to launch this group?
          </p>
        );
      }
    );

    test.each(various_nonNumber)(
      "Run renderWarningMessage(numberOfWindows, numberOfTabs), where both parameters are not numbers. This should be represented in the returned text",
      (val) => {
        const mockedNumberOfWindows = val;
        const mockedNumberOfTabs = val;

        componentInstance.numberOfWindows = jest.fn(() => {
          return mockedNumberOfWindows;
        });
        componentInstance.numberOfTabs = jest.fn(() => {
          return mockedNumberOfTabs;
        });

        expect(
          componentInstance.renderWarningMessage(
            mockedNumberOfWindows,
            mockedNumberOfTabs
          )
        ).toStrictEqual(
          <p>
            Warning: You are about to launch a group consisting of{" "}
            <strong>{"an undefined number of"} windows</strong> and{" "}
            <strong>{"an undefined number of"} tabs</strong>. This might stress
            your computer down in the long run, or cause confusion in your work.
            Are you sure you want to launch this group?
          </p>
        );
      }
    );
  });

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
