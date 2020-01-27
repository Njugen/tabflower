import { Component } from 'react';

/*
    The View Class

    This class inherits all React related features from the Component class.
    It also defines the basics of what a view is, like setting states and
    automatically running common features shared by all views.

    By making a single View inherit from this class, all its feature will be
    shared with the inheritor also. The inheritor then runs its own unique features.
*/

class View extends Component {
    handleViewMount = () => {
        /*
            Parameters: none

            Inform the App component that any view (this view) has been mounted, by raising its current state.
            The state will travel through the following components:

            View (any view: this view) > RouteList > App
        */
        const { onViewMount } = this.props;

        onViewMount(this.state);
    }

    raiseToModal = (data) => {
        /*
            Parameters: 
            -   data (object, containing whatever data that we want the modal to processs. Mandatory)

            Inform the App component to launch a modal (popup), by raising the data provided
            in this function's parameter. The data parameter will travel through the following components:

            View (any view: this view) > RouteList > App

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
            This class does not render anything. That is a task for its child classes.
        */
        return null;
    }
}

export default View;