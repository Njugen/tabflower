import React, { Component } from 'react';

class TBTextInput extends Component {
    state = {
        value: ""
    }

    changeInputValue = (event, presetValue) => {
        const {id, onChange} = this.props;

        this.setState(
            {
                value: event ? event.target.value : presetValue
            },
            () => {
                if(onChange && id){
                    onChange(id, this.state.value);
                }
            }
        )
        
    }

    componentDidMount = () => {
        const { value } = this.props;

        if(value){
            this.changeInputValue(null, value);
        }
    }

    render = () => {
        const { label, value } = this.props;

        return (
            <div className="tb-textinput-container">
                <div className="tb-form-row row">
                    <div className="col-4 label">
                        <span>{typeof label === "string" && label}</span>
                    </div>
                    
                </div>
                <div className="tb-form-row row">
                    <div className="col-12">
                        <input type="text" value={this.state.value} onChange={(e) => this.changeInputValue(e)} className="tb-textinput" />
                    </div>
                </div>
            </div>  
        );
    }
}

export default TBTextInput;