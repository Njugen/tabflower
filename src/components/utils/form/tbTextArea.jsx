import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            <div className="p-3">
                <div className="tb-form-row row">
                    <div className="label">
                        <span>{typeof label === "string" && label}</span>
                    </div>
                    <div className="label">
                        <span>{typeof warning === "string" && warning}</span>
                    </div>
                </div>
                <div className="tb-form-row row">
                    <div className="col-12">
                            <textarea value={this.state.value || value} maxLength="170" onChange={(e) => this.changeInputValue(e)} className="tb-textarea"></textarea>   
                    </div>
                </div>
            </div>  
        );
    }
}

TBTextArea.propTypes = {
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    warning: PropTypes.string
}

export default TBTextArea;