import React, { Component } from 'react';

class View extends Component {
    state = {
        viewData: {
            
        },
        metaData: {
        
        }
    };

    handleViewMount = () => {
        /*
            Inform the App component that any view (this view) has been mounted, by raising its current state.
            The state will travel through the following components:

            View (any view) > RouteList > App
        */
        const { onViewMount } = this.props;

        onViewMount(this.state);
    }


    componentDidMount = () => {
        this.handleViewMount();
    }

    render = () => {
        return null;
    }
}

export default View;