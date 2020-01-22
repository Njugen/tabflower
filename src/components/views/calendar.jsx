import React from 'react';

import View from './view';

import CalendarModule from '../modules/calendarModule/main';
import Moduleon from '../utils/moduleon/moduleon';
import ModuleColumn from '../utils/moduleon/moduleColumn';
import { ReactDOM } from 'react-dom';

class CalendarView extends View {
    state = {
        title: "Calendar",
        currentDate: {
            date: "",
            month: "",
            year: ""
        }
    }

    setCurrentDate = (date, month, year) => {

        // If any parameter is missing, use the month of today
        if(!date || !month || !year){
            const tempDate = new Date();

            date = tempDate.getDate().toString();
            month = (tempDate.getMonth()+1).toString();
            year = tempDate.getFullYear().toString()
        }

        const currentDate = {
            date: date,
            month: month,
            year: year
        }
        this.setState({ currentDate });
    }

    childComponentDidMount = () => {
        let { date, month, year } = this.props.match.params;

        this.setCurrentDate(date, parseInt(month), year);
    }

    render = () => {
        return(
            <Moduleon>
                <ModuleColumn colspan="12">
                    <CalendarModule id="tabscheduler" currentDate={this.state.currentDate} onRaiseToModal={(data) => this.raiseToModal(data)}></CalendarModule>
                </ModuleColumn>
            </Moduleon>
            
        );
    }
}

export default CalendarView;