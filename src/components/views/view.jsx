import { Component } from "react";
import { ValidatorError } from "./../utils/exceptionsAndHandler";
import * as validator from "./../utils/inputValidators";
import * as ExceptionsHandler from "../utils/exceptionsAndHandler";
import PropTypes from "prop-types";
import AppContext from "./../contexts/AppContextProvider";

/*
    The View Component
 
    Props:
    - onViewMount (function): Triggers a function in the parent component, using the view's state as parameter.
*/

class View extends Component {
  state = {
    refreshFactor: 0,
  };

  static contextType = AppContext;

  sendToErrorOverlay = this.context.sendToErrorOverlay;

  refreshView = () => {
    let refreshFactor = this.state.refreshFactor;
    refreshFactor++;

    this.setState({ refreshFactor });
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
  onViewMount: PropTypes.func.isRequired,
};

export default View;
