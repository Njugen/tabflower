# Tabeon

Tabeon is a webextension for managing browser window, tabs and history - as well as related history, sessions and media that the user stores while browsing the web. This extension
is meant to help the user manage information stored in the browser, and in that manner cut and schedule information as needed, be it for lighter use of resources or more organized browsing
for different tasks required by different situations (hobby, work etc)

Currently, this extension is in development for Google Chrome, Mozilla Firefox and Microsoft Edge, as a hobby/learning project.

## Libraries and frameworks used in Tabeon

- React, to manage the user interface of the options page
- Bootstrap, to make the user interface responsive

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