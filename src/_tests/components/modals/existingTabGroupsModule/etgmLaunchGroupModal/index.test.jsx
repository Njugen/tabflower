import React, { Fragment } from "react";
import { shallow, mount, render } from "enzyme";
import ETGMLaunchGroupsModal from "../../../../../components/modals/existingTabGroupsModule/etgmLaunchGroupModal";
import * as ExceptionsHandler from "../../../../../components/utils/exceptionsAndHandler";
import * as validator from "../../../../../components/utils/inputValidators";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<ETGMLaunchGroupsModal {...props} />, options);
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

describe("Test <ETGMLaunchGroupsModal /> component behaviour at mount", () => {
  const actualErrorReturns = {
    "ETGMLaunchGroupsModal-101": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-101"
    ),
    "ETGMLaunchGroupsModal-102": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-102"
    ),
    "ETGMLaunchGroupsModal-103": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-103"
    ),
    "ETGMLaunchGroupsModal-104": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-104"
    ),
    "ETGMLaunchGroupsModal-105": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-105"
    ),
    "ETGMLaunchGroupsModal-106": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-106"
    ),
    "ETGMLaunchGroupsModal-107": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-107"
    ),
    "ETGMLaunchGroupsModal-108": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-108"
    ),
    "ETGMLaunchGroupsModal-109": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-109"
    ),
    "ETGMLaunchGroupsModal-110": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-110"
    ),
    "ETGMLaunchGroupsModal-111": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-111"
    ),
    "ETGMLaunchGroupsModal-112": ExceptionsHandler.ValidatorError(
      "ETGMLaunchGroupsModal-112"
    ),
  };

  const expectedErrorReturns = {
    "ETGMLaunchGroupsModal-101": {
      name: "ValidatorError",
      message: "The callback parameter is not a function.",
      code: "ETGMLaunchGroupsModal-101",
    },
    "ETGMLaunchGroupsModal-102": {
      name: "ValidatorError",
      message:
        "A group id needs to be provided as a text string in order to identify which tab group to launch. As no tab group id has been provided, nothing will be launched by this request.",
      code: "ETGMLaunchGroupsModal-102",
    },
    "ETGMLaunchGroupsModal-103": {
      name: "ValidatorError",
      message:
        'The "groupName" parameter in this.props.data.params needs to be a text string if given. As a result of this error, the requested tab group cannot be launched at this time.',
      code: "ETGMLaunchGroupsModal-103",
    },
    "ETGMLaunchGroupsModal-104": {
      name: "ValidatorError",
      message:
        'The "groupDescription" parameter in this.props.data.params needs to be a text string if given. As a result of this error, the requested tab group cannot be launched at this time.',
      code: "ETGMLaunchGroupsModal-104",
    },
    "ETGMLaunchGroupsModal-105": {
      name: "ValidatorError",
      message:
        'The "groupCloseAll" parameter in this.props.data.params needs to be a boolean value (true or false) if given. As a result of this error, the requested tab group cannot be launched at this time.',
      code: "ETGMLaunchGroupsModal-105",
    },
    "ETGMLaunchGroupsModal-106": {
      name: "ValidatorError",
      message:
        'The "groupCloseInactiveTabs" parameter in this.props.data.params needs to be a boolean value (true or false) if given. As a result of this error, the requested tab group cannot be launched at this time.',
      code: "ETGMLaunchGroupsModal-106",
    },
    "ETGMLaunchGroupsModal-107": {
      name: "ValidatorError",
      message:
        'The "windowAndTabs" parameter needs to be an object in this.props.data.params, containing information about all windows and tabs in a tab group. If there is no such information available, this parameter should be an empty object. As a result of this error, the requested tab group cannot be launched at this time.',
      code: "ETGMLaunchGroupsModal-107",
    },
    "ETGMLaunchGroupsModal-108": {
      name: "ValidatorError",
      message:
        'The "params" key in this.props.data is not an object. The required parameters could not be read.',
      code: "ETGMLaunchGroupsModal-108",
    },
    "ETGMLaunchGroupsModal-109": {
      name: "ValidatorError",
      message:
        'The "data" key in this.props is not an object. The data key needs to be an object, which provides parameters and other data required by the modal',
      code: "ETGMLaunchGroupsModal-109",
    },
    "ETGMLaunchGroupsModal-110": {
      name: "ValidatorError",
      message:
        "The data parameter in renderBodyContents() of ETGMCreateNewGroupModal, needs to be an object",
      code: "ETGMLaunchGroupsModal-110",
    },
    "ETGMLaunchGroupsModal-111": {
      name: "ValidatorError",
      message:
        "The data parameter in renderHeaderContents() of ETGMCreateNewGroupModal, needs to be an object",
      code: "ETGMLaunchGroupsModal-111",
    },
    "ETGMLaunchGroupsModal-112": {
      name: "ValidatorError",
      message:
        "The data parameter in renderFooterContents() of ETGMCreateNewGroupModal, needs to be an object",
      code: "ETGMLaunchGroupsModal-112",
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

  describe("Test verifyChildProps()", () => {
    describe("Examine the function based on the value of this.props.data", () => {
      test('Run verifyChildProps(): If "data" is missing in this.props, throw an error "ETGMLaunchGroupsModal-109"', () => {
        expect(() => {
          const presetProps = {};
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.verifyChildProps();
        }).toThrow(
          ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-109")
        );
      });

      test.each(various_nonObjects)(
        'Run verifyChildProps(): If "data" = %p (is not an object) in this.props, throw an error "ETGMLaunchGroupsModal-109"',
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
          }).toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-109")
          );
        }
      );

      test('Run verifyChildProps(): If "data" is an object, do NOT throw error "ETGMLaunchGroupsModal-109"', () => {
        expect(() => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.verifyChildProps();
        }).not.toThrow(
          ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-109")
        );
      });
    });

    describe("Examine the function based on the value of this.props.data.params", () => {
      test('Run verifyChildProps(): If "params" is missing in this.props.data, throw an error "ETGMLaunchGroupsModal-108"', () => {
        expect(() => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.verifyChildProps();
        }).toThrow(
          ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-108")
        );
      });

      test.each(various_nonObjects)(
        'Run verifyChildProps(): If "params" = %p (is not an object) in this.props.data, throw an error "ETGMLaunchGroupsModal-108"',
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
          }).toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-108")
          );
        }
      );

      test('Run verifyChildProps(): If "data" is an object, do NOT throw error "ETGMLaunchGroupsModal-108"', () => {
        expect(() => {
          const presetProps = {
            data: {
              params: {},
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.verifyChildProps();
        }).not.toThrow(
          ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-108")
        );
      });
    });

    describe("Examine the function based on keys given in this.props.data.params", () => {
      const presetTestInfo = {
        groupId: "ABCD-1234",
        groupName: "Test Group for ETGM Launch Group Modal",
        groupDescription:
          "This test group is only preset in the test suite. It is not preset in the real extension.",
        groupCloseAll: false,
        groupCloseInactiveTabs: false,
        windowCollection: [],
      };
      describe('Examine the "groupId" key located in this.props.data.params', () => {
        test.each(various_nonString)(
          'Run verifyChildProps(): If "groupId" key is not a string, throw an error "ETGMLaunchGroupsModal-102"',
          (val) => {
            expect(() => {
              const presetProps = {
                data: {
                  params: {
                    groupId: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              componentInstance.verifyChildProps();
            }).toThrow(
              ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-102")
            );
          }
        );

        test('Run verifyChildProps(): If "groupId" key is missing, throw an error "ETGMLaunchGroupsModal-102"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-102")
          );
        });

        test('Run verifyChildProps(): If "groupId" key is a string (e.g. "ABCD-1234" set in this case), do not throw an error "ETGMLaunchGroupsModal-102"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: "ABCD-1234",
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-102")
          );
        });
      });

      describe('Examine the "groupName" key located in this.props.data.params', () => {
        test.each(various_nonString_nonUndefined)(
          'Run verifyChildProps(): If "groupName" key is neither a string nor is missing, throw an error "ETGMLaunchGroupsModal-103"',
          (val) => {
            expect(() => {
              const presetProps = {
                data: {
                  params: {
                    groupId: "ABCD-1234",
                    groupName: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              componentInstance.verifyChildProps();
            }).toThrow(
              ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-103")
            );
          }
        );

        test('Run verifyChildProps(): If "groupName" key is missing, do not throw an error "ETGMLaunchGroupsModal-103"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: "ABCD-1234",
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-103")
          );
        });

        test('Run verifyChildProps(): If "groupName" key is a string, do not throw an error "ETGMLaunchGroupsModal-103"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: "ABCD-1234",
                  groupName: "Test Group for ETGM Launch Group Modal",
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-103")
          );
        });
      });

      describe('Examine the "groupDescription" key located in this.props.data.params', () => {
        test.each(various_nonString_nonUndefined)(
          'Run verifyChildProps(): If "groupDescription" key is not a string and is not missing, throw an error "ETGMLaunchGroupsModal-104"',
          (val) => {
            expect(() => {
              const presetProps = {
                data: {
                  params: {
                    groupId: presetTestInfo.groupId,
                    groupName: presetTestInfo.groupName,
                    groupDescription: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              componentInstance.verifyChildProps();
            }).toThrow(
              ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-104")
            );
          }
        );

        test('Run verifyChildProps(): If "groupDescription" key is missing, do not throw an error "ETGMLaunchGroupsModal-104"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: presetTestInfo.groupId,
                  groupName: presetTestInfo.groupName,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-104")
          );
        });

        test('Run verifyChildProps(): If "groupDescription" key is a string, do not throw an error "ETGMLaunchGroupsModal-104"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: presetTestInfo.groupId,
                  groupName: presetTestInfo.groupName,
                  groupDescription: presetTestInfo.groupDescription,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-104")
          );
        });
      });

      describe('Examine the "groupCloseAll" key located in this.props.data.params', () => {
        test.each(various_nonBool_nonUndefined)(
          'Run verifyChildProps(): If "groupCloseAll" key is not a boolean and is not missing, throw an error "ETGMLaunchGroupsModal-105"',
          (val) => {
            expect(() => {
              const presetProps = {
                data: {
                  params: {
                    groupId: presetTestInfo.groupId,
                    groupName: presetTestInfo.groupName,
                    groupDescription: presetTestInfo.groupDescription,
                    groupCloseAll: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              componentInstance.verifyChildProps();
            }).toThrow(
              ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-105")
            );
          }
        );

        test('Run verifyChildProps(): If "groupCloseAll" key is missing, do not throw an error "ETGMLaunchGroupsModal-105"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: presetTestInfo.groupId,
                  groupName: presetTestInfo.groupName,
                  groupDescription: presetTestInfo.groupDescription,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-105")
          );
        });

        test('Run verifyChildProps(): If "groupCloseAll" key is a boolean (true), do not throw an error "ETGMLaunchGroupsModal-105"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: presetTestInfo.groupId,
                  groupName: presetTestInfo.groupName,
                  groupDescription: presetTestInfo.groupDescription,
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
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-105")
          );
        });

        test('Run verifyChildProps(): If "groupCloseAll" key is a boolean (false), do not throw an error "ETGMLaunchGroupsModal-105"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: presetTestInfo.groupId,
                  groupName: presetTestInfo.groupName,
                  groupDescription: presetTestInfo.groupDescription,
                  groupCloseAll: presetTestInfo.groupCloseAll,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-105")
          );
        });
      });

      describe('Examine the "groupCloseInactiveTabs" key located in this.props.data.params', () => {
        test.each(various_nonBool_nonUndefined)(
          'Run verifyChildProps(): If "groupCloseInactiveTabs" key is not a boolean and not missing, throw an error "ETGMLaunchGroupsModal-106"',
          (val) => {
            expect(() => {
              const presetProps = {
                data: {
                  params: {
                    groupId: presetTestInfo.groupId,
                    groupName: presetTestInfo.groupName,
                    groupDescription: presetTestInfo.groupDescription,
                    groupCloseAll: presetTestInfo.groupCloseAll,
                    groupCloseInactiveTabs: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              componentInstance.verifyChildProps();
            }).toThrow(
              ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-106")
            );
          }
        );

        test('Run verifyChildProps(): If "groupCloseInactiveTabs" key is missing, do not throw an error "ETGMLaunchGroupsModal-106"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: presetTestInfo.groupId,
                  groupName: presetTestInfo.groupName,
                  groupDescription: presetTestInfo.groupDescription,
                  groupCloseAll: presetTestInfo.groupCloseAll,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-106")
          );
        });

        test('Run verifyChildProps(): If "groupCloseInactiveTabs" key is a boolean (true), do not throw an error "ETGMLaunchGroupsModal-106"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: presetTestInfo.groupId,
                  groupName: presetTestInfo.groupName,
                  groupDescription: presetTestInfo.groupDescription,
                  groupCloseAll: presetTestInfo.groupCloseAll,
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
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-106")
          );
        });

        test('Run verifyChildProps(): If "groupCloseInactiveTabs" key is a boolean (false), do not throw an error "ETGMLaunchGroupsModal-106"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: presetTestInfo.groupId,
                  groupName: presetTestInfo.groupName,
                  groupDescription: presetTestInfo.groupDescription,
                  groupCloseAll: presetTestInfo.groupCloseAll,
                  groupCloseInactiveTabs: presetTestInfo.groupCloseInactiveTabs,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-106")
          );
        });
      });

      describe('Examine the "windowCollection" key located in this.props.data.params', () => {
        test.each(various_nonArrays)(
          'Run verifyChildProps(): If "windowCollection" key is not an array, throw an error "ETGMLaunchGroupsModal-107"',
          (val) => {
            expect(() => {
              const presetProps = {
                data: {
                  params: {
                    groupId: presetTestInfo.groupId,
                    groupName: presetTestInfo.groupName,
                    groupDescription: presetTestInfo.groupDescription,
                    groupCloseAll: presetTestInfo.groupCloseAll,
                    groupCloseInactiveTabs:
                      presetTestInfo.groupCloseInactiveTabs,
                    windowCollection: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              componentInstance.verifyChildProps();
            }).toThrow(
              ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-107")
            );
          }
        );

        test('Run verifyChildProps(): If "windowCollection" key is missing, throw an error "ETGMLaunchGroupsModal-107"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: presetTestInfo.groupId,
                  groupName: presetTestInfo.groupName,
                  groupDescription: presetTestInfo.groupDescription,
                  groupCloseAll: presetTestInfo.groupCloseAll,
                  groupCloseInactiveTabs: presetTestInfo.groupCloseInactiveTabs,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-107")
          );
        });

        test('Run verifyChildProps(): If "windowCollection" key is an array, do not throw an error "ETGMLaunchGroupsModal-107"', () => {
          expect(() => {
            const presetProps = {
              data: {
                params: {
                  groupId: presetTestInfo.groupId,
                  groupName: presetTestInfo.groupName,
                  groupDescription: presetTestInfo.groupDescription,
                  groupCloseAll: presetTestInfo.groupCloseAll,
                  groupCloseInactiveTabs: presetTestInfo.groupCloseInactiveTabs,
                  windowCollection: presetTestInfo.windowCollection,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(
            ExceptionsHandler.ValidatorError("ETGMLaunchGroupsModal-107")
          );
        });
      });
    });
  });

  describe("Test saveModalHandler(callback)", () => {
    describe("Case 1: When callback is a function", () => {
      const callback = () => {};

      describe("Examine the function based on the value of this.props.data", () => {
        test('Run saveModalHandler(callback): If "data" is missing in this.props, throw an error "ETGMLaunchGroupsModal-109"', () => {
          const presetProps = {};
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.saveModalHandler(callback);

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMLaunchGroupsModal-109"
          );
        });

        test.each(various_nonObjects)(
          'Run saveModalHandler(callback): If "data" = %p (is not an object) in this.props, throw an error "ETGMLaunchGroupsModal-109"',
          (val) => {
            const presetProps = {
              data: val,
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.saveModalHandler(callback);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMLaunchGroupsModal-109"
            );
          }
        );

        test('Run saveModalHandler(callback): If "data" is an object, do NOT throw error "ETGMLaunchGroupsModal-109"', () => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.saveModalHandler(callback);

          expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
            "ETGMLaunchGroupsModal-109"
          );
        });
      });

      describe("Examine the function based on the value of this.props.data.params", () => {
        test('Run saveModalHandler(callback): If "params" is missing in this.props.data, throw an error "ETGMLaunchGroupsModal-108"', () => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.saveModalHandler(callback);
          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMLaunchGroupsModal-108"
          );
        });

        test.each(various_nonObjects)(
          'Run saveModalHandler(callback): If "params" = %p (is not an object) in this.props.data, throw an error "ETGMLaunchGroupsModal-108"',
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

            componentInstance.saveModalHandler(callback);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMLaunchGroupsModal-108"
            );
          }
        );

        test('Run saveModalHandler(callback): If "params" is an object, do NOT throw error "ETGMLaunchGroupsModal-108"', () => {
          const presetProps = {
            data: {
              params: {},
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.saveModalHandler(callback);
          expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
            "ETGMLaunchGroupsModal-108"
          );
        });
      });

      describe('Examine the function based on the value of "callback" input parameter (assuming this.props.data and this.props.data.params are valid)', () => {
        test("Run saveModalHandler(callback): If the callback parameter is valid, call this.clearModalData()", () => {
          const presetProps = {
            data: {
              params: {},
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.clearModalData = jest.fn();

          componentInstance.saveModalHandler(callback);

          expect(componentInstance.clearModalData).toHaveBeenCalled();
        });

        test("Run saveModalHandler(callback): If the callback parameter is valid, call this.clearModalData(callback) which in turns calls the callback function", () => {
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

          componentInstance.clearModalData = jest.fn();

          componentInstance.saveModalHandler(callback);

          expect(componentInstance.clearModalData).toHaveBeenCalledWith(
            callback(expect.anything())
          );
        });

        test("Run saveModalHandler(callback): If the callback parameter is valid, call this.clearModalData(callback) which in turns calls the callback function (the callback function receives an object input defined in this test case)", () => {
          const presetProps = {
            data: {
              params: {
                groupId: "ABCD-1234",
                groupName: "Test Group for ETGM Launch Group Modal",
                groupDescription:
                  "This test group is only preset in the test suite. It is not preset in the real extension.",
                groupCloseAll: false,
                groupCloseInactiveTabs: false,
                windowCollection: [],
              },
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          const tabGroupDetails = {
            groupId: componentInstance.props.data.params.groupId,
            windowCollection:
              componentInstance.props.data.params.windowCollection,
            groupName: componentInstance.props.data.params.groupName,
            groupDescription:
              componentInstance.props.data.params.groupDescription,
            ...componentInstance.state.tabGroupDetails,
          };

          const callback = jest.fn();

          componentInstance.clearModalData = jest.fn();

          componentInstance.saveModalHandler(callback);

          expect(componentInstance.clearModalData).toHaveBeenCalledWith(
            callback()
          );
          expect(callback).toHaveBeenCalledWith(tabGroupDetails);
        });

        test('Run saveModalHandler(callback): If the callback parameter is missing, throw an error "ETGMLaunchGroupsModal-101"', () => {
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

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "ETGMLaunchGroupsModal-101"
          );
        });

        test.each(various_nonFunctions)(
          'Run saveModalHandler(callback): If callback = %p (not a function), throw an error "ETGMLaunchGroupsModal-101"',
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

            const callback = val;

            componentInstance.saveModalHandler(callback);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "ETGMLaunchGroupsModal-101"
            );
          }
        );

        test('Run saveModalHandler(callback): If the callback parameter is a function, do not throw an error "ETGMLaunchGroupsModal-101"', () => {
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

          componentInstance.saveModalHandler(callback);

          expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
            "ETGMLaunchGroupsModal-101"
          );
        });
      });
    });
  });

  describe("Test renderBodyContents()", () => {
    describe('Examine "data" parameter', () => {
      test('Run renderBodyContents(data): If "data" parameter is undefined, throw the error message of "ETGMLaunchGroupsModal-110"', () => {
        expect(() => componentInstance.renderBodyContents()).toThrow(
          expectedErrorReturns["ETGMLaunchGroupsModal-110"].message
        );
      });

      test.each(various_nonObjects)(
        'Run renderBodyContents(%p): throw the error message of "ETGMCreateNewGroupModal-140"',
        (val) => {
          expect(() => componentInstance.renderBodyContents(val)).toThrow(
            expectedErrorReturns["ETGMLaunchGroupsModal-110"].message
          );
        }
      );

      test('Run renderBodyContents(data): If "data" is an object, do not throw error message of "ETGMLaunchGroupsModal-110"', () => {
        componentInstance = testComponent.instance();

        expect(() => componentInstance.renderBodyContents({})).not.toThrow(
          expectedErrorReturns["ETGMLaunchGroupsModal-110"].message
        );
      });
    });
  });

  describe("Test renderHeaderContents()", () => {
    describe('Examine "data" parameter', () => {
      test('Run renderHeaderContents(data): If "data" parameter is undefined, throw the error message of "ETGMLaunchGroupsModal-111"', () => {
        expect(() => componentInstance.renderHeaderContents()).toThrow(
          expectedErrorReturns["ETGMLaunchGroupsModal-111"].message
        );
      });

      test.each(various_nonObjects)(
        'Run renderHeaderContents(%p): throw the error message of "ETGMLaunchGroupsModal-111"',
        (val) => {
          expect(() => componentInstance.renderHeaderContents(val)).toThrow(
            expectedErrorReturns["ETGMLaunchGroupsModal-111"].message
          );
        }
      );

      test('Run renderHeaderContents(data): If "data" is an object, do not throw error message of "ETGMLaunchGroupsModal-111"', () => {
        componentInstance = testComponent.instance();

        expect(() => componentInstance.renderHeaderContents({})).not.toThrow(
          expectedErrorReturns["ETGMLaunchGroupsModal-111"].message
        );
      });
    });
  });

  describe("Test renderFooterContents()", () => {
    describe('Examine "data" parameter', () => {
      test('Run renderFooterContents(data): If "data" parameter is undefined, throw the error message of "ETGMLaunchGroupsModal-112"', () => {
        expect(() => componentInstance.renderFooterContents()).toThrow(
          expectedErrorReturns["ETGMLaunchGroupsModal-112"].message
        );
      });

      test.each(various_nonObjects)(
        'Run renderFooterContents(%p): throw the error message of "ETGMLaunchGroupsModal-112"',
        (val) => {
          expect(() => componentInstance.renderFooterContents(val)).toThrow(
            expectedErrorReturns["ETGMLaunchGroupsModal-112"].message
          );
        }
      );

      test('Run renderFooterContents(data): If "data" is an object, do not throw error message of "ETGMLaunchGroupsModal-112"', () => {
        componentInstance = testComponent.instance();

        expect(() => componentInstance.renderFooterContents({})).not.toThrow(
          expectedErrorReturns["ETGMLaunchGroupsModal-112"].message
        );
      });
    });
  });
});
