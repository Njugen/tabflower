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

        const isModuleContainer = componentEvent.target.className.includes("tabeon-module-container");

        if(isModuleContainer){
            this.props.onDragOver(componentEvent.target.children[0].id)
        } else {
            return;
        }
        
    }

    handleDrop = (componentEvent) => {
        componentEvent.preventDefault();
        console.log("DROP");
        const { draggedOverModuleId, moduleBeingDraggedId } = this.state.dropDownGrid;
   //     console.log(draggedOverModuleId, moduleBeingDraggedId);
        if( draggedOverModuleId && moduleBeingDraggedId ){
           // componentEvent.target.appendChild(document.getElementById(moduleBeingDraggedId));
        }
    }

    handleDragStart = (componentEvent) => {
        console.log(componentEvent.target.id);
        this.props.onDragStart(componentEvent.target.id)
    }

    componentDidUpdate = (prevProps, prevState) => {

    }

    componentDidMount = () => {
        this.handleModuleMount();
    }
}

export default Module;