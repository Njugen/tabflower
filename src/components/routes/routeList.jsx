import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardView from './../views/dashboard';
import CalendarView from './../views/calendar';

/*
    The RouteList component

    This component executes other components based on the string provided in the browser's
    addressbar. As this component is also part of the raising chains, it
    also acts like a forwarder of data gained from the views props (onViewMount and onRaiseToModal).
    
    For example: 
    The /calendar path will execute the CalendarView component, which means that the calendar view
    and all its contents get rendered. The calendar view also triggers onViewMount() and onRaiseModal(), which
    provides data from the CalendarView component, making it possible for RouteList component to use that data, or forward it
    by raising it as its own data.
*/

class RouteList extends Component {
    handleViewMount = (routeProps) => {
        /*
            Parameters: none

            Inform the App component that any view (this view) has been mounted, by raising its current state.
            The state will travel through the following components:

                RouteList > App

            All components in this chain will have access to the information raised.
        */

        const { onNavigation } = this.props;

        onNavigation(routeProps);
    }
r
    raiseToModal = (data) => {
        /*
            Parameters: 
            -   data (object, containing whatever data that we want the modal to processs. Mandatory)

            Inform the App component to launch a modal (popup), by raising the data provided
            in this function's parameter. The data parameter will travel through the following components:

                RouteList > App

            All components in this chain will have access to the information raised.
        */
        console.log("BATMAN", data)
        const { onRaiseToModal } = this.props;

        onRaiseToModal(data);
    }

    render = () => {
        /*
            How to add a new Route to another view, which can provide modal info or info about view mounts:

            <Route 
                path="/example" 
                render={
                    (props) => 
                        <Anything
                            onRaiseToModal={(data) => this.raiseToModal(data)} 
                            onViewMount={(data) => this.handleViewMount(data)} 
                            {...props} 
                        />
                } 
            />

            Remember: The further up in the child list of <Switch> the route is placed, the higher priority its
            path parameter has, when react-router-dom decides what to trigger.
        */

        return (
            <Switch>
                <Route 
                    path="/dashboard" 
                    render={
                        (props) => 
                            <DashboardView 
                                onRaiseToModal={(data) => this.raiseToModal(data)} 
                                onViewMount={(data) => this.handleViewMount(data)} 
                                {...props} 
                            />
                    } 
                />

                <Route 
                    path="/calendar/:year/:month/:date" 
                    render={
                        (props) => 
                            <CalendarView 
                                onRaiseToModal={(data) => this.raiseToModal(data)} 
                                onViewMount={(data) => this.handleViewMount(data)} 
                                {...props} 
                            />
                    } 
                />

                <Route 
                    path="/calendar" 
                    render={
                        (props) => 
                            <CalendarView 
                                onRaiseToModal={(data) => this.raiseToModal(data)} 
                                onViewMount={(data) => this.handleViewMount(data)} 
                                {...props} />} 
                            />

                <Redirect from="/" to="/dashboard" />
            </Switch>
        );
    }
}

export default RouteList;