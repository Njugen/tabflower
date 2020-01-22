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
        Contains preset information needed for the module features to work

    */
    state = {
        dropDownGrid: {
            draggedOverModuleId: "",
            moduleBeingDraggedId: ""
        },
        moduleData: {
            selectedDate: {}
        },
        settings: {
            minimized: false
        }
    }

    handleDragOver = (componentEvent) => {
        componentEvent.preventDefault();

        const isModuleContainer = componentEvent.target.className.includes("tabeon-module-container");

        if(isModuleContainer){
            this.props.onDragOver(componentEvent.target.children[0].id)
        } else {
            return;
        }
        
    }

    handleDrop = (componentEvent) => {
        componentEvent.preventDefault();
        
        //Prevent from targetting the container itself

            this.props.onDrop(componentEvent.target.parentElement);
     
        
        const { draggedOverModuleId, moduleBeingDraggedId } = this.state.dropDownGrid;
   //     console.log(draggedOverModuleId, moduleBeingDraggedId);
        if( draggedOverModuleId && moduleBeingDraggedId ){
           // componentEvent.target.appendChild(document.getElementById(moduleBeingDraggedId));
        }
    }

    handleDragStart = (componentEvent) => {
        console.log(componentEvent.target);
        this.props.onDragStart(componentEvent.target);
    }

    handleUpButton = () => {
      /*  this.setState({
            settings: {
                minimized: true
            }
        }) */

        this.changeStateSettings({
            minimized: true
        });
    }

    handleDownButton = () => {
      /*  this.setState({
            settings: {
                minimized: false
            }
        }) */

        this.changeStateSettings({
            minimized: false
        });
    }

    changeStateSettings = (parameters) => {
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

        if(typeof sectionName === "string"){
            if(!this.state.moduleData[sectionName]){
                let data = {
                };
                
                data[sectionName] = {};
                this.changeStateModuleData(data);
            }
        }
    }

    componentDidUpdate = (prevProps, prevState) => {

    }

    componentDidMount = () => {
        this.changeStateSettings(this.settings); 

        if(typeof this.childComponentDidMount === "function"){
            this.childComponentDidMount();
        }
    }

    raiseToModal = (data) => {
        // Send this to modal component, located in <App> (the root component)
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
                                    <button onClick={(e) => this.state.settings.minimized === true ? this.handleDownButton(e) : this.handleUpButton(e) } className="btn shadow-none tabeon-module-header-control-button">
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