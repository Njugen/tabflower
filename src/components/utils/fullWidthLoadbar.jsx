import React, { Component } from "react";

class FullWidthLoadbar extends Component {
    state = {
        fillerWidth: 0,
        loadbarIsFilled: false,
        transitionCompleted: false
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({
            fillerWidth: 0,
            loadbarIsFilled: false,
            transitionCompleted: false
        });

        this.increaseFillerWidth();
    }

    componentDidMount = () => {
        this.increaseFillerWidth();
    }
    
    componentDidUpdate = () => {
        
    }

    increaseFillerWidth = () => {
       let fillerWidth = 0;
       
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

    constructor(props){
        super(props);
    }
}

export default FullWidthLoadbar;