import React, { Component } from 'react';

class TBTextArea extends Component {
    state = {
        
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
        const { label, value, warning } = this.props;

        return (
            <div className="tb-textarea-container">
                <div className="tb-form-row row d-flex justify-content-between">
                    <div className="col-4 label">
                        <span>{typeof label === "string" && label}</span>
                    </div>
                    <div className="col-6 label">
                        <span>{typeof warning === "string" && warning}</span>
                    </div>
                </div>
                <div className="tb-form-row row">
                    <div className="col-12">
                            <textarea maxLength="170" onChange={(e) => this.changeInputValue(e)} className="tb-textarea">
                                {this.state.value || value}
                         </textarea>   
                    </div>
                </div>
            </div>  
        );
    }
}

export default TBTextArea;