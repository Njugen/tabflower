import React, { Component } from "react";
import { ValidatorError, ErrorHandler } from '../exceptionsAndHandler';
import { PropTypes } from 'prop-types';
import * as validator from './../../utils/inputValidators'
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");


class Module extends Component {

    /*
        Module State
        - dropDownGrid 
        information about what module is being dragged over and what module is currently dragged,
        this information is used by moduleon utility to drag and drop modules

        - moduleData
        Contains possible data that is generated for use by the module itself or its view/sibling modules
        (can be empty if the module does not generate necessary data)

        - settings
        Contains preset information needed for the module's basic/common features to work

    */
    state = {
        dropDownGrid: {
            draggedOverModuleId: "",
            moduleBeingDraggedId: ""
        },
        moduleData: {
            
        },
        settings: {
            minimized: false
        }
    }

    /*
        Module settings

        - More info to be added...
    */
    settings = {};

    raiseToErrorOverlay = (data) => {
        const { onRaiseToErrorOverlay } = this.props;

        if(typeof onRaiseToErrorOverlay === "function"){
            onRaiseToErrorOverlay(data);
        }
    } 

    handleDragOver = (componentEvent) => {
        /*
            Once another module gets dragged over this module, this method gets called as part of the onDragOver event.
            It's task is to inform the Moduleon component state that is has now been draggedover.

            The information is raised through this component chain:
            module > moduleColumn > moduleon
        */
        try {
            const { isObject } = validator;

            if(isObject(componentEvent)){
                componentEvent.preventDefault();

                if(isObject(componentEvent.target)){
                    const isModuleContainer = componentEvent.target.className.includes("tabeon-module-container");

                    if(isModuleContainer){
                        this.props.onDragOver(componentEvent.target.children[0].id)
                    } else {
                        return;
                    }
                } else {
                    throw new ValidatorError("module-101");
                }
            } else {
                throw new ValidatorError("module-102");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
        
    }

    handleDrop = (componentEvent) => {
        /*
            Once this module has been dropped (when dragged), this method gets called as part of the onDrop event.
            This method tells the Moduleon component that this module has been dropped. Once this is done, this module will
            lose its CSS highlight.

            The information is raised through this component chain:
            module > moduleColumn > moduleon
        */
       try {
            const { isObject } = validator;

            if(isObject(componentEvent)){
                componentEvent.preventDefault();

                if(isObject(componentEvent.target)){
                    this.props.onDrop(componentEvent.target.parentElement);
                } else {
                    throw new ValidatorError("module-103");
                }
            } else {
                throw new ValidatorError("module-104");
            }
       } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
       }
    }

    handleDragStart = (componentEvent) => {
        /*
            Once the user starts dragging this module, this method gets called as part of the onDragStart event.
            This method tells the Moduleon component state that this module is being dragged, and in doing so enables
            CSS highlight (which disappears when module is dropped)

            The information is raised through this component chain:
            module > moduleColumn > moduleon
        */
        try {
            const { isObject } = validator;

            if(isObject(componentEvent)){
                if(isObject(componentEvent.target)){
                    this.props.onDragStart(componentEvent.target);
                } else {
                    throw new ValidatorError("module-105");
                }
            } else {
                throw new ValidatorError("module-106");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    handleModuleMinimize = () => {
        /*
            Event handler which is run when the user clicks the up/down array in the module's header. When clicked,
            the state's settings section will change based on the inputs to this.changeStateSettings();

            E.g. setting minimized to true will cause this module to contract, making only its header visible to the user
        */
        try {
            this.changeStateSettings({
                minimized: true
            });
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    handleModuleExpand = () => {
        /*
            Event handler which is run when the user clicks the up/down array in the module's header. When clicked,
            the state's settings section will change based on the inputs to this.changeStateSettings();

            E.g. setting minimized to false will cause this module to expand, making its contents and footer visible to the user
        */
        try {
            this.changeStateSettings({
                minimized: false
            });
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    changeStateSettings = (parameters) => {
        /*
            Change or modify the settings section of the module's state.

            Parameters:
            - parameters (object, mandatory): An object with a set of new options e.g. { minimized: false, blablabla: "blablabla" }
        */
        try {
            const { isObject } = validator;
            
            if(isObject(parameters)){
                const settings = {
                    ...this.state.settings, ...parameters
                }

                this.setState({
                    settings
                });
            } else {
                throw new ValidatorError("module-107");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    changeStateModuleData = (parameters) => {
        /*
            Change or modify the moduleData section of the module's state.

            Parameters:
            - parameters (object, mandatory): An object with a set of new options e.g. { module_specific_info_1: "abc", module_specific_info_2: "blablabla" }
        */
        try {
            const { isObject } = validator;

            if(isObject(parameters)){
                const moduleData = {
                    ...this.state.moduleData, ...parameters
                }

                this.setState({
                    moduleData
                });
            } else {
                throw new ValidatorError("module-108");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }

    createStateModuleDataSection = (sectionName) => {
        /*
            Create a sub section inside the state.moduleData. Use this function only
            if keeping data separate inside the moduleData section is absolutely necessary (be it for sorting or
            organizing purposes)

            E.g. 
            this.createStateModuleDataSection("batman");

            will result in:

            state = {
                dropDownGrid: {...},
                moduleData: {
                    batman: {}
                }, 
                settings: {...}
            }
        */
        try{
            const { isString } = validator;

            if(isString(sectionName)){
                if(!this.state.moduleData[sectionName]){
                    let data = {
                    };
                    
                    data[sectionName] = {};
                    this.changeStateModuleData(data);
                }
            } else {
                throw new ValidatorError("module-109");
            }
        } catch(err){
            ErrorHandler(err, this.raiseToErrorOverlay);
        }
    }
    componentDidMount = () => {
        const { isFunction, isObject } = validator;
        if(isFunction(this.verifyChildProps)){
            this.verifyChildProps();
        }

        /*
            Every module can set their own settings independent from other modules. E.g. Module A may be minimized
            while Module B is not, and so forth.

            This can be done by inserting a settings object into the modules. If the settings object
            is found, it will be added to the module's state (doing it this way keeps us from constantly verifying
            the other variables in the state).
        */

        if(isObject(this.settings)){
            this.changeStateSettings(this.settings); 
        }

        /*
            A module may also need to run its own special tasks immediately after mount. To do this, add
            childComponentDidMount() into the module, which will be executed if it exists
        */

        if(isFunction(this.childComponentDidMount)){
            this.childComponentDidMount();
        }
    }

    componentWillMount = () => {
        /*
            A module may need to run its own special tasks before being mounted. To do this, add
            childComponentWillMount() into the module, which will be executed if it exists
        */
        const { isFunction } = validator;

        if(isFunction(this.childComponentWillMount)){
            this.childComponentWillMount();
        }
    }

    raiseToModal = (data) => {
        /*
            Parameters: 
            -   data (object, containing whatever data that we want the modal to processs. Mandatory)

            Inform the App component to launch a modal (popup), by raising the data provided
            in this function's parameter. The data parameter will travel through the following components:

                Module (any module, this module) > View (any view: this view) > RouteList > App

            All components in this chain will have access to the information raised.
        */

        const { onRaiseToModal } = this.props;

        onRaiseToModal(data);
    }

    renderHeader = () => {

    }

    renderBody = () => {
        
    }

    verifyProps = () => {
        const { 
            onRaiseToModal, 
            onDragOver, 
            onDrop, 
            onDragStart, 
            onRaiseToErrorOverlay,
            id
        } = this.props;

        const { isFunction, isString, isObject, isEmptyString } = validator;

        if(!isFunction(onRaiseToModal)){ throw new ValidatorError("module-verifyProps-101"); }
        if(!isFunction(onDragOver)){ throw new ValidatorError("module-verifyProps-102"); }
        if(!isFunction(onDrop)){ throw new ValidatorError("module-verifyProps-103"); } 
        if(!isFunction(onDragStart)){ throw new ValidatorError("module-verifyProps-104"); }
        if(!isFunction(onRaiseToErrorOverlay)){ throw new ValidatorError("module-verifyProps-106"); }
        if(!isString(id)){ throw new ValidatorError("module-verifyProps-107"); }

        if(!isObject(this.settings)){ throw new ValidatorError("module-verifyProps-108"); }
        

        // Check state
        if(isObject(this.state)){
            const { dropDownGrid, moduleData, settings } = this.state;

            if(!isObject(dropDownGrid)){ 
                throw new ValidatorError("module-verifyProps-110");
            } else { 
                const { draggedOverModuleId, moduleBeingDraggedId } = dropDownGrid;

                if(!isString(draggedOverModuleId) && !isEmptyString(draggedOverModuleId)){
                    throw new ValidatorError("module-verifyProps-113");
                }

                if(!isString(moduleBeingDraggedId) && !isEmptyString(moduleBeingDraggedId)){
                    throw new ValidatorError("module-verifyProps-114");
                }
            }

            if(!isObject(moduleData)){ throw new ValidatorError("module-verifyProps-111"); }
            if(!isObject(settings)){ throw new ValidatorError("module-verifyProps-112"); }
        } else {
            throw new ValidatorError("module-verifyProps-109");
        }
    }

    constructor(props){
        super(props);
        this.verifyProps();
    }

    render = () => {
        return (
            <div id={"tabeon-module-container-id" + this.props.id} droppable="true" onDragOver={(e) => this.handleDragOver(e)} onDrop={(e) => this.handleDrop(e)} className={"tabeon-module-container col-12"}>
                <div id={"tabeon-module-id-" + this.props.id} className={"tabeon-module"}>
                    <div className="row tabeon-module-header" draggable="true" onDragStart={(e) => this.handleDragStart(e)}>
                        <div className="col-12">
                            <div className={this.state.settings.minimized === true ? "row tabeon-module-header-column-wrapper tabeon-no-border" : "row tabeon-module-header-column-wrapper" }>
                                <div className="col-8">
                                    <div className="float-left">
                                        <h5>{this.state.settings.moduleTitle}</h5>
                                    </div>
                                </div>
                                <div className="col-4 tabeon-module-header-control">
                                    <button onClick={(e) => this.state.settings.minimized === true ? this.handleModuleExpand(e) : this.handleModuleMinimize(e) } className="btn shadow-none tabeon-module-header-control-button">
                                        <span className={this.state.settings.minimized === true ? "fas fa-chevron-down" : "fas fa-chevron-up"}></span>
                                    </button> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.settings.minimized === true ? "row tabeon-module-body tabeon-hidden" : "row tabeon-module-body tabeon-inline-block"} draggable="false">
                        <div className="col-12">
                            {this.renderBody()}
                        </div>
                    </div>
                    {typeof this.renderFooter === "function" && this.renderFooter() !== null && 
                        <div className={this.state.settings.minimized === true ? "row tabeon-module-footer tabeon-hidden" : "row tabeon-module-footer  tabeon-inline-block"} draggable="false">
                            <div className="col-12">
                                {this.renderFooter()}
                            </div>
                        </div>
                    }
                </div>
            </div> 
        );
    }
}

export default Module;