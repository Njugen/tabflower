import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardView from './../views/dashboard';
import CalendarView from './../views/calendar';

class RouteList extends Component {
    handleViewMount = (routeProps) => {
        const { onNavigation } = this.props;

        onNavigation(routeProps);
    }


    render = () => {
        return (
            <Switch>
                <Route path="/dashboard" render={(props) => <DashboardView onViewMount={(raisedProps) => this.handleViewMount(raisedProps)} {...props} />} />
                <Route path="/calendar" render={(props) => <CalendarView onViewMount={(raisedProps) => this.handleViewMount(raisedProps)} {...props} />} />
                <Redirect from="/" to="/dashboard" />
            </Switch>
        );
    }

    constructor(props){
        super(props);
    }
}

export default RouteList;