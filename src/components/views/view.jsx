import { Component } from 'react';
import { ValidatorError } from './../utils/exceptionsAndHandler';
import * as validator from './../utils/inputValidators'
import * as ExceptionsHandler from '../utils/exceptionsAndHandler';
import PropTypes from 'prop-types';

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
    /*
        The default structure of the View state (the same goes for the inheritors/child classes):
        
        state = {
            viewData: {},
            metaData: {}
        }

        - viewData: Information about the view
        - metaData: Calculation or background information about the view

        None of these are necessity, but whenever data state is needed in any view, stick to using either 
        of these two objects to avoid convoluted code.
    */

    state = {
        viewData: {},
        metaData: {},
        refreshFactor: 0
    }

    raiseToErrorOverlay = (data) => {
        const { onRaiseToErrorOverlay } = this.props;
        const { isObject } = validator;

        try {
            if(isObject(data)){
                if(typeof onRaiseToErrorOverlay === "function"){
                    onRaiseToErrorOverlay(data);
                } else {
                    ExceptionsHandler.ValidatorError("view-103");
                }
            } else {
                ExceptionsHandler.ValidatorError("view-102");
            }
        } catch(err){
            ExceptionsHandler.ErrorHandler(err, () => {}); 
        }
    } 

    handleViewMount = () => {
        /*
            Parameters: none

            Inform the App component that any view (this view) has been mounted, by raising its current state.
            The state will travel through the following components:

                View (any view: this view) > RouteList > App

            All components in this chain will have access to the information raised.
        */
        const { isFunction } = validator;
        const { onViewMount } = this.props;

        if(isFunction(onViewMount)){
            onViewMount(this.state);
        } else {
            throw ValidatorError("view-101");
        }
    }

    raiseToModal = (data) => {
        /*
            Parameters: 
            -   data (object, containing whatever data that we want the modal to processs. Mandatory)

            Inform the App component to launch a modal (popup), by raising the data provided
            in this function's parameter. The data parameter will travel through the following components:

                View (any view: this view) > RouteList > App

            All components in this chain will have access to the information raised.
        */

        const { onRaiseToModal } = this.props;
    
        onRaiseToModal(data);
    }

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

        if(typeof this.childComponentDidMount === "function"){
            
            this.childComponentDidMount();
        }
    }

    render = () => {
        /*
            JSX is returned and inserted to the DOM by react using this function.abs
            This class does not render anything. That is a task for its child classes, which
            may render ANYTHING .
        */
        return null;
    }
}
/*
View.propTypes = {
    onRaiseToModal: PropTypes.func.isRequired,
    onViewMount: PropTypes.func.isRequired,
    onRaiseToErrorOverlay: PropTypes.func.isRequired
} */

export default View;