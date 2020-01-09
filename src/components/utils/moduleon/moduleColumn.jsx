import React, { Component, cloneElement, Children } from "react";

class ModuleColumn extends Component {
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
        const { children } = this.props;

        return children ? children.length : 0;
    }

    componentDidMount = () => {
        const { onRenderedModules } = this.props;

        this.setState({
            children: this.getNumberOfComponents()
        }, () => {
            onRenderedModules(this.getNumberOfComponents());
        });
    }

    cloneChildren = (newProps) => {
        const { onDragStart, onDragOver } = this.props

        const clonedChildren = Children.map(newProps.children, (child) => {
            return cloneElement(child, {
                onDragStart: onDragStart,
                onDragOver: onDragOver
            });
        }) 

        return clonedChildren;
    } 

    componentDidMount = () => {
        console.log(this.props);
    }

    render = () => {
        const { colspan } = this.props;
        const childElements = this.cloneChildren(this.props);

        return (
            <div className={"tabeon-module-column col-" + colspan}>
                <div className="row">
                    {childElements && childElements.length > 1 ? this.mapComponents(childElements) : childElements}
                </div>
            </div>
        );
    }
}

export default ModuleColumn;