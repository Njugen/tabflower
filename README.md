<<<<<<< HEAD
# Tabflower- The Ultimate Tab Manager

Tabflower is a webextension for managing browser windows and tabs. It is intended for people - like myself - who simply cannot browse a session without opening thirty-forty tabs, while never noticing before the computer slows down immensely. Using Tabflower, browsing becomes smoother as you may open - as well as close - one or multiple tabs at once depending on your needs and/or tasks at specific times, helping you be consequential with your browser. None of us wants to get distracted by irrelevant contents at work - and none of us wants to work during our freetime, right?

### Features

- Oversight of windows and tabs in your browser, and your latest actions in Tabflower
- Create groups from tabs and windows already opened in the browser
- Create groups from bookmarks and browsing history
- Launch all tabs and windows stored in one or more groups at once
- Close all existing tabs at once
- Schedule tabs and groups to automatically launch at certain time
- Scan groups and tab lists to remove unresponsive tabs
- Export/Import your Tab Flower settings from one browser to another
- Available for Mozilla Firefox, Google Chrome and Microsoft Edge
- ... and more!

Currently, this extension is in development for Google Chrome, Mozilla Firefox and Microsoft Edge, as a hobby/learning project.

## Libraries and frameworks used in Tabflower

- React - UI library to manage user interfaces shown to the user
- Bootstrap - Toolkit to make the user interface responsive. In this project, jQuery is skipped and stick to HTML, CSS and Javascript.
- Webextension API - to communicate with web browsers as well as using browser features in user interfaces

## Extension Structure

Tabflower webextension consists of the following sections (all of them are most likely not used in every extension). Lets consider the following:

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


## How to use the source

... Under contruction

## How to build the webextension

# The extension's options page

## React Components and State in Tabflower

Since the Tabflower extension uses React to build UI, I've decided to separate each pageview and each feature into their own components (stored in separate files, and imported as necessary). This way, each feature becomes isolated from each other, and can be implemented more freely wherever they are needed. Pages and features
are managed by their own code, and receive data/info from other components as needed.

Thanks to React re-rendering the user interface changes at state changing, updating components becomes much easier and  more manageable. Check out the following image for explanation:

[ IMAGE UNDER WORK ]


In Tabflower, React components are located in /Tabflower/src/components.  A component may contain programming logic to execute tasks, and its contents can be rendered by React using an extended JavaScript syntax called JSX (more about that: https://reactjs.org/docs/introducing-jsx.html)

A basic single, independent component in React - with no regards to common features in other components - can be accomplished like this:

```javascript
class FootballStandings extends Component
```

More about React components here: https://reactjs.org/docs/components-and-props.html. More examples on how components are used to create modals, page views and modules used in Tabflower can be found below.

## Important files and locations

__src/index.js: Start rendering the user interface with React__

The first UI js file to load when React launches in index.html. This file renders the project's user interface component (from here on "App component"), ``<App />``, into the #root element of index.html, using the following snippet

``ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));``

``<BrowserRouter>`` is part of the 'react-router-dom' library, which encapsulates the <App /> component. This is required in order to implement navigation rendering through address bar. More about this in routeList.jsx below.

__src/App.js: The root component__

The App component acts as Tabflower's root component. This component is used solely in index.js mentioned above, and renders the groundwork JSX of the app's graphical user interface into the DOM. It also holds state data and retrieved updated state data necessary to render correct information in the user interface as a whole.

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

This folder holds all page view components, including view.jsx, which is the parent component for all pageviews in Tabflower. This component contains all common features for all pageviews, such as calling the modal handler located in the app component, or automatically informing the app component whenever a view has been mounted. This component does not render anything, but its child components do.

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

4. Import the following dependencies into "myview.jsx" file. Place these lines at the very top of the doucment:

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

## Adding a new module

1. Go to the following folder: src/components/modules/

2. Create a new file and give it a name, e.g. "mymodule.jsx"

3. Open "mymodule.jsx" in a code editor

4. Import the following dependencies into "mymodule.jsx". Place these lines at the very top of the doucment:

```javascript
import React, { Fragment } from "react";
import Module from '../../utils/moduleon/module';
```

5. Create a new component class named "MyModule", and add a settings object to it. This component inherits from the Module component imported in the previous step:

```javascript

class MyModule extends Module {
    settings = {
        moduleTitle: "My Module"
    }
}

```

6. Add contents to the module by adding a renderBody() function to its class. For example:

```javascript
renderBody = () => {
    // Logic here

    return (
        <span>"This is my module"</span>
    );
}
```

7. Add contents, or preferably, controls to its footer by adding renderFooter(). For example:

