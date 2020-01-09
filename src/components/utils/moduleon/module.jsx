import React, { Component } from "react";

class Module extends Component {
    state = {
        dropDownGrid: {
            draggedOverModuleId: "",
            moduleBeingDraggedId: ""
        },
        moduleData: {
            title: ""
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
        this.props.onDragStart(componentEvent.target)
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
                            {this.renderHeader()}
                        </div>
                    </div>
                    <div className="row tabeon-module-body" draggable="false">
                        <div className="col-12">
                            {this.renderBody()};
                        </div>
                    </div>
                    <div className="row tabeon-module-footer" draggable="false">
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