import React from "react";
import { shallow } from "enzyme";
import * as ExceptionsHandler from "./../../../components/utils/exceptionsAndHandler";
import ViewFooter from "./../../../../components/views/components/viewFooter";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<ViewFooter {...props} />, options);
  return component;
};

const presetProps = {};

let testComponent;
let componentInstance;

describe("Test <ViewFooter /> component behaviour at mount", () => {
  const actualErrorReturns = {};

  const expectedErrorReturns = {};

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
});
