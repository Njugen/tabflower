import React from "react";
import { shallow } from "enzyme";
import View from "./../../../components/views/view";
import * as ExceptionsHandler from "./../../../components/utils/exceptionsAndHandler";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<View {...props} />, options);
  return component;
};

const presetProps = {
  onViewMount: "",
};

let testComponent;
let componentInstance;

describe("Test <View /> component behaviour at mount", () => {
  const actualErrorReturns = {
    "view-101": ExceptionsHandler.ValidatorError("view-101"),
    "view-102": ExceptionsHandler.ValidatorError("view-102"),
    "view-103": ExceptionsHandler.ValidatorError("view-103"),
    "view-104": ExceptionsHandler.ValidatorError("view-104"),
  };

  const expectedErrorReturns = {
    "view-101": {
      name: "ValidatorError",
      message:
        'The "onViewMount" parameter is not set in this view. Any view inserted into Tabflower must have this parameter set as a function.',
      code: "view-101",
    },
    "view-102": {
      name: "ValidatorError",
      message:
        'The "data" parameter is not set in raiseToErrorOverlay() of the View component. Information could not be forwarded to the UI.',
      code: "view-102",
    },
    "view-103": {
      name: "ValidatorError",
      message:
        "The features of the raiseToErrorOverlay() function of the View component could not be fully executed, because the props onRaiseToErrorOverlay is not a function or is missing.",
      code: "view-103",
    },
    "view-104": {
      name: "ValidatorError",
      message:
        'The "data" parameter is not set as an object in raiseToModal() of the View component. Information could not be forwarded to the UI.',
      code: "view-104",
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

    ExceptionsHandler.ValidatorError = jest.fn();
    ExceptionsHandler.ValidatorError.mockImplementation((errCode) => {
      return actualErrorReturns[errCode];
    });
  });

  describe("Test handleViewMount()", () => {
    const various_props_onViewMount = [
      ["A string representing a dummy data variable"], // string
      [32], // number
      [null], // null
      [undefined], // undefined
      [false], // boolean
      [true], // boolean
      [[12, 8, 3, 7]], // array
      [{ item: "test" }], //
    ];

    test.each(various_props_onViewMount)(
      'Run handleViewMount(), when this.props.onViewMount = %p. Expectation: Throw an error ExceptionsHandler.ValidatorError("view-101")',
      (val) => {
        const presetProps = {
          onViewMount: val,
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        componentInstance.handleViewMount();
        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "view-101"
        );
      }
    );

    test("Run handleViewMount(), when this.props.onViewMount is a function: Call this.props.onViewMount() with the component state as input parameter", () => {
      const presetProps = {
        onViewMount: jest.fn(),
      };
      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });
      componentInstance = testComponent.instance();

      componentInstance.handleViewMount();
      expect(componentInstance.props.onViewMount).toHaveBeenCalledWith(
        componentInstance.state
      );
    });
  });

  describe("Test componentDidMount()", () => {
    const various_nonFunction_values = [
      ["A string representing a dummy data variable"], // string
      [32], // number
      [null], // null
      [undefined], // undefined
      [false], // boolean
      [true], // boolean
      [[12, 8, 3, 7]], // array
      [{ item: "test" }], // object
    ];

    const various_values_allDatatypes = [
      ...various_nonFunction_values,
      [() => {}],
    ];

    test.each(various_nonFunction_values)(
      "Run componentDidMount(), when this.childComponentDidMount = %p (not a function): Do not trigger this.childComponentDidMount() (if this test fails, it means error has been thrown)",
      (val) => {
        componentInstance.childComponentDidMount = val;

        expect(() => {
          componentInstance.componentDidMount();
        }).not.toThrowError();
      }
    );

    test("Run componentDidMount, when this.childComponentDidMount is a function: Call this.childComponentDidMount()", () => {
      componentInstance.childComponentDidMount = jest.fn();
      componentInstance.componentDidMount();

      expect(componentInstance.childComponentDidMount).toHaveBeenCalled();
    });

    describe("Test componentDidMount, when this.childComponentDidMount has any value. this.handleViewMount() should trigger at all time.", () => {
      test.each(various_values_allDatatypes)(
        "Run componentDidMount(), when this.childComponentDidMount = %p. this.handleViewMount() should trigger",
        (val) => {
          componentInstance.handleViewMount = jest.fn();
          componentInstance.childComponentDidMount = val;
          componentInstance.componentDidMount();

          expect(componentInstance.handleViewMount).toHaveBeenCalled();
        }
      );

      test("Run componentDidMount(), with no regards to this.childComponentDidMount. this.handleViewMoun() should still trigger", () => {
        componentInstance.handleViewMount = jest.fn();
        componentInstance.componentDidMount();

        expect(componentInstance.handleViewMount).toHaveBeenCalled();
      });
    });
  });

  describe("Test render()", () => {
    test('Run render(): Nothing should be rendered at all, no JSX. Nothing. Just return "null"', () => {
      expect(componentInstance.render()).toBeNull();
    });
  });
});
