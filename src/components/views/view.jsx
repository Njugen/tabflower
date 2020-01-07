import { Component } from 'react';

class View extends Component {
    state = {
        draggedModuleId: "",
        kickedModuleId: ""
    };

    handleViewMount = () => {
        /*
            Inform the App component that any view (this view) has been mounted, by raising its current state.
            The state will travel through the following components:

            View (any view) > RouteList > App
        */
        const { onViewMount } = this.props;

        onViewMount(this.state);
    }

    handleRenderedModules = (numberOfModules) => {
        this.setState({ renderedModules: numberOfModules });
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

            if(kickedModuleId && draggedModuleId){
                this.tradeModulePositions(draggedModuleId, kickedModuleId);
            }
        }
    }

    componentDidMount = () => {
        this.handleViewMount();
    }
}

export default View;