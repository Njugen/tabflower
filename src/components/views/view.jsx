import { Component } from "react";
import { ValidatorError } from "./../utils/exceptionsAndHandler";
import * as validator from "./../utils/inputValidators";
import * as ExceptionsHandler from "../utils/exceptionsAndHandler";
import PropTypes from "prop-types";
import AppContext from "./../contexts/AppContextProvider";
/*
    The View Class

    This class inherits all React related features from the Component class.
    It also defines the basics of what a view is, like setting states and
    automatically running common features shared by all views.

    By making a single View inherit from this class, all its feature will be
    shared with the inheritor also. The inheritor then runs its own unique features.

    Props:
    - onRaiseToModal(data): Call this when raising data to App component for modal triggering
        - data = {
            id: "id of the modal being called",
            action: "function bound to the caller component. Can be executed by the modal"
        }
    - onViewMount(data): Call this when raising data to inform App component that this view has been mounted
        - data = this.state or other parameters the App could use to verify this view as mounted    
*/

class View extends Component {
  state = {
    refreshFactor: 0,
  };

  static contextType = AppContext;

  sendToErrorOverlay = (errorData) => {
    const { isObject } = validator;
    const { launchErrorOverlay } = this.context;

    try {
      if (isObject(errorData)) {
        setTimeout(() => {
          launchErrorOverlay(errorData);
        }, 1000);
      } else {
        throw ExceptionsHandler.ValidatorError("view-102");
      }
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, () => {});
    }
  };

  handleViewMount = () => {
    /*
            Parameters: none

            Inform the App component that any view (this view) has been mounted, by raising its current state.
            The state will travel through the following components:

                View (any view: this view) > RouteList > App

            All components in this chain will have access to the information raised.
        */
    try {
      const { isFunction } = validator;
      const { onViewMount } = this.props;

      if (isFunction(onViewMount)) {
        onViewMount(this.state);
      } else {
        throw ValidatorError("view-101");
      }
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  componentDidMount = () => {
    /*
            Mount the view, as in, telling React this: The view has been rendered into the DOM and its lifecycle features
            as in componentWillMount(), render(), constructor() have all been executed.

            After the view has mounted:
            - launch handleViewMount() for all views
            - If there is a childComponentDidMount() function, execute it.

            If other features need to be executed, or if info need to be shared after view mount, add them here.
        */

    this.handleViewMount();

    if (typeof this.childComponentDidMount === "function") {
      this.childComponentDidMount();
    }
  };

  render = () => {
    /*
            JSX is returned and inserted to the DOM by react using this function.abs
            This class does not render anything. That is a task for its child classes, which
            may render ANYTHING .
        */
    return null;
  };
}

View.propTypes = {
  // onRaiseToModal: PropTypes.func.isRequired,
  onViewMount: PropTypes.func.isRequired,
  // onRaiseToErrorOverlay: PropTypes.func.isRequired,
};

export default View;
