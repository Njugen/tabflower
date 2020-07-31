import React, { Fragment } from "react";
import { shallow, mount, render } from "enzyme";
import App from "./..pp";
import * as ExceptionsHandler from "../components/utils/exceptionsAndHandler";
import * as validator from "../components/utils/inputValidators";
import ViewFooter from "./../components/views/components/viewFooter";
import ErrorBoundary from "./../components/utils/errorBoundary";
import MainNavBar from "./../components/sidebars/mainNavBar/mainNavBar";
import RouteList from "./../components/routes/routeList";
import FullWidthLoadbar from "./../components/utils/fullWidthLoadbar";

const predefinedComponent = () => {
  const component = shallow(<App />);
  return component;
};

let testComponent;
let componentInstance;

describe("Test functions in <App />", () => {
  let ExceptionsHandler = jest.requireActual(
    "./../components/utils/exceptionsAndHandler"
  );

  // Copy our error messages from exceptionsAndHandler.js. These messages are to be mocked.
  const actualErrorReturns = {
    "app-101": ExceptionsHandler.ValidatorError("app-101"),
    "app-102": ExceptionsHandler.ValidatorError("app-102"),
    "app-103": ExceptionsHandler.ValidatorError("app-103"),
    "app-104": ExceptionsHandler.ValidatorError("app-104"),
    "app-105": ExceptionsHandler.ValidatorError("app-105"),
    "app-106": ExceptionsHandler.ValidatorError("app-106"),
    "app-107": ExceptionsHandler.ValidatorError("app-107"),
    "app-108": ExceptionsHandler.ValidatorError("app-108"),
    "app-109": ExceptionsHandler.ValidatorError("app-109"),
    "app-110": ExceptionsHandler.ValidatorError("app-110"),
    "app-112": ExceptionsHandler.ValidatorError("app-112"),
    "app-113": ExceptionsHandler.ValidatorError("app-113"),
  };

  // The error messages we expect to catch and be used as parameter in componentInstance.launchErrorOverlay, if an error has occured
  const expectedErrorReturns = {
    "app-101": {
      name: "ValidatorError",
      message:
        'The "callback" parameter in the App component\'s updateState() function needs to be a function, or undefined.',
      code: "app-101",
    },
    "app-102": {
      name: "ValidatorError",
      message:
        'The "newProps" parameter in the App component\'s updateState() function needs to be a an object (but not an array).',
      code: "app-102",
    },
    "app-103": {
      name: "ValidatorError",
      message:
        'The "viewProps" parameter in the App component\'s handleNavigation() function needs to be an object (but not an array), containing the following keys: "metaData" (object), "viewData" (object) and "refreshFactor" (number).',
      code: "app-103",
    },
    "app-104": {
      name: "ValidatorError",
      message:
        'The "viewProps" parameter in the App component\'s handleNavigation() function needs to be a an object (but not an array).',
      code: "app-104",
    },
    "app-105": {
      name: "ValidatorError",
      message:
        'The "sidebarProps" parameter in the App component\'s handleMainNavBarClick() function needs to be a an object (but not an array).',
      code: "app-105",
    },
    "app-106": {
      name: "ValidatorError",
      message:
        'The "sidebarProps" parameter in the App component\'s handleMainNavBarClick() function is missing an "activeNavLinkKey" key (as an integer) in its object.',
      code: "app-106",
    },
    "app-107": {
      name: "ValidatorError",
      message:
        'The "data" parameter in the App component\'s launchModal() function needs to be a an object (but not an array).',
      code: "app-107",
    },
    "app-108": {
      name: "ValidatorError",
      message:
        'The "data" parameter in the App component\'s launchModal() function does not contain the necessary keys',
      code: "app-108",
    },
    "app-109": {
      name: "ValidatorError",
      message:
        'The "data" parameter in the App component\'s launchErrorOverlay() function needs to be a an object (but not an array).',
      code: "app-109",
    },
    "app-110": {
      name: "ValidatorError",
      message:
        'The "data" parameter in the App component\'s launchErrorOverlay() function does not contain the necessary keys',
      code: "app-110",
    },
    "app-112": {
      name: "ValidatorError",
      message:
        'The "routesArray" parameter in the App component\'s validateRouteArrayFormat() function needs to be an array, with each element being an object containing at least the following keys: { label: "name of the route", path: "/path of the route", key: index number }',
      code: "app-112",
    },
    "app-113": {
      name: "ValidatorError",
      message:
        'The "data" parameter in the App component\'s handleRaisedRoutesInfo() function needs to be an array, containing different route objects',
      code: "app-113",
    },
  };

  const expectedPossibleModalIds = [
    "confirm-action",
    "date-settings",
    "etgmlaunchgroupmodal",
    "etgmremovegroupmodal",
    "cotmremoveunresponsivetabsmodal",
    "cotmremovewindowmodal",
    "cotmremovetabmodal",
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();

    testComponent = predefinedComponent();
    componentInstance = testComponent.instance();

    componentInstance.setState = jest.fn();

    ExceptionsHandler.ValidatorError = jest.fn();
    ExceptionsHandler.ValidatorError.mockImplementation((errCode) => {
      return actualErrorReturns[errCode];
    });
  });
});
