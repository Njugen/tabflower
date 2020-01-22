import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardView from './../views/dashboard';
import CalendarView from './../views/calendar';
import { ReactDOM } from 'react-dom';

class RouteList extends Component {
    handleViewMount = (routeProps) => {
        const { onNavigation } = this.props;

        onNavigation(routeProps);
    }
r
    raiseToModal = (data) => {
        // Send this to modal component, located in <App> (the root component)
        const { onRaiseToModal } = this.props;

        onRaiseToModal(data);
    }

    render = () => {
        return (
            <Switch>
                <Route path="/dashboard" render={(props) => <DashboardView onRaiseToModal={(data) => this.raiseToModal(data)} onViewMount={(raisedProps) => this.handleViewMount(raisedProps)} {...props} />} />
                <Route path="/calendar/:year/:month/:date" render={(props) => <CalendarView onRaiseToModal={(data) => this.raiseToModal(data)} onViewMount={(raisedProps) => this.handleViewMount(raisedProps)} {...props} />} />
                <Route path="/calendar" render={(props) => <CalendarView onRaiseToModal={(data) => this.raiseToModal(data)} onViewMount={(raisedProps) => this.handleViewMount(raisedProps)} {...props} />} />
                <Redirect from="/" to="/dashboard" />
            </Switch>
        );
    }
}

export default RouteList;