import React, { Component } from "react";
import * as ExceptionsHandler from "../../utils/exceptionsAndHandler";
import * as validator from "../../utils/inputValidators";
import WindowsList from "./../windowsList";

class TBWindowListInput extends Component {
  /*
        loadUrl()

        Load a url, and run one of two available callback functions depending on the result

        Parameters:
        - url (string, mandatory)
        - success (callback function, mandatory. Run when the url response is ok)
        - fail (callback function, mandatory. Run when the url response is not ok)
    */
  loadUrl = (url, success, fail) => {
    try {
      const { isString, isFunction } = validator;

      if (!isString(url)) {
        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-104");
      }

      if (!isFunction(success)) {
        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-105");
      }

      if (!isFunction(fail)) {
        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-106");
      }

      return global
        .fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw ExceptionsHandler.ValidatorError(
              "ETGMCreateNewGroupModal-103"
            );
          }
        })
        .then((responseText) => {
          success(responseText);
        })
        .catch((err) => {
          fail(err);
        });
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  /*
        deleteWindow()

        Delete a selected window from the tab group by targetting it by id.

        Parameters:
        - windowIndex (number, mandatory) - The map id of the targetted window (the window to delete)
    */
  deleteWindow = (windowIndex) => {
    try {
      const { isAtLeastZero, isObject } = validator;
      const { windowCollection, onModifyList } = this.props;

      let windows;

      if (isAtLeastZero(windowIndex)) {
        if (Object.keys(windowCollection).length > 0) {
          windows = JSON.stringify(windowCollection);
          const parsedWindows = JSON.parse(windows);

          if (isObject(parsedWindows[windowIndex])) {
            parsedWindows.splice(windowIndex, 1);

            onModifyList("windowCollection", parsedWindows, "tabGroupDetails");
          } else {
            throw ExceptionsHandler.ValidatorError(
              "ETGMCreateNewGroupModal-134"
            );
          }
        } else {
          throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-133");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-111");
      }
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  /*
        addNewWindow(inputUrl)

        Attempt to add a new window to this tab group, by checking the response of the url. If the response
        is positive, a new window with this url will be added. Otherwise, do something else... 

        (NOTE: right now, a new window will be added either way... this should be changed later or at least the user should
            be given the opportunity to change it)

        Parameters:
        - inputUrl (string, mandatory) - URL of the to be added
    */
  addNewWindow = (inputUrl) => {
    try {
      const { isString, isArray } = validator;
      const { windowCollection, onModifyList } = this.props;
      console.log("WINDOW COLL", windowCollection);
      if (isString(inputUrl)) {
        if (isArray(windowCollection)) {
          let windows;

          if (isArray(windowCollection) && windowCollection.length > 0) {
            windows = [...windowCollection];
          } else {
            windows = [];
          }

          this.loadUrl(
            inputUrl,
            (responseText) => {
              const parsedResponse = new window.DOMParser().parseFromString(
                responseText,
                "text/html"
              );

              windows.push({
                tabs: [
                  {
                    title: parsedResponse.title,
                    favIconUrl: inputUrl + "/favicon.ico",
                    url: inputUrl,
                  },
                ],
              });
              onModifyList("windowCollection", windows, "tabGroupDetails");
            },
            (err) => {
              windows.push({
                tabs: [
                  {
                    title: inputUrl,
                    favIconUrl: inputUrl + "/favicon.ico",
                    url: inputUrl,
                  },
                ],
              });

              onModifyList("windowCollection", windows, "tabGroupDetails");
            }
          );
        } else {
          throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-125");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-104");
      }
    } catch (err) {
      console.log("IDG", err);
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  /*
        addNewTab()

        Attempt to add a new tab to this window, by checking the response of the url. If the response
        is positive, a new tab with this url will be added. Otherwise, do something else... 

        (NOTE: right now, a new tab will be added to the selected window either way... this should be changed later or at least the user should
            be given the opportunity to change it)

        Parameters:
        - inputUrl (string, mandatory) - URL of the to be added
        - index (number, mandatory) - map id of the targetted window (the window to which the new tab should be added)
    */
  addNewTab = (inputUrl, index) => {
    try {
      const { isString, isAtLeastZero, isArray } = validator;
      const { windowCollection, onModifyList } = this.props;

      if (isString(inputUrl)) {
        if (isAtLeastZero(index)) {
          if (isArray(windowCollection)) {
            let windows;

            if (isArray(windowCollection) && windowCollection.length > 0) {
              windows = [...windowCollection];
            } else {
              throw ExceptionsHandler.ValidatorError(
                "ETGMCreateNewGroupModal-129"
              );
            }

            const stringifiedWindows = JSON.stringify(windows);
            let parsedWindows = JSON.parse(stringifiedWindows);

            this.loadUrl(
              inputUrl,
              (responseText) => {
                const parsedResponse = new window.DOMParser().parseFromString(
                  responseText,
                  "text/html"
                );

                parsedWindows[index].tabs.push({
                  title: parsedResponse.title,
                  favIconUrl: inputUrl + "/favicon.ico",
                  url: inputUrl,
                });

                onModifyList(
                  "windowCollection",
                  parsedWindows,
                  "tabGroupDetails"
                );
              },
              (err) => {
                parsedWindows[index].tabs.push({
                  title: inputUrl,
                  favIconUrl: inputUrl + "/favicon.ico",
                  url: inputUrl,
                });

                onModifyList(
                  "windowCollection",
                  parsedWindows,
                  "tabGroupDetails"
                );
              }
            );
          } else {
            throw ExceptionsHandler.ValidatorError(
              "ETGMCreateNewGroupModal-125"
            );
          }
        } else {
          throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-107");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-108");
      }
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  /*
        deleteTab()

        Delete a selected tab from the tab group by targetting the window where it is located

        Parameters:
        - windowIndex (number, mandatory) - The map id of the targetted window
        - tabIndex (number, mandatory) - The map id of the targetted tab (the tab to be deleted)
    */
  deleteTab = (windowIndex, tabIndex) => {
    try {
      const { isAtLeastZero, isObject } = validator;
      const { windowCollection, onModifyList } = this.props;

      if (isAtLeastZero(windowIndex)) {
        if (isAtLeastZero(tabIndex)) {
          let windows;

          if (Object.keys(windowCollection).length > 0) {
            windows = JSON.stringify(windowCollection);
            const parsedWindows = JSON.parse(windows);

            if (isObject(parsedWindows[windowIndex])) {
              if (isObject(parsedWindows[windowIndex].tabs[tabIndex])) {
                parsedWindows[windowIndex].tabs.splice(tabIndex, 1);
              }

              if (parsedWindows[windowIndex].tabs.length < 1) {
                parsedWindows.splice(windowIndex, 1);
              }

              onModifyList(
                "windowCollection",
                parsedWindows,
                "tabGroupDetails"
              );
            } else {
              throw ExceptionsHandler.ValidatorError(
                "ETGMCreateNewGroupModal-131"
              );
            }
          } else {
            throw ExceptionsHandler.ValidatorError(
              "ETGMCreateNewGroupModal-130"
            );
          }
        } else {
          throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-109");
        }
      } else {
        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-110");
      }
    } catch (err) {
      ExceptionsHandler.ErrorHandler(err, this.sendToErrorOverlay);
    }
  };

  render = () => {
    const { isString } = validator;
    const { windowCollection, type, warning, label } = this.props;
    /*
    if (isArray(windowCollection)) {
      windowCollection = windowCollection || [];
    } else {
      throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-121");
    }
*/
    if (!isString(type)) {
      throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-112");
    } else {
      if (
        type !== "currently-opened" &&
        type !== "existing-group" &&
        type !== "new-group"
      ) {
        throw ExceptionsHandler.ValidatorError("ETGMCreateNewGroupModal-113");
      }
    }

    return (
      <div className="tb-windowlist-container">
        <div className="tb-form-row-nomargin row d-flex justify-content-between">
          <div className="label mb-0 mt-4">
            <h6>
              {type === "currently-opened" &&
                "Currently opened windows and tabs"}
              {type === "existing-group" &&
                "Edit the windows and tabs in this group"}
              {type === "new-group" && "Add windows or tabs to this new group"}
            </h6>
          </div>
          <div className="col-4 label">
            <span>{typeof warning === "string" && warning}</span>
          </div>
        </div>
        <div className="tb-form-row-nomargin row">
          <div className="col-12 mt-0 nopadding">
            <WindowsList
              windows={windowCollection}
              onAddNewWindow={(data) => this.addNewWindow(data)}
              onAddNewTab={(data, index) => this.addNewTab(data, index)}
              onDeleteTab={(windowIndex, tabIndex) =>
                this.deleteTab(windowIndex, tabIndex)
              }
              onDeleteWindow={(windowIndex) => this.deleteWindow(windowIndex)}
              onRaiseToErrorOverlay={(data) => this.sendToErrorOverlay(data)}
              canCloseItems={
                type === "existing-group" || type === "new-group" ? true : false
              }
              initialShowTabs={false}
              initialTabStyle="vertical"
              type={type}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default TBWindowListInput;
