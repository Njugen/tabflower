import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import TabManagementView from "../views/tabManagement";
import AboutTabFlowerView from "./../views/aboutTabFlower";
import SettingsView from "./../views/settings";

/* Import Tabeon */
import * as validator from "../../components/utils/inputValidators";
import * as ExceptionsHandler from "../../components/utils/exceptionsAndHandler";
import AppContext from "../contexts/AppContextProvider";
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

        - label (string): Label of the view (used by e.g. in the navigation menu)
        - path (string): starts with an slash ( / ). To add a parameter to the path, add another slash
        followed by :parameter. e.g. /myview/:param1/:param2/:param3 etc
        - component (a react component): A react component. Can be whatever, but in this case, a view
        component which renders content is preferred. 

        Good to know:
        - The lower down the list, the higher the priority
    */

  static contextType = AppContext;

  routes = [
    {
      label: "Manage Tabs",
      path: "/manage",
      component: TabManagementView,
    },
    {
      label: "Settings",
      path: "/settings",
      component: SettingsView,
    },
    {
      label: "About",
      path: "/about",
      component: AboutTabFlowerView,
    },
  ];

  handleViewMount = () => {
    /*
        Parameters: none

        Inform the App component that any view (this view) has been mounted, by raising its current state.
        The state will travel through the following components:

        RouteList > App

        All components in this chain will have access to the information raised.

        CURRENTLY NOT in USE, but a good-to-have feature. Leaving it here for now
    */
  };

  sendToErrorOverlay = this.context.sendToErrorOverlay;

  renderRoutes = () => {
    /*
            This function loops through every object set up in the 
            routes array of this component, and builds route components based
            on the array's information. The <Route> component sets up a path, which renders
            a component if its path matches the path in the user's addressbar. E.g. if the user
            visits /calendar, then the <CalendarView> component will be rendered and so forth.

            Good to know about these props:
            - onViewMount: once the view is mounted, this (the RouteList component) can perform extra tasks if needed.
            - label: The label, passed from Routelist down to the view component (not necessary)
            - key: a unique identifier for the view
        */
    const views = this.routes;

    return views.map((view, key) => {
      const TagName = view.component;

      return (
        <Route
          path={view.path}
          key={"route-" + key}
          render={(props) => {
            return (
              <TagName
                onViewMount={(data) => this.handleViewMount(data)}
                label={view.label}
                key={"routeView-" + key}
                {...props}
              />
            );
          }}
        ></Route>
      );
    });
  };

  getRoutesPathAndLabel = () => {
    /*
            Build and return a route list array, without the component keys. This information
            is raised to the App component where it is set in state. Once
            the App's state is updated, this information will be sent down to MainSidebar
            component and other components that might need it.
        */

    const routes = this.routes;
    const output = [];

    routes.map((route, i) => {
      if (route.path.includes("/:") === false) {
        output.push({
          label: route.label,
          path: route.path,
          key: i,
        });
      }

      return null;
    });

    return output;
  };

  saveRoutesInfoToAppContext = () => {
    const data = this.getRoutesPathAndLabel();
    const { setValueToState } = this.context;

    const { isNumber, isString, isArray, isObject } = validator;

    try {
      if (isArray(data) && data.length > 0) {
        const routes = data;
        let errors = 0;

        for (let i = 0; i < routes.length; i++) {
          if (isObject(routes[i])) {
            if (
              !isString(routes[i].label) ||
              !isString(routes[i].path) ||
              !isNumber(routes[i].key)
            ) {
              errors++;
            }
          } else {
            errors++;
          }
        }

        if (errors === 0) {
          setValueToState("routes", routes);
        } else {
          throw ExceptionsHandler.ValidatorError("app-112");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("app-113");
      }
    } catch (err) {
      this.sendToErrorOverlay(err);
    }
  };

  componentDidMount = () => {
    /*
            The component has successfully mounted and set up the routes. We may now
            provide the route information to App component.
        */
    this.saveRoutesInfoToAppContext();
  };

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
        <Redirect from="/" to="/manage"></Redirect>
      </Switch>
    );
  };
}

export default RouteList;
