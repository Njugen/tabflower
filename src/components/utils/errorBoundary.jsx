import React, {Component} from "react";
import { ValidatorError, ErrorHandler } from './exceptionsAndHandler';
import ErrorOverlay from '../modals/errorOverlay';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      //return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
        console.log("Error", error);
        console.log("ErrorInfo", errorInfo);

        this.setState({
            error,
            errorInfo,
            hasError: true
        }, () => {
            console.log("TTTTTTT", this.state);
        })
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <ErrorOverlay data={this.state} onSave={() => ""} onDismiss={() => ""}></ErrorOverlay>
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;