import React from "react";
import { shallow } from "enzyme";
import TBWindowListInput from "./../../../../components/utils/form/tbWindowListInput";
import * as ExceptionsHandler from "./../../../../components/utils/exceptionsAndHandler";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<TBWindowListInput {...props} />, options);
  component.instance().render = jest.fn();
  return component;
};

let presetProps = {
  type: "existing-group",
};

let testComponent;
let componentInstance;

//jest.mock("./__mocks__/fetch");

describe("Test <TBWindowListInput /> component behaviour at mount", () => {
  const actualErrorReturns = {
    "ETGMCreateNewGroupModal-101": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-101"
    ),
    "ETGMCreateNewGroupModal-102": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-102"
    ),
    "ETGMCreateNewGroupModal-103": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-103"
    ),
    "ETGMCreateNewGroupModal-104": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-104"
    ),
    "ETGMCreateNewGroupModal-105": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-105"
    ),
    "ETGMCreateNewGroupModal-106": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-106"
    ),
    "ETGMCreateNewGroupModal-111": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-111"
    ),
    "ETGMCreateNewGroupModal-115": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-115"
    ),
    "ETGMCreateNewGroupModal-116": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-116"
    ),
    "ETGMCreateNewGroupModal-117": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-117"
    ),
    "ETGMCreateNewGroupModal-118": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-118"
    ),
    "ETGMCreateNewGroupModal-119": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-119"
    ),
    "ETGMCreateNewGroupModal-120": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-120"
    ),
    "ETGMCreateNewGroupModal-121": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-121"
    ),
    "ETGMCreateNewGroupModal-122": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-122"
    ),
    "ETGMCreateNewGroupModal-123": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-123"
    ),
    "ETGMCreateNewGroupModal-124": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-124"
    ),
    "ETGMCreateNewGroupModal-125": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-125"
    ),
    "ETGMCreateNewGroupModal-126": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-126"
    ),
    "ETGMCreateNewGroupModal-127": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-127"
    ),
    "ETGMCreateNewGroupModal-128": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-128"
    ),
    "ETGMCreateNewGroupModal-129": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-129"
    ),
    "ETGMCreateNewGroupModal-130": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-130"
    ),
    "ETGMCreateNewGroupModal-131": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-131"
    ),
    "ETGMCreateNewGroupModal-132": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-132"
    ),
    "ETGMCreateNewGroupModal-133": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-133"
    ),
    "ETGMCreateNewGroupModal-134": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-134"
    ),
    "ETGMCreateNewGroupModal-135": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-135"
    ),
    "ETGMCreateNewGroupModal-136": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-136"
    ),
  };

  const expectedErrorReturns = {
    "ETGMCreateNewGroupModal-101": {
      name: "ValidatorError",
      message: "The callback parameter is not a function",
      code: "ETGMCreateNewGroupModal-101",
    },
    "ETGMCreateNewGroupModal-102": {
      name: "ValidatorError",
      message:
        "A tab group id must be a string. The requested tab group could not be retrieved.",
      code: "ETGMCreateNewGroupModal-102",
    },
    "ETGMCreateNewGroupModal-103": {
      name: "ValidatorError",
      message: "The URL could not be found",
      code: "ETGMCreateNewGroupModal-103",
    },
    "ETGMCreateNewGroupModal-104": {
      name: "ValidatorError",
      message: "The URL to be loaded needs to be a string",
      code: "ETGMCreateNewGroupModal-104",
    },
    "ETGMCreateNewGroupModal-105": {
      name: "ValidatorError",
      message: "The success parameter needs to be a function for callback",
      code: "ETGMCreateNewGroupModal-105",
    },
    "ETGMCreateNewGroupModal-106": {
      name: "ValidatorError",
      message: "The fail parameter needs to be a function for callback",
      code: "ETGMCreateNewGroupModal-106",
    },
    "ETGMCreateNewGroupModal-111": {
      name: "ValidatorError",
      message:
        "The windowIndex parameter in the deleteWindow function needs to be an integer 0 or higher",
      code: "ETGMCreateNewGroupModal-111",
    },
    "ETGMCreateNewGroupModal-115": {
      name: "ValidatorError",
      message:
        'The "type" parameter in this.props.data.params needs to have either of the following values: "currently-opened", "existing-group" or "new-group". As a result, tab groups cannot be added nor edited at this time.',
      code: "ETGMCreateNewGroupModal-115",
    },
    "ETGMCreateNewGroupModal-116": {
      name: "ValidatorError",
      message:
        'The "groupName" parameter in this.props.data.params needs to be a text string if given. If a string is not available, remove "groupName" from props. As a result of this error, tab groups cannot be added nor edited at this time.',
      code: "ETGMCreateNewGroupModal-116",
    },
    "ETGMCreateNewGroupModal-117": {
      name: "ValidatorError",
      message:
        'The "groupDescription" parameter in this.props.data.params needs to be a text string if given. If a string is not available, remove "groupDescription" from props. As a result of this error, tab groups cannot be added nor edited at this time.',
      code: "ETGMCreateNewGroupModal-117",
    },
    "ETGMCreateNewGroupModal-118": {
      name: "ValidatorError",
      message:
        'The "groupCloseAll" parameter in this.props.data.params needs to be a boolean value (true or false) if given. If such a value is not available, remove "groupCloseAll" from props. As a result of this error, tab groups cannot be added nor edited at this time.',
      code: "ETGMCreateNewGroupModal-118",
    },
    "ETGMCreateNewGroupModal-119": {
      name: "ValidatorError",
      message:
        'The "windowCollection" parameter needs to be an object in this.props.data.params, containing information about all windows and tabs in a tab group. If there is no such information available, this parameter should be an empty object. As a result of this error, tab groups cannot be added nor edited at this time.',
      code: "ETGMCreateNewGroupModal-119",
    },
    "ETGMCreateNewGroupModal-120": {
      name: "ValidatorError",
      message:
        'The "groupId" parameter needs to be a string in this.props.data.params, containing an id string of the requested tab group. If such an id does not exist as a text string, refrain from providing the groupId variable when calling this modal. As a result of this error, the requested tab group cannot be identified and can therefore not be edited.',
      code: "ETGMCreateNewGroupModal-120",
    },
    "ETGMCreateNewGroupModal-121": {
      name: "ValidatorError",
      message:
        "The predefined tabs and arrays were provided to this modal in an incorrect format. As a result, no tab groups can be created at this moment.",
      code: "ETGMCreateNewGroupModal-121",
    },
    "ETGMCreateNewGroupModal-122": {
      name: "ValidatorError",
      message:
        'The "groupCloseInactiveTabs" parameter in this.props.data.params needs to be a boolean value (true or false) if given. If such a value is not available, remove "groupCloseInactiveTabs" from props. As a result of this error, tab groups cannot be added nor edited at this time.',
      code: "ETGMCreateNewGroupModal-122",
    },
    "ETGMCreateNewGroupModal-123": {
      name: "ValidatorError",
      message:
        'The "data" variable either does not currently exist, nor is it currently an object, in this.props',
      code: "ETGMCreateNewGroupModal-123",
    },
    "ETGMCreateNewGroupModal-124": {
      name: "ValidatorError",
      message:
        'The "params" variable either does not currently exist, nor is it currently an object, in this.props.data',
      code: "ETGMCreateNewGroupModal-124",
    },
    "ETGMCreateNewGroupModal-125": {
      name: "ValidatorError",
      message:
        'The "tabGroupDetails" object is missing in the component state, or might already exist but not as a function. Check that this object gets added at component mount.',
      code: "ETGMCreateNewGroupModal-125",
    },
    "ETGMCreateNewGroupModal-126": {
      name: "ValidatorError",
      message:
        'The "success" callback parameter is not a function. Field validation aborted.',
      code: "ETGMCreateNewGroupModal-126",
    },
    "ETGMCreateNewGroupModal-127": {
      name: "ValidatorError",
      message:
        "No information about the targetted tab group could be found. Task aborted.",
      code: "ETGMCreateNewGroupModal-127",
    },
    "ETGMCreateNewGroupModal-128": {
      name: "ValidatorError",
      message:
        "No windows nor tabs in the targetted tab group could be retrieved. Task aborted.",
      code: "ETGMCreateNewGroupModal-128",
    },
    "ETGMCreateNewGroupModal-129": {
      name: "ValidatorError",
      message:
        "The tab arrangement could not be fulfilled at the moment. Please contact the developer.",
      code: "ETGMCreateNewGroupModal-129",
    },
    "ETGMCreateNewGroupModal-130": {
      name: "ValidatorError",
      message: "There are no stored windows to work with.",
      code: "ETGMCreateNewGroupModal-130",
    },
    "ETGMCreateNewGroupModal-131": {
      name: "ValidatorError",
      message: "The targetted window does not exist.",
      code: "ETGMCreateNewGroupModal-131",
    },
    "ETGMCreateNewGroupModal-132": {
      name: "ValidatorError",
      message: "The targetted tab does not exist.",
      code: "ETGMCreateNewGroupModal-132",
    },
    "ETGMCreateNewGroupModal-133": {
      name: "ValidatorError",
      message: "The targetted tab does not exist.",
      code: "ETGMCreateNewGroupModal-133",
    },
    "ETGMCreateNewGroupModal-134": {
      name: "ValidatorError",
      message: "The targetted window does not exist.",
      code: "ETGMCreateNewGroupModal-134",
    },
    "ETGMCreateNewGroupModal-135": {
      name: "ValidatorError",
      message:
        "The required parameters were not provided to the data props of this modal. The attempt to add/modify a tab group is neglected.",
      code: "ETGMCreateNewGroupModal-135",
    },
    "ETGMCreateNewGroupModal-136": {
      name: "ValidatorError",
      message:
        "The data props section is missing or not an object when attempting to add/modify a tab group. The attempt to add/modify a tab group is neglected.",
      code: "ETGMCreateNewGroupModal-136",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();

    const presetProps = { type: "existing-group" };
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

  describe("Test loadUrl(url, success, fail)", () => {
    describe('Examine the "url" parameter, while "success" and "fail" can be anything', () => {
      test('Run loadUrl("A text string", ANYTHING, ANYTHING): Do not throw an error "ETGMCreateNewGroupModal-104" since "url" is a string', () => {
        componentInstance.loadUrl(
          "A text string",
          expect.anything(),
          expect.anything()
        );

        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-104"
        );
      });

      test.each(various_nonString)(
        'Run loadUrl(%p, ANYTHING, ANYTHING): Throw an error "ETGMCreateNewGroupModal-104" since "url" is not a string',
        (val) => {
          componentInstance.loadUrl(val, expect.anything(), expect.anything());

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-104"
          );
        }
      );
    });

    describe('Examine the "success" parameter, while "url" is a string and "fail" can be anything', () => {
      test('Run loadUrl("A text string", () => {}, ANYTHING): Do not throw an error "ETGMCreateNewGroupModal-105" since "success" is a function', () => {
        componentInstance.loadUrl("A text string", () => {}, expect.anything());

        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-105"
        );
      });

      test.each(various_nonFunctions)(
        'Run loadUrl("A text string", %p, ANYTHING): Throw an error "ETGMCreateNewGroupModal-105" since "success" is not a function',
        (val) => {
          componentInstance.loadUrl("A text string", val, expect.anything());

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-105"
          );
        }
      );
    });

    describe('Examine the "fail" parameter, while "url" is a string and "success" is a function', () => {
      test('Run loadUrl("A text string", () => {}, () => {})): Do not throw an error "ETGMCreateNewGroupModal-106" since "fail" is a function', () => {
        componentInstance.loadUrl(
          "A text string",
          () => {},
          () => {}
        );

        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-106"
        );
      });

      test.each(various_nonFunctions)(
        'Run loadUrl("A text string", () => {}, %p): Throw an error "ETGMCreateNewGroupModal-106" since "fail" is not a function',
        (val) => {
          componentInstance.loadUrl("A text string", () => {}, val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-106"
          );
        }
      );
    });

    describe("Examine the ExceptionsHandler.ValidatorError() function, when one or more parameters are incorrect. That function is only called once when error is thrown", () => {
      test('Run loadUrl([], () => {}, () => {})): The "url" parameter is incorrect, ExceptionsHandler.ValidatorError() is called only once', () => {
        componentInstance.loadUrl(
          [],
          () => {},
          () => {}
        );

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledTimes(1);
      });

      test('Run loadUrl([], "blablabla", () => {})): The "url" and "success" parameters are incorrect, ExceptionsHandler.ValidatorError() is called only once', () => {
        componentInstance.loadUrl([], "blablabla", () => {});

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledTimes(1);
      });

      test('Run loadUrl([], "blablabla", {}): all parameters are incorrect, ExceptionsHandler.ValidatorError() is called only once', () => {
        componentInstance.loadUrl([], "blablabla", {});

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledTimes(1);
      });

      test('Run loadUrl("A text string", "blablabla", {}): only "url" parameter is correct, ExceptionsHandler.ValidatorError() is called only once', () => {
        componentInstance.loadUrl("A text string", "blablabla", {});

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledTimes(1);
      });
    });

    describe("Examine the fetch() response, and check that success/fail is correctly called depending on the circumstances", () => {
      global.fetch = jest.fn((url) => {
        console.log("ACDC", url);
        return new Promise((resolve, reject) => {
          const response = {
            ok: true,
            text: () => {
              return "This is a mocked response text";
            },
          };

          process.nextTick(() => {
            if (response.ok === true) {
              resolve(response);
            } else {
              reject(
                ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-103")
              );
            }
          });
        });
      });

      test('Run loadUrl("A text string", success, fail), where "success" and "fail" are both functions: call "success" with response.text() as parameter, if response.ok is truthy', () => {
        const success = jest.fn();
        const fail = jest.fn();

        global.fetch = jest.fn((url) => {
          return new Promise((resolve, reject) => {
            const response = {
              ok: true,
              text: () => {
                return "This is a mocked response text";
              },
            };

            process.nextTick(() => {
              if (response.ok === true) {
                resolve(response);
              } else {
                reject(
                  ExceptionsHandler.ValidatorError(
                    "ETGMCreateNewGroupModal-103"
                  )
                );
              }
            });
          });
        });

        expect.assertions(1);

        return componentInstance
          .loadUrl("A text string", success, fail)
          .then(() => {
            expect(success).toHaveBeenCalledWith(
              "This is a mocked response text"
            );
          });
      });

      test('Run loadUrl("A text string", success, fail), where "success" and "fail" are both functions: call "fail" with response.text() as parameter, if response.ok is truthy', () => {
        const success = jest.fn();
        const fail = jest.fn();

        global.fetch = jest.fn((url) => {
          return new Promise((resolve, reject) => {
            const response = {
              ok: false,
              text: () => {
                return "This is a mocked response text";
              },
            };

            process.nextTick(() => {
              if (response.ok === true) {
                resolve(response);
              } else {
                reject(
                  ExceptionsHandler.ValidatorError(
                    "ETGMCreateNewGroupModal-103"
                  )
                );
              }
            });
          });
        });

        expect.assertions(1);

        return componentInstance
          .loadUrl("A text string", success, fail)
          .then(() => {
            expect(fail).toHaveBeenCalledWith(
              ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-103")
            );
          });
      });
    });
  });

  describe("Test addNewWindow(inputUrl)", () => {
    describe("Examine inputUrl parameter", () => {
      test('Run addNewWindow("https://google.com"): An error "ETGMCreateNewGroupModal-104" should not be thrown, because inputUrl is a string', () => {
        componentInstance.addNewWindow("https://google.com");

        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-104"
        );
      });

      test.each(various_nonString)(
        'Run addNewWindow(%p): An error "ETGMCreateNewGroupModal-104" should be thrown, because inputUrl is not a string',
        (val) => {
          componentInstance.addNewWindow(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-104"
          );
        }
      );

      describe("Examine the situations where inputUrl is a string", () => {
        test('Run addNewWindow("https://google.com"), if "windowCollection" is missing in component props: throw the error "ETGMCreateNewGroupModal-125"', () => {
          componentInstance.loadUrl = jest.fn();

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          const url = "https://google.com";
          componentInstance.addNewWindow(url);
          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-125"
          );
        });

        test.each(various_nonArrays)(
          'Run addNewWindow("https://google.com"), if "windowCollection" = %p (is not an array) in component props: throw the error "ETGMCreateNewGroupModal-125"',
          (val) => {
            componentInstance.loadUrl = jest.fn();

            const url = "https://google.com";
            const windowCollection = val;

            testComponent = predefinedComponent(
              {
                ...presetProps,
                onModifyList: jest.fn(),
                windowCollection,
              },
              {
                disableLifecycleMethods: true,
              }
            );
            componentInstance = testComponent.instance();

            componentInstance.addNewWindow(url);
            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-125"
            );
          }
        );

        test('Run addNewWindow("https://google.com"), if "windowCollection" is an array: call this.loadUrl("https://google.com", ANYTHING, ANYTHING)', () => {
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";
          const windowCollection = [];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();
          componentInstance.loadUrl = jest.fn();
          componentInstance.addNewWindow(url);

          expect(componentInstance.loadUrl).toHaveBeenCalledWith(
            url,
            expect.anything(),
            expect.anything()
          );
        });

        test('Run addNewWindow("https://google.com"), while "windowCollection" is an empty array in component props: if this.loadUrl(ANY STRING, success, fail) triggers its success callback then this.onModifyList(payload) should be triggered with test specified payload', () => {
          /*
                        To note:

                        While tabGroupDetails is an empty object, only the new window will used as a parameter when calling
                        onModifyList().
                    */
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";

          const windowCollection = [];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          const responseText =
            "A text string acting as responseText for this test";

          componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
            success(responseText);
          });
          componentInstance.addNewWindow(url);
          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            [
              {
                tabs: [
                  {
                    title: expect.anything(),
                    favIconUrl: url + "/favicon.ico",
                    url: url,
                  },
                ],
              },
            ],
            "tabGroupDetails"
          );
        });

        test('Run addNewWindow("https://google.com"), while "windowCollection" is a filled array in component props: if this.loadUrl(ANY STRING, success, fail) triggers its success callback then this.onModifyList(payload) should be triggered with test specified payload', () => {
          /*
                        To note:

                        While tabGroupDetails.windowCollection exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling onModifyList()
                    */
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";

          const windowCollection = [
            { name: "window 1" },
            { name: "window 2" },
            { name: "window 3" },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );

          componentInstance = testComponent.instance();

          const responseText =
            "A text string acting as responseText for this test";

          componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
            success(responseText);
          });
          componentInstance.addNewWindow(url);
          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            [
              ...windowCollection,
              {
                tabs: [
                  {
                    title: expect.anything(),
                    favIconUrl: url + "/favicon.ico",
                    url: url,
                  },
                ],
              },
            ],
            "tabGroupDetails"
          );
        });

        test('Run addNewWindow("https://google.com"), while "windowCollection" is an empty array: if this.loadUrl(ANY STRING, success, fail) triggers its fail callback then this.onModifyList(payload) should be triggered with test specified payload', () => {
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";

          const windowCollection = [];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
            fail();
          });
          componentInstance.addNewWindow(url);
          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            [
              {
                tabs: [
                  {
                    title: url,
                    favIconUrl: url + "/favicon.ico",
                    url: url,
                  },
                ],
              },
            ],
            "tabGroupDetails"
          );
        });

        test('Run addNewWindow("https://google.com"), while "windowCollection" is a filled array in component props: if this.loadUrl(ANY STRING, success, fail) triggers its fail callback then this.onModifyList(payload) should be triggered with test specified payload', () => {
          /*
                        To note:

                        While tabGroupDetails.windowCollection exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling onModifyList()
                    */
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";

          const windowCollection = [
            { name: "window 1" },
            { name: "window 2" },
            { name: "window 3" },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          const responseText =
            "A text string acting as responseText for this test";

          componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
            fail(responseText);
          });
          componentInstance.addNewWindow(url);
          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            [
              ...windowCollection,
              {
                tabs: [
                  {
                    title: url,
                    favIconUrl: url + "/favicon.ico",
                    url: url,
                  },
                ],
              },
            ],
            "tabGroupDetails"
          );
        });
      });
    });
  });

  describe("Test addNewTab(inputUrl, index)", () => {
    describe("Examine inputUrl parameter", () => {
      test('Run addNewTab("https://google.com"): An error "ETGMCreateNewGroupModal-104" should not be thrown, because inputUrl is a string', () => {
        componentInstance.addNewTab("https://google.com");

        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-108"
        );
      });

      test.each(various_nonString)(
        'Run addNewTab(%p): An error "ETGMCreateNewGroupModal-104" should be thrown, because inputUrl is not a string',
        (val) => {
          componentInstance.addNewTab(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-108"
          );
        }
      );

      test('Run addNewTab("https://google.com", 10): An error "ETGMCreateNewGroupModal-107" should not be thrown, because inputUrl is a string and index is a number', () => {
        componentInstance.addNewTab("https://google.com", 10);

        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-107"
        );
      });

      test.each(various_nonNumber)(
        'Run addNewTab("https://google.com", %p): An error "ETGMCreateNewGroupModal-107" should be thrown, because inputUrl is a string and index is not a number',
        (val) => {
          componentInstance.addNewTab("https://google.com", val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-107"
          );
        }
      );

      describe("Examine the situations where inputUrl is a string and index is a number (index = 0 in this test section)", () => {
        test('Run addNewTab("https://google.com", 0), if "windowcollection" is not an array in props: throw the error "ETGMCreateNewGroupModal-125"', () => {
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";
          const windowCollection = "";

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          componentInstance.addNewTab(url, 0);
          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-125"
          );
        });

        test.each(various_nonArrays)(
          'Run addNewTab("https://google.com", 0), if "tabGroupDetails" = %p (is not an array) in component state: throw the error "ETGMCreateNewGroupModal-125"',
          (val) => {
            componentInstance.loadUrl = jest.fn();

            const url = "https://google.com";
            const windowCollection = val;

            testComponent = predefinedComponent(
              {
                ...presetProps,
                onModifyList: jest.fn(),
                windowCollection,
              },
              {
                disableLifecycleMethods: true,
              }
            );
            componentInstance = testComponent.instance();
            componentInstance.addNewTab(url, 0);
            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-125"
            );
          }
        );

        test('Run addNewTab("https://google.com", 0), while "windowCollection" key in props is an empty array:: throw an error "ETGMCreateNewGroupModal-129"', () => {
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";

          const windowCollection = [];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          componentInstance.addNewTab(url, 0);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-129"
          );
          //expect(componentInstance.loadUrl).toHaveBeenCalledWith(url, expect.anything(), expect.anything());
        });

        test('Run addNewTab("https://google.com", 0), while "windowCollection" key in props is an empty array: throw an error "ETGMCreateNewGroupModal-129"', () => {
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";

          const windowCollection = [];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          componentInstance.addNewTab(url, 0);
          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-129"
          );
        });

        test('Run addNewTab("https://google.com", 0), while "windowCollection" key in props is an array: if this.loadUrl(ANY STRING, success, fail) triggers its success callback then this.onModifyList(payload) should be triggered with test specified payload', () => {
          /*
                        To note:

                        While tabGroupDetails.windowCollection exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling onModifyList()
                    */
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";

          const windowCollection = [
            { name: "window 1", tabs: [] },
            { name: "window 2", tabs: [] },
            { name: "window 3", tabs: [] },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          const responseText =
            "A text string acting as responseText for this test";

          componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
            success(responseText);
          });
          componentInstance.addNewTab(url, 0);

          let parsedWindows = JSON.parse(JSON.stringify(windowCollection));
          parsedWindows[0].tabs.push({
            title: expect.anything(),
            favIconUrl: url + "/favicon.ico",
            url: url,
          });

          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            parsedWindows,
            "tabGroupDetails"
          );
        });

        test('Run addNewTab("https://google.com", 0), while "windowCollection" in props is an empty array:  throw an error "ETGMCreateNewGroupModal-129"', () => {
          /*
                        To note:

                        While tabGroupDetails.windowCollection exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling onModifyList()
                    */
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";

          const windowCollection = [];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          componentInstance.addNewTab(url, 0);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-129"
          );
        });

        test.each(various_nonArrays)(
          'Run addNewTab("https://google.com", 0), while "windowCollection" in props is not an array: throw an error "ETGMCreateNewGroupModal-129"',
          (val) => {
            /*
                        To note:

                        While tabGroupDetails.windowCollection exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling onModifyList()
                    */
            componentInstance.loadUrl = jest.fn();

            const url = "https://google.com";

            const windowCollection = val;

            testComponent = predefinedComponent(
              {
                ...presetProps,
                onModifyList: jest.fn(),
                windowCollection,
              },
              {
                disableLifecycleMethods: true,
              }
            );

            componentInstance = testComponent.instance();

            componentInstance.addNewTab(url, 0);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-125"
            );
          }
        );

        test('Run addNewTab("https://google.com", 0), while "windowCollection" is an empty array in props: throw an error "ETGMCreateNewGroupModal-129"', () => {
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";

          const windowCollection = [];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          componentInstance.addNewTab(url, 0);
          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-129"
          );
        });

        test('Run addNewTab("https://google.com", 0), while "windowCollection" array in props is filled: if this.loadUrl(ANY STRING, success, fail) triggers its fail callback then this.onModifyList(payload) should be triggered with test specified payload', () => {
          /*
                        To note:

                        While tabGroupDetails.windowCollection exists as a filled array (each item object in that array represents a window), 
                        it will be combined with the new window before being used as a parameter when calling onModifyList()
                    */
          componentInstance.loadUrl = jest.fn();

          const url = "https://google.com";

          const windowCollection = [
            { name: "window 1", tabs: [] },
            { name: "window 2", tabs: [] },
            { name: "window 3", tabs: [] },
          ];
          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          const responseText =
            "A text string acting as responseText for this test";

          componentInstance.loadUrl = jest.fn((inputUrl, success, fail) => {
            fail(responseText);
          });
          componentInstance.addNewTab(url, 0);

          let parsedWindows = JSON.parse(JSON.stringify(windowCollection));
          parsedWindows[0].tabs.push({
            title: url,
            favIconUrl: url + "/favicon.ico",
            url: url,
          });

          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            parsedWindows,
            "tabGroupDetails"
          );
        });
      });
    });
  });

  describe("Test deleteTab(windowIndex, tabIndex)", () => {
    describe("Examine the windowIndex parameter", () => {
      test.each(various_nonNumber)(
        'Run deleteTab(%p): Throw an error "ETGMCreateNewGroupModal-110", because windowIndex is NOT a number',
        (val) => {
          componentInstance.deleteTab(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-110"
          );
        }
      );

      test('Run deleteTab(): Throw an error "ETGMCreateNewGroupModal-110", because windowIndex is missing/undefined', () => {
        componentInstance.deleteTab();

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-110"
        );
      });

      test('Run deleteTab(-1): Throw an error "ETGMCreateNewGroupModal-110", because windowIndex is a negative number', () => {
        componentInstance.deleteTab(-1);

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-110"
        );
      });

      test('Run deleteTab(0): do not throw an "ETGMCreateNewGroupModal-110" error, windowIndex is a number and is not negative', () => {
        componentInstance.deleteTab(0);

        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-110"
        );
      });
    });

    describe("Examine the tabIndex parameter", () => {
      test('Run deleteTab(0): throw an error "ETGMCreateNewGroupModal-109", because tabIndex is missing/undefined', () => {
        componentInstance.deleteTab(0);

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-109"
        );
      });

      test.each(various_nonNumber)(
        'Run deleteTab(0, %p): throw an error "ETGMCreateNewGroupModal-109", because tabIndex is not a number',
        (val) => {
          componentInstance.deleteTab(0, val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-109"
          );
        }
      );

      test('Run deleteTab(0, -1): throw an error "ETGMCreateNewGroupModal-109", because tabIndex is a negative number', () => {
        componentInstance.deleteTab(0, -1);

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-109"
        );
      });

      test('Run deleteTab(0, 0): do not throw an error "ETGMCreateNewGroupModal-109", because tabIndex is not a negative number', () => {
        componentInstance.deleteTab(0, 0);

        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-109"
        );
      });
    });

    describe("Examine various function scenarios using valid combinations of windowIndex and tabIndex", () => {
      describe("Examine the function, when windowIndex = 0", () => {
        test('Run deleteTab(0, 0), when windowCollection array in component state is not filled: throw an error "ETGMCreateNewGroupModal-130"', () => {
          testComponent = predefinedComponent(
            {
              ...presetProps,
              windowCollection: [],
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          componentInstance.deleteTab(0, 0);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-130"
          );
        });

        test("Run deleteTab(0, 0), when windowCollection array in component state is filled (targetted window has no tabs): call this.onModifyList() with parameters conditioned in this this test", () => {
          /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window does not have any more tabs after the targetted tab being closed, shut the window down
                        3. Check that onModifyList is called with correctly manufactured parameters
                    */

          const windowIndex = 0;
          const tabIndex = 0;

          const windowCollection = [
            { name: "window 1", tabs: [] },
            { name: "window 2", tabs: [{ name: "tab 1" }] },
            { name: "window 3", tabs: [{ name: "tab 1" }] },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          let windows = JSON.stringify(windowCollection.map((value) => value));
          let testWindows = JSON.parse(windows);

          componentInstance.deleteTab(windowIndex, tabIndex);

          testWindows[windowIndex].tabs.splice(tabIndex, 1);

          testWindows.splice(windowIndex, 1);

          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            testWindows,
            "tabGroupDetails"
          );
        });

        test("Run deleteTab(0, 0), when windowCollection array in component state is filled (targetted window has one tab): call this.onModifyList() with parameters conditioned in this this test", () => {
          const windowIndex = 0;
          const tabIndex = 0;

          const windowCollection = [
            { name: "window 1", tabs: [] },
            { name: "window 2", tabs: [{ name: "tab 1" }] },
            { name: "window 3", tabs: [{ name: "tab 1" }] },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          let windows = JSON.stringify(windowCollection.map((value) => value));
          let testWindows = JSON.parse(windows);

          componentInstance.deleteTab(windowIndex, tabIndex);

          testWindows[windowIndex].tabs.splice(tabIndex, 1);

          testWindows.splice(windowIndex, 1);

          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            testWindows,
            "tabGroupDetails"
          );
        });

        test("Run deleteTab(0, 0), when windowCollection array in component state is filled (targetted window has multiple tabs): call this.onModifyList() with parameters conditioned in this test", () => {
          /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window still has tabs after the targetted tab being closed, do not splice any windows
                        3. Check that onModifyList is called with correctly manufactured parameters
                    */

          const windowIndex = 0;
          const tabIndex = 0;

          const windowCollection = [
            {
              name: "window 1",
              tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }],
            },
            { name: "window 2", tabs: [{ name: "tab 1" }] },
            { name: "window 3", tabs: [{ name: "tab 1" }] },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          let windows = JSON.stringify(windowCollection.map((value) => value));
          let testWindows = JSON.parse(windows);

          componentInstance.deleteTab(windowIndex, tabIndex);

          testWindows[windowIndex].tabs.splice(tabIndex, 1);

          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            testWindows,
            "tabGroupDetails"
          );
        });

        test('Run deleteTab(20, 0), when windowCollection array in component state is filled: throw error "ETGMCreateNewGroupModal-131" because the targetted window does not exist', () => {
          /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window still has tabs after the targetted tab being closed, do not splice any windows
                        3. Check that onModifyList is called with correctly manufactured parameters
                    */

          const windowIndex = 20;
          const tabIndex = 0;

          const windowCollection = [
            {
              name: "window 1",
              tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }],
            },
            { name: "window 2", tabs: [{ name: "tab 1" }] },
            { name: "window 3", tabs: [{ name: "tab 1" }] },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          componentInstance.deleteTab(windowIndex, tabIndex);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-131"
          );
        });

        test("Run deleteTab(0, 20), when windowCollection array in component state is filled (targetted window has multiple tabs): call this.onModifyList() with parameters conditioned in this test", () => {
          /*
                        Checking test:
                        1. A tab is targetted, but it does not exist. Save all the existing windowCollection to state unmodified
                    */

          const windowIndex = 0;
          const tabIndex = 20;

          const windowCollection = [
            {
              name: "window 1",
              tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }],
            },
            { name: "window 2", tabs: [{ name: "tab 1" }] },
            { name: "window 3", tabs: [{ name: "tab 1" }] },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          let windows = JSON.stringify(windowCollection.map((value) => value));
          let testWindows = JSON.parse(windows);

          componentInstance.deleteTab(windowIndex, tabIndex);

          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            testWindows,
            "tabGroupDetails"
          );
        });
      });

      describe("Examine the function, when windowIndex = 1", () => {
        test('Run deleteTab(1, 0), when windowCollection array in component state is not filled: throw an error "ETGMCreateNewGroupModal-130"', () => {
          const windowCollection = [];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          componentInstance.deleteTab(1, 0);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-130"
          );
        });

        test("Run deleteTab(1, 0), when windowCollection array in component state is filled (targetted window has no tabs): call this.onModifyList() with parameters conditioned in this this test", () => {
          /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window does not have any more tabs after the targetted tab being closed, shut the window down
                        3. Check that onModifyList is called with correctly manufactured parameters
                    */

          const windowIndex = 1;
          const tabIndex = 0;

          const windowCollection = [
            { name: "window 1", tabs: [{ name: "tab 1" }] },
            { name: "window 2", tabs: [] },
            { name: "window 3", tabs: [{ name: "tab 1" }] },
          ];
          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          let windows = JSON.stringify(windowCollection.map((value) => value));
          let testWindows = JSON.parse(windows);

          componentInstance.deleteTab(windowIndex, tabIndex);

          testWindows[windowIndex].tabs.splice(tabIndex, 1);

          testWindows.splice(windowIndex, 1);

          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            testWindows,
            "tabGroupDetails"
          );
        });

        test("Run deleteTab(1, 0), when windowCollection array in component state is filled (targetted window has one tab): call this.onModifyList() with parameters conditioned in this this test", () => {
          /*
              Checking test:
              1. A tab is targetted and closed based on windowIndex and tabIndex
              2. If the targetted window does not have any more tabs after the targetted tab being closed, shut the window down
              3. Check that onModifyList is called with correctly manufactured parameters
          */

          const windowIndex = 1;
          const tabIndex = 0;

          const windowCollection = [
            { name: "window 1", tabs: [{ name: "tab 1" }] },
            { name: "window 2", tabs: [{ name: "tab 1" }] },
            { name: "window 3", tabs: [{ name: "tab 1" }] },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          let windows = JSON.stringify(windowCollection.map((value) => value));
          let testWindows = JSON.parse(windows);

          componentInstance.deleteTab(windowIndex, tabIndex);

          testWindows[windowIndex].tabs.splice(tabIndex, 1);

          testWindows.splice(windowIndex, 1);

          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            testWindows,
            "tabGroupDetails"
          );
        });

        test("Run deleteTab(1, 0), when windowCollection array in component state is filled (targetted window has multiple tabs): call this.onModifyList() with parameters conditioned in this test", () => {
          /*
                        Checking test:
                        1. A tab is targetted and closed based on windowIndex and tabIndex
                        2. If the targetted window still has tabs after the targetted tab being closed, do not splice any windows
                        3. Check that onModifyList is called with correctly manufactured parameters
                    */

          const windowIndex = 1;
          const tabIndex = 0;

          const windowCollection = [
            { name: "window 2", tabs: [{ name: "tab 1" }] },
            {
              name: "window 1",
              tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }],
            },
            { name: "window 3", tabs: [{ name: "tab 1" }] },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          let windows = JSON.stringify(windowCollection.map((value) => value));
          let testWindows = JSON.parse(windows);

          componentInstance.deleteTab(windowIndex, tabIndex);

          testWindows[windowIndex].tabs.splice(tabIndex, 1);

          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            testWindows,
            "tabGroupDetails"
          );
        });

        test('Run deleteTab(20, 0), when windowCollection array in component state is filled: throw error "ETGMCreateNewGroupModal-131" because the targetted window does not exist', () => {
          /*
              Checking test:
              1. A tab is targetted and closed based on windowIndex and tabIndex
              2. If the targetted window still has tabs after the targetted tab being closed, do not splice any windows
              3. Check that onModifyList is called with correctly manufactured parameters
          */

          const windowIndex = 20;
          const tabIndex = 0;

          const windowCollection = [
            { name: "window 2", tabs: [{ name: "tab 1" }] },
            {
              name: "window 1",
              tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }],
            },
            { name: "window 3", tabs: [{ name: "tab 1" }] },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          componentInstance.deleteTab(windowIndex, tabIndex);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-131"
          );
        });

        test("Run deleteTab(1, 20), when windowCollection array in component state is filled (targetted window has multiple tabs): call this.onModifyList() with parameters conditioned in this test", () => {
          /*
                        Checking test:
                        1. A tab is targetted, but it does not exist. Save all the existing windowCollection to state unmodified
                    */

          const windowIndex = 1;
          const tabIndex = 20;

          const windowCollection = [
            {
              name: "window 1",
              tabs: [{ name: "tab 1" }, { name: "tab 2" }, { name: "tab 3" }],
            },
            { name: "window 2", tabs: [{ name: "tab 1" }] },
            { name: "window 3", tabs: [{ name: "tab 1" }] },
          ];

          testComponent = predefinedComponent(
            {
              ...presetProps,
              onModifyList: jest.fn(),
              windowCollection,
            },
            {
              disableLifecycleMethods: true,
            }
          );
          componentInstance = testComponent.instance();

          let windows = JSON.stringify(windowCollection.map((value) => value));
          let testWindows = JSON.parse(windows);

          componentInstance.deleteTab(windowIndex, tabIndex);

          expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
            "windowCollection",
            testWindows,
            "tabGroupDetails"
          );
        });
      });
    });
  });

  describe("Test deleteWindow(windowIndex)", () => {
    describe("Examine the windowIndex parameter", () => {
      test('Run deleteWindow(): Throw an error "ETGMCreateNewGroupModal-111", windowIndex is missing', () => {
        componentInstance.deleteWindow();

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-111"
        );
      });

      test.each(various_nonNumber)(
        'Run deleteWindow(%p): Throw an error "ETGMCreateNewGroupModal-111", windowIndex is not a number',
        (val) => {
          componentInstance.deleteWindow(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-111"
          );
        }
      );

      test('Run deleteWindow(0): Do not throw an error "ETGMCreateNewGroupModal-111", windowIndex is 0', () => {
        componentInstance.deleteWindow(0);

        expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-111"
        );
      });

      test('Run deleteWindow(-1): Throw an error "ETGMCreateNewGroupModal-111", windowIndex is -1', () => {
        componentInstance.deleteWindow(-1);

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-111"
        );
      });

      test('Run deleteWindow(0): Throw an error "ETGMCreateNewGroupModal-133", if there are no windows stored in windowCollection in component state', () => {
        const windowCollection = [];

        testComponent = predefinedComponent(
          {
            ...presetProps,
            onModifyList: jest.fn(),
            windowCollection,
          },
          {
            disableLifecycleMethods: true,
          }
        );
        componentInstance = testComponent.instance();

        componentInstance.deleteWindow(0);

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-133"
        );
      });

      test('Run deleteWindow(20): Throw an error "ETGMCreateNewGroupModal-134", if the targetted window does not exist in windowCollection section of component state', () => {
        const windowCollection = [
          { name: "window 1", tabs: [{ name: "tab 1" }] },
          { name: "window 2", tabs: [{ name: "tab 1" }] },
          { name: "window 3", tabs: [{ name: "tab 1" }] },
        ];

        testComponent = predefinedComponent(
          {
            ...presetProps,
            onModifyList: jest.fn(),
            windowCollection,
          },
          {
            disableLifecycleMethods: true,
          }
        );
        componentInstance = testComponent.instance();

        componentInstance.deleteWindow(20);

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-134"
        );
      });

      test("Run deleteWindow(0): call this.onModifyList() with parameters conditioned in this test ", () => {
        const windowIndex = 0;

        const windowCollection = [
          { name: "window 1", tabs: [{ name: "tab 1" }] },
          { name: "window 2", tabs: [{ name: "tab 1" }] },
          { name: "window 3", tabs: [{ name: "tab 1" }] },
        ];

        testComponent = predefinedComponent(
          {
            ...presetProps,
            onModifyList: jest.fn(),
            windowCollection,
          },
          {
            disableLifecycleMethods: true,
          }
        );
        componentInstance = testComponent.instance();

        let testWindows = windowCollection.map((value) => value);

        componentInstance.deleteWindow(windowIndex);

        testWindows.splice(windowIndex, 1);

        expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
          "windowCollection",
          testWindows,
          "tabGroupDetails"
        );
      });

      test("Run deleteWindow(1): call this.onModifyList() with parameters conditioned in this test ", () => {
        const windowIndex = 1;

        const windowCollection = [
          { name: "window 1", tabs: [{ name: "tab 1" }] },
          { name: "window 2", tabs: [{ name: "tab 1" }] },
          { name: "window 3", tabs: [{ name: "tab 1" }] },
        ];

        testComponent = predefinedComponent(
          {
            ...presetProps,
            onModifyList: jest.fn(),
            windowCollection,
          },
          {
            disableLifecycleMethods: true,
          }
        );
        componentInstance = testComponent.instance();

        let testWindows = windowCollection.map((value) => value);

        componentInstance.deleteWindow(windowIndex);

        testWindows.splice(windowIndex, 1);

        expect(componentInstance.props.onModifyList).toHaveBeenCalledWith(
          "windowCollection",
          testWindows,
          "tabGroupDetails"
        );
      });
    });
  });
});
