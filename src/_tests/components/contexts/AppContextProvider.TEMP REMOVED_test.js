import React from "react";
import { shallow } from "enzyme";
import * as ExceptionsHandler from "./../../../../../components/utils/exceptionsAndHandler";
import { AppContextProvider } from "./../../../components/contexts/AppContextProvider";

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
    "ETGMCreateNewGroupModal-h1": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-h1"
    ),
    "ETGMCreateNewGroupModal-h2": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-h2"
    ),
    "ETGMCreateNewGroupModal-h3": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-h3"
    ),
    "ETGMCreateNewGroupModal-h4": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-h4"
    ),
    "ETGMCreateNewGroupModal-h5": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-h5"
    ),
  };

  const expectedErrorReturns = {
    "ETGMCreateNewGroupModal-h1": {
      name: "ValidatorError",
      message: 'The "data" props is missing or not an object',
      code: "ETGMCreateNewGroupModal-h1",
    },
    "ETGMCreateNewGroupModal-h2": {
      name: "ValidatorError",
      message:
        'The "params" key in this.props.data is missing or not an object',
      code: "ETGMCreateNewGroupModal-h2",
    },
    "ETGMCreateNewGroupModal-h3": {
      name: "ValidatorError",
      message:
        'The "groupName" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.',
      code: "ETGMCreateNewGroupModal-h3",
    },
    "ETGMCreateNewGroupModal-h4": {
      name: "ValidatorError",
      message:
        'The "type" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.',
      code: "ETGMCreateNewGroupModal-h4",
    },
    "ETGMCreateNewGroupModal-h5": {
      name: "ValidatorError",
      message:
        'If the "type" in this.props.data.params is given as a string, it has to hold one of the following values: "currently-opened", "existing-group" or "new-group". All other datatypes are invalid.',
      code: "ETGMCreateNewGroupModal-h5",
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

  describe("Test launchModal(data)", () => {
    describe('"data" is not a non-array object', () => {
      const various_data = [
        ["This is a test string passed to launchModal through data"],
        [454],
        [true],
        [false],
        [undefined],
        [null],
        [() => {}],
        [[1, 2, 3, "4"]],
      ];

      test.each(various_data)(
        'Run launchModal(%p): ExceptionsHandler.ValidatorError("app-107") should be called',
        (val) => {
          componentInstance.launchModal(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "app-107"
          );
        }
      );
    });

    describe('"data" is a non-array object with no valid keys', () => {
      const various_data = [
        [
          {
            orange_amount: 21,
            apple_amount: 31,
            perch_amount: false,
            tomato_amount: null,
            cucumber_amount: "No info",
          },
        ],
        [
          {
            orange2_amount: "247",
            apple_amount2: true,
            perch_amount2: null,
            tomato_amount2: 65,
            cucumber_amount2: false,
          },
        ],
        [
          {
            orange_amount3: false,
            apple_amount3: "no info",
            perch_amount3: 7,
            tomato_amount3: true,
            cucumber_amount3: null,
          },
        ],
        [
          {
            orange_amount4: null,
            apple_amount4: false,
            perch_amount4: "no info provided",
            tomato_amount4: null,
            cucumber_amount4: ["empty"],
          },
        ],
      ];

      test.each(various_data)(
        'Run launchModal(%p): ExceptionsHandler.ValidatorError("app-108") should be called',
        (val) => {
          componentInstance.launchModal(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "app-108"
          );
        }
      );
    });

    describe('"data" is a non-array object with valid keys, but invalid value combinations', () => {
      const various_data = [
        [{ id: false, action: 514, params: ["blablabla"] }],
        [{ id: null, action: () => {}, params: {} }],
        [{ id: 218, action: true, params: null }],
        [{ id: "test", action: "24", params: () => {} }],
        [
          {
            id: "test",
            action: "24",
            params: () => {},
            tomato_amount4: null,
            cucumber_amount4: ["empty"],
          },
        ],
      ];

      test.each(various_data)(
        'Run launchModal(%p): ExceptionsHandler.ValidatorError("app-108") should be called',
        (val) => {
          componentInstance.launchModal(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "app-108"
          );
        }
      );
    });

    describe('"data" is a non-array object with valid keys and valid typeof combinations', () => {
      const various_data = [
        [{ id: "test", action: () => {}, params: { testkey1: "abcd" } }],
        [
          {
            id: "test2",
            action: () => {},
            params: { testkey2: 842, testkey3: "idg", testkey4: null },
            tomato_amount4: null,
            cucumber_amount4: ["empty"],
          },
        ],
        [
          {
            id: "etgmlaunchgroupmodal",
            action: () => {},
            params: { apple: 1, ign: 2 },
            tomato_amount4: null,
            cucumber_amount4: ["empty"],
          },
        ],
        [
          {
            id: "cotmremovewindowmodal",
            action: () => {},
            params: { apple: 1, ign: 2 },
            tomato_amount4: false,
            cucumber_amount4: ["empty"],
          },
        ],
      ];

      test.each(various_data)(
        "Run launchModal(%p): this.setState() should be called with correct parameters",
        (val) => {
          componentInstance.launchModal(val);

          expect(componentInstance.setState).toHaveBeenCalledWith({
            modal: {
              launched: true,
              ...val,
            },
          });
        }
      );
    });

    describe("Check that correct error messages are caught", () => {
      test('Running launchModal({}) will throw an error and pass it to launchErrorOverlay(err), where err.code = "app-108"', () => {
        componentInstance.launchErrorOverlay = jest.fn();
        componentInstance.launchModal({});

        expect(componentInstance.launchErrorOverlay).toHaveBeenCalledWith(
          expectedErrorReturns["app-108"]
        );
      });

      test('Running launchModal("Not an object") will throw an error and pass it to launchErrorOverlay(err), where err.code = "app-107"', () => {
        componentInstance.launchErrorOverlay = jest.fn();
        componentInstance.launchModal("Not an object");

        expect(componentInstance.launchErrorOverlay).toHaveBeenCalledWith(
          expectedErrorReturns["app-107"]
        );
      });
    });
  });

  describe("Test launchErrorOverlay(data)", () => {
    describe('"data" is not a non-array object', () => {
      const various_data = [
        [true],
        ["Passing this to launchErrorOverlay()"],
        [undefined],
        [false],
        [454],
        [[1, 2, 3, "4"]],
        [() => {}],
        [null],
      ];

      test.each(various_data)(
        'Run launchErrorOverlay(%p): ExceptionsHandler.ValidatorError("app-109") should be called',
        (val) => {
          componentInstance.launchErrorOverlay(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "app-109"
          );
        }
      );
    });

    describe('"data" is a non-array object with no valid keys', () => {
      const various_data = [
        [
          {
            orange_amount: 15,
            apple_amount: 20,
            perch_amount: false,
            tomato_amount: null,
            cucumber_amount: "No info",
          },
        ],
        [
          {
            orange2_amount: "247",
            apple_amount2: true,
            perch_amount2: null,
            tomato_amount2: 65,
            cucumber_amount2: false,
          },
        ],
        [
          {
            orange_amount3: false,
            apple_amount3: "no info  2",
            perch_amount3: 7,
            tomato_amount3: true,
            cucumber_amount3: null,
          },
        ],
        [
          {
            orange_amount4: null,
            apple_amount4: false,
            perch_amount4: "no info provided 2",
            tomato_amount4: null,
            cucumber_amount4: ["empty"],
          },
        ],
      ];

      test.each(various_data)(
        'Run launchErrorOverlay(%p): ExceptionsHandler.ValidatorError("app-110") should be called',
        (val) => {
          componentInstance.launchErrorOverlay(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "app-110"
          );
        }
      );
    });

    describe('"data" is a non-array object with valid keys, but invalid value combinations', () => {
      const various_data = [
        [{ code: false, message: 514, name: ["blablabla"] }],
        [{ code: null, message: () => {}, name: {} }],
        [{ code: 218, message: true, name: null }],
        [{ code: "test", message: "24", name: () => {} }],
        [
          {
            code: "test",
            message: "24",
            name: () => {},
            tomato_amount8: null,
            cucumber_amount6: ["empty"],
          },
        ],
      ];

      test.each(various_data)(
        'Run launchErrorOverlay(%p): ExceptionsHandler.ValidatorError("app-110") should be called',
        (val) => {
          componentInstance.launchErrorOverlay(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "app-110"
          );
        }
      );
    });

    describe('"data" is a non-array object with valid keys and valid typeof combinations', () => {
      const various_data = [
        [
          {
            code: "testCode-101",
            message: "Lorem ipsum dolor sit amet",
            name: "Mock Error 1",
          },
        ],
        [
          {
            code: "testCode-102",
            message: "consectetur adipiscing elit",
            name: "Mock Error 2",
          },
        ],
        [
          {
            code: "testCode-103",
            message: "facilisis a lacinia sit amet",
            name: "Mock Error 3",
          },
        ],
        [
          {
            code: "testCode-104",
            message: "Sed pretium magna eget",
            name: "Mock Error 4",
          },
        ],
        [
          {
            code: "testCode-105",
            message: "Nunc maximus vitae urna sed",
            name: "Mock Error 5",
            tomato_amount8: null,
            cucumber_amount6: ["empty"],
          },
        ],
      ];

      test.each(various_data)(
        "Run launchErrorOverlay(%p): this.setState() should be called with correct parameters",
        (val) => {
          let errors = [];
          errors.push(val);

          componentInstance.launchErrorOverlay(val);

          expect(componentInstance.setState).toHaveBeenCalledWith({
            errors,
          });
        }
      );
    });

    describe("Check that correct error messages are caught", () => {
      test('Running launchErrorOverlay({}) will throw an error err object and pass it to setState({errors: [{}, err]}), where err.code = "app-110"', () => {
        componentInstance.launchErrorOverlay({});

        expect(componentInstance.setState).toHaveBeenCalledWith({
          errors: [{}, expectedErrorReturns["app-110"]],
        });
      });

      test('Running launchErrorOverlay("Not an object") will throw an error object err and pass it to setState({errors: ["Not an object", err]}), where err.code = "app-109"', () => {
        componentInstance.launchErrorOverlay("Not an object");

        expect(componentInstance.setState).toHaveBeenCalledWith({
          errors: ["Not an object", expectedErrorReturns["app-109"]],
        });
      });
    });
  });
});
