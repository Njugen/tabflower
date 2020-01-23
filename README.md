# Tabeon - The Ultimate Tab Manager

Tabeon is a webextension for managing browser window, tabs and history - as well as related history, sessions and media that the user stores while browsing the web. This extension
is meant to help the user manage information stored in the browser, and in that manner cut and schedule information as needed, be it for lighter use of resources or more organized browsing
for different tasks required by different situations (hobby, work etc)

Currently, this extension is in development for Google Chrome, Mozilla Firefox and Microsoft Edge, as a hobby/learning project.

## Libraries and frameworks used in Tabeon

- React - to manage the user interface of the options page
- Bootstrap - to make the user interface responsive
- Webextension API - to communicate with web browsers as well as using browser features in user interfaces

## Extension Structure

Webextensions consists of multiple sections (all of them are most likely not used in every extension). Lets consider the following:
A webextension may use one or more of the following features available in the web browser:

#### User interface script - what the user sees or what is running on the user interface

- Popup (UI that shows up when clicking the extension icon in the browser tray)
- Sidebar (UI that shows up at the side of a web page, when triggering certain functionalities. E.g. history sidebar listing all visited pages)
- Options page (UI that shows up in either new tab or window, when launching a web extension's settings management)
- Content Scripts (Front-end scripts running on pages choses by the webextension. The user may, or may not, see what the script does, but it is running)

Read more about these here:
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Sidebars_popups_options_pages 
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Content_scripts

#### Background 

Aside from UI scripts, where a user may control one or more features through the user interface (input fields, checkboxes etc), data about the user's choices needs to be stored in the extension. Sometimes, the UI also needs
data about the browser - as well as user activities stored in the browser itself. Data can be stored, and retrieved, from the extension's background for usage in the user interface. The extension background may act like a bridge between
the user and the browser in order to fully make use of the features provided by this extension (e.g. managing browser window and tabs).

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_scripts

#### The extension's manifest

... Under construction

## Option's Page UI

The options page for Tabeon assembles all the necessary features in separate pages. Furthermore, in some pages, these features are separated from each other into
their own modules (containers). The idea is to keep the features categorized, and make it easier for the user to find what he is looking for.

### Folder Structure

... Under construction

### The use of React Components and State in Tabeon

Since the Tabeon extension uses React for UI management, I've decided to separate each pageview and each feature into their own components (stored in separate files, and imported as necessary). The advantage of this, from a technical standpoint, is that each feature becomes isolated from each other, and can be implemented more freely wherever they are needed without needing to worry about code relationships. Both pages and features
are managed by their own code, and receive data from other components when needed.

Thanks to React re-rendering the user interface at state changing, updating components without cross sending data becomes much easier and makes more manageable. Check out the following image explaining
Tabeon's use of component and state:

[ IMAGE UNDER WORK ]

#### Creating a component

In Tabeon, React components are located in /tabeon/src/components. A component may be a pageview, a module, a modal or anything else which isolates a feature for use by other features. A component may contain programming logic to execute tasks, and can be rendered by React using an extended JavaScript syntax called JSX (more about that: https://reactjs.org/docs/introducing-jsx.html)

For example, a tab listing module - for use in Tabeon - may be created in the following manner:


``This module would be located in this file: /tabeon/src/components/modules/tabManagementModule.jsx

    import React, {Fragment} from 'react';
    import Module from './module';

    class TabManagementModule extends Module {
        state = {
            tabs: {}
        };

        getTabs = (callback) => {
            // Get tabs from browser background using Webextension API
            
            browser.sendToBackground("blablabla", (response) => {
                callback(response);
            })
        };

        componentDidMount = () => {
            // A component has been mounted to the DOM:
            // Get the tabs and set it to the component's state object.
            // For each state change, for any reason, the component's render() function will reruns, re-rendering UI
            // using the updated data retrieved.

            this.getTabs((data) => {
                this.setState({
                    tabs: data
                })
            })
            
        }

        render = () => {
            const { tabs } = this.state;

            return (
                <div>{ tabs }</div>
            )
        }
    }

    export default TabManagementView``

and rendered by any pageview like this:

``This module view be located in this file: /tabeon/src/components/views/tabsView.jsx

    import React, {Fragment} from 'react';
    import TabManagementModule from '../modules/tabManagementModule';
    import View from './view';

    class TabsView extends View {
        render = () => {
            return (
                <Fragment>
                    <span>List of tab related options:</span>
                    <TabManagementModule />
                </Fragment>
            )
        }
    }

    export default TabsView``

The parent classes of __TabManagementModule__ and __TabsView__ (__Module__ and __View__ respectively) are components themselves. Creating parent classes for components are seldom necessary in React. In the Tabeon user interface however, there will be many modules, views and modals components which use common features stored in the parent classes.

Creating a basic single, independent component in React, with no regards to common features in other components, is explained here: https://reactjs.org/docs/components-and-props.html 

#### Important files

##### index.js: Start rendering the user interface with React

located in /tabeon/src/index.js

The first UI js file to load when React launches. This file renders the project's user interface component, ``<App />``, into the #root element of index.html, using the following snippet

``ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));``

``<BrowserRouter>`` is part of the 'react-router-dom' library, which encapsulates the <App /> component. This is required in order to implement navigation through address bar. More about this in routeList.jsx below.

##### App.js: The root component