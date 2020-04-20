import React, {Component} from "react";
import ErrorOverlay from '../modals/errorOverlay';
import { PropTypes } from 'prop-types';

/*
  Catch errors in child component's lifecycle hooks, during rendering and in 
  component constructors. For each error caught, show a fallback UI.

  Read more about error boundaries in React:
  https://reactjs.org/docs/error-boundaries.html
*/

class ErrorBoundary extends Component {
    state = { errors: [] };

     /* Update state so the next render will show the fallback UI. */
    static getDerivedStateFromError(error) {

      let currentErrors = [];
      const newError = error;
      currentErrors.push(newError);

      return { errors: currentErrors };
    }
    
    /*
      Catch an error and add it as an object in the this.state.error array for later use.
    */
    componentDidCatch(error, errorInfo) {
        let currentErrors = this.state.errors;
        const newError = Object.assign(error, errorInfo);
        currentErrors.push(newError);
        
        this.setState({
            errors: currentErrors
        }, () => {
            
        })
    }
  
    render() {
      if (this.state.errors.length > 0) {
        /*
          If errors are stored in the boundary state, render the ErrorOverlay UI component and inform the user about the errors
          using the information stored in this.state.errors
        */
        return <ErrorOverlay data={this.state.errors} onSave={() => ""} onDismiss={() => window.location.reload()}></ErrorOverlay>
      }
  
      return this.props.children || null; 
    }
  }

  ErrorBoundary.propTypes = {
    children: PropTypes.any.isRequired
  }

  export default ErrorBoundary;