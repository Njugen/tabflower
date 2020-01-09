import React, { Component, cloneElement, Children } from 'react';

class Moduleon extends Component {
    state = {
        dragDropModules: {
            draggedModuleId: "",
            kickedModuleId: ""
        }
    }

    temp = { 
        renderedModules: 0
    }

    storeNumberOfModules = (numberOfModules) => {
        let { renderedModules: moduleCount } = this.temp;

        moduleCount += numberOfModules;

        const renderedModules = moduleCount;
        const metaData = {
            renderedModules
        };

        this.temp.renderedModules = moduleCount;
        this.setState({ metaData }); 
    }

    handleRenderedModules = (numberOfModules) => {
        this.storeNumberOfModules(numberOfModules);
    }


    handleDragStart = (element) => {
        console.log(element);
        const moduleId = element.parentElement.id;

        this.highlightModule(moduleId);
        this.setState(
            {
                draggedModuleId: moduleId
            }
        )
    }

    handleDragOver = (moduleId) => {

        this.setState(
            {
                kickedModuleId: moduleId
            }
        )
    }

    handleDrop = () => {
        const { draggedModuleId } = this.state;
        
        this.removeModuleHighlight(draggedModuleId);
    }

    highlightModule = (moduleId) => {
        const module = document.getElementById(moduleId);
        module.style.border = "1px solid #7a1d8c";
        module.style.boxShadow = "0px 0px 10px #7a1d8c";
    }

    removeModuleHighlight = (moduleId) => {
        const module = document.getElementById(moduleId);
        module.style.border = "1px solid #d2d2d2";
        module.style.boxShadow = "0px 0px 10px #ffffff";
    }

    tradeModulePositions(firstModuleId, secondModuleId){
        const firstModuleParent = document.getElementById(firstModuleId).parentElement;
        const secondModuleParent = document.getElementById(secondModuleId).parentElement;

        const firstModule = document.getElementById(firstModuleId);
        const secondModule = document.getElementById(secondModuleId);


        firstModuleParent.appendChild(secondModule);
        secondModuleParent.appendChild(firstModule);   
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state !== prevState){
            const { kickedModuleId, draggedModuleId } = this.state;
            
            if(prevState && this.state.kickedModuleId === prevState.kickedModuleId){
                return;
            }

            if(kickedModuleId && draggedModuleId){
                this.tradeModulePositions(draggedModuleId, kickedModuleId);
            }
        }
    }

    cloneChildren = (newProps) => {
        const clonedChildren = Children.map(newProps.children, (child) => {
            return cloneElement(child, {
                onRenderedModules: this.handleRenderedModules,
                onDragStart: this.handleDragStart,
                onDragOver: this.handleDragOver,
                onDrop: this.handleDrop
            });
        }) 

        return clonedChildren;
    } 

    render = () => {
        const adjustedChildren = this.cloneChildren(this.props);
 
        return (
            adjustedChildren
            
        );
    }
}

export default Moduleon