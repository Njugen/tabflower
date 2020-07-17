import React, { Component } from "react";
import PropTypes from "prop-types";

class FullWidthLoadbar extends Component {
  /*
        Contains all default settings for this component. Use this to reset the component state
        before increasing the width of the filler.
    */
  origin = {
    fillerWidth: 0,
    loadbarIsFilled: false,
    transitionCompleted: false,
    refreshFactor: this.props.refreshFactor,
  };

  state = {
    ...this.origin,
  };

  /*
        Show the loading/filler animation once the component gets mounted
    */
  componentDidMount = () => {
    this.increaseFillerWidth();
  };

  /*
        Show the loading/filler animation when a new (or updated) refreshFactor is passed to this component
        as a prop. This generally happens at each state update of the refreshFactor variable in the parent component 
    */
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.refreshFactor !== prevState.refreshFactor) {
      this.origin.refreshFactor = this.props.refreshFactor;

      this.increaseFillerWidth();
    }
  };

  /*
        Reset component state
    */
  resetState = (callback) => {
    const newState = {
      ...this.origin,
    };

    this.setState(newState, callback);
  };

  /*
        Fill the loadbar by resetting the component's state, and then loop a percentage value using an interval
    */
  increaseFillerWidth = () => {
    let fillerWidth = 0;

    this.resetState(() => {
      const interval = setInterval(() => {
        if (fillerWidth < 100) {
          fillerWidth++;

          this.setState({
            fillerWidth: fillerWidth,
          });
        } else {
          this.setState({
            fillerWidth: 0,
            loadbarIsFilled: true,
          });

          clearInterval(interval);
        }
      }, 1);
    });
  };

  render = () => {
    const { fillerWidth, loadbarIsFilled, transitionCompleted } = this.state;

    // Inline style for the loadbar container itself
    const loadbarStyle = {
      display:
        transitionCompleted === true || loadbarIsFilled === true
          ? "none"
          : "block",
    };

    // Inline style for the filler
    const fillerStyle = {
      width: fillerWidth + "%",
    };

    return (
      <div id="tabeon-loadbar" style={loadbarStyle}>
        <div id="filler" style={fillerStyle}></div>
      </div>
    );
  };
}

FullWidthLoadbar.propTypes = {
  refreshFactor: PropTypes.number.isRequired,
};

FullWidthLoadbar.defaultProps = {
  refreshFactor: 0,
};

export default FullWidthLoadbar;
