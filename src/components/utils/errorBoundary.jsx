import React, {Component} from "react";
import ErrorOverlay from '../modals/errorOverlay';

class ErrorBoundary extends Component {
    state = { errors: [] };
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      //return { hasError: true };

      let currentErrors = [];
      const newError = error;
      currentErrors.push(newError);

      return { errors: currentErrors };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
        console.log("Error", error);
        console.log("ErrorInfo", errorInfo);

        let currentErrors = this.state.errors;

        const newError = Object.assign(error, errorInfo);

        currentErrors.push(newError);
        
        this.setState({
            errors: currentErrors
        }, () => {
            console.log("TTTTTTT", this.state);
        })
    }
  
    render() {
      if (this.state.errors.length > 0) {
        // You can render any custom fallback UI
        return <ErrorOverlay data={this.state.errors} onSave={() => ""} onDismiss={() => window.location.reload()}></ErrorOverlay>
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;