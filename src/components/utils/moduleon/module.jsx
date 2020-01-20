import React, { Component } from "react";
require("../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

class Module extends Component {
    state = {
        dropDownGrid: {
            draggedOverModuleId: "",
            moduleBeingDraggedId: ""
        },
        moduleData: {
            title: ""
            
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
        this.setState({
            settings: {
                minimized: true
            }
        })
    }

    handleDownButton = () => {
        this.setState({
            settings: {
                minimized: false
            }
        })
    }

    componentDidUpdate = (prevProps, prevState) => {

    }

    componentDidMount = () => {
    }

    renderHeader = () => {

    }

    renderBody = () => {
        
    }

    renderFooter = () => {

    }

    render = () => {
        return (
            <div id={"tabeon-module-container-id" + this.props.id} droppable="true" onDragOver={(e) => this.handleDragOver(e)} onDrop={(e) => this.handleDrop(e)} className={"tabeon-module-container col-12"}>
                <div id={"tabeon-module-id-" + this.props.id} className={"tabeon-module"}>
                    <div className="row tabeon-module-header" draggable="true" onDragStart={(e) => this.handleDragStart(e)}>
                        <div className="col-12">
                            <div className={this.state.settings.minimized === true ? "row tabeon-module-header-column-wrapper tabeon-no-border" : "row tabeon-module-header-column-wrapper" }>
                                <div className="col-8">
                                    {this.renderHeader()}
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