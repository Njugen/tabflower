import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        const { label, warning } = this.props;

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
                        <input type="text" value={this.state.value} onChange={(e) => this.changeInputValue(e)} className="tb-textinput" />
                    </div>
                </div>
            </div>  
        );
    }
}

TBTextInput.propTypes = {
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    warning: PropTypes.string
}

export default TBTextInput;