import React, { Fragment } from "react";
import { shallow, mount, render } from "enzyme";
import ETGMCreateNewGroupModal from "./../../../../../components/modals/existingTabGroupsModule/etgmCreateOrEditGroupModal";
import * as ExceptionsHandler from "./../../../../../components/utils/exceptionsAndHandler";
import * as validator from "./../../../../../components/utils/inputValidators";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<ETGMCreateNewGroupModal {...props} />, options);
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

describe("Test <ETGMCreateNewGroupModal /> component behaviour at mount", () => {
  const actualErrorReturns = {
    "ETGMCreateNewGroupModal-101": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-101"
    ),
    "ETGMCreateNewGroupModal-102": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-102"
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
    "ETGMCreateNewGroupModal-137": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-137"
    ),
    "ETGMCreateNewGroupModal-138": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-138"
    ),
    "ETGMCreateNewGroupModal-139": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-139"
    ),
    "ETGMCreateNewGroupModal-140": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-140"
    ),
    "ETGMCreateNewGroupModal-141": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-141"
    ),
    "ETGMCreateNewGroupModal-142": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-142"
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
        'The "windowAndTabs" parameter needs to be an object in this.props.data.params, containing information about all windows and tabs in a tab group. If there is no such information available, this parameter should be an empty object. As a result of this error, tab groups cannot be added nor edited at this time.',
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
    "ETGMCreateNewGroupModal-137": {
      name: "ValidatorError",
      message:
        'The "groupDontAskAgain" parameter in this.props.data.params needs to be a boolean value (true or false) if given. If such a value is not available, remove "groupDontAskAgain" from props. As a result of this error, tab groups cannot be added nor edited at this time.',
      code: "ETGMCreateNewGroupModal-137",
    },
    "ETGMCreateNewGroupModal-138": {
      name: "ValidatorError",
      message:
        "The schedule data retrieved for this modal is either corrupted or stored in the wrong format. The data needs to be an array.",
      code: "ETGMCreateNewGroupModal-138",
    },
    "ETGMCreateNewGroupModal-139": {
      name: "ValidatorError",
      message:
        "The data parameter in renderBodyContents() of ETGMCreateNewGroupModal, needs to be an object",
      code: "ETGMCreateNewGroupModal-139",
    },
    "ETGMCreateNewGroupModal-140": {
      name: "ValidatorError",
      message:
        "The data parameter in renderHeaderContents() of ETGMCreateNewGroupModal, needs to be an object",
      code: "ETGMCreateNewGroupModal-140",
    },
    "ETGMCreateNewGroupModal-141": {
      name: "ValidatorError",
      message:
        "The data parameter in renderFooterContents() of ETGMCreateNewGroupModal, needs to be an object",
      code: "ETGMCreateNewGroupModal-141",
    },
    "ETGMCreateNewGroupModal-142": {
      name: "ValidatorError",
      message: "The necessary info about the targetted tab could not be read.",
      code: "ETGMCreateNewGroupModal-142",
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

  describe("Test verifyChildProps()", () => {
    const various_nonString_except_undefined = [
      [{ testkey: "test value" }],
      [32],
      [null],
      [false],
      [true],
      [[12, 8, 3, 7]],
      [() => {}],
    ];

    const various_nonBool_except_undefined = [
      ["a very weird looking text string"],
      [{ testkey: "test value" }],
      [32],
      [null],
      [[12, 8, 3, 7]],
      [() => {}],
    ];

    const various_nonArray_except_undefined = [
      ["a very weird looking text string"],
      [{ testkey: "test value" }],
      [32],
      [null],
      [false],
      [true],
      [() => {}],
    ];

    describe("Examine this.props.data passed to the component", () => {
      test('Run verifyChildProps(): Throw an error "ETGMCreateNewGroupModal-123" if the data variable does not exist in this.props', () => {
        expect(() => {
          const presetProps = {};
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.verifyChildProps();
        }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-123"]);
      });

      test.each(various_nonObjects)(
        'Run verifyChildProps(): Throw an error "ETGMCreateNewGroupModal-123" if the data variable = %p (is not an object) in this.props',
        (val) => {
          expect(() => {
            const presetProps = {
              data: val,
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-123"]);
        }
      );

      describe("When this.props.data is an object, examine this.props.data.params", () => {
        test('Run verifyChildProps(): Throw an error "ETGMCreateNewGroupModal-124" if the params variable does not exist in this.props.data', () => {
          expect(() => {
            const presetProps = {
              data: {},
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-124"]);
        });

        test.each(various_nonObjects)(
          'Run verifyChildProps(): Throw an error "ETGMCreateNewGroupModal-124" if the params variable = %p (is not an object) in this.props.data',
          (val) => {
            expect(() => {
              const presetProps = {
                data: {
                  params: val,
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              componentInstance.verifyChildProps();
            }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-124"]);
          }
        );

        describe("When this.props.data.params, examine its contents and expect results accordingly", () => {
          describe("Examine this.props.data.params.type", () => {
            const expected_valid_type_string = [
              ["currently-opened"],
              ["new-group"],
              ["existing-group"],
            ];

            const expected_invalid_type_string = [
              ["Lorem ipsum dolor sit amet"],
              ["consectetur adipiscing elit"],
              ["Nunc rutrum lacinia dignissim"],
              ["Curabitur ligula eros"],
              ["Vestibulum efficitur euismod velit"],
              ["Etiam quis nibh non arcu congue porttitor"],
            ];

            test.each(various_nonString)(
              'Run verifyChildProps(): If this.props.data.params.type = %p (is not a string), throw an error "ETGMCreateNewGroupModal-114"',
              (val) => {
                expect(() => {
                  const presetProps = {
                    data: {
                      params: {
                        type: val,
                      },
                    },
                  };
                  testComponent = predefinedComponent(presetProps, {
                    disableLifecycleMethods: true,
                  });
                  componentInstance = testComponent.instance();

                  componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-114"]);
              }
            );

            test.each(expected_valid_type_string)(
              'Run verifyChildProps(): If this.props.data.params.type = %p (a valid string), do NOT throw an error "ETGMCreateNewGroupModal-115"',
              (val) => {
                expect(() => {
                  const presetProps = {
                    data: {
                      params: {
                        type: val,
                      },
                    },
                  };
                  testComponent = predefinedComponent(presetProps, {
                    disableLifecycleMethods: true,
                  });
                  componentInstance = testComponent.instance();

                  componentInstance.verifyChildProps();
                }).not.toThrow(
                  expectedErrorReturns["ETGMCreateNewGroupModal-115"]
                );
              }
            );

            test.each(expected_invalid_type_string)(
              'Run verifyChildProps(): If this.props.data.params.type = %p (not an expected string), throw an error "ETGMCreateNewGroupModal-115"',
              (val) => {
                expect(() => {
                  const presetProps = {
                    data: {
                      params: {
                        type: val,
                      },
                    },
                  };
                  testComponent = predefinedComponent(presetProps, {
                    disableLifecycleMethods: true,
                  });
                  componentInstance = testComponent.instance();

                  componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-115"]);
              }
            );
          });

          describe("Examine this.props.data.params.groupId", () => {
            test('Run verifyChildProps(): If this.props.data.params.groupId does not exist, do not throw an error "ETGMCreateNewGroupModal-120"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-120"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.groupId = "any id string" (or any other string, preferably generated), do not throw an error "ETGMCreateNewGroupModal-120"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-120"]
              );
            });

            test.each(various_nonString_except_undefined)(
              'Run verifyChildProps(): If this.props.data.params.groupId = %p (not a string and not undefined), throw an error "ETGMCreateNewGroupModal-120"',
              (val) => {
                expect(() => {
                  const presetProps = {
                    data: {
                      params: {
                        type: "currently-opened",
                        groupId: val,
                      },
                    },
                  };
                  testComponent = predefinedComponent(presetProps, {
                    disableLifecycleMethods: true,
                  });
                  componentInstance = testComponent.instance();

                  componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-120"]);
              }
            );
          });

          describe("Examine this.props.data.params.groupName", () => {
            test('Run verifyChildProps(): If this.props.data.params.groupName does not exist, do not throw an error "ETGMCreateNewGroupModal-116"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-116"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.groupName = "any name string", do not throw an error "ETGMCreateNewGroupModal-116"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-116"]
              );
            });

            test.each(various_nonString_except_undefined)(
              'Run verifyChildProps(): If this.props.data.params.groupName = %p (not a string and not undefined), throw an error "ETGMCreateNewGroupModal-116"',
              (val) => {
                expect(() => {
                  const presetProps = {
                    data: {
                      params: {
                        type: "currently-opened",
                        groupId: "any id string",
                        groupName: val,
                      },
                    },
                  };
                  testComponent = predefinedComponent(presetProps, {
                    disableLifecycleMethods: true,
                  });
                  componentInstance = testComponent.instance();

                  componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-116"]);
              }
            );
          });

          describe("Examine this.props.data.params.groupDescription", () => {
            test('Run verifyChildProps(): If this.props.data.params.groupDescription does not exist, do not throw an error "ETGMCreateNewGroupModal-117"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-117"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.groupDescription = "any description string", do not throw an error "ETGMCreateNewGroupModal-117"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-117"]
              );
            });

            test.each(various_nonString_except_undefined)(
              'Run verifyChildProps(): If this.props.data.params.groupDescription = %p (not a string and not undefined), throw an error "ETGMCreateNewGroupModal-117"',
              (val) => {
                expect(() => {
                  const presetProps = {
                    data: {
                      params: {
                        type: "currently-opened",
                        groupId: "any id string",
                        groupName: "any name string",
                        groupDescription: val,
                      },
                    },
                  };
                  testComponent = predefinedComponent(presetProps, {
                    disableLifecycleMethods: true,
                  });
                  componentInstance = testComponent.instance();

                  componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-117"]);
              }
            );
          });

          describe("Examine this.props.data.params.groupCloseAll", () => {
            test('Run verifyChildProps(): If this.props.data.params.groupCloseAll does not exist, do not throw an error "ETGMCreateNewGroupModal-118"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-118"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.groupCloseAll = true, do not throw an error "ETGMCreateNewGroupModal-118"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: true,
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-118"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.groupCloseAll = false, do not throw an error "ETGMCreateNewGroupModal-118"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: false,
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-118"]
              );
            });

            test.each(various_nonBool_except_undefined)(
              'Run verifyChildProps(): If this.props.data.params.groupCloseAll = %p (not a boolean and not undefined), throw an error "ETGMCreateNewGroupModal-118"',
              (val) => {
                expect(() => {
                  const presetProps = {
                    data: {
                      params: {
                        type: "currently-opened",
                        groupId: "any id string",
                        groupName: "any name string",
                        groupDescription: "any description string",
                        groupCloseAll: val,
                      },
                    },
                  };
                  testComponent = predefinedComponent(presetProps, {
                    disableLifecycleMethods: true,
                  });
                  componentInstance = testComponent.instance();

                  componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-118"]);
              }
            );
          });

          describe("Examine this.props.data.params.groupCloseInactiveTabs", () => {
            test('Run verifyChildProps(): If this.props.data.params.groupCloseInactiveTabs does not exist, do not throw an error "ETGMCreateNewGroupModal-122"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: true,
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-122"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.groupCloseInactiveTabs = true, do not throw an error "ETGMCreateNewGroupModal-122"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: true,
                      groupCloseInactiveTabs: true,
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-122"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.groupCloseInactiveTabs = false, do not throw an error "ETGMCreateNewGroupModal-122"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: true,
                      groupCloseInactiveTabs: false,
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-122"]
              );
            });

            test.each(various_nonBool_except_undefined)(
              'Run verifyChildProps(): If this.props.data.params.groupCloseInactiveTabs = %p (not a boolean and not undefined), throw an error "ETGMCreateNewGroupModal-122"',
              (val) => {
                expect(() => {
                  const presetProps = {
                    data: {
                      params: {
                        type: "currently-opened",
                        groupId: "any id string",
                        groupName: "any name string",
                        groupDescription: "any description string",
                        groupCloseAll: true,
                        groupCloseInactiveTabs: val,
                      },
                    },
                  };
                  testComponent = predefinedComponent(presetProps, {
                    disableLifecycleMethods: true,
                  });
                  componentInstance = testComponent.instance();

                  componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-122"]);
              }
            );
          });

          describe("Examine this.props.data.params.groupDontAskAgain", () => {
            test('Run verifyChildProps(): If this.props.data.params.groupDontAskAgain does not exist, do not throw an error "ETGMCreateNewGroupModal-137"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: true,
                      groupCloseInactiveTabs: true,
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-137"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.groupDontAskAgain = true, do not throw an error "ETGMCreateNewGroupModal-137"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: true,
                      groupCloseInactiveTabs: true,
                      groupDontAskAgain: true,
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-137"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.groupDontAskAgain = false, do not throw an error "ETGMCreateNewGroupModal-137"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: true,
                      groupCloseInactiveTabs: true,
                      groupDontAskAgain: false,
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-137"]
              );
            });

            test.each(various_nonBool_except_undefined)(
              'Run verifyChildProps(): If this.props.data.params.groupDontAskAgain = %p (not a boolean and not undefined), throw an error "ETGMCreateNewGroupModal-137"',
              (val) => {
                expect(() => {
                  const presetProps = {
                    data: {
                      params: {
                        type: "currently-opened",
                        groupId: "any id string",
                        groupName: "any name string",
                        groupDescription: "any description string",
                        groupCloseAll: true,
                        groupCloseInactiveTabs: true,
                        groupDontAskAgain: val,
                      },
                    },
                  };
                  testComponent = predefinedComponent(presetProps, {
                    disableLifecycleMethods: true,
                  });
                  componentInstance = testComponent.instance();

                  componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-137"]);
              }
            );
          });

          describe("Examine this.props.data.params.windowAndTabs", () => {
            test('Run verifyChildProps(): If this.props.data.params.windowAndTabs does not exist, do not throw an error "ETGMCreateNewGroupModal-119"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: true,
                      groupCloseInactiveTabs: true,
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-119"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.windowAndTabs is filled array, do not throw an error "ETGMCreateNewGroupModal-119"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: true,
                      groupCloseInactiveTabs: true,
                      windowAndTabs: [
                        "test array 1",
                        "test array 2",
                        "test array 3",
                      ],
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-119"]
              );
            });

            test('Run verifyChildProps(): If this.props.data.params.windowCollection is en empty array, do not throw an error "ETGMCreateNewGroupModal-119"', () => {
              expect(() => {
                const presetProps = {
                  data: {
                    params: {
                      type: "currently-opened",
                      groupId: "any id string",
                      groupName: "any name string",
                      groupDescription: "any description string",
                      groupCloseAll: true,
                      groupCloseInactiveTabs: true,
                      windowCollection: [],
                    },
                  },
                };
                testComponent = predefinedComponent(presetProps, {
                  disableLifecycleMethods: true,
                });
                componentInstance = testComponent.instance();

                componentInstance.verifyChildProps();
              }).not.toThrow(
                expectedErrorReturns["ETGMCreateNewGroupModal-119"]
              );
            });

            test.each(various_nonArray_except_undefined)(
              'Run verifyChildProps(): If this.props.data.params.windowCollection = %p (not an array and not undefined), throw an error "ETGMCreateNewGroupModal-119"',
              (val) => {
                expect(() => {
                  const presetProps = {
                    data: {
                      params: {
                        type: "currently-opened",
                        groupId: "any id string",
                        groupName: "any name string",
                        groupDescription: "any description string",
                        groupCloseAll: true,
                        groupCloseInactiveTabs: true,
                        windowCollection: val,
                      },
                    },
                  };
                  testComponent = predefinedComponent(presetProps, {
                    disableLifecycleMethods: true,
                  });
                  componentInstance = testComponent.instance();

                  componentInstance.verifyChildProps();
                }).toThrow(expectedErrorReturns["ETGMCreateNewGroupModal-119"]);
              }
            );
          });
        });
      });
    });
  });

  describe("Test saveModalHandler(callback)", () => {
    describe('Case 1: if either the "data" or "data.params" are invalid', () => {
      describe("Subcase 1: The callback is a function", () => {
        test('Run saveModalHandler(() => {}): Throw an error "ETGMCreateNewGroupModal-123", if this.props.data does not exist', () => {
          const presetProps = {};
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          const callback = jest.fn();

          componentInstance.saveModalHandler(callback);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-123"
          );
        });

        test.each(various_nonObjects)(
          'Run saveModalHandler(() => {}): Throw an error "ETGMCreateNewGroupModal-123", if this.props.data = %p (is not an object)',
          (val) => {
            const presetProps = {
              data: val,
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            const callback = jest.fn();

            componentInstance.saveModalHandler(callback);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-123"
            );
          }
        );

        test('Run saveModalHandler(() => {}): Throw an error "ETGMCreateNewGroupModal-124", if params does not exist in this.props.data', () => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          const callback = jest.fn();

          componentInstance.saveModalHandler(callback);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-124"
          );
        });

        test.each(various_nonObjects)(
          'Run saveModalHandler(() => {}): Throw an error "ETGMCreateNewGroupModal-124", if params = %p (is not an object in this.props.data)',
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
            const callback = jest.fn();

            componentInstance.saveModalHandler(callback);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-124"
            );
          }
        );
      });

      describe("Subcase 2: The callback is not a function (there is no callback)", () => {
        test('Run saveModalHandler(): Throw an error "ETGMCreateNewGroupModal-123", if this.props.data does not exist', () => {
          const presetProps = {};
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.saveModalHandler();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-123"
          );
        });

        test.each(various_nonObjects)(
          'Run saveModalHandler(): Throw an error "ETGMCreateNewGroupModal-123", if this.props.data is not an object',
          (val) => {
            const presetProps = {
              data: val,
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.saveModalHandler();

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-123"
            );
          }
        );

        test('Run saveModalHandler(): Throw an error "ETGMCreateNewGroupModal-124", if params does not exist in this.props.data', () => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.saveModalHandler();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-124"
          );
        });

        test.each(various_nonObjects)(
          'Run saveModalHandler(): Throw an error "ETGMCreateNewGroupModal-124", if params = %p (is not an object) in this.props.data',
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

            componentInstance.saveModalHandler();

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-124"
            );
          }
        );
      });
    });

    describe("Case 2: if data and data.params are both valid", () => {
      test("Run saveModalHandler(() => {}): the function this.validateFields() should be called", () => {
        const presetProps = {
          data: {
            params: {},
          },
        };

        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();
        componentInstance.validateFields = jest.fn();
        const callback = jest.fn();

        componentInstance.saveModalHandler(callback);

        expect(componentInstance.validateFields).toHaveBeenCalledWith(
          expect.any(Function)
        );
      });

      test("Run saveModalHandler(() => {}): the function this.validateFields() should be called, which runs clearModalData() with certain parameters in its callback", (done) => {
        const presetProps = {
          data: {
            params: {},
          },
        };

        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        const callback = jest.fn();

        componentInstance.validateFields = jest.fn((input) => {
          componentInstance.clearModalData = jest.fn();
          input();

          expect(componentInstance.clearModalData).toHaveBeenCalledWith(
            callback()
          );
          expect(callback).toHaveBeenCalledWith(
            componentInstance.state.tabGroupDetails
          );
          done();
        });

        componentInstance.saveModalHandler(callback);
      });

      test('Run saveModalHandler(): the error "ETGMCreateNewGroupModal-101" should be thrown, because the callback parameter is missing (or in this case, not a function)', () => {
        const presetProps = {
          data: {
            params: {},
          },
        };

        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();
        componentInstance.validateFields = jest.fn();

        componentInstance.saveModalHandler();

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-101"
        );
      });

      test.each(various_nonFunctions)(
        'Run saveModalHandler(%p): the error "ETGMCreateNewGroupModal-101" should be thrown because the callback = %p (not a function)',
        (val) => {
          const presetProps = {
            data: {
              params: {},
            },
          };

          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.validateFields = jest.fn();

          componentInstance.saveModalHandler(val);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-101"
          );
        }
      );

      test("Run saveModalHandler(): If error.issue is an object (when any error occurs), trigger ExceptionsHandler.ErrorHandler(). In this case, the trigger is caused by callback not being a function", () => {
        const presetProps = {
          data: {
            params: {},
          },
        };

        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        componentInstance.saveModalHandler();

        expect(ExceptionsHandler.ErrorHandler).toHaveBeenCalledTimes(1);
      });
    });
  });

  /* 
  RELOCATED TO /src/components/modals/modal/index.jsx

  describe("Test dismissModalHandler()", () => {
    test("Run dismissModalHandler(): the function this.clearModalData() should be called", () => {
      componentInstance.clearModalData = jest.fn();
      componentInstance.dismissModalHandler();

      expect(componentInstance.clearModalData).toHaveBeenCalledTimes(1);
    });
  }); */

  describe("Test validateFields(success)", () => {
    describe('Case 1: if either the "data", "data.params" or "success" parameter are invalid', () => {
      describe("Subcase 1: The success is a function", () => {
        test('Run validateFields(() => {}): Throw an error "ETGMCreateNewGroupModal-123", if this.props.data does not exist', () => {
          const presetProps = {};
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          const success = jest.fn();

          componentInstance.validateFields(success);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-123"
          );
        });

        test.each(various_nonObjects)(
          'Run validateFields(() => {}): Throw an error "ETGMCreateNewGroupModal-123", if this.props.data = %p (is not an object)',
          (val) => {
            const presetProps = {
              data: val,
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-123"
            );
          }
        );

        test('Run validateFields(() => {}): Throw an error "ETGMCreateNewGroupModal-124", if params does not exist in this.props.data', () => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          const success = jest.fn();

          componentInstance.validateFields(success);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-124"
          );
        });

        test.each(various_nonObjects)(
          'Run validateFields(() => {}): Throw an error "ETGMCreateNewGroupModal-124", if params = %p (is not an object) in this.props.data',
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
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-124"
            );
          }
        );
      });

      describe("Subcase 2: The success is not a function (there is no success)", () => {
        test('Run validateFields(): Throw an error "ETGMCreateNewGroupModal-126", if there is no success callback', () => {
          const presetProps = {};
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.validateFields();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-126"
          );
        });

        test.each(various_nonFunctions)(
          'Run validateFields(): Throw an error "ETGMCreateNewGroupModal-126", if success = %p (not a function)',
          (val) => {
            const presetProps = {};
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            const success = val;

            componentInstance.validateFields(success);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-126"
            );
          }
        );
      });
    });

    describe("Case 2: if data and data.params are both valid, and there is a valid success callback() function", () => {
      describe('Examine the situation when "tabGroupDetails" is NOT an object', () => {
        test('Run validateFields(success): If a "tabGroupDetails" object is missing in the component state, throw an error "ETGMCreateNewGroupModal-125"', () => {
          const presetProps = {
            data: {
              params: {},
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          const success = jest.fn();

          componentInstance.validateFields(success);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-125"
          );
        });

        test.each(various_nonObjects)(
          'Run validateFields(success): If a "tabGroupDetails" = %p (is not an object) component state, throw an error "ETGMCreateNewGroupModal-125"',
          (val) => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = val;
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-125"
            );
          }
        );
      });

      describe('Examine the situation when "tabGroupDetails" is an object', () => {
        test('Run validateFields(success): If "tabGroupDetails" object exists in the component state, do not trigger an "ETGMCreateNewGroupModal-125" error', () => {
          const presetProps = {
            data: {
              params: {},
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.state.tabGroupDetails = {};
          const success = jest.fn();

          componentInstance.validateFields(success);

          expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-125"
          );
        });

        describe('Examine the "groupName" key located in the "tabGroupDetails" state object', () => {
          test('Run validateFields(success): If "groupName" does not exist in this.state.tabGroupDetails, call this.saveToState() as depicted in this test', () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });

            const dummyFieldErrors = {
              groupName:
                "A tab group needs to be given a name or a label before it can be saved.",
            };

            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {
              groupDescription:
                "A dummy string depicing a tab group description",
              windowCollection: [{}, {}],
            };

            componentInstance.saveToState = jest.fn();

            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(componentInstance.saveToState).toHaveBeenCalledWith(
              null,
              dummyFieldErrors,
              "fieldErrors"
            );
          });

          test.each(various_nonString)(
            'Run validateFields(success): If "groupName" = %p (is not a string) in this.state.tabGroupDetails, call this.saveToState() as depicted in this test',
            (val) => {
              const presetProps = {
                data: {
                  params: {},
                },
              };

              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });

              const dummyFieldErrors = {
                groupName:
                  "A tab group needs to be given a name or a label before it can be saved.",
              };

              componentInstance = testComponent.instance();
              componentInstance.state.tabGroupDetails = {
                tabGroupName: val,
                groupDescription:
                  "A dummy string depicing a tab group description",
                windowCollection: [{}, {}],
              };
              componentInstance.saveToState = jest.fn();
              const success = jest.fn();

              componentInstance.validateFields(success);

              expect(componentInstance.saveToState).toHaveBeenCalledWith(
                null,
                dummyFieldErrors,
                "fieldErrors"
              );
            }
          );

          test('Run validateFields(success): If "groupName" does not exist in this.state.tabGroupDetails, ensure an error is added to fieldErrors["groupName"] in component state', () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {};
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(componentInstance.state.fieldErrors["groupName"]).toBe(
              "A tab group needs to be given a name or a label before it can be saved."
            );
          });

          test.each(various_nonString)(
            'Run validateFields(success): If "groupName" = %p (is not a string) in this.state.tabGroupDetails, ensure an error is added to fieldErrors["groupName"] in component state',
            (val) => {
              const presetProps = {
                data: {
                  params: {},
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();
              componentInstance.state.tabGroupDetails = {
                groupName: val,
              };
              const success = jest.fn();

              componentInstance.validateFields(success);

              expect(componentInstance.state.fieldErrors["groupName"]).toBe(
                "A tab group needs to be given a name or a label before it can be saved."
              );
            }
          );

          test('Run validateFields(() => {}): If "groupName" exists in this.state.tabGroupDetails, verify fieldErrors["groupName"] to be undefind in component state', () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {
              groupName: "My Tab Group",
            };
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(
              componentInstance.state.fieldErrors["groupName"]
            ).toBeUndefined();
          });
        });

        describe('Examine the "groupDescription" key located in the "tabGroupDetails" state object', () => {
          test('Run validateFields(success): If "groupDescription" does not exist in this.state.tabGroupDetails, call this.saveToState() as depicted in this test', () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });

            const dummyFieldErrors = {
              groupDescription:
                "A tab group needs to be given a short description before it can be saved.",
            };

            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {
              groupName: "A dummy string representing the name of a tab group",
              windowCollection: [{}, {}],
            };
            componentInstance.saveToState = jest.fn();
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(componentInstance.saveToState).toHaveBeenCalledWith(
              null,
              dummyFieldErrors,
              "fieldErrors"
            );
          });

          test.each(various_nonString)(
            'Run validateFields(success): If "groupDescription" = %p (is not a string) in this.state.tabGroupDetails, call this.saveToState() as depicted in this test',
            (val) => {
              const presetProps = {
                data: {
                  params: {},
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });

              const dummyFieldErrors = {
                groupDescription:
                  "A tab group needs to be given a short description before it can be saved.",
              };

              componentInstance = testComponent.instance();
              componentInstance.state.tabGroupDetails = {
                groupDescription: val,
                groupName:
                  "A dummy string representing the name of a tab group",
                windowCollection: [{}, {}],
              };
              componentInstance.saveToState = jest.fn();
              const success = jest.fn();

              componentInstance.validateFields(success);

              expect(componentInstance.saveToState).toHaveBeenCalledWith(
                null,
                dummyFieldErrors,
                "fieldErrors"
              );
            }
          );

          test('Run validateFields(success): If "groupDescription" does not exist in this.state.tabGroupDetails, ensure an error is added to fieldErrors["roupDescription"] in component state', () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {};
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(
              componentInstance.state.fieldErrors["groupDescription"]
            ).toBe(
              "A tab group needs to be given a short description before it can be saved."
            );
          });

          test.each(various_nonString)(
            'Run validateFields(success): If "groupDescription" = %p (is not a string) in this.state.tabGroupDetails, ensure an error is added to fieldErrors["groupDescription"] in component state',
            (val) => {
              const presetProps = {
                data: {
                  params: {},
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();
              componentInstance.state.tabGroupDetails = {
                groupDescription: val,
              };
              const success = jest.fn();

              componentInstance.validateFields(success);

              expect(
                componentInstance.state.fieldErrors["groupDescription"]
              ).toBe(
                "A tab group needs to be given a short description before it can be saved."
              );
            }
          );

          test('Run validateFields(success): If "groupDescription" exists in this.state.tabGroupDetails, verify fieldErrors["groupDescription"] to be undefind in component state', () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {
              groupDescription:
                "This is a tab group created solely for the test suite",
            };
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(
              componentInstance.state.fieldErrors["groupDescription"]
            ).toBeUndefined();
          });
        });

        describe('Examine the "windowCollection" key located in the "tabGroupDetails" state object', () => {
          test('Run validateFields(success): If "windowCollection" does not exist in this.state.tabGroupDetails, call this.saveToState() as depicted in this test', () => {
            const presetProps = {
              data: {
                params: {},
              },
            };

            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });

            const dummyFieldErrors = {
              windowCollection:
                "A tab group must consist of at least one window.",
            };

            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {
              groupName: "A dummy string representing the name of a tab group",
              groupDescription:
                "A dummy string, meant to be a description of a tab group",
            };
            componentInstance.saveToState = jest.fn();
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(componentInstance.saveToState).toHaveBeenCalledWith(
              null,
              dummyFieldErrors,
              "fieldErrors"
            );
          });

          test.each(various_nonArrays)(
            'Run validateFields(success): If "windowCollection" = %p (is not an array) in this.state.tabGroupDetails, call this.saveToState() as depicted in this test',
            (val) => {
              const presetProps = {
                data: {
                  params: {},
                },
              };

              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });

              const dummyFieldErrors = {
                windowCollection:
                  "A tab group must consist of at least one window.",
              };

              componentInstance = testComponent.instance();
              componentInstance.state.tabGroupDetails = {
                windowCollection: val,
                groupName:
                  "A dummy string representing the name of a tab group",
                groupDescription:
                  "A dummy string, meant to be a description of a tab group",
              };
              componentInstance.saveToState = jest.fn();
              const success = jest.fn();

              componentInstance.validateFields(success);

              expect(componentInstance.saveToState).toHaveBeenCalledWith(
                null,
                dummyFieldErrors,
                "fieldErrors"
              );
            }
          );

          test('Run validateFields(success): If "windowCollection" does not exist in this.state.tabGroupDetails, ensure an error is added to fieldErrors["windowCollection"] in component state', () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {};
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(
              componentInstance.state.fieldErrors["windowCollection"]
            ).toBe("A tab group must consist of at least one window.");
          });

          test.each(various_nonArrays)(
            'Run validateFields(success): If "windowCollection" = %p (is not an array) in this.state.tabGroupDetails, ensure an error is added to fieldErrors["windowCollection"] in component state',
            (val) => {
              const presetProps = {
                data: {
                  params: {},
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();
              componentInstance.state.tabGroupDetails = {
                windowCollection: val,
              };
              const success = jest.fn();

              componentInstance.validateFields(success);

              expect(
                componentInstance.state.fieldErrors["windowCollection"]
              ).toBe("A tab group must consist of at least one window.");
            }
          );

          test('Run validateFields(success): If "windowCollection" exists in this.state.tabGroupDetails, verify fieldErrors["windowCollection"] to be undefind in component state', () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {
              windowCollection: [{ id: 1 }, { id: 2 }],
            };
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(
              componentInstance.state.fieldErrors["windowCollection"]
            ).toBeUndefined();
          });

          test('Run validateFields(success): If "windowCollection" = [] in this.state.tabGroupDetails, ensure an error is added to fieldErrors["windowCollection"] in component state', () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {
              windowAndTabs: [],
            };
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(
              componentInstance.state.fieldErrors["windowCollection"]
            ).toBe("A tab group must consist of at least one window.");
          });
        });

        describe("Examine the situation when there are field errors", () => {
          test("Run validateFields(success): Check that this test setup generates 3 field errors", () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {};
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(
              Object.keys(componentInstance.state.fieldErrors).length
            ).toBe(3);
          });

          test("Run validateFields(success): When there is field error, call this.saveToState()", () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {};
            componentInstance.saveToState = jest.fn();
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(componentInstance.saveToState).toHaveBeenCalled();
          });

          test("Run validateFields(success): When there are field errors, call ExceptionsHandler.ErrorHandler()", () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {};
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(ExceptionsHandler.ErrorHandler).toHaveBeenCalled();
          });

          test("Run validateFields(success): When there are field errors, do not call the success() callback", () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {};
            const success = jest.fn();
            componentInstance.validateFields(success);

            expect(success).not.toHaveBeenCalled();
          });
        });

        describe("Examine the situation when there are no field errors", () => {
          const tabGroupDetails = {
            groupName: "Test Group",
            groupDescription:
              "This is a tab group created for testing purposes",
            windowCollection: [{ id: 1 }, { id: 2 }],
          };

          test("Run validateFields(success): Check that this test setup generates 0 field errors", () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = tabGroupDetails;
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(
              Object.keys(componentInstance.state.fieldErrors).length
            ).toBe(0);
          });

          test("Run validateFields(success): When there are no field error, do not call this.saveToState()", () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = tabGroupDetails;
            componentInstance.saveToState = jest.fn();
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(componentInstance.saveToState).not.toHaveBeenCalled();
          });

          test("Run validateFields(success): When there are no field errors, do not call ExceptionsHandler.ErrorHandler()", () => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = tabGroupDetails;
            const success = jest.fn();

            componentInstance.validateFields(success);

            expect(ExceptionsHandler.ErrorHandler).not.toHaveBeenCalled();
          });

          test("Run validateFields(success): When there are no field errors, call the success() callback function", () => {
            const presetProps = {
              data: {
                params: {},
              },
            };

            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });

            componentInstance = testComponent.instance();
            componentInstance.state.tabGroupDetails = {
              groupName: "Test Group",
              groupDescription:
                "This is a tab group created for testing purposes",
              windowCollection: [{ id: 1 }, { id: 2 }],
            };

            const success = jest.fn();
            componentInstance.validateFields(success);

            expect(success).toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe("Test setGroupId(id)", () => {
    const various_nonString_nonUndefined = [
      [{ testkey: "test value" }],
      [32],
      [null],
      [false],
      [true],
      [[12, 8, 3, 7]],
      [() => {}],
    ];

    test("Run setGroupId(): There is no input parameter. The function should generate a new string and return it", () => {
      expect(componentInstance.setGroupId()).toEqual(expect.any(String));
    });

    test('Run setGroupId("test2idString"): There is a string as input parameter. The same string should be returned by the function', () => {
      expect(componentInstance.setGroupId("test2idString")).toEqual(
        "test2idString"
      );
    });

    test.each(various_nonString_nonUndefined)(
      'Run setGroupId(%p): The input parameter is neither a string nor undefined, throw an error "ETGMCreateNewGroupModal-102"',
      (val) => {
        componentInstance.setGroupId(val);
        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-102"
        );
      }
    );
  });

  describe("Test childComponentDidMount()", () => {
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

    describe('Examine the "data" object of this.props', () => {
      test('Run childComponentDidMount(): if this.props.data object is missing, throw an error "ETGMCreateNewGroupModal-127"', () => {
        /*    const presetProps = {
          data: undefined,
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance(); */

        componentInstance.childComponentDidMount();

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "ETGMCreateNewGroupModal-127"
        );
      });

      test.each(various_nonObjects)(
        'Run childComponentDidMount(): if this.props.data = %p (is not an object), throw an error "ETGMCreateNewGroupModal-127"',
        (val) => {
          const presetProps = {
            data: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.childComponentDidMount();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-127"
          );
        }
      );

      describe('Examine the "params" object of this.props.data', () => {
        test('Run childComponentDidMount(): if this.props.data.params object is missing, throw an error "ETGMCreateNewGroupModal-142"', () => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.childComponentDidMount();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-142"
          );
        });

        test.each(various_nonObjects)(
          'Run childComponentDidMount(): if this.props.data.params = %p (is not an object), throw an error "ETGMCreateNewGroupModal-142"',
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
            componentInstance.childComponentDidMount();

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-142"
            );
          }
        );
      });

      describe('Examine the "windowCollection" array of this.props.data.params', () => {
        test('Run childComponentDidMount(): If this.props.data.params.windowCollection is missing, throw an error "ETGMCreateNewGroupModal-128"', () => {
          const presetProps = {
            data: {
              params: {},
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.childComponentDidMount();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-128"
          );
        });

        test.each(various_nonArrays)(
          'Run childComponentDidMount(): If this.props.data.params.windowCollection = %p (is not an array), throw an error "ETGMCreateNewGroupModal-128"',
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
            componentInstance.childComponentDidMount();

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMCreateNewGroupModal-128"
            );
          }
        );

        test("Run childComponentDidMount(): If this.props.data.params.windowCollection is an array, pass it to this.saveToState() with correct parameters", () => {
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
          componentInstance.saveToState = jest.fn();
          componentInstance.childComponentDidMount();

          expect(componentInstance.saveToState).toHaveBeenCalledWith(
            "windowCollection",
            presetProps.data.params.windowCollection,
            "tabGroupDetails"
          );
        });

        test('Run childComponentDidMount(): If this.props.data.params.windowCollection is an array, do not throw an error "ETGMCreateNewGroupModal-128"', () => {
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
          componentInstance.saveToState = jest.fn();
          componentInstance.childComponentDidMount();

          expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
            "ETGMCreateNewGroupModal-128"
          );
        });
      });

      describe('Examine the "groupId" string of this.props.data.params', () => {
        test("Run childComponentDidMount(): If this.props.data is missing or is not an object, the this.saveToState function which adds the groupId to component state will never be called", () => {
          const presetProps = {};
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.saveToState = jest.fn();
          componentInstance.childComponentDidMount();

          expect(componentInstance.saveToState).not.toHaveBeenCalledWith(
            "groupId",
            expect.anything(),
            "tabGroupDetails"
          );
        });

        test.each(various_nonObjects)(
          "Run childComponentDidMount(): If this.props.data = %p (is not an object), the this.saveToState function which adds the groupId to component state will never be called",
          (val) => {
            const presetProps = {
              data: val,
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.saveToState = jest.fn();
            componentInstance.childComponentDidMount();

            expect(componentInstance.saveToState).not.toHaveBeenCalledWith(
              "groupId",
              expect.anything(),
              "tabGroupDetails"
            );
          }
        );

        test("Run childComponentDidMount(): If this.props.data.params is missing or is not an object, the this.saveToState function which adds the groupId to component state will never be called", () => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.saveToState = jest.fn();
          componentInstance.childComponentDidMount();

          expect(componentInstance.saveToState).not.toHaveBeenCalledWith(
            "groupId",
            expect.anything(),
            "tabGroupDetails"
          );
        });

        test.each(various_nonObjects)(
          "Run childComponentDidMount(): If this.props..params.data = %p (is not an object), the this.saveToState function which adds the groupId to component state will never be called",
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
            componentInstance.saveToState = jest.fn();
            componentInstance.childComponentDidMount();

            expect(componentInstance.saveToState).not.toHaveBeenCalledWith(
              "groupId",
              expect.anything(),
              "tabGroupDetails"
            );
          }
        );

        test("Run childComponentDidMount(): If this.props.data.params.windowCollection is missing or is not an array, the this.saveToState function which adds the groupId to component state will never be called", () => {
          const presetProps = {
            data: {
              params: {},
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.saveToState = jest.fn();
          componentInstance.childComponentDidMount();

          expect(componentInstance.saveToState).not.toHaveBeenCalledWith(
            "groupId",
            expect.anything(),
            "tabGroupDetails"
          );
        });

        test.each(various_nonArrays)(
          "Run childComponentDidMount(): If this.props.data.params.windowCollection = %p (is not an array), the this.saveToState function which adds the groupId to component state will never be called",
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
            componentInstance.saveToState = jest.fn();
            componentInstance.childComponentDidMount();

            expect(componentInstance.saveToState).not.toHaveBeenCalledWith(
              "groupId",
              expect.anything(),
              "tabGroupDetails"
            );
          }
        );

        test("Run childComponentDidMount(): If this.props.data.params.windowCollection is an array, the this.saveToState function which adds the groupId to component state will be called", () => {
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
          componentInstance.saveToState = jest.fn();
          componentInstance.childComponentDidMount();

          expect(componentInstance.saveToState).toHaveBeenCalledWith(
            "groupId",
            expect.anything(),
            "tabGroupDetails"
          );
        });
      });
    });
  });

  describe("Test renderBodyContents()", () => {
    describe('Examine "data" parameter', () => {
      test('Run renderBodyContents(data): If "data" parameter is undefined, throw the error message of "ETGMCreateNewGroupModal-139"', () => {
        expect(() => componentInstance.renderBodyContents()).toThrow(
          expectedErrorReturns["ETGMCreateNewGroupModal-139"].message
        );
      });

      test.each(various_nonObjects)(
        'Run renderBodyContents(%p): throw the error message of "ETGMCreateNewGroupModal-140"',
        (val) => {
          expect(() => componentInstance.renderBodyContents(val)).toThrow(
            expectedErrorReturns["ETGMCreateNewGroupModal-139"].message
          );
        }
      );

      test('Run renderBodyContents(data): If "data" is an object, do not throw error message of "ETGMCreateNewGroupModal-139"', () => {
        componentInstance = testComponent.instance();

        expect(() => componentInstance.renderBodyContents({})).not.toThrow(
          expectedErrorReturns["ETGMCreateNewGroupModal-139"].message
        );
      });
    });
  });

  describe("Test renderHeaderContents()", () => {
    describe('Examine "data" parameter', () => {
      test('Run renderHeaderContents(data): If "data" parameter is undefined, throw the error message of "ETGMCreateNewGroupModal-140"', () => {
        expect(() => componentInstance.renderHeaderContents()).toThrow(
          expectedErrorReturns["ETGMCreateNewGroupModal-140"].message
        );
      });

      test.each(various_nonObjects)(
        'Run renderHeaderContents(%p): throw the error message of "ETGMCreateNewGroupModal-140"',
        (val) => {
          expect(() => componentInstance.renderHeaderContents(val)).toThrow(
            expectedErrorReturns["ETGMCreateNewGroupModal-140"].message
          );
        }
      );

      test('Run renderHeaderContents(data): If "data" is an object, do not throw error message of "ETGMCreateNewGroupModal-140"', () => {
        componentInstance = testComponent.instance();

        expect(() => componentInstance.renderHeaderContents({})).not.toThrow(
          expectedErrorReturns["ETGMCreateNewGroupModal-140"].message
        );
      });
    });
  });

  describe("Test renderFooterContents()", () => {
    describe('Examine "data" parameter', () => {
      test('Run renderFooterContents(data): If "data" parameter is undefined, throw the error message of "ETGMCreateNewGroupModal-141"', () => {
        expect(() => componentInstance.renderFooterContents()).toThrow(
          expectedErrorReturns["ETGMCreateNewGroupModal-141"].message
        );
      });

      test.each(various_nonObjects)(
        'Run renderFooterContents(%p): throw the error message of "ETGMCreateNewGroupModal-141"',
        (val) => {
          expect(() => componentInstance.renderFooterContents(val)).toThrow(
            expectedErrorReturns["ETGMCreateNewGroupModal-141"].message
          );
        }
      );

      test('Run renderFooterContents(data): If "data" is an object, do not throw error message of "ETGMCreateNewGroupModal-141"', () => {
        componentInstance = testComponent.instance();

        expect(() => componentInstance.renderFooterContents({})).not.toThrow(
          expectedErrorReturns["ETGMCreateNewGroupModal-141"].message
        );
      });
    });
  });
});
