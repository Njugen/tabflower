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

```javascript
class FootballStandings extends Component
```

More about React components here: https://reactjs.org/docs/components-and-props.html. More examples on how components are used to create modals, page views and modules used in Tabeon can be found below.

## Important files and locations

__src/index.js: Start rendering the user interface with React__

The first UI js file to load when React launches in index.html. This file renders the project's user interface component (from here on "App component"), ``<App />``, into the #root element of index.html, using the following snippet

``ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));``

``<BrowserRouter>`` is part of the 'react-router-dom' library, which encapsulates the <App /> component. This is required in order to implement navigation rendering through address bar. More about this in routeList.jsx below.

__src/App.js: The root component__

The App component acts as Tabeon's root component. This component is used solely in index.js mentioned above, and renders the groundwork JSX of the app's graphical user interface into the DOM. It also holds state data and retrieved updated state data necessary to render correct information in the user interface as a whole.

The rendered contents contains the following notable components and data passed to them (data are passed as props, defined below):

- Any Modal Component

- MainSidebar
    Component rendering the sidebar, listing all main views

- RouteList
    Component containing all views available to the user. Content is mounted based on the path given in the addressbar

- ViewFooter
    Component containing the footer of the whole graphical user interface

- FullWidthLoadbar
    Component containing and animating a loadbar on top of the DOM.

__src/components/views/view.jsx: The view component__

This folder holds all page view components, including view.jsx, which is the parent component for all pageviews in Tabeon. This component contains all common features for all pageviews, such as calling the modal handler located in the app component, or automatically informing the app component whenever a view has been mounted. This component does not render anything, but its child components do.

A pageview may receive data from - and send data to - the App component via the RouteList component. These files for more clarification:

- src/components/views/view.jsx
- src/components/routes/routeList.jsx


__src/components/modules/module.jsx: The module component__

Each page view does not necessarily host only one single feature, but many. In order to keep the pageviews' code from getting convoluted, each feature is divided into their own components ("modules"). For the same reason as in pageview's case, modules are also set into a parent-child relation. However, the UI rendering is handled by the parent and the content themselves are set by the child components.

A module may pass data to its pageview component, which in turn can pass the data to the App component via the RouteList component. Data may also be passed to the module starting anywhere in the parent chains e.g. App > RouteList > Pageview > Module.

Check the comments in these files for more information:
- src/components/utils/moduleon/module.jsx

## Adding a new page view

1. Go to the following folder: 
/src/components/views/

2. Add a new file and name it "myview.jsx"

3. Open "myview.jsx" in any text or code editor

4. Import the following dependencies into "myview.jsx" file:

```javascript
import React, {Fragment} from 'react';
import View from './view';
```

5. Create a new component class named "MyView" and let it inherit from View (which in turns inherits from Component). Once the MyView class has been created, add a render() function into it. Let the render function return null or JSX code (more info: https://reactjs.org/docs/react-component.html)

```javascript
import React, {Fragment} from 'react';
import View from './view';

class MyView extends View {
    render = () => {
        return (
            <div>Example</div>
        );
    }
}

```

6. Export the "MyView" component for use in other components as well, by adding an export command at the bottom of the file. E.g. the example below:

```javascript
export default MyView;
```

7. Save "myview.jsx"

## Adding a new navigation route, rendering any page view

1. Open the RouteList component in a code editor, located at /src/components/routes/routeList.jsx

2. At the top of the document, you see a handful of imported resources. If the following resources are not available at the very top, then add or move them there:

```javascript
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
```

3. Then slightly below (before the declaration of the RouteList component class), import necessary views. E.g. the "MyView" that was created in previous tutorial.

```javascript
import MyView from './../views/myview'
```

4. In the RouteList component class, find the __routes__ array and add another object into it. The new object's keys should represent the resource it points to. Check the example below:

```javascript
routes = [
    {
        label: "My View",
        path: "/myview",
        component: MyView
    }
]
```

5. Save routeList.jsx

6. Run the project. You should now see "My View" listed in the sidebar. Clicking it takes you to /myview, and shows you the "MyView" component rendered (the only text visible should be "Example").