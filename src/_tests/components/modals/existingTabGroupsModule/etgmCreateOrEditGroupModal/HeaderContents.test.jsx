import React from "react";
import { shallow } from "enzyme";
import HeaderContents from "./../../../../../components/modals/existingTabGroupsModule/etgmCreateOrEditGroupModal/HeaderContents.jsx";
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

  describe("Test determineTitle()", () => {
    test("Run determineTitle(): If the this.props.data is missing, then return the string expected in this test", () => {
      const presetProps = {};
      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });
      componentInstance = testComponent.instance();

      expect(componentInstance.determineTitle()).toBe(
        "Unidentifiable title [0]"
      );
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

        expect(componentInstance.determineTitle()).toBe(
          "Unidentifiable title [0]"
        );
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

      expect(componentInstance.determineTitle()).toBe(
        "Unidentifiable title [1]"
      );
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

        expect(componentInstance.determineTitle()).toBe(
          "Unidentifiable title [1]"
        );
      }
    );

    test('Run determineTitle(): If the "type" key (located in this.props.data.params) is missing, then return the string expected in this test', () => {
      const presetProps = {
        data: {
          params: {},
        },
      };
      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });
      componentInstance = testComponent.instance();

      expect(componentInstance.determineTitle()).toBe(
        "Unidentifiable title [2]"
      );
    });

    test.each(various_values)(
      'Run determineTitle(): If the "type" key (located in this.props.data.params) does not equal either "currently-opened", "new-group" or "existing-group" - then return the string expected in this test',
      (val) => {
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

        expect(componentInstance.determineTitle()).toBe(
          "Unidentifiable title [2]"
        );
      }
    );

    test('Run determineTitle(): If the "type" key (located in this.props.data.params) equals "currently-opened", return the string expected in this test', () => {
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

      expect(componentInstance.determineTitle()).toBe("Create a New Tab Group");
    });

    test('Run determineTitle(): If the "type" key (located in this.props.data.params) equals "new-group", return the string expected in this test', () => {
      const presetProps = {
        data: {
          params: {
            type: "new-group",
          },
        },
      };
      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });
      componentInstance = testComponent.instance();

      expect(componentInstance.determineTitle()).toBe("Create a New Tab Group");
    });

    test('Run determineTitle(): If the "type" key equals "existing-group" and the "groupName" key is missing, return the string expected in this test (both keys are located in this.props.data.params) ', () => {
      const presetProps = {
        data: {
          params: {
            type: "existing-group",
          },
        },
      };
      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });
      componentInstance = testComponent.instance();

      expect(componentInstance.determineTitle()).toBe(
        'Edit the "' + "" + '" tab group'
      );
    });

    test.each(various_nonString)(
      'Run determineTitle(): If the "type" key equals "existing-group" and the "groupName" = %p (not a string), return the string expected in this test (both keys are located in this.props.data.params) ',
      (val) => {
        const presetProps = {
          data: {
            params: {
              groupName: val,
              type: "existing-group",
            },
          },
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.determineTitle()).toBe(
          'Edit the "' + "" + '" tab group'
        );
      }
    );

    test.each([
      ["Captain America - The first avenger"],
      ["Iron Man 2"],
      ["Thor the dark world"],
      ["Avengers: Infinity War"],
    ])(
      'Run determineTitle(): If the "type" key equals "existing-group" and the "groupName" = %p (a string), return the string expected in this test (both keys are located in this.props.data.params) ',
      (val) => {
        const presetProps = {
          data: {
            params: {
              groupName: val,
              type: "existing-group",
            },
          },
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(componentInstance.determineTitle()).toBe(
          'Edit the "' + val + '" tab group'
        );
      }
    );
  });

  describe("Test verifyProps()", () => {
    describe("Try out different this.props.data values", () => {
      test('Run verifyProps(): If this.props.data is missing, throw error "ETGMCreateNewGroupModal-h1"', () => {
        expect(() => componentInstance.verifyProps()).toThrowError(
          expectedErrorReturns["ETGMCreateNewGroupModal-h1"].message
        );
      });

      test.each(various_nonObjects)(
        'Run verifyProps(): If this.props.data = %p (not an object), throw error "ETGMCreateNewGroupModal-h1"',
        (val) => {
          const presetProps = {
            data: val,
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMCreateNewGroupModal-h1"].message
          );
        }
      );

      test('Run verifyProps(): If this.props.data is an object, do not throw error "ETGMCreateNewGroupModal-h1"', () => {
        const presetProps = {
          data: {},
        };
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => componentInstance.verifyProps()).not.toThrowError(
          expectedErrorReturns["ETGMCreateNewGroupModal-h1"].message
        );
      });
    });

    describe("Try out different values of the keys inside this.props.data.", () => {
      describe("Try out different this.props.data.params values", () => {
        test('Run verifyProps(): If this.props.data.params is missing, throw error "ETGMCreateNewGroupModal-h2"', () => {
          const presetProps = {
            data: {},
          };

          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });

          componentInstance = testComponent.instance();

          expect(() => componentInstance.verifyProps()).toThrowError(
            expectedErrorReturns["ETGMCreateNewGroupModal-h2"].message
          );
        });

        test.each(various_nonObjects)(
          'Run verifyProps(): If this.props.data.params = %p (not an object), throw error "ETGMCreateNewGroupModal-h2"',
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
              expectedErrorReturns["ETGMCreateNewGroupModal-h2"].message
            );
          }
        );

        test('Run verifyProps(): If this.props.data.params is an object, do not throw error "ETGMCreateNewGroupModal-h2"', () => {
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
            expectedErrorReturns["ETGMCreateNewGroupModal-h2"].message
          );
        });
      });

      describe("Try out different keys inside of the this.props.data.params object", () => {
        describe('Try out different this.props.data.params.groupName (in the following called "groupName") values', () => {
          test('Run verifyProps(): If "groupName" is missing, do not throw error "ETGMCreateNewGroupModal-h3"', () => {
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
              expectedErrorReturns["ETGMCreateNewGroupModal-h3"].message
            );
          });

          test('Run verifyProps(): If "groupName" is a string, do not throw error "ETGMCreateNewGroupModal-h3"', () => {
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
              expectedErrorReturns["ETGMCreateNewGroupModal-h3"].message
            );
          });

          test.each(various_nonString_nonUndefined)(
            'Run verifyProps(): If "groupName" = %p (is neither a string nor undefined), throw error "ETGMCreateNewGroupModal-h3"',
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
                expectedErrorReturns["ETGMCreateNewGroupModal-h3"].message
              );
            }
          );
        });

        describe('Try out different this.props.data.params.type (in the following tests called "type") values', () => {
          test('Run verifyProps(): If "type" is missing, do not throw error "ETGMCreateNewGroupModal-h4"', () => {
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
              expectedErrorReturns["ETGMCreateNewGroupModal-h4"].message
            );
          });

          test('Run verifyProps(): If "type" is astring, do not throw error "ETGMCreateNewGroupModal-h4"', () => {
            const presetProps = {
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
              expectedErrorReturns["ETGMCreateNewGroupModal-h4"].message
            );
          });

          test.each(various_nonString_nonUndefined)(
            'Run verifyProps(): If "type" = %p (is neither a string nor undefined), throw error "ETGMCreateNewGroupModal-h4"',
            (val) => {
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

              expect(() => componentInstance.verifyProps()).toThrowError(
                expectedErrorReturns["ETGMCreateNewGroupModal-h4"].message
              );
            }
          );

          test('Run verifyProps(): If type is a string, but not either "currently-opened", "existing-group" nor "new-group". Throw error "ETGMCreateNewGroupModal-h5"', () => {
            const presetProps = {
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
              expectedErrorReturns["ETGMCreateNewGroupModal-h5"].message
            );
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
});
