import React from "react";
import { shallow } from "enzyme";
import BodyContents from "./../../../../../components/modals/existingTabGroupsModule/etgmCreateOrEditGroupModal/BodyContents.jsx";
import * as ExceptionsHandler from "./../../../../../components/utils/exceptionsAndHandler";

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

describe("Test <BodyContents /> component behaviour at mount", () => {
  const actualErrorReturns = {
    "ETGMCreateNewGroupModal-b1": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b1"
    ),
    "ETGMCreateNewGroupModal-b2": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b2"
    ),
    "ETGMCreateNewGroupModal-b3": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b3"
    ),
    "ETGMCreateNewGroupModal-b4": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b4"
    ),
    "ETGMCreateNewGroupModal-b5": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b5"
    ),
    "ETGMCreateNewGroupModal-b6": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b6"
    ),
    "ETGMCreateNewGroupModal-b7": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b7"
    ),
    "ETGMCreateNewGroupModal-b8": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b8"
    ),
    "ETGMCreateNewGroupModal-b9": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b9"
    ),
    "ETGMCreateNewGroupModal-b10": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b10"
    ),
    "ETGMCreateNewGroupModal-b11": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b11"
    ),
    "ETGMCreateNewGroupModal-b12": ExceptionsHandler.ValidatorError(
      "ETGMCreateNewGroupModal-b12"
    ),
  };

  const expectedErrorReturns = {
    "ETGMCreateNewGroupModal-b1": {
      name: "ValidatorError",
      message: 'The "data" props is missing or not an object',
      code: "ETGMCreateNewGroupModal-b1",
    },
    "ETGMCreateNewGroupModal-b2": {
      name: "ValidatorError",
      message: 'The "fieldErrors" props is missing or not an object',
      code: "ETGMCreateNewGroupModal-b2",
    },
    "ETGMCreateNewGroupModal-b3": {
      name: "ValidatorError",
      message: 'The "onChange" props is missing or not a function',
      code: "ETGMCreateNewGroupModal-b3",
    },
    "ETGMCreateNewGroupModal-b4": {
      name: "ValidatorError",
      message: 'The "tabGroupDetails" props is missing or not an object',
      code: "ETGMCreateNewGroupModal-b4",
    },
    "ETGMCreateNewGroupModal-b5": {
      name: "ValidatorError",
      message:
        'The "params" key in this.props.data is missing or not an object',
      code: "ETGMCreateNewGroupModal-b5",
    },
    "ETGMCreateNewGroupModal-b6": {
      name: "ValidatorError",
      message:
        'The "groupName" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.',
      code: "ETGMCreateNewGroupModal-b6",
    },
    "ETGMCreateNewGroupModal-b7": {
      name: "ValidatorError",
      message:
        'The "groupCloseAll" in this.props.data.params has to be either undefined or a boolean (true or false). All other datatypes are invalid.',
      code: "ETGMCreateNewGroupModal-b7",
    },
    "ETGMCreateNewGroupModal-b8": {
      name: "ValidatorError",
      message:
        'The "groupCloseInactiveTabs" in this.props.data.params has to be either undefined or a boolean (true or false). All other datatypes are invalid.',
      code: "ETGMCreateNewGroupModal-b8",
    },
    "ETGMCreateNewGroupModal-b9": {
      name: "ValidatorError",
      message:
        'The "groupDescription" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.',
      code: "ETGMCreateNewGroupModal-b9",
    },
    "ETGMCreateNewGroupModal-b10": {
      name: "ValidatorError",
      message:
        'The "groupDontAskAgain" in this.props.data.params has to be either undefined or a boolean (true or false). All other datatypes are invalid.',
      code: "ETGMCreateNewGroupModal-b10",
    },
    "ETGMCreateNewGroupModal-b11": {
      name: "ValidatorError",
      message:
        'The "type" in this.props.data.params has to be either undefined or a string. All other datatypes are invalid.',
      code: "ETGMCreateNewGroupModal-b11",
    },
    "ETGMCreateNewGroupModal-b12": {
      name: "ValidatorError",
      message:
        'If the "type" in this.props.data.params is given as a string, it has to hold one of the following values: "currently-opened", "existing-group" or "new-group". All other datatypes are invalid.',
      code: "ETGMCreateNewGroupModal-b12",
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
      test('Run verifyProps(): If this.props.data is missing, throw error "ETGMCreateNewGroupModal-b1"', () => {
        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMCreateNewGroupModal-b1"].message
        );
      });

      test.each(various_nonObjects)(
        'Run verifyProps(): If this.props.data = %p (not an object), throw error "ETGMCreateNewGroupModal-b1"',
        (val) => {
          const presetProps = {
            data: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMCreateNewGroupModal-b1"].message
          );
        }
      );

      test('Run verifyProps(): If this.props.data is an object, do not throw error "ETGMCreateNewGroupModal-b1"', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          expectedErrorReturns["ETGMCreateNewGroupModal-b1"].message
        );
      });
    });

    describe("Try out different this.props.fieldErrors values, when the props checked before are are valid", () => {
      test('Run verifyProps(): If this.props.fieldErrors is missing, throw error "ETGMCreateNewGroupModal-b2"', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMCreateNewGroupModal-b2"].message
        );
      });

      test.each(various_nonObjects)(
        'Run verifyProps(): If this.props.fieldErrors = %p (not an object), throw error "ETGMCreateNewGroupModal-b2"',
        (val) => {
          const presetProps = {
            data: {},
            fieldErrors: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMCreateNewGroupModal-b2"].message
          );
        }
      );

      test('Run verifyProps(): If this.props.fieldErrors is an object, do not throw error "ETGMCreateNewGroupModal-b2"', () => {
        const presetProps = {
          data: {},
          fieldErrors: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          expectedErrorReturns["ETGMCreateNewGroupModal-b2"].message
        );
      });
    });

    describe("Try out different this.props.onChange values, when the props checked before are are valid", () => {
      test('Run verifyProps(): If this.props.onChange is missing, throw error "ETGMCreateNewGroupModal-b3"', () => {
        const presetProps = {
          data: {},
          fieldErrors: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMCreateNewGroupModal-b3"].message
        );
      });

      test.each(various_nonFunctions)(
        'Run verifyProps(): If this.props.onChange = %p (not a function), throw error "ETGMCreateNewGroupModal-b3"',
        (val) => {
          const presetProps = {
            data: {},
            fieldErrors: {},
            onChange: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMCreateNewGroupModal-b3"].message
          );
        }
      );

      test('Run verifyProps(): If this.props.onChange is a function, do not throw error "ETGMCreateNewGroupModal-b3"', () => {
        const presetProps = {
          data: {},
          fieldErrors: {},
          onChange: () => {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          expectedErrorReturns["ETGMCreateNewGroupModal-b3"].message
        );
      });
    });

    describe("Try out different this.props.tabGroupDetails values, when the props checked before are are valid", () => {
      test('Run verifyProps(): If this.props.tabGroupDetails is missing, throw error "ETGMCreateNewGroupModal-b4"', () => {
        const presetProps = {
          data: {},
          fieldErrors: {},
          onChange: () => {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMCreateNewGroupModal-b4"].message
        );
      });

      test.each(various_nonObjects)(
        'Run verifyProps(): If this.props.tabGroupDetails = %p (not an object), throw error "ETGMCreateNewGroupModal-b4"',
        (val) => {
          const presetProps = {
            data: {},
            fieldErrors: {},
            onChange: () => {},
            tabGroupDetails: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMCreateNewGroupModal-b4"].message
          );
        }
      );

      test('Run verifyProps(): If this.props.tabGroupDetails is an object, do not throw error "ETGMCreateNewGroupModal-b4"', () => {
        const presetProps = {
          data: {},
          fieldErrors: {},
          onChange: () => {},
          tabGroupDetails: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          expectedErrorReturns["ETGMCreateNewGroupModal-b4"].message
        );
      });
    });

    describe("Try out different values of the keys inside this.props.data. All the other this.props properties are assumed valid", () => {
      describe("Try out different this.props.data.params values", () => {
        test('Run verifyProps(): If this.props.data.params is missing, throw error "ETGMCreateNewGroupModal-b5"', () => {
          const presetProps = {
            fieldErrors: {},
            onChange: () => {},
            tabGroupDetails: {},

            data: {},
          };

          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });

          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMCreateNewGroupModal-b5"].message
          );
        });

        test.each(various_nonObjects)(
          'Run verifyProps(): If this.props.data.params = %p (not an object), throw error "ETGMCreateNewGroupModal-b5"',
          (val) => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: val,
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b5"].message
            );
          }
        );

        test('Run verifyProps(): If this.props.data.params is an object, do not throw error "ETGMCreateNewGroupModal-b5"', () => {
          const presetProps = {
            fieldErrors: {},
            onChange: () => {},
            tabGroupDetails: {},

            data: {
              params: {},
            },
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).not.toThrowError(
            expectedErrorReturns["ETGMCreateNewGroupModal-b5"].message
          );
        });
      });

      describe("Try out different keys inside of the this.props.data.params object", () => {
        describe('Try out different this.props.data.params.groupName (in the following called "groupName") values', () => {
          test('Run verifyProps(): If "groupName" is missing, do not throw error "ETGMCreateNewGroupModal-b6"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b6"].message
            );
          });

          test('Run verifyProps(): If "groupName" is a string, do not throw error "ETGMCreateNewGroupModal-b6"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

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
              expectedErrorReturns["ETGMCreateNewGroupModal-b6"].message
            );
          });

          test.each(various_nonString_nonUndefined)(
            'Run verifyProps(): If "groupName" = %p (is neither a string nor undefined), throw error "ETGMCreateNewGroupModal-b6"',
            (val) => {
              const presetProps = {
                fieldErrors: {},
                onChange: () => {},
                tabGroupDetails: {},

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
                expectedErrorReturns["ETGMCreateNewGroupModal-b6"].message
              );
            }
          );
        });

        describe('Try out different this.props.data.params.groupCloseAll (in the following tests called "groupCloseAll") values', () => {
          test('Run verifyProps(): If "groupCloseAll" is missing, do not throw error "ETGMCreateNewGroupModal-b7"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b7"].message
            );
          });

          test('Run verifyProps(): If "groupCloseAll" is a bool (true), do not throw error "ETGMCreateNewGroupModal-b7"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {
                  groupCloseAll: true,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b7"].message
            );
          });

          test('Run verifyProps(): If "groupCloseAll" is a bool (false), do not throw error "ETGMCreateNewGroupModal-b7"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {
                  groupCloseAll: false,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b7"].message
            );
          });

          test.each(various_nonBool_nonUndefined)(
            'Run verifyProps(): If "groupCloseAll" = %p (is neither a boolean nor undefined), throw error "ETGMCreateNewGroupModal-b7"',
            (val) => {
              const presetProps = {
                fieldErrors: {},
                onChange: () => {},
                tabGroupDetails: {},

                data: {
                  params: {
                    groupCloseAll: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              expect(() => componentInstance.verifyProps()).toThrowError(
                expectedErrorReturns["ETGMCreateNewGroupModal-b7"].message
              );
            }
          );
        });

        describe('Try out different this.props.data.params.groupCloseInactiveTabs (in the following tests called "groupCloseInactiveTabs") values', () => {
          test('Run verifyProps(): If "groupCloseInactiveTabs" is missing, do not throw error "ETGMCreateNewGroupModal-b8"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b8"].message
            );
          });

          test('Run verifyProps(): If "groupCloseInactiveTabs" is a bool (true), do not throw error "ETGMCreateNewGroupModal-b8"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {
                  groupCloseInactiveTabs: true,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b8"].message
            );
          });

          test('Run verifyProps(): If "groupCloseInactiveTabs" is a bool (false), do not throw error "ETGMCreateNewGroupModal-b8"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {
                  groupCloseInactiveTabs: false,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b8"].message
            );
          });

          test.each(various_nonBool_nonUndefined)(
            'Run verifyProps(): If "groupCloseInactiveTabs" = %p (is neither a boolean nor undefined), throw error "ETGMCreateNewGroupModal-b8"',
            (val) => {
              const presetProps = {
                fieldErrors: {},
                onChange: () => {},
                tabGroupDetails: {},

                data: {
                  params: {
                    groupCloseInactiveTabs: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              expect(() => componentInstance.verifyProps()).toThrowError(
                expectedErrorReturns["ETGMCreateNewGroupModal-b8"].message
              );
            }
          );
        });

        describe('Try out different this.props.data.params.groupDescription (in the following tests called "groupDescription") values', () => {
          test('Run verifyProps(): If "groupDescription" is missing, do not throw error "ETGMCreateNewGroupModal-b9"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b9"].message
            );
          });

          test('Run verifyProps(): If "groupDescription" is astring, do not throw error "ETGMCreateNewGroupModal-b9"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {
                  groupDescription: "blablabla this is a test string",
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b9"].message
            );
          });

          test.each(various_nonString_nonUndefined)(
            'Run verifyProps(): If "groupDescription" = %p (is neither a string nor undefined), throw error "ETGMCreateNewGroupModal-b9"',
            (val) => {
              const presetProps = {
                fieldErrors: {},
                onChange: () => {},
                tabGroupDetails: {},

                data: {
                  params: {
                    groupDescription: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              expect(() => componentInstance.verifyProps()).toThrowError(
                expectedErrorReturns["ETGMCreateNewGroupModal-b9"].message
              );
            }
          );
        });

        describe('Try out different this.props.data.params.groupDontAskAgain (in the following tests called "groupDontAskAgain") values', () => {
          test('Run verifyProps(): If "groupDontAskAgain" is missing, do not throw error "ETGMCreateNewGroupModal-b10"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b10"].message
            );
          });

          test('Run verifyProps(): If "groupDontAskAgain" is a bool (true), do not throw error "ETGMCreateNewGroupModal-b10"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {
                  groupDontAskAgain: true,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b10"].message
            );
          });

          test('Run verifyProps(): If "groupDontAskAgain" is a bool (false), do not throw error "ETGMCreateNewGroupModal-b10"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {
                  groupDontAskAgain: false,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b10"].message
            );
          });

          test.each(various_nonBool_nonUndefined)(
            'Run verifyProps(): If "groupDontAskAgain" = %p (is neither a boolean nor undefined), throw error "ETGMCreateNewGroupModal-b10"',
            (val) => {
              const presetProps = {
                fieldErrors: {},
                onChange: () => {},
                tabGroupDetails: {},

                data: {
                  params: {
                    groupDontAskAgain: val,
                  },
                },
              };
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              expect(() => componentInstance.verifyProps()).toThrowError(
                expectedErrorReturns["ETGMCreateNewGroupModal-b10"].message
              );
            }
          );
        });

        describe('Try out different this.props.data.params.type (in the following tests called "type") values', () => {
          test('Run verifyProps(): If "type" is missing, do not throw error "ETGMCreateNewGroupModal-b11"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {},
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b11"].message
            );
          });

          test('Run verifyProps(): If "type" is astring, do not throw error "ETGMCreateNewGroupModal-b11"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {
                  type: "blablabla this is a test string for the type prop",
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).not.toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b11"].message
            );
          });

          test.each(various_nonString_nonUndefined)(
            'Run verifyProps(): If "type" = %p (is neither a string nor undefined), throw error "ETGMCreateNewGroupModal-b11"',
            (val) => {
              const presetProps = {
                fieldErrors: {},
                onChange: () => {},
                tabGroupDetails: {},

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

              expect(() => componentInstance.verifyProps()).toThrowError(
                expectedErrorReturns["ETGMCreateNewGroupModal-b11"].message
              );
            }
          );

          test('Run verifyProps(): If type is a string, but not either "currently-opened", "existing-group" nor "new-group". Throw error "ETGMCreateNewGroupModal-b12"', () => {
            const presetProps = {
              fieldErrors: {},
              onChange: () => {},
              tabGroupDetails: {},

              data: {
                params: {
                  type: "This type value string is definetly not valid",
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            expect(() => componentInstance.verifyProps()).toThrowError(
              expectedErrorReturns["ETGMCreateNewGroupModal-b12"].message
            );
          });
        });
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
