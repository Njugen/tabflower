import React, { Component } from "react";

class FullWidthLoadbar extends Component {
    origin = {
        fillerWidth: 0,
        loadbarIsFilled: false,
        transitionCompleted: false,
        refreshFactor: this.props.refreshFactor
    }

    state = {
        ...this.origin
    }

    componentDidMount = () => {
        this.increaseFillerWidth();
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        console.log("");
        if(this.props.refreshFactor !== prevState.refreshFactor){
            this.origin.refreshFactor = this.props.refreshFactor;

            this.increaseFillerWidth();
        }
    }

    resetState = (callback) => {
        const newState = {
            ...this.origin
        };
        
        this.setState(newState, callback);
    }

    increaseFillerWidth = () => {
        // Fill the loadbar by resetting the component's state, and then loop a percentage value using an interval
        let fillerWidth = 0;
       
        this.resetState(
            () => {
                const interval = setInterval(
                    () => {
                         if(fillerWidth < 100){
                             fillerWidth++;

                             this.setState({
                                 fillerWidth: fillerWidth
                             });
                         } else {
                             this.setState({
                                 fillerWidth: 0,
                                 loadbarIsFilled: true
                             });

                             clearInterval(interval);
                         }
                    },
                    1
                );
            }
        );

        
    }

    

    render = () => {
        const { 
            fillerWidth, 
            loadbarIsFilled,
            transitionCompleted
        } = this.state;

        // Inline style for the loadbar container itself
        const loadbarStyle = {
            display: transitionCompleted === true || loadbarIsFilled === true ? "none" : "block"
        }

        // Inline style for the filler
        const fillerStyle = {
            width: fillerWidth + "%"
        }

        return (
            <div id="tabeon-loadbar" style={loadbarStyle}>
                <div id="filler" style={fillerStyle}>
                   
                </div>
            </div>
        );
    }

}

export default FullWidthLoadbar;