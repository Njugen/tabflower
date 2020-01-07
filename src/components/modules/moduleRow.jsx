import React, { Component } from "react";

class ModuleRow extends Component {
    state = {

    }

    mapComponents = (components) => {
        return components.map(
            (component) => {
                return component;
            }
        );
    }

    getNumberOfComponents = () => {
        return this.props.children.length;
    }

    componentDidMount = () => {
        const { onRenderedModules } = this.props;

        this.setState({
            children: this.getNumberOfComponents()
        }, () => {
            onRenderedModules(this.getNumberOfComponents());
        });
    }

    render = () => {
        const { children: childElements } = this.props;
        
        return (
            <div className="row">
                {this.mapComponents(childElements)}
            </div>
        );
    }
}

export default ModuleRow;