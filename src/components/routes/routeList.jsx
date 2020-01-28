import React, { Component, createElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardView from './../views/dashboard';
import CalendarView from './../views/calendar';

/*
    The RouteList component

    This component sets up a list of routes in an array, consisting of labels, paths and views. Based on this list,
    the component automatically sets up multiple routes which execute view components based on paths given in the 
    addressbar. At launch, the RouteList component also shares its information with the App component and the MainSidebar component,
    keeping them in sync with each other for the rest of the session (e.g. showing correct page listing in the sidebar,
    which correctly redirects the user to the routes set by this component).
    
    For example: 
    The /calendar path will execute the CalendarView component, which means that the calendar view
    and all its contents get rendered. The calendar view also triggers onViewMount() and onRaiseModal(), which
    provides data from the CalendarView component, making it possible for RouteList component to use that data, or forward it
    by raising it as its own data.
*/

class RouteList extends Component {
    /*
        The Routes Array

        This variable is the core of all navigation in Tabeon. It is also shared with
        the App component and the MainSidebar component to keep them up to date when rendering 
        navigation lists etc. To add anotheraccessible path and view to the app, simply add 
        another object to the array:

        - label (string): Label of the view (used by e.g. the sidebar's navigation menu)
        - path (string): starts with an slash ( / ). To add a parameter to the path, add another slash
        followed by :parameter. e.g. /myview/:param1/:param2/:param3 etc
        - component (a react component): A react component. Can be whatever, but in this case, a view
        component which renders content is preferred. 

        Good to know:
        - The lower down the list, the higher the priority
        - All view mounted based on the information in this list have the ability to inform App component
        about being mounted, and can also call the Modal component
    */

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
        /*
            This function loops through every object set up in the 
            routes array of this component, and builds route components based
            on the array's information. The <Route> component sets up a path, which renders
            a component if its path matches the path in the user's addressbar. E.g. if the user
            visits /calendar, then the <CalendarView> component will be rendered and so forth.

            Good to know about these props:
            - onRaiseToModal: this props forwards info to the App component, triggering a modal based on forwarded info
            - onViewMount: once the view is mounted, it forwards that info to App component.
            - label: The label, passed from Routelist down to the view component (not necessary)
        */
        const views = this.routes;

        return views.map(
            (view, key) => {
                 const TagName = view.component;

                return <Route path={view.path} render={
                    (props) => {
                        return <TagName
                            onRaiseToModal={(data) => this.raiseToModal(data)} 
                            onViewMount={(data) => this.handleViewMount(data)}
                            label={view.label} 
                            key={key}
                            {...props} />
 
                    } 
                }></Route>
            }
        )
    }

    getRoutesPathAndLabel = () => {
        /*
            Build and return a route list array, without the component keys. This information
            is raised to the App component where it is set in state. Once
            the App's state is updated, this information will be sent down to MainSidebar
            component and other components that might need it.
        */

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
        /*
            Raise information to App component
        */

        const { onRaisedRoutesInfo } = this.props;
        const data = this.getRoutesPathAndLabel();

        onRaisedRoutesInfo(data);
    }

    componentDidMount = () => {
        /*
            The component has successfully mounted and set up the routes. We may now
            provide the route information to App component.
        */
        this.raiseRoutesInfo();
    }

    render = () => {
        /*
            Using React Router DOM to set up routes, which renders components
            based on browser addressbar paths. In order for this to work, <BrowserRouter> needs
            to encapsulate whatever <App /> render. (in this project, it encapsulates the <App> component
            in src/index.js)

            Read more: https://reacttraining.com/react-router/web/guides/quick-start
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