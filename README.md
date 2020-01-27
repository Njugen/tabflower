# Tabeon - The Ultimate Tab Manager

Tabeon is a webextension for managing browser window, tabs and history - as well as related history, sessions and media that the user stores while browsing the web. This extension
is meant to help the user manage information stored in the browser, and in that manner cut and schedule information as needed, be it for lighter use of resources or more organized browsing
for different tasks required by different situations (hobby, work etc)

Currently, this extension is in development for Google Chrome, Mozilla Firefox and Microsoft Edge, as a hobby/learning project.

## Libraries and frameworks used in Tabeon

- React - UI library to manage user interfaces shown to the user
- Bootstrap - Toolkit to make the user interface responsive. In this project, jQuery is skipped and stick to HTML, CSS and Javascript.
- Webextension API - to communicate with web browsers as well as using browser features in user interfaces

## Extension Structure

Tabeon webextension consists of the following sections (all of them are most likely not used in every extension). Lets consider the following:

- Popup (UI that shows up when clicking the extension icon in the browser tray)
- Sidebar (UI that shows up at the side of a web page, when triggering certain functionalities. E.g. history sidebar listing all visited pages)
- Options page (UI that shows up in either new tab or window, when launching the extension's settings management)
- Content Scripts (Front-end scripts running on pages set in the extension's manifest. The user may, or may not, see what the script does, but it is running)
- Background section (part of webextensions from where long terms data are retrieved and where long term operations are run independently from other sections)

Read more about these here:
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/ 
- Anatomy_of_a_WebExtension#Sidebars_popups_options_pages 
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Content_scripts
-https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_scripts

#### The extension's manifest

... Under construction

### Folder Structure

... Under construction

## React Components and State in Tabeon

Since the Tabeon extension uses React to build UI, I've decided to separate each pageview and each feature into their own components (stored in separate files, and imported as necessary). This way, each feature becomes isolated from each other, and can be implemented more freely wherever they are needed. Pages and features
are managed by their own code, and receive data/info from other components as needed.

Thanks to React re-rendering the user interface changes at state changing, updating components becomes much easier and  more manageable. Check out the following image for explanation:

[ IMAGE UNDER WORK ]


In Tabeon, React components are located in /tabeon/src/components.  A component may contain programming logic to execute tasks, and its contents can be rendered by React using an extended JavaScript syntax called JSX (more about that: https://reactjs.org/docs/introducing-jsx.html)

A basic single, independent component in React - with no regards to common features in other components - can be accomplished like this:

``class FootballStandings extends Component``

More about React components here: https://reactjs.org/docs/components-and-props.html. More examples on how components are used to create modals, page views and modules used in Tabeon can be found below.

### Important files and locations

__src/index.js: Start rendering the user interface with React__

The first UI js file to load when React launches in index.html. This file renders the project's user interface component (from here on "App component"), ``<App />``, into the #root element of index.html, using the following snippet

``ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));``

``<BrowserRouter>`` is part of the 'react-router-dom' library, which encapsulates the <App /> component. This is required in order to implement navigation rendering through address bar. More about this in routeList.jsx below.

__src/App.js: The root component__

This file holds the App component, which acts as Tabeon's root component. This component is used solely in index.js mentioned above, and renders the groundwork JSX of the app's graphical user interface into the DOM. It also holds state data and retrieved updated state data necessary to render correct information in the user interface as a whole.

The rendered user interface contains the following notable components and data passed to them (data are passed as props, defined below):

- Any Modal Component
    These components render popup, using Bootstrap's CSS modal (graphical features such as fadein and fadeout powered by jQuery are not included). Which modal is launched depends on what data is set in <App /> component state by ``modalHandler()``

    - __onSave__: Props acting as a function. Meant for use when the modal wants to pass data to the <App /> component (optional)
    - __onDismiss__: Props acting as a function. MEant for use when the modal is dismissed and cleanup work needs to be done in <App />. (mandatory)


- MainSidebar
    Component rendering the sidebar, listing all main views

    - __onMainSidebarClick__: Props acting as a function. This gets called by the sidebar when the user clicks any navigation link listed (mandatory)

- RouteList
    Component containing all views available to the user. This component also mounts views by the path set in the addressbar, using the react-router-dom library. For example: _/dashboard_ mounts ``<DashboardView>`` component, _/calendar_ mounts ``<CalendarView>``.

    - __onRaiseModal__: Props acting as a function. Triggered when a view listed wants to trigger a modal
    - __onNavigation__: Props acting as a function. Triggered by a view when it has been mounted

- ViewFooter
    Component containing the footer of the whole graphical user interface

- FullWidthLoadbar
    Component containing and animating a loadbar on top of the DOM. Animation triggers each time the refreshfactor in the App component state is increased.

__src/components/views: The view component and its child components__

This folder holds all page view components, including view.jsx, which is the parent component for all pageviews in Tabeon. This component contains all common features for a pageview, such as calling the modal handler located in the app component, or automatically informing the app component whenever a view has been mounted. This component does not render anything, but its child components do.

Example:

- The layout of view.jsx, as a React component:

```
import { Component } from 'react';

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

    raiseToModal = (data) => {
        const { onRaiseToModal } = this.props;

        onRaiseToModal(data);
    }

    componentDidMount = () => {
        this.handleViewMount();

        if(typeof this.childComponentDidMount === "function"){
            this.childComponentDidMount();
        }
    }

    render = () => {
        return null;
    }
}

export default View;
```

- A Tabeon page view component, inheriting features from View. This component also contain its own isolated features not available to other components, and renders its own UI into the DOM. Its location would be /tabeon/src/components/views under a filename representing it, e.g. myView.jsx.


```
import React, {Fragment} from 'react';
import View from './view';

class MyView extends View {
    render = () => {
     
        return(
            <Fragment>
                <h1>My Page</h1>
                <MyModule></MyModule>
            </Fragment>
        );
    }
}

export default MyView;
```

A pageview may receive data from - and send data to - the App component via the RouteList component.

__src/components/modules: The module component and its child components__

located in /tabeon/src/components/modules

Each page view does not necessarily host only one single feature, but many. In order to keep the pageviews' code from getting convoluted, each feature is divided into their own components (called "modules"). For the same reason as in pageview's case, modules are also set into a parent-child relation. However, the rendering flow is handled slightly differently.

The parent module, from which all child modules inherit common features, handles the rendering of a module's user interface by using the render() method inherited from React's Component class. Check the simplified example below:

```
import React, { Component, Fragment, CreateRef } from "react";

class Module extends Component {
    renderHeader = () => {}
    renderBody = () => {}
    renderFooter = () => {}

    render = () => {
        return (
            <div className="module-container">
                <div className="header-section">
                    {this.renderHeader()}
                </div>
                <div className="contents-section">
                    {this.renderBody()}
                </div>
                <div className="button-section">
                    {this.renderFooter()}
                </div>
            </div>
        );
    }
}
```

This means all modules look the same to the structure, except in the renderHeader(), renderBody(), renderFooter() where feature specific code (logic, as well as JSX) is executed. Check the example below:

```
class CalendarModule extends Module {
    state = {
        
    }

    renderHeader = () => {
        return (
            "<h1>Calendar</h1>"
        )
    }

    renderBody = () => {
        // Call necessary functions and features to build the calendar
        
        return (
            // ... Render the calendar
        );
    }

    renderFooter = () => {
        return (
            <Fragment>
                <button className="btn btn-primary" onClick={() => saveData(this.state)}>Close<button>
            </Fragment>
        )
    }

    saveData = (data) => {
        // Call a service or whatever providing storage for my data
    }
}
```

A module may pass data to its pageview component, which in turn can pass the data to the App component via the RouteList component. Data may also be passed to the module starting anywhere in the parent chains e.g. App > RouteList > Pageview > Module.