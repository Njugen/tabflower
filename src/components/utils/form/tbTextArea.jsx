import React, { Component } from 'react';

class TBTextArea extends Component {
    state = {
        
    }

    changeInputValue = (event, presetValue) => {
        const {id, onChange} = this.props;
        console.log("lilla", presetValue, event);
        this.setState(
            {
                value: event ? event.target.value : presetValue
            },
            () => {
                console.log("stora", this.state.value);
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
            <div className="tb-textarea-container">
                <div className="tb-form-row row">
                    <div className="col-4 label">
                        <span>{typeof label === "string" && label}</span>
                    </div>
                    
                </div>
                <div className="tb-form-row row">
                    <div className="col-12">
                            <textarea maxlength="170" onChange={(e) => this.changeInputValue(e)} className="tb-textarea">
                                {this.state.value || value}
                         </textarea>   
                    </div>
                </div>
            </div>  
        );
    }
}

export default TBTextArea;