import React, { Component, createElement } from 'react';
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
    routes = [
        { 
            label: "Dashboard", 
            path: "/dashboard" ,
            component: DashboardView
        },
        { 
            label: "Calendar", 
            path: "/calendar/:year/:month/:date",
            component: CalendarView
        },
        { 
            label: "Calendar", 
            path: "/calendar" ,
            component: CalendarView
        }
    ];


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

    renderRoutes = () => {
        const views = this.routes;

        return views.map(
            (view, key) => {
                 const TagName = view.component;

                return <Route path={view.path} render={
                    (props) => {
                        return <TagName
                            onRaiseToModal={(data) => this.raiseToModal(data)} 
                            onViewMount={(data) => this.handleViewMount(data)} 
                            key={key}
                            {...props} />
 
                    } 
                }></Route>
            }
        )
    }

    getRoutesPathAndLabel = () => {
        const routes = this.routes;
        const output = [];
        
        routes.map(
            (route, i) => {
                if(route.path.includes("/:") === false){
                    output.push({
                        label: route.label,
                        path: route.path,
                        key: i
                    });
                } 

                return null;
            }
        )
        
        return output;
    }

    raiseRoutesInfo = () => {
        const { onRaisedRoutesInfo } = this.props;

        onRaisedRoutesInfo(this.getRoutesPathAndLabel());
    }

    componentDidMount = () => {
        this.raiseRoutesInfo();
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

            Remember: 
            - The further up in the child list of <Switch> the route is placed, the higher priority its
            path parameter has, when react-router-dom decides what to trigger.
            - If the view requires access to any modal, or if any of the view's modules require access to any modal,
            the onRaiseToModal parameter need to be set as a tag parameter when rendering the view.

            onRaiseToModal={(data) => this.raiseToModal(data)
        */
        
        return (
            <Switch>
                {this.renderRoutes()}

                <Redirect from="/" to="/dashboard" />
            </Switch>
        );
    }
}

export default RouteList;