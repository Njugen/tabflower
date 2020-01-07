import { Component } from "react";

class Module extends Component {
    state = {
        dropDownGrid: {
            draggedOverModuleId: "",
            moduleBeingDraggedId: ""
        }
    }

    handleModuleMount = () => {
        this.setState(
            {
            ...this.props,
            }
        );
    }

    handleDragOver = (componentEvent) => {
        componentEvent.preventDefault();
        
        // Ensure the element dragged over is a module container

        const isModuleContainer = componentEvent.target.className.includes("tabeon-module-container");
        console.log(componentEvent.target.children[0].id);
        if(isModuleContainer){
            const nextState = {
                dropDownGrid: {
                    draggedOverModuleId: componentEvent.target.children[0].id
                }
            }
            this.setState(nextState)
        } else {
            return;
        }
        
    }

    handleDrop = (componentEvent) => {
        componentEvent.preventDefault();
        
        const { draggedOverModuleId, moduleBeingDraggedId } = this.state;
        console.log(draggedOverModuleId, moduleBeingDraggedId);
        if( draggedOverModuleId && moduleBeingDraggedId ){
            componentEvent.target.appendChild(document.getElementById(moduleBeingDraggedId))
        }
    }

    handleDragStart = (componentEvent) => {

        const nextState = {
            dropDownGrid: {
                moduleBeingDraggedId: componentEvent.target.id
            }
        }

        // Save this component somewhere
        console.log(componentEvent.target.id );
        this.setState(nextState);
    }

    componentDidMount = () => {
        this.handleModuleMount();
    }
}

export default Module;