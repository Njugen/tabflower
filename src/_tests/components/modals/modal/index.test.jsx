import React from "react";
import { shallow } from "enzyme";
import Modal from "./../../../../components/modals/modal";
import * as ExceptionsHandler from "./../../../../components/utils/exceptionsAndHandler";
import * as validator from "./../../../../components/utils/inputValidators";
import { PropTypes } from "prop-types";

const predefinedComponent = (props, options) => {
  props = props || {};

  const component = shallow(<Modal {...props} />, options);
  return component;
};

const presetProps = {
  data: {},
};

let testComponent;
let componentInstance;

describe("Test <Modal /> component behaviour at mount", () => {
  const actualErrorReturns = {
    "mp-verifyProps-101": ExceptionsHandler.ValidatorError(
      "mp-verifyProps-101"
    ),
    "mp-verifyProps-102": ExceptionsHandler.ValidatorError(
      "mp-verifyProps-102"
    ),
    "mp-verifyProps-103": ExceptionsHandler.ValidatorError(
      "mp-verifyProps-103"
    ),
    "mp-verifyProps-104": ExceptionsHandler.ValidatorError(
      "mp-verifyProps-104"
    ),
    "mp-verifyProps-105": ExceptionsHandler.ValidatorError(
      "mp-verifyProps-105"
    ),
    "mp-verifyProps-106": ExceptionsHandler.ValidatorError(
      "mp-verifyProps-106"
    ),
    "mp-verifyProps-107": ExceptionsHandler.ValidatorError(
      "mp-verifyProps-107"
    ),
    "mp-verifyProps-108": ExceptionsHandler.ValidatorError(
      "mp-verifyProps-108"
    ),
    "mp-verifyProps-109": ExceptionsHandler.ValidatorError(
      "mp-verifyProps-109"
    ),
    "mp-verifyProps-110": ExceptionsHandler.ValidatorError(
      "mp-verifyProps-110"
    ),

    "mp-fadeIn-101": ExceptionsHandler.ValidatorError("mp-fadeIn-101"),
    "mp-fadeIn-102": ExceptionsHandler.ValidatorError("mp-fadeIn-102"),

    "mp-fadeOut-101": ExceptionsHandler.ValidatorError("mp-fadeIn-101"),
    "mp-fadeOut-102": ExceptionsHandler.ValidatorError("mp-fadeIn-102"),

    "mp-saveToState-104": ExceptionsHandler.ValidatorError(
      "mp-saveToState-104"
    ),
    "mp-saveToState-105": ExceptionsHandler.ValidatorError(
      "mp-saveToState-105"
    ),
    "mp-saveToState-106": ExceptionsHandler.ValidatorError(
      "mp-saveToState-106"
    ),
    "mp-saveToState-107": ExceptionsHandler.ValidatorError(
      "mp-saveToState-107"
    ),

    "mp-propsAction-101": ExceptionsHandler.ValidatorError(
      "mp-propsAction-101"
    ),
    "mp-propsAction-102": ExceptionsHandler.ValidatorError(
      "mp-propsAction-102"
    ),

    "mp-clearModalData-103": ExceptionsHandler.ValidatorError(
      "mp-clearModalData-103"
    ),
  };

  const expectedErrorReturns = {
    "mp-verifyProps-101": {
      name: "ValidatorError",
      message:
        'The "onDismiss" props function is missing in the requested modal. Request aborted.',
      code: "mp-verifyProps-101",
    },
    "mp-verifyProps-102": {
      name: "ValidatorError",
      message:
        'The "onRaiseToErrorOverlay" props function is missing in the requested modal. Request aborted.',
      code: "mp-verifyProps-102",
    },
    "mp-verifyProps-103": {
      name: "ValidatorError",
      message:
        'The "data" props is either not an object, or is missing, in the requested modal. Request aborted.',
      code: "mp-verifyProps-103",
    },
    "mp-verifyProps-104": {
      name: "ValidatorError",
      message:
        'A modal always need to be requested using an "params" object. Request aborted',
      code: "mp-verifyProps-104",
    },
    "mp-verifyProps-105": {
      name: "ValidatorError",
      message:
        'A state object is missing in the "Modal" component. Request aborted',
      code: "mp-verifyProps-105",
    },
    "mp-verifyProps-106": {
      name: "ValidatorError",
      message:
        'A ui object is missing in the state object of the "Modal" component. Request aborted',
      code: "mp-verifyProps-106",
    },
    "mp-verifyProps-107": {
      name: "ValidatorError",
      message:
        'A fieldErrors object is missing in the state object of the "Modal" component. Request aborted',
      code: "mp-verifyProps-107",
    },
    "mp-verifyProps-108": {
      name: "ValidatorError",
      message:
        'The "errorData" parameter in the raiseToErrorOverlay() needs to be an object. The attempt to forward the error data failed',
      code: "mp-verifyProps-108",
    },
    "mp-verifyProps-109": {
      name: "ValidatorError",
      message:
        'The "onRaiseToErrorOverlay" parameter in the <Modal> or its child component needs to be a function. The attempt to forward the error data failed',
      code: "mp-verifyProps-109",
    },
    "mp-verifyProps-110": {
      name: "ValidatorError",
      message:
        'The "errors" parameter in saveFieldErrorsToState() needs to be either an non-array object or undefined',
      code: "mp-verifyProps-110",
    },

    "mp-fadeIn-101": {
      name: "ValidatorError",
      message:
        "A style object is missing in the modal's jsx component. Style cannot be set",
      code: "mp-fadeIn-101",
    },
    "mp-fadeIn-102": {
      name: "ValidatorError",
      message:
        "A reference to the JSX element representing the modal is missing or is invalid",
      code: "mp-fadeIn-102",
    },

    "mp-fadeOut-101": {
      name: "ValidatorError",
      message:
        "A style object is missing in the modal's jsx component. Style cannot be set",
      code: "mp-fadeIn-101",
    },
    "mp-fadeOut-102": {
      name: "ValidatorError",
      message:
        "A reference to the JSX element representing the modal is missing or is invalid",
      code: "mp-fadeIn-102",
    },

    "mp-saveToState-104": {
      name: "ValidatorError",
      message: 'The "value" parameter is undefined. Data was not saved',
      code: "mp-saveToState-104",
    },
    "mp-saveToState-105": {
      name: "ValidatorError",
      message: 'The "area" parameter is not a string. Data was not saved.',
      code: "mp-saveToState-105",
    },
    "mp-saveToState-106": {
      name: "ValidatorError",
      message: 'The "callback" parameter is not a function',
      code: "mp-saveToState-106",
    },
    "mp-saveToState-107": {
      name: "ValidatorError",
      message: 'The "area" parameter is not a string. Data was not saved.',
      code: "mp-saveToState-107",
    },

    "mp-propsAction-101": {
      name: "ValidatorError",
      message:
        "The modal could not execute the requested action connected to it because it is invalid. The task(s) were ignored.",
      code: "mp-propsAction-101",
    },
    "mp-propsAction-102": {
      name: "ValidatorError",
      message:
        "The modal could not execute any actions because there is none connected to it. The execution attempt was aborted.",
      code: "mp-propsAction-102",
    },

    "mp-clearModalData-103": {
      name: "ValidatorError",
      message: "The callback parameter is not a function",
      code: "mp-clearModalData-103",
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

  describe("Test basic <Modal> render", () => {});

  describe("Test this.componentWillUnmount() lifesycle method (as a unit)", () => {
    test('this.handleOverflow("auto", "auto") should be called by this.componentWillUnmount()', () => {
      componentInstance.handleOverflow = jest.fn();
      componentInstance.componentWillUnmount();

      expect(componentInstance.handleOverflow).toHaveBeenCalledWith(
        "auto",
        "auto"
      );
    });

    test('document.removeEventListener("scroll", any function) should be called by this.componentWillUnmount()', () => {
      componentInstance.handleOverflow = jest.fn();
      componentInstance.scrollHandler = jest.fn();
      document.removeEventListener = jest.fn();
      componentInstance.componentWillUnmount();

      expect(document.removeEventListener).toHaveBeenCalledWith(
        "scroll",
        componentInstance.scrollHandler
      );
    });
  });

  describe("Test this.componentDidMount() lifecycle method (as a unit)", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.useRealTimers();

      const presetProps = {};
      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });
      componentInstance = testComponent.instance();

      componentInstance.fadeIn = jest.fn();
      componentInstance.verifyChildProps = jest.fn();
      componentInstance.handleOverflow = jest.fn();
      componentInstance.childComponentDidMount = jest.fn();
      document.addEventListener = jest.fn();
      componentInstance.verifyProps = jest.fn();
      componentInstance.verifyState = jest.fn();

      ExceptionsHandler.ErrorHandler = jest.fn();
      ExceptionsHandler.ValidatorError = jest.fn();
      ExceptionsHandler.ValidatorError.mockImplementation((errCode) => {
        return actualErrorReturns[errCode];
      });
    });

    test("this.verifyProps() should be called by this.componentDidMount()", () => {
      componentInstance.componentDidMount();

      expect(componentInstance.verifyProps).toHaveBeenCalled();
    });

    test("this.verifyState() should be called by this.componentDidMount()", () => {
      componentInstance.componentDidMount();

      expect(componentInstance.verifyState).toHaveBeenCalled();
    });

    test("setTimeout (the one with this.fadeIn() in its callback) triggers in 100ms by this.componentDidMount()", () => {
      jest.useFakeTimers();

      componentInstance.componentDidMount();

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 100);

      jest.useRealTimers();
    });

    test("fadeIn() should get called by this.componentDidMount(), when its setTimeout wrapper expires", () => {
      jest.useFakeTimers();

      componentInstance.componentDidMount();
      jest.runAllTimers();

      expect(componentInstance.fadeIn).toHaveBeenCalled();

      jest.useRealTimers();
    });

    test("this.verifyChildProps() should get called by this.componentDidMount(), if it is a function", () => {
      componentInstance.componentDidMount();

      expect(componentInstance.verifyChildProps).toHaveBeenCalled();
    });

    test('document.addEventListener("scroll", any function) should get called by this.componentDidMount()', () => {
      componentInstance.componentDidMount();

      expect(document.addEventListener).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function)
      );
    });

    test('this.handleOverflow("hidden", "auto") should get called by this.componentDidMount()', () => {
      componentInstance.componentDidMount();

      expect(componentInstance.handleOverflow).toHaveBeenCalledWith(
        "hidden",
        "auto"
      );
    });

    test("this.childComponentDidMount() should get called by this.componentDidMount(), if it is a function", () => {
      componentInstance.componentDidMount();

      expect(componentInstance.childComponentDidMount).toHaveBeenCalled();
    });
  });

  describe("Test this.componentWillMount() lifesycle method (as a unit)", () => {
    // ATTENTION! This modalRef verification needs rework...
    test("this.modalRef should be set to an object (preferably using createRef()) by this.componentWillMount()", () => {
      const { isObject } = validator;
      componentInstance.componentWillMount();

      expect(isObject(componentInstance.modalRef)).toBe(true);
    });
  });

  describe("Test this.componentDidUpdate(prevProps, prevState) lifesycle method (as a unit)", () => {
    test("If prevProps is NOT equal to the modal component's current props, a setTimeout will trigger its callback in 100ms", () => {
      jest.useFakeTimers();

      const presetProps = {
        testProp: 1,
      };
      testComponent = predefinedComponent(presetProps, {
        disableLifecycleMethods: true,
      });
      componentInstance = testComponent.instance();
      componentInstance.componentDidUpdate({ testProp: 1 }, null);

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 100);

      jest.useRealTimers();
    });
  });

  describe("Test fadeIn()", () => {
    describe("this.modalRef is not an object", () => {
      const various_nonObject_values = [
        ["A string representing this.modalRef"],
        [247],
        [null],
        [false],
        [true],
        [undefined],
        [[1, 2, 3, 4]],
        [() => {}],
      ];

      test.each(various_nonObject_values)(
        'Run fadeIn(), when this.modalRef = %p . ExceptionsHandler.ValidatorError("mp-fadeIn-102") should be called',
        (val) => {
          componentInstance.modalRef = val;
          componentInstance.fadeIn();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "mp-fadeIn-102"
          );
        }
      );
    });

    describe("this.modalRef is an object, but this.modal.current is not", () => {
      const various_nonObject_values = [
        ["A string representing this.modalRef.current"],
        [2417],
        [null],
        [false],
        [true],
        [undefined],
        [[1, 2, 3, 4]],
        [() => {}],
      ];

      test.each(various_nonObject_values)(
        'Run fadeIn(), when this.modalRef.current = %p . ExceptionsHandler.ValidatorError("mp-fadeIn-102") should be called',
        (val) => {
          componentInstance.modalRef = {
            current: val,
          };

          componentInstance.fadeIn();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "mp-fadeIn-102"
          );
        }
      );
    });

    describe("this.modalRef is an object. this.modalRef.current is also an object", () => {
      test("Run fadeIn(): Confirm that both this.modalRef and this.modalRef.current are objects", () => {
        componentInstance.modalRef = {
          current: {},
        };
        componentInstance.fadeIn();

        const condition =
          typeof componentInstance.modalRef === "object" &&
          typeof componentInstance.modalRef.current === "object";

        expect(condition).toBe(true);
      });

      describe('Check that the "style" object exists in this.modalRef.current', () => {
        const various_nonObject_values = [
          ["A string representing this.modalRef.current.style"],
          [2417],
          [null],
          [false],
          [true],
          [undefined],
          [[1, 2, 3, 4]],
          [() => {}],
        ];

        test('If this.modalRef.current.style does not exist, throw a "mp-fadeIn-101" error', () => {
          componentInstance.modalRef = {
            current: {},
          };
          componentInstance.fadeIn();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "mp-fadeIn-101"
          );
        });

        test.each(various_nonObject_values)(
          'If this.modalRef.current.style = %p, which is not an object. Throw a "mp-fadeIn-101" error',
          (val) => {
            componentInstance.modalRef = {
              current: {
                style: val,
              },
            };
            componentInstance.fadeIn();

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "mp-fadeIn-101"
            );
          }
        );

        test("The this.modalRef.current.style.opacity value should be set to 1", () => {
          componentInstance.modalRef = {
            current: {
              style: {},
            },
          };
          componentInstance.fadeIn();

          expect(componentInstance.modalRef.current.style.opacity).toBe(1);
        });

        test("The this.modalRef.current.style.zIndex value should be set to 10000", () => {
          componentInstance.modalRef = {
            current: {
              style: {},
            },
          };
          componentInstance.fadeIn();
          expect(componentInstance.modalRef.current.style.zIndex).toBe(10000);
        });
      });
    });
  });

  describe("Test fadeOut()", () => {
    describe("this.modalRef is not an object", () => {
      const various_nonObject_values = [
        ["A string representing this.modalRef"],
        [247],
        [null],
        [false],
        [true],
        [undefined],
        [[1, 2, 3, 4]],
        [() => {}],
      ];

      test.each(various_nonObject_values)(
        'Run fadeOut(), when this.modalRef = %p . ExceptionsHandler.ValidatorError("mp-fadeOut-102") should be called',
        (val) => {
          componentInstance.modalRef = val;
          componentInstance.fadeOut();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "mp-fadeOut-102"
          );
        }
      );
    });

    describe("this.modalRef is an object, but this.modal.current is not", () => {
      const various_nonObject_values = [
        ["A string representing this.modalRef.current"],
        [2417],
        [null],
        [false],
        [true],
        [undefined],
        [[1, 2, 3, 4]],
        [() => {}],
      ];

      test.each(various_nonObject_values)(
        'Run fadeOut(), when this.modalRef.current = %p . ExceptionsHandler.ValidatorError("mp-fadeOut-102") should be called',
        (val) => {
          componentInstance.modalRef = {
            current: val,
          };

          componentInstance.fadeOut();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "mp-fadeOut-102"
          );
        }
      );
    });

    describe("this.modalRef is an object. this.modalRef.current is also an object", () => {
      test("Run fadeOut(): Confirm that both this.modalRef and this.modalRef.current are objects", () => {
        componentInstance.modalRef = {
          current: {},
        };
        componentInstance.fadeOut();

        const condition =
          typeof componentInstance.modalRef === "object" &&
          typeof componentInstance.modalRef.current === "object";
        expect(condition).toBe(true);
      });

      describe('Check that the "style" object exists in this.modalRef.current', () => {
        const various_nonObject_values = [
          ["A string representing this.modalRef.current.style"],
          [2417],
          [null],
          [false],
          [true],
          [undefined],
          [[1, 2, 3, 4]],
          [() => {}],
        ];

        test('this.modalRef.current.style does not exist, throw a "mp-fadeOut-101" error', () => {
          componentInstance.modalRef = {
            current: {},
          };
          componentInstance.fadeOut();

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "mp-fadeOut-101"
          );
        });

        test.each(various_nonObject_values)(
          'this.modalRef.current.style = %p, which is not an object. Throw a "mp-fadeOut-101" error',
          (val) => {
            componentInstance.modalRef = {
              current: {
                style: val,
              },
            };
            componentInstance.fadeOut();

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "mp-fadeOut-101"
            );
          }
        );

        test("The this.modalRef.current.style.opacity value should be set to 0", () => {
          componentInstance.modalRef = {
            current: {
              style: {},
            },
          };
          componentInstance.fadeOut();

          expect(componentInstance.modalRef.current.style.opacity).toBe(0);
        });

        test("The this.modalRef.current.style.zIndex value should be set to 0", () => {
          jest.useFakeTimers();

          componentInstance.modalRef = {
            current: {
              style: {},
            },
          };
          componentInstance.fadeOut();
          jest.runAllTimers();

          expect(componentInstance.modalRef.current.style.zIndex).toBe(0);
          jest.useRealTimers();
        });
      });
    });
  });

  // ATTENTION: Figure out how to call mocked props functions...
  describe("Test clearModalData(callback)", () => {
    describe("Run clearModalData(callback), which does the following: ", () => {
      const various_nonFunction_nonUndefined_values = [
        ["test string"],
        [{ testKey: 123, testKey2: 456 }],
        [null],
        [true],
        [false],
        [[1, 2, 3, 4]],
        [80],
      ];
      const mockedCallback = jest.fn();

      test('triggers this.setState({}, fn), where "fn" has to be a function (any function)', () => {
        componentInstance.setState = jest.fn();
        componentInstance.clearModalData(mockedCallback);

        expect(componentInstance.setState).toHaveBeenCalledWith(
          {},
          expect.any(Function)
        );
      });

      describe('this.setState({}, fn) in turn will trigger the "fn" function, inside which the following happens:', () => {
        Modal.contextTypes = {
          setValueToState: PropTypes.func,
        };

        test("this.fadeOut() gets called", () => {
          componentInstance.fadeOut = jest.fn();
          componentInstance.clearModalData(mockedCallback);

          expect(componentInstance.fadeOut).toHaveBeenCalled();
        });

        test("this.context.setValueToState() gets called", () => {
          const testComponent = predefinedComponent(
            { data: {} },
            {
              context: { setValueToState: jest.fn() },
              disableLifecycleMethods: true,
            }
          );
          const componentInstance = testComponent.instance();
          componentInstance.clearModalData(mockedCallback);

          expect(testComponent.context().setValueToState).toHaveBeenCalled();
        });

        test.each(various_nonFunction_nonUndefined_values)(
          '"callback" = %p (not a function and not undefined): trigger ExceptionsHandler.ValidatorError("mp-clearModalData-103")',
          (val) => {
            const testComponent = predefinedComponent(
              { data: {} },
              {
                context: { setValueToState: jest.fn() },
                disableLifecycleMethods: true,
              }
            );
            const componentInstance = testComponent.instance();
            componentInstance.fadeOut = jest.fn();

            const mockedCallback = val;

            componentInstance.clearModalData(mockedCallback);

            expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
              "mp-clearModalData-103"
            );
          }
        );

        test('"callback" is a function: trigger it', () => {
          const testComponent = predefinedComponent(
            { data: {} },
            {
              context: { setValueToState: jest.fn() },
              disableLifecycleMethods: true,
            }
          );
          const componentInstance = testComponent.instance();
          componentInstance.clearModalData(mockedCallback);

          expect(mockedCallback).toHaveBeenCalled();
        });

        test('"callback" is undefined: do not throw the error "mp-clearModalData-103"', () => {
          const testComponent = predefinedComponent(
            { data: {} },
            {
              context: { setValueToState: jest.fn() },
              disableLifecycleMethods: true,
            }
          );
          const componentInstance = testComponent.instance();
          const mockedCallback = undefined;

          componentInstance.clearModalData(mockedCallback);

          expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
            "mp-clearModalData-103"
          );
        });
      });
    });

    /*
        test("Run clearModal(callback): Check that this.setState({}, () => callback()) is called, and the callback() function is triggered", () => {
            componentInstance.setState = jest.fn();
            componentInstance.clearModalData();

        }) */
  });

  describe("Test dismissModalHandler()", () => {
    test("Run dismissModalHandler(): The function this.clearModalData() should get called", () => {
      componentInstance.clearModalData = jest.fn();
      componentInstance.dismissModalHandler();

      expect(componentInstance.clearModalData).toHaveBeenCalled();
    });
  });
  /*
  describe("Test scrollHandler(e)", () => {
    test('Run scrollHandler(e), with no regards to the "e" parameter. In this test, expect the marginTop of the modal dialogue box to change accordingly to the window properties', () => {
      const modalWrapper = componentInstance.modalRef.current;
      const modalDialogueBox = modalWrapper.getElementsByClassName(
        "modal-dialog"
      )[0];

      const windowScrollY = window.scrollY;
      const dialogueBoxOffsetHeight = modalDialogueBox.offsetHeight

      componentInstance.scrollHandler();

      expect(modalDialogueBox.style).not.toBeUndefined();
    }); 
  });*/

  describe("Test handleOverflow(bodyOverflow, wrapperOverflow)", () => {
    test('Run handleOverflow("abc", "def"): the style.overflow of document.body should be set to "abc" (The first parameter)', () => {
      const expectedValue = "abc";

      componentInstance.modalRef = {
        current: {
          style: {},
        },
      };

      componentInstance.handleOverflow(expectedValue, "def");

      expect(document.body.style.overflow).toBe(expectedValue);
    });

    test('Run handleOverflow("abc", "def"): the style.overflowY of modalRef should be set to "def" (The second parameter)', () => {
      const expectedValue = "def";

      componentInstance.modalRef = {
        current: {
          style: {},
        },
      };
      componentInstance.handleOverflow("abc", expectedValue);

      expect(componentInstance.modalRef.current.style.overflowY).toBe(
        expectedValue
      );
    });
  });

  // ATTENTION: Figure out how to call mocked props functions...
  describe("Test executePropsAction(data)", () => {
    describe("props.data is an object", () => {
      const various_nonFunction_nonUndefined_values = [
        [14],
        [[1, 2, 3, 4]],
        [null],
        ["A string representing a data variable"],
        [false],
        [true],
      ];

      test('Run executePropsAction(): If props.data is an object, do not throw ExceptionsHandler.ValidatorError("mp-propsAction-102")', () => {
        const presetProps = {
          data: {},
        };
        const testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        const componentInstance = testComponent.instance();

        componentInstance.executePropsAction();

        expect(ExceptionsHandler.ValidatorError).not.toBeCalledWith(
          "mp-propsAction-102"
        );
      });

      test("Run executePropsAction(): If props.data.action is a function, then call it", () => {
        const presetProps = {
          data: {
            action: jest.fn(),
          },
        };
        const testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        const componentInstance = testComponent.instance();

        componentInstance.executePropsAction();

        expect(componentInstance.props.data.action).toHaveBeenCalled();
      });

      test.each(various_nonFunction_nonUndefined_values)(
        'Run executePropsAction(): If props.data.action = %p (not function nor undefined), throw ExceptionsHandler.ValidatorError("mp-propsAction-101")',
        (val) => {
          const presetProps = {
            data: {
              action: val,
            },
          };
          const testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          const componentInstance = testComponent.instance();

          componentInstance.executePropsAction();

          expect(ExceptionsHandler.ValidatorError).toBeCalledWith(
            "mp-propsAction-101"
          );
        }
      );
    });

    describe("props.data does not exist or is not an object", () => {
      const various_nonObject_values = [
        [14],
        [() => {}],
        [[1, 2, 3, 4]],
        [null],
        ["A string representing a data variable"],
        [false],
        [undefined],
        [true],
      ];

      test('Run executePropsAction(). If props.data object does not exist, throw ExceptionsHandler.ValidatorError("mp-propsAction-102")', () => {
        const presetProps = {};
        const testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        const componentInstance = testComponent.instance();

        componentInstance.executePropsAction();

        expect(ExceptionsHandler.ValidatorError).toBeCalledWith(
          "mp-propsAction-102"
        );
      });

      test.each(various_nonObject_values)(
        'Run executePropsAction(). If props.data = %p (not an object), throw ExceptionsHandler.ValidatorError("mp-propsAction-102")',
        (val) => {
          const presetProps = { data: val };
          const testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          const componentInstance = testComponent.instance();

          componentInstance.executePropsAction();

          expect(ExceptionsHandler.ValidatorError).toBeCalledWith(
            "mp-propsAction-102"
          );
        }
      );
    });
  });

  describe("Test saveToState(key, value, area, callback)", () => {
    describe('When the "area" parameter is not a string, an error "mp-saveToState-107" occurs regardless of other parameters', () => {
      const various_key = [
        [14],
        [() => {}],
        [[1, 2, 3, 4]],
        [{ key1: 12, key2: false }],
        [null],
        ["A string representing a value"],
        [false],
        [undefined],
        [true],
      ];

      const various_value = [
        [12],
        [() => {}],
        [[3, 8, 5, 4]],
        [{ key3: 1412, key4: false }],
        [null],
        ["A string representing another value"],
        [false],
        [undefined],
        [true],
      ];

      const various_area_nostrings = [
        [122],
        [() => {}],
        [[5, 2, 8, 3]],
        [{ key1: 75, key8: false }],
        [null],
        [false],
        [undefined],
        [true],
      ];

      for (let i = 0; i < various_key.length; i++) {
        for (let j = 0; j < various_value.length; j++) {
          test.each(various_area_nostrings)(
            "Run saveToState(" +
              various_key[i][0] +
              ", " +
              various_value[j][0] +
              ', %p): ExceptionsHandler.ValidatorError("mp-saveToState-107") should be called',
            (val) => {
              componentInstance.saveToState(
                various_key[i][0],
                various_value[j][0],
                val
              );

              expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
                "mp-saveToState-107"
              );
            }
          );
        }
      }
    });

    describe('When the "area" parameter is a string, an error "mp-saveToState-107" should never occur', () => {
      const various_key = [
        [14],
        [() => {}],
        [[1, 2, 3, 4]],
        [{ key1: 12, key2: false }],
        [null],
        ["A string representing a value"],
        [false],
        [undefined],
        [true],
      ];

      const various_value = [
        [12],
        [() => {}],
        [[3, 8, 5, 4]],
        [{ key3: 1412, key4: false }],
        [null],
        ["A string representing another value"],
        [false],
        [undefined],
        [true],
      ];

      const string_area = "A string representing area";

      for (let i = 0; i < various_key.length; i++) {
        for (let j = 0; j < various_value.length; j++) {
          test(
            "Run saveToState(" +
              various_key[i][0] +
              ", " +
              various_value[j][0] +
              ", " +
              string_area +
              '): ExceptionsHandler.ValidatorError("mp-saveToState-107") should NOT be called',
            () => {
              componentInstance.saveToState(
                various_key[i][0],
                various_value[j][0],
                string_area
              );

              expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
                "mp-saveToState-107"
              );
            }
          );
        }
      }
    });

    describe('Evaluate the "key" and "value" parameters, when "area" is a string ', () => {
      describe('"value" parameter', () => {
        const various_value_noUndefined = [
          [12],
          [() => {}],
          [[3, 8, 5, 4]],
          [{ key3: 1412, key4: false }],
          [null],
          ["A string representing another value"],
          [false],
          [true],
        ];

        const various_key = [
          [14],
          [() => {}],
          [[1, 2, 3, 4]],
          [{ key1: 12, key2: false }],
          [null],
          ["A string representing a value"],
          [false],
          [undefined],
          [true],
        ];

        describe('When "value" is undefined, and "key" has varying values', () => {
          test.each(various_key)(
            'Run saveToState(%p, undefined, "Area string"): ExceptionsHandler.ValidatorError("mp-saveToState-104") is called',
            (val) => {
              componentInstance.saveToState(val, undefined, "Area string");

              expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
                "mp-saveToState-104"
              );
            }
          );
        });

        describe('When "value" is not undefined, and "key" has varying values', () => {
          for (let i = 0; i < various_key.length; i++) {
            test.each(various_value_noUndefined)(
              "Run saveToState(" +
                various_key[i][0] +
                ', %p, "Area string"): ExceptionsHandler.ValidatorError("mp-saveToState-104") is NOT called',
              (val) => {
                componentInstance.saveToState(
                  various_key[i][0],
                  val,
                  "Area string"
                );

                expect(
                  ExceptionsHandler.ValidatorError
                ).not.toHaveBeenCalledWith("mp-saveToState-104");
              }
            );
          }
        });
      });

      describe('"key" parameter', () => {
        const various_value_noUndefined = [
          [12],
          [() => {}],
          [[3, 8, 5, 4]],
          [{ key3: 1412, key4: false }],
          [null],
          ["A string representing another value"],
          [false],
          [true],
        ];

        const various_key_noString_noNull = [
          [14],
          [() => {}],
          [[1, 2, 3, 4]],
          [{ key1: 12, key2: false }],
          [false],
          [undefined],
          [true],
        ];

        describe('When "key" is not a string nor null, and "value" is not undefined', () => {
          for (let i = 0; i < various_key_noString_noNull.length; i++) {
            test.each(various_value_noUndefined)(
              "Run saveToState(" +
                various_key_noString_noNull[i][0] +
                ', %p, "Area string"): ExceptionsHandler.ValidatorError("mp-saveToState-105") is NOT called',
              (val) => {
                componentInstance.saveToState(
                  various_key_noString_noNull[i][0],
                  val,
                  "Area string"
                );

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
                  "mp-saveToState-105"
                );
              }
            );
          }
        });

        describe('When "key" is either a string or null, and "value" is not undefined', () => {
          test.each(various_value_noUndefined)(
            'Run saveToState("A random text string", %p, "Area string"): ExceptionsHandler.ValidatorError("mp-saveToState-105") is NOT called',
            (val) => {
              componentInstance.saveToState(
                "A random text string",
                val,
                "Area string"
              );

              expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
                "mp-saveToState-105"
              );
            }
          );
          test.each(various_value_noUndefined)(
            'Run saveToState(null, %p, "Area string"): ExceptionsHandler.ValidatorError("mp-saveToState-105") is NOT called',
            (val) => {
              componentInstance.saveToState(null, val, "Area string");

              expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
                "mp-saveToState-105"
              );
            }
          );
        });
      });

      describe('When either "key" or "value" (or both) have incorrect values, call error function', () => {
        test('Run saveToState(77, undefined, "Area string"): ExceptionsHandler.ValidatorError() is called', () => {
          componentInstance.saveToState(77, undefined, "Area string");

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalled();
        });

        test('Run saveToState(77, "text string", "Area string"): ExceptionsHandler.ValidatorError() is called', () => {
          componentInstance.saveToState(77, "text string", "Area string");

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "mp-saveToState-105"
          );
        });

        test('Run saveToState("text string", undefined, "Area string"): ExceptionsHandler.ValidatorError() is called', () => {
          componentInstance.saveToState(
            "text string",
            undefined,
            "Area string"
          );

          expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
            "mp-saveToState-104"
          );
        });
      });

      describe('When either "key" or "value" (or both) have incorrect values, don\'t call this.setState', () => {
        test('Run saveToState(77, undefined, "Area string"): this.setState() is not called', () => {
          componentInstance.setState = jest.fn();
          componentInstance.saveToState(77, undefined, "Area string");

          expect(componentInstance.setState).not.toHaveBeenCalled();
        });

        test('Run saveToState(77, "text string", "Area string"): this.setState() is not called', () => {
          componentInstance.setState = jest.fn();
          componentInstance.saveToState(77, "text string", "Area string");

          expect(componentInstance.setState).not.toHaveBeenCalled();
        });

        test('Run saveToState("text string", undefined, "Area string"): this.setState() is not called', () => {
          componentInstance.setState = jest.fn();
          componentInstance.saveToState(
            "text string",
            undefined,
            "Area string"
          );

          expect(componentInstance.setState).not.toHaveBeenCalled();
        });
      });

      describe('When both "key" and "value" have correct values, call this.setState()', () => {
        describe("Without callback parameter", () => {
          const { isUndefined, isFunction } = validator;

          test('Run saveToState("test string", "test value", "Area string"): call this.setState()', () => {
            const callbackMockFn = jest.fn();
            componentInstance.setState = jest.fn(
              ({},
              () => {
                if (!isUndefined(undefined)) {
                  if (isFunction(undefined)) {
                    callbackMockFn();
                  } else {
                    throw ExceptionsHandler.ValidatorError(
                      "mp-saveToState-106"
                    );
                  }
                }
              })
            );
            componentInstance.saveToState(
              "test string",
              "test value",
              "Area string"
            );

            expect(componentInstance.setState).toHaveBeenCalled();
          });

          test('Run saveToState("test string", "test value", "Area string"): do not call ExceptionsHandler.ValidatorError("mp-saveToState-106")', () => {
            const callbackMockFn = jest.fn();
            componentInstance.setState = jest.fn(
              ({},
              () => {
                if (!isUndefined(undefined)) {
                  if (isFunction(undefined)) {
                    callbackMockFn();
                  } else {
                    throw ExceptionsHandler.ValidatorError(
                      "mp-saveToState-106"
                    );
                  }
                }
              })
            );
            componentInstance.saveToState(
              "test string",
              "test value",
              "Area string"
            );

            expect(ExceptionsHandler.ValidatorError).not.toHaveBeenCalledWith(
              "mp-saveToState-106"
            );
          });

          test('Run saveToState("test string", "test value", "Area string"): do not call the callback function', () => {
            const callbackMockFn = jest.fn();
            componentInstance.setState = jest.fn(
              ({},
              () => {
                if (!isUndefined(undefined)) {
                  if (isFunction(undefined)) {
                    callbackMockFn();
                  } else {
                    throw ExceptionsHandler.ValidatorError(
                      "mp-saveToState-106"
                    );
                  }
                }
              })
            );
            componentInstance.saveToState(
              "test string",
              "test value",
              "Area string"
            );

            expect(callbackMockFn).not.toHaveBeenCalled();
          });
        });

        describe("With callback parameter", () => {
          const { isUndefined, isFunction } = validator;

          describe("When callback is a function", () => {
            test('Run saveToState("test string", "test value", "Area string", () => {}): call the callback function', () => {
              const callbackMockFn = jest.fn();
              componentInstance.setState = jest.fn(
                ({},
                () => {
                  if (!isUndefined(callbackMockFn)) {
                    if (isFunction(callbackMockFn)) {
                      callbackMockFn();
                    } else {
                      throw ExceptionsHandler.ValidatorError(
                        "mp-saveToState-106"
                      );
                    }
                  }
                })
              );
              componentInstance.saveToState(
                "test string",
                "test value",
                "Area string",
                callbackMockFn
              );

              expect(callbackMockFn).toHaveBeenCalled();
            });
          });

          describe("When callback is not function", () => {
            const various_callback = [
              [14],
              ["string"],
              [[1, 2, 3, 4]],
              [{ key1: 12, key2: false }],
              [null],
              [false],
              [true],
            ];

            test.each(various_callback)(
              'Run saveToState("test string", "test value", "Area string", %p): call ExceptionsHandler.ValidatorError("mp-saveToState-106") ',
              (val) => {
                componentInstance.setState = jest.fn(
                  ({},
                  () => {
                    if (!isUndefined(val)) {
                      if (isFunction(val)) {
                        val();
                      } else {
                        throw ExceptionsHandler.ValidatorError(
                          "mp-saveToState-106"
                        );
                      }
                    }
                  })
                );
                componentInstance.saveToState(
                  "test string",
                  "test value",
                  "Area string",
                  val
                );

                expect(ExceptionsHandler.ValidatorError).toHaveBeenCalledWith(
                  "mp-saveToState-106"
                );
              }
            );
          });
        });

        describe("With or without a callback function, the first parameter of this.setState should always be the following:", () => {
          test('Run saveToState("propertykey", "test value", "areaString"): call this.setState(newInput), where newInput follows the description given in this test:', () => {
            const area = "areaString";
            const value = "test value";
            const key = "propertykey";

            let newInput = {
              ...componentInstance.state,
              [area]: {
                [key]: value,
              },
            };

            componentInstance.setState = jest.fn();
            componentInstance.saveToState(key, value, area);

            expect(componentInstance.setState).toHaveBeenCalledWith(
              newInput,
              expect.any(Function)
            );
          });

          test('Run saveToState("propertykey", "test value", "areaString", mockFunction): call this.setState(newInput), where newInput follows the description given in this test:', () => {
            const area = "areaString";
            const value = "test value";
            const key = "propertykey";

            let newInput = {
              ...componentInstance.state,
              [area]: {
                [key]: value,
              },
            };

            const mockFunction = jest.fn();

            componentInstance.setState = jest.fn();
            componentInstance.saveToState(key, value, area, mockFunction);

            expect(componentInstance.setState).toHaveBeenCalledWith(
              newInput,
              expect.any(Function)
            );
          });

          test('Run saveToState(null, "test value", "areaString"): call this.setState(newInput), where newInput follows the description given in this test:', () => {
            const area = "areaString";
            const value = "test value";
            const key = null;

            let newInput = {
              ...componentInstance.state,
              [area]: value,
            };

            componentInstance.setState = jest.fn();
            componentInstance.saveToState(key, value, area);

            expect(componentInstance.setState).toHaveBeenCalledWith(
              newInput,
              expect.any(Function)
            );
          });

          test('Run saveToState(null, "test value", "areaString", mockFunction): call this.setState(newInput), where newInput follows the description given in this test:', () => {
            const area = "areaString";
            const value = "test value";
            const key = null;

            let newInput = {
              ...componentInstance.state,
              [area]: value,
            };

            const mockFunction = jest.fn();

            componentInstance.setState = jest.fn();
            componentInstance.saveToState(key, value, area, mockFunction);

            expect(componentInstance.setState).toHaveBeenCalledWith(
              newInput,
              expect.any(Function)
            );
          });
        });
      });
    });
  });

  describe("Test verifyProps()", () => {
    const various_nonObject_value = [
      ["a very weird looking text string"],
      [77],
      [false],
      [true],
      [undefined],
      [[1, 2, 3, 4]],
      [() => {}],
      [null],
    ];
    describe("When data prop is not an object", () => {
      test('Run verifyProps() when "data" prop is missing. Throw an error with this code: "mp-verifyProps-103"', () => {
        const presetProps = {};

        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => {
          componentInstance.verifyProps();
        }).toThrow(expectedErrorReturns["mp-verifyProps-103"]);
      });

      test.each(various_nonObject_value)(
        'Run verifyProps() when "data" prop is not an object. Throw an error with this code: "mp-verifyProps-103"',
        (val) => {
          const presetProps = {
            data: val,
          };

          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();

          expect(() => {
            componentInstance.verifyProps();
          }).toThrow(expectedErrorReturns["mp-verifyProps-103"]);
        }
      );
    });

    describe("When data prop is an object", () => {
      test('Run verifyProps() when "data" prop is an object. Do not throw an error with this code: "mp-verifyProps-103"', () => {
        const presetProps = {
          data: {},
        };

        testComponent = predefinedComponent(presetProps, {
          disableLifecycleMethods: true,
        });
        componentInstance = testComponent.instance();

        expect(() => {
          componentInstance.verifyProps();
        }).not.toThrow(expectedErrorReturns["mp-verifyProps-103"]);
      });

      test.each(various_nonObject_value)(
        'Run verifyProps() with a data prop set to an object. If data.params = %p (is not an object), throw this error: "mp-verifyProps-104"',
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
          expect(() => {
            componentInstance.verifyProps();
          }).toThrow(expectedErrorReturns["mp-verifyProps-104"]);
        }
      );

      test.each(various_nonObject_value)(
        'Run verifyProps() with a data prop set to an object. If data.params is an object, do not throw this error: "mp-verifyProps-104"',
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

          expect(() => {
            componentInstance.verifyProps();
          }).not.toThrow(expectedErrorReturns["mp-verifyProps-104"]);
        }
      );
    });
  });

  describe("Test verifyState()", () => {
    describe("when this.state is not an object", () => {
      const various_nonObject_value = [
        ["a very weird looking text string"],
        [77],
        [false],
        [true],
        [undefined],
        [[1, 2, 3, 4]],
        [() => {}],
        [null],
      ];
      test.each(various_nonObject_value)(
        'Run verifyState(), when this.state = %p (not an object): Error "mp-verifyProps-105" should be thrown',
        (val) => {
          expect(() => {
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state = val;
            componentInstance.verifyState();
          }).toThrow(expectedErrorReturns["mp-verifyProps-105"]);
        }
      );
    });

    describe("when this.state is an object", () => {
      const various_nonObject_value = [
        ["a very weird looking text string"],
        [77],
        [false],
        [true],
        [undefined],
        [[1, 2, 3, 4]],
        [() => {}],
        [null],
      ];

      test('Run verifyState() when this.state = {}: Error "mp-verifyProps-105" should NOT be thrown', () => {
        expect(() => {
          testComponent = predefinedComponent(presetProps, {
            disableLifecycleMethods: true,
          });
          componentInstance = testComponent.instance();
          componentInstance.state = {};
          componentInstance.verifyState();
        }).not.toThrow(expectedErrorReturns["mp-verifyProps-105"]);
      });

      describe("Check the object keys of this.state", () => {
        test('Run verifyState() when "fieldErrors" key is missing: An error "mp-verifyProps-107" should be thrown', () => {
          expect(() => {
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state = {};
            componentInstance.verifyState();
          }).toThrow(expectedErrorReturns["mp-verifyProps-107"]);
        });

        test('Run verifyState() when the "fieldErrors" key is an object. The error "mp-verifyProps-107" should not be thrown', () => {
          expect(() => {
            testComponent = predefinedComponent(presetProps, {
              disableLifecycleMethods: true,
            });
            componentInstance = testComponent.instance();
            componentInstance.state = {
              fieldErrors: {},
            };
            componentInstance.verifyState();
          }).not.toThrow(expectedErrorReturns["mp-verifyProps-107"]);
        });

        test.each(various_nonObject_value)(
          'Run verifyState() when the "fieldErrors" key = %p (is not an object). Error "mp-verifyProps-107" should be thrown',
          (val) => {
            expect(() => {
              testComponent = predefinedComponent(presetProps, {
                disableLifecycleMethods: true,
              });
              componentInstance = testComponent.instance();
              componentInstance.state = {
                fieldErrors: val,
              };
              componentInstance.verifyState();
            }).toThrow(expectedErrorReturns["mp-verifyProps-107"]);
          }
        );
      });
    });
  });

  describe("Test renderHeaderContents()", () => {
    test("Run renderHeaderContents(): It should return null", () => {
      expect(componentInstance.renderHeaderContents()).toBe(null);
    });
  });

  describe("Test renderFooterContents()", () => {
    test("Run renderFooterContents(): It should return null", () => {
      expect(componentInstance.renderFooterContents()).toBe(null);
    });
  });
});
