import React, { Component, createRef } from 'react';

class TBCheckBox extends Component {
    state = {
        on: false
    }

    setButtonState = (input) => {
        this.setState({
            on: input
        })
    }

    moveSelector = (target) => {
        const { on } = this.state;
        const { style, parentNode: parent } = target;

        if(on === false){
            parent.style.backgroundColor = "#e2e2e2";
            
            style.marginLeft = "0rem";
            this.setButtonState(true);
        } else if(on === true){
            parent.style.backgroundColor = "#c95cdf";

            style.marginLeft = "6rem";
            this.setButtonState(false);
        }
    }

    componentDidMount = () => {
        console.log(this.selectorRef.current);
        this.moveSelector(this.selectorRef.current);
    }

    render = () => {
        return (
            <div className="tb-checkbox-container">
                <span ref={this.selectorRef} className="tb-checkbox-selector" onClick={(e) => this.moveSelector(e.target)}></span>
            </div>

        );
    }

    constructor(props){
        super(props);
        this.selectorRef = createRef();
    }
}

export default TBCheckBox;