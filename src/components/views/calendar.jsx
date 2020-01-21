import React from 'react';

import View from './view';

import CalendarModule from '../modules/calendarModule/main';
import Moduleon from '../utils/moduleon/moduleon';
import ModuleColumn from '../utils/moduleon/moduleColumn';
import { ReactDOM } from 'react-dom';

class CalendarView extends View {
    state = {
        title: "Calendar",
        selectedDate: {
            date: "",
            month: "",
            year: ""
        }
    }

    setSelectedDate = (date, month, year) => {

        // If any parameter is missing, use the month of today
        if(!date || !month || !year){
            const currentDate = new Date();

            date = currentDate.getDate().toString();
            month = (currentDate.getMonth()+1).toString();
            year = currentDate.getFullYear().toString()
        }

        const selectedDate = {
            date: date,
            month: month,
            year: year
        }
        this.setState({ selectedDate });
    }

    componentDidMount = () => {
        let { date, month, year } = this.props.match.params;

        this.setSelectedDate(date, parseInt(month), year);
    }

    render = () => {
        return(
            <Moduleon>
                <ModuleColumn colspan="12">
                    <CalendarModule id="tabscheduler" selectedDate={this.state.selectedDate}></CalendarModule>
                </ModuleColumn>
            </Moduleon>
            
        );
    }
}

export default CalendarView;