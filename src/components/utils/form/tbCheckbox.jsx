import React, { Component, createRef } from 'react';

class TBCheckBox extends Component {
    state = {
        on: false
    }

    setButtonState = (input) => {
        const { on } = this.state;
        const { id, onToggle } = this.props;
        
        this.setState({
            on: input
        }, () => {
            if(onToggle && id){
                onToggle(id, on);
            }
        })
    }

    toggleCheckbox = (target) => {
        const { on } = this.state;
        

        if(target.className === "tb-checkbox-ball"){
            // If the user clicks on the "ball"

            const { style, parentNode: parent } = target;

            if(on === false){
                parent.style.backgroundColor = "#e2e2e2";
                parent.style.borderColor = "#c2c2c2";
                style.marginLeft = "0rem";
                this.setButtonState(true);
            } else if(on === true){
                parent.style.backgroundColor = "#c95cdf";
                parent.style.borderColor = "#7a1d8c";
                style.marginLeft = "2rem";
                this.setButtonState(false);
            }
        } else if(target.className === "tb-checkbox-container"){
            // If the user clicks the checkbox background (not the ball)

            const { style, lastChild: ball } = target;
            console.log(ball);
            if(on === false){
                style.backgroundColor = "#e2e2e2";
                style.borderColor = "#989898";
                ball.style.marginLeft = "0rem";
                this.setButtonState(true);
            } else if(on === true) {
                style.backgroundColor = "#c95cdf";
                style.borderColor = "#7a1d8c";
                ball.style.marginLeft = "2rem";
                this.setButtonState(false);
            }
        }
    }
  
    componentDidMount = () => {
     //   console.log(this.selectorRef.current);
       this.toggleCheckbox(this.checkboxRef.current);
    }

    render = () => {
        const { label } = this.props;
        
        return (
            <div className="tb-form-row row d-flex justify-content-between">
                <div className="col-8 label">
                    <span>{typeof label === "string" && label}</span>
                </div>
                <div className="col-3">
                    <div ref={this.checkboxRef} className="tb-checkbox-container" onClick={(e) => this.toggleCheckbox(e.target)}>
                        <span className="tb-checkbox-ball"></span>
                    </div>
                </div>
            </div>
        );
    }

    constructor(props){
        super(props);
        this.checkboxRef = createRef();
    }
}

export default TBCheckBox;