```javascript
renderFooter = () => {
    return (
        <Fragment>
            <button className="btn btn-tabeon" onClick={() => "Trigger a save function"}>Save changes</button>
        </Fragment>
    );
}
```

8. Export the component by adding an export command to the bottom of the file. E.g.

```javascript
export default MyModule;
```

### Adding the module to a page view

1. Open /src/components/views/myview.jsx or any other view where you want to add a module

2. At the top of the view file, import the "MyModule" component

```javascript
import mymodule from './../modules/mymodule';
```

3. Then use the module in the view's render function. Like this:

```javascript
class MyView extends View {
    render = () => {
        return (
            <Fragment>
                <div>Example</div>
                <MyModule></MyModule>
            </Fragment>
        );
    }
}
```

4. Save the view file. Once the user access the "MyView" page by route, he will see the "MyModule" fully visible

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

6. Run the project. You should now see "My View" listed in the sidebar. Clicking it takes you to /myview, and shows you the "MyView" component rendered (including text and modules added to the view in the previous steps).

## Adding a new modal

1. Go to this folder: /src/components/modals

2. Create a new file, which will contain your new modal. Name it "mymodal.jsx"

3. Open "mymodal.jsx", and import the following snippet at the very top of the file:

```javascript
import React from "react";
import Modal from './modal';
```

4. Below the imports, create a new modal component class, inheriting from the Modal component imported in the previous step. Name it "MyModal".

5. Add the template functions into the modal. The template may be built upon, but the original code snippets should persist. See the full example of a default modal component:

```javascript
class MyModal extends Modal {
    saveModalHandler = (callback) => {
        /* 
            If this function is available in the modal, then a blue progressive button
            will be made available. This function is triggered when that button is clicked, and any
            modal data is removed.

            The callback provides the modal's state data to the caller. New features
            may be added, but keep the existing logic
        */

        this.clearModalData(callback(this.state))
    }

    dismissModalHandler = () => {
        /*
            If this function is available in the modal, then a gray "cancel" button will be visible to the user.
            This function is triggered when that button is clicked, dismissing the modal in the user interface and removes any state data.
        */

        this.clearModalData();
    }

     renderModalBody(){
        /*
            Return either string or JSX/HTML, which will be rendered
            in the modal's content section
        */
        return "You have changed some important settings to the calendar feature. Are you sure you want to keep the changes?";    
    }

    renderModalHeader(){
        /*
            Return either string or JSX/HTML, which will be rendered
            in the modal's headline section
        */
        return "Confirm your settings";    
    }
}
```

5. Export the modal, place an export snippet at the very bottom of the file. Then save it.

```javascript
export default MyModal
```

6. Go to /src/App.js, open it and import the modal

```javascript
import MyModal from "./components/modals/mymodal";
```

7. Add the following JSX snippet to the render() function located in the App component class. Preferably as the first thing inside the <Fragment> component. Example:

```javascript
    render = () => {
        const { launched: modalLaunched, id: modalId } = this.state.modal;

        return (
            <Fragment>
                 {(modalLaunched && modalId === "my-own-modal") && <MyModal data={this.state.modal} onSave={() => ""} onDismiss={() => this.clearModal()}></MyModal>}
                 ... More contents
            </Fragment>     
        )
    } 
```

8. The modal component has been added to App.js. As the code implies, the modal will only be rendered if the "my-own-modal" id is set to the App component's state. If the id is removed or changed, that modal will automatically be removed from the DOM by React.

### Triggering a modal from a view or a module

1. Open /src/components/views/myview.jsx, or any other view from which you want to trigger a modal. The upcoming steps work in both cases:

2. Call the ``this.raiseToModal(options)`` function, where __options__ (valid keys are "id" and "action") is an object consisting of specifications for the call. Example on how to call "MyModal", created in the previous steps, when a button is clicked:

```javascript
render = () => {
    return (
        <button className="btn btn-tabeon" onClick={() => {this.raiseToModal({ id: "my-own-modal" })}>Click me!</button>
    );
}
```

3. It is possible to trigger a function located in the calling view's or modal's component when the user clicks the progressive button in the modal. Simply provide an ``action`` key in the __options__ object, which holds a function bound to this view class. This is useful if the user needs to confirm something before an action can be executed. Check the example below:

```javascript
verifyPayment = () => {
    
}

render = () => {
    return (
        <button className="btn btn-tabeon" onClick={() => {this.raiseToModal({ id: "my-own-modal", action: this.verifyPayment.bind(this) })}>Click me!</button>
    );
}
```

4. Save myview.jsx and run the project. 
=======

>>>>>>> 80b15d5cb15602a5d89c644cbeb3cef890912796
