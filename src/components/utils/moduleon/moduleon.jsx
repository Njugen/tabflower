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


    handleDragStart = (moduleId) => {
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
                onDragOver: this.handleDragOver
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