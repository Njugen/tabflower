import React, { Fragment } from "react";
import { shallow, mount, render } from "enzyme";
import COTMRemoveTabModal from "../../../../../components/modals/currentlyOpenedTabsModule/cotmRemoveTabModal";
import * as ExceptionsHandler from "../../../../../components/utils/exceptionsAndHandler";
import * as validator from "../../../../../components/utils/inputValidators";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<COTMRemoveTabModal {...props} />, options);
  return component;
};

let presetProps = {
  data: {},
  onRaiseToErrorOverlay: "",
  onDismiss: "",
};

let testComponent;
let componentInstance;

describe("Test <COTMRemoveTabModal /> component behaviour at mount", () => {
  const actualErrorReturns = {
    "COTMRemoveTabModal-101": ExceptionsHandler.ValidatorError(
      "COTMRemoveTabModal-101"
    ),
    "COTMRemoveTabModal-102": ExceptionsHandler.ValidatorError(
      "COTMRemoveTabModal-102"
    ),
    "COTMRemoveTabModal-103": ExceptionsHandler.ValidatorError(
      "COTMRemoveTabModal-103"
    ),
    "COTMRemoveTabModal-104": ExceptionsHandler.ValidatorError(
      "COTMRemoveTabModal-104"
    ),
    "COTMRemoveTabModal-105": ExceptionsHandler.ValidatorError(
      "COTMRemoveTabModal-105"
    ),
    "COTMRemoveTabModal-106": ExceptionsHandler.ValidatorError(
      "COTMRemoveTabModal-106"
    ),
    "COTMRemoveTabModal-107": ExceptionsHandler.ValidatorError(
      "COTMRemoveTabModal-107"
    ),
    "COTMRemoveTabModal-108": ExceptionsHandler.ValidatorError(
      "COTMRemoveTabModal-108"
    ),
  };

  const expectedErrorReturns = {
    "COTMRemoveTabModal-101": {
      name: "ValidatorError",
      message:
        "The targetted tab could not be identified since its unique identification number is missing or provided in wrong format. This might be caused if the tab information has been modified per request. Please, make sure the tab information has not been modified after being retrieved directly from the browser. As a result, the targetted tab cannot be deleted at this time.",
      code: "COTMRemoveTabModal-101",
    },
    "COTMRemoveTabModal-102": {
      name: "ValidatorError",
      message:
        "No data container nor data parameter containers were found in the props, therefore the tab cannot be closed at this point.",
      code: "COTMRemoveTabModal-102",
    },
    "COTMRemoveTabModal-103": {
      name: "ValidatorError",
      message: "The callback parameter is not a function.",
      code: "COTMRemoveTabModal-103",
    },
    "COTMRemoveTabModal-104": {
      name: "ValidatorError",
      message:
        "The title of the targetted tab is missing. As the title is missing, other information related to the targetted tab could be missing or incorrect as well. As a precaution, no tab will be deleted as the extension cannot guarantee that the correct tab is targetted.",
      code: "COTMRemoveTabModal-104",
    },
    "COTMRemoveTabModal-105": {
      name: "ValidatorError",
      message:
        "No information about the targetted tab could be retrieved, therefore the tab cannot be closed at this point.",
      code: "COTMRemoveTabModal-105",
    },
    "COTMRemoveTabModal-106": {
      name: "ValidatorError",
      message:
        "The data parameter in renderBodyContents() of COTMRemoveTabModal, needs to be an object",
      code: "COTMRemoveTabModal-106",
    },
    "COTMRemoveTabModal-107": {
      name: "ValidatorError",
      message:
        "The data parameter in renderHeaderContents() of COTMRemoveTabModal, needs to be an object",
      code: "COTMRemoveTabModal-107",
    },
    "COTMRemoveTabModal-108": {
      name: "ValidatorError",
      message:
        "The data parameter in renderFooterContents() of COTMRemoveTabModal, needs to be an object",
      code: "COTMRemoveTabModal-108",
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

  describe("Test verifyChildProps()", () => {
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

    describe("Examine the data object of this.props", () => {
      test('Run verifyChildProps(): If this.props.data is missing, throw an error "COTMRemoveTabModal-105"', () => {
        expect(() => {
          const presetProps = {};
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.verifyChildProps();
        }).toThrow(expectedErrorReturns["COTMRemoveTabModal-105"]);
      });

      test.each(various_nonObjects)(
        'Run verifyChildProps(): If this.props.data = %p (is not an object), throw an error "COTMRemoveTabModal-105"',
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
          }).toThrow(expectedErrorReturns["COTMRemoveTabModal-105"]);
        }
      );

      test('Run verifyChildProps(): If "params" is missing in this.props.data, throw an error "COTMRemoveTabModal-105"', () => {
        expect(() => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.verifyChildProps();
        }).toThrow(expectedErrorReturns["COTMRemoveTabModal-105"]);
      });

      test.each(various_nonObjects)(
        'Run verifyChildProps(): If "params" = %p (is not an object) in in this.props.data, throw an error "COTMRemoveTabModal-105"',
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
          }).toThrow(expectedErrorReturns["COTMRemoveTabModal-105"]);
        }
      );

      test('Run verifyChildProps(): If this.props.data.params is an object, do not throw an error "COTMRemoveTabModal-105"', () => {
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
        }).not.toThrow(expectedErrorReturns["COTMRemoveTabModal-105"]);
      });
    });

    describe('Examine the "tabInfo" of this.props.data.params', () => {
      test.each(various_nonObjects)(
        'Run verifyChildProps(): If "tabInfo" = %p (is not an object) in in this.props.data.params, throw an error "COTMRemoveTabModal-102"',
        (val) => {
          const presetProps = {
            data: {
              params: {
                tabInfo: val,
              },
            },
          };

          expect(() => {
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).toThrow(expectedErrorReturns["COTMRemoveTabModal-102"]);
        }
      );

      test('Run verifyChildProps(): If "tabInfo" is missing in this.props.data.params, throw an error "COTMRemoveTabModal-102"', () => {
        const presetProps = {
          data: {
            params: {},
          },
        };

        expect(() => {
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.verifyChildProps();
        }).toThrow(expectedErrorReturns["COTMRemoveTabModal-102"]);
      });

      test('Run verifyChildProps(): If "tabInfo" is an object in this.props.data.params, do not throw an error "COTMRemoveTabModal-102"', () => {
        const presetProps = {
          data: {
            params: {
              tabInfo: {},
            },
          },
        };

        expect(() => {
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          componentInstance.verifyChildProps();
        }).not.toThrow(expectedErrorReturns["COTMRemoveTabModal-102"]);
      });

      describe("Examine this.props.data.params.tabInfo.id", () => {
        const various_nonNumber = [
          ["a very weird looking text string"],
          [{ item: 123 }],
          [false],
          [true],
          [undefined],
          [[1, 2, 3, 4]],
          [() => {}],
          [null],
        ];

        test('Run verifyChildProps(): If "id" is not provided by this.props.data.params.tabInfo, throw an error "COTMRemoveTabModal-101"', () => {
          const presetProps = {
            data: {
              params: {
                tabInfo: {},
              },
            },
          };

          expect(() => {
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).toThrow(expectedErrorReturns["COTMRemoveTabModal-101"]);
        });

        test.each(various_nonNumber)(
          'Run verifyChildProps(): If the "id" = %p (provided by this.props.data.params.tabInfo is not a number), throw an error "COTMRemoveTabModal-101"',
          (val) => {
            const presetProps = {
              data: {
                params: {
                  tabInfo: {
                    id: val,
                  },
                },
              },
            };

            expect(() => {
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              componentInstance.verifyChildProps();
            }).toThrow(expectedErrorReturns["COTMRemoveTabModal-101"]);
          }
        );

        test('Run verifyChildProps(): If "id" provided by this.props.data.params.tabInfo is a number, do not throw an error "COTMRemoveTabModal-101"', () => {
          const presetProps = {
            data: {
              params: {
                tabInfo: {
                  id: 45,
                },
              },
            },
          };

          expect(() => {
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(expectedErrorReturns["COTMRemoveTabModal-101"]);
        });
      });

      describe("Examine this.props.data.params.tabInfo.title", () => {
        const various_nonString = [
          [20],
          [{ item: 123 }],
          [false],
          [true],
          [undefined],
          [[1, 2, 3, 4]],
          [() => {}],
          [null],
        ];

        test('Run verifyChildProps(): If "title" is not provided by this.props.data.params.tabInfo, throw an error "COTMRemoveTabModal-104"', () => {
          const presetProps = {
            data: {
              params: {
                tabInfo: {
                  id: 20,
                },
              },
            },
          };

          expect(() => {
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).toThrow(expectedErrorReturns["COTMRemoveTabModal-104"]);
        });

        test.each(various_nonString)(
          'Run verifyChildProps(): If the "title" = %p (provided by this.props.data.params.tabInfo is not a string), throw an error "COTMRemoveTabModal-104"',
          (val) => {
            const presetProps = {
              data: {
                params: {
                  tabInfo: {
                    id: 20,
                    title: val,
                  },
                },
              },
            };

            expect(() => {
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();

              componentInstance.verifyChildProps();
            }).toThrow(expectedErrorReturns["COTMRemoveTabModal-104"]);
          }
        );

        test('Run verifyChildProps(): If "title" provided by this.props.data.params.tabInfo is a string, do not throw an error "COTMRemoveTabModal-104"', () => {
          const presetProps = {
            data: {
              params: {
                tabInfo: {
                  id: 20,
                  title: "Dummy String",
                },
              },
            },
          };

          expect(() => {
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();

            componentInstance.verifyChildProps();
          }).not.toThrow(expectedErrorReturns["COTMRemoveTabModal-104"]);
        });
      });
    });
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
      test('Run childComponentDidMount(): if this.props.data object is missing, throw an error "COTMRemoveTabModal-105"', () => {
        const presetProps = {};
        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();
        componentInstance.childComponentDidMount();

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "COTMRemoveTabModal-105"
        );
      });

      test.each(various_nonObjects)(
        'Run childComponentDidMount(): if this.props.data = %p (is not an object), throw an error "COTMRemoveTabModal-105"',
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
            "COTMRemoveTabModal-105"
          );
        }
      );

      describe('Examine the "params" object of this.props.data', () => {
        test('Run childComponentDidMount(): if this.props.data.params object is missing, throw an error "COTMRemoveTabModal-105"', () => {
          const presetProps = {
            data: {},
          };
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.childComponentDidMount();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "COTMRemoveTabModal-105"
          );
        });

        test.each(various_nonObjects)(
          'Run childComponentDidMount(): if this.props.data.params = %p (is not an object), throw an error "COTMRemoveTabModal-105"',
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
              "COTMRemoveTabModal-105"
            );
          }
        );

        test('Run childComponentDidMount(): if this.props.data.params is an object, do not throw an error "COTMRemoveTabModal-105"', () => {
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

          expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
            "COTMRemoveTabModal-105"
          );
        });
      });

      describe('Examine the "tabInfo" object of this.props.data.params', () => {
        test('Run childComponentDidMount(): If this.props.data.params.tabInfo is missing, throw an error "COTMRemoveTabModal-102"', () => {
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
            "COTMRemoveTabModal-102"
          );
        });

        test.each(various_nonObjects)(
          'Run childComponentDidMount(): If this.props.data.params.tabInfo = %p (is not an object), throw an error "COTMRemoveTabModal-102"',
          (val) => {
            const presetProps = {
              data: {
                params: {
                  tabInfo: val,
                },
              },
            };
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.childComponentDidMount();

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "COTMRemoveTabModal-102"
            );
          }
        );

        test.each(various_nonObjects)(
          "Run childComponentDidMount(): If this.props.data.params.tabInfo is an object, pass it to this.setState()",
          (val) => {
            const presetProps = {
              data: {
                params: {
                  tabInfo: {},
                },
              },
            };

            const data = presetProps.data.params.tabInfo;

            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.setState = jest.fn();
            componentInstance.childComponentDidMount();

            expect(componentInstance.setState).toHaveBeenCalledWith({ data });
          }
        );
      });
    });
  });

  describe("Test saveModalHandler(callback)", () => {
    const various_nonFunctions = [
      ["a very weird looking text string"],
      [77],
      [false],
      [true],
      [undefined],
      [[1, 2, 3, 4]],
      [{ key: "value" }],
      [null],
    ];

    test('Run saveModalHandler(): callback input is missing. Throw an error "COTMRemoveTabModal-103"', () => {
      componentInstance.saveModalHandler();

      expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
        "COTMRemoveTabModal-103"
      );
    });

    test.each(various_nonFunctions)(
      'Run saveModalHandler(%p): callback input is not a function. Throw an error "COTMRemoveTabModal-103"',
      (val) => {
        componentInstance.saveModalHandler(val);

        expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
          "COTMRemoveTabModal-103"
        );
      }
    );

    test("Run saveModalHandler(callbackFunction), where callbackFunction is a function: The this.clearModalData() should get called, with callback(this.state) as its payload", () => {
      const callbackFunction = jest.fn();
      componentInstance.clearModalData = jest.fn();
      componentInstance.saveModalHandler(callbackFunction);

      expect(componentInstance.clearModalData).toHaveBeenCalledWith(
        callbackFunction()
      );
      expect(callbackFunction).toHaveBeenCalled();
      expect(callbackFunction).toHaveBeenCalledWith(componentInstance.state);
    });
  });

  describe("Test renderBodyContents()", () => {
    describe('Examine "data" parameter', () => {
      test('Run renderBodyContents(data): If "data" parameter is undefined, throw the error message of "COTMRemoveTabModal-106"', () => {
        expect(() => componentInstance.renderBodyContents()).toThrow(
          expectedErrorReturns["COTMRemoveTabModal-106"].message
        );
      });

      test.each(various_nonObjects)(
        'Run renderBodyContents(%p): throw the error message of "COTMRemoveTabModal-106"',
        (val) => {
          expect(() => componentInstance.renderBodyContents(val)).toThrow(
            expectedErrorReturns["COTMRemoveTabModal-106"].message
          );
        }
      );

      test('Run renderBodyContents(data): If "data" is an object, do not throw error message of "COTMRemoveTabModal-106"', () => {
        componentInstance = testComponent.instance();

        expect(() => componentInstance.renderBodyContents({})).not.toThrow(
          expectedErrorReturns["COTMRemoveTabModal-106"].message
        );
      });
    });
  });

  describe("Test renderHeaderContents()", () => {
    describe('Examine "data" parameter', () => {
      test('Run renderHeaderContents(data): If "data" parameter is undefined, throw the error message of "COTMRemoveTabModal-107"', () => {
        expect(() => componentInstance.renderHeaderContents()).toThrow(
          expectedErrorReturns["COTMRemoveTabModal-107"].message
        );
      });

      test.each(various_nonObjects)(
        'Run renderHeaderContents(%p): throw the error message of "COTMRemoveTabModal-107"',
        (val) => {
          expect(() => componentInstance.renderHeaderContents(val)).toThrow(
            expectedErrorReturns["COTMRemoveTabModal-107"].message
          );
        }
      );

      test('Run renderHeaderContents(data): If "data" is an object, do not throw error message of "COTMRemoveTabModal-107"', () => {
        componentInstance = testComponent.instance();

        expect(() => componentInstance.renderHeaderContents({})).not.toThrow(
          expectedErrorReturns["COTMRemoveTabModal-107"].message
        );
      });
    });
  });

  describe("Test renderFooterContents()", () => {
    describe('Examine "data" parameter', () => {
      test('Run renderFooterContents(data): If "data" parameter is undefined, throw the error message of "COTMRemoveTabModal-108"', () => {
        expect(() => componentInstance.renderFooterContents()).toThrow(
          expectedErrorReturns["COTMRemoveTabModal-108"].message
        );
      });

      test.each(various_nonObjects)(
        'Run renderFooterContents(%p): throw the error message of "COTMRemoveTabModal-108"',
        (val) => {
          expect(() => componentInstance.renderFooterContents(val)).toThrow(
            expectedErrorReturns["COTMRemoveTabModal-108"].message
          );
        }
      );

      test('Run renderFooterContents(data): If "data" is an object, do not throw error message of "COTMRemoveTabModal-108"', () => {
        componentInstance = testComponent.instance();

        expect(() => componentInstance.renderFooterContents({})).not.toThrow(
          expectedErrorReturns["COTMRemoveTabModal-108"].message
        );
      });
    });
  });
});
