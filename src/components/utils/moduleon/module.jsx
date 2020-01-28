import React, { Component } from "react";
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

    handleDragOver = (componentEvent) => {
        /*
            Once another module gets dragged over this module, this method gets called as part of the onDragOver event.
            It's task is to inform the Moduleon component state that is has now been draggedover.

            The information is raised through this component chain:
            module > moduleColumn > moduleon
        */

        componentEvent.preventDefault();

        const isModuleContainer = componentEvent.target.className.includes("tabeon-module-container");

        if(isModuleContainer){
            this.props.onDragOver(componentEvent.target.children[0].id)
        } else {
            return;
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
        componentEvent.preventDefault();
        
        this.props.onDrop(componentEvent.target.parentElement);
     
    }

    handleDragStart = (componentEvent) => {
        /*
            Once the user starts dragging this module, this method gets called as part of the onDragStart event.
            This method tells the Moduleon component state that this module is being dragged, and in doing so enables
            CSS highlight (which disappears when module is dropped)

            The information is raised through this component chain:
            module > moduleColumn > moduleon
        */
        this.props.onDragStart(componentEvent.target);
    }

    handleModuleMinimize = () => {
        /*
            Event handler which is run when the user clicks the up/down array in the module's header. When clicked,
            the state's settings section will change based on the inputs to this.changeStateSettings();

            E.g. setting minimized to true will cause this module to contract, making only its header visible to the user
        */
        this.changeStateSettings({
            minimized: true
        });
    }

    handleModuleExpand = () => {
        /*
            Event handler which is run when the user clicks the up/down array in the module's header. When clicked,
            the state's settings section will change based on the inputs to this.changeStateSettings();

            E.g. setting minimized to false will cause this module to expand, making its contents and footer visible to the user
        */

        this.changeStateSettings({
            minimized: false
        });
    }

    changeStateSettings = (parameters) => {
        /*
            Change or modify the settings section of the module's state.

            Parameters:
            - parameters (object, mandatory): An object with a set of new options e.g. { minimized: false, blablabla: "blablabla" }
        */

        if(typeof parameters === "object"){
            const settings = {
                ...this.state.settings, ...parameters
            }

            this.setState({
                settings
            });
        }
    }

    changeStateModuleData = (parameters) => {
        /*
            Change or modify the moduleData section of the module's state.

            Parameters:
            - parameters (object, mandatory): An object with a set of new options e.g. { module_specific_info_1: "abc", module_specific_info_2: "blablabla" }
        */
        if(typeof parameters === "object"){
            const moduleData = {
                ...this.state.moduleData, ...parameters
            }

            this.setState({
                moduleData
            });
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

        if(typeof sectionName === "string"){
            if(!this.state.moduleData[sectionName]){
                let data = {
                };
                
                data[sectionName] = {};
                this.changeStateModuleData(data);
            }
        }
    }
    componentDidMount = () => {
        /*
            Every module can set their own settings independent from other modules. E.g. Module A may be minimized
            while Module B is not, and so forth.

            This can be done by inserting a settings object into the modules. If the settings object
            is found, it will be added to the module's state (doing it this way keeps us from constantly verifying
            the other variables in the state).
        */

        if(typeof this.settings === "object"){
            this.changeStateSettings(this.settings); 
        }

        /*
            A module may also need to run its own special tasks immediately after mount. To do this, add
            childComponentDidMount() into the module, which will be executed if it exists
        */

        if(typeof this.childComponentDidMount === "function"){
            this.childComponentDidMount();
        }
    }

    componentWillMount = () => {
        /*
            A module may need to run its own special tasks before being mounted. To do this, add
            childComponentWillMount() into the module, which will be executed if it exists
        */
        if(typeof this.childComponentWillMount === "function"){
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

    renderFooter = () => {
        
    }

    constructor(props){
        super(props);
     
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
                                        <h4>{this.state.settings.moduleTitle}</h4>
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
                    <div className={this.state.settings.minimized === true ? "row tabeon-module-footer tabeon-hidden" : "row tabeon-module-footer  tabeon-inline-block"} draggable="false">
                        <div className="col-12">
                            {this.renderFooter()}
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default Module;