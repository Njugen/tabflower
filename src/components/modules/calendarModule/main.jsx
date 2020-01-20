import React, { Fragment } from "react";
import Module from '../../utils/moduleon/module';

class CalendarModule extends Module {

    getTimeNow = (timeZoneOffset) => {
        /*
            This function gets the current clock hour.


            As reminder
            getDate() returns time in the local timezone while getUTCDate returns time in
            UTC/GMT timezone. Here we want to use getDate() in order to adjust the app to offer correct time
            in the user's local time zone.

        */
        const dateObject = new Date();
        timeZoneOffset = (timeZoneOffset ? -timeZoneOffset * 60 * 60 * 1000  : dateObject.getTimezoneOffset() * 60 * 1000);

        const currentDate = dateObject.getDate();
        const currentMonth = dateObject.getMonth();
        const currentYear = dateObject.getFullYear();

        const monthsAsText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemper"]

        const dateLastMidnightAsLocalTime = new Date(monthsAsText[currentMonth] + " " + currentDate + ", " + currentYear + " 00:00:00");

        const timeAtMidnightInMilliSeconds = Date.parse(dateLastMidnightAsLocalTime)
        const timeNowInMilliseconds = Date.now();
        const currentTimeInMilliseconds = (timeNowInMilliseconds - timeAtMidnightInMilliSeconds) + timeZoneOffset;

        return currentTimeInMilliseconds;
    }

    getMonthAsText = (number) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemper"];

        return months[number-1];
    }

    getDatesOfMonth = (year, month) => {
        let startOfSelectedMonth = Date.parse(new Date(this.getMonthAsText(month) + " 01, " + year + " 00:00:00")); // Start of selected Month in milliseconds
        const dayLengthInMilliseconds = 24 * 60 * 60 * 1000;
        let padding = 0;

        let paddingDates = {};
        var dates = {};


        while(startOfSelectedMonth){
            const currentTimeObject = new Date(startOfSelectedMonth);
            const weekday = new Intl.DateTimeFormat("en-US", {
                weekday: "long"
            }).format(currentTimeObject);
            const currentYear = currentTimeObject.getFullYear().toString();
            const currentMonth = (currentTimeObject.getMonth() + 1).toString();
            const currentDate = currentTimeObject.getDate().toString();

            if(currentYear === year.toString() && currentMonth === month.toString()){
                
                if(!dates[currentYear]){
                    dates[currentYear] = {};
                }

                if(!dates[currentYear][currentMonth]){
                    dates[currentYear][currentMonth] = {};         
                }

                if(!dates[currentYear][currentMonth][currentDate]){
                    dates[currentYear][currentMonth][currentDate] = {
                        weekday: weekday
                    };
                }   
               
            } else {
                break;
            }
            startOfSelectedMonth += dayLengthInMilliseconds;
        }
        
        return dates;
    }

    renderMonthTable = (year, month) => {
        const dates = this.getDatesOfMonth(year, month);
        let rowsJSX = [];
        let dateJSX = [];
        let padding = 0;

        if(dates[year] && dates[year][month]){
            let dateCounter = 1;
            console.log(dates[year][month]);
            while(dateCounter < 40){
                const dateAsKey = dateCounter.toString();
               
                if(typeof dates[year][month][dateAsKey] === "undefined"){
                    rowsJSX.push((<tr>
                        {dateJSX}
                    </tr>));
                    dateJSX = [];
                    break;
                } else {
                   
                    if(dateCounter === 1){
                        const { weekday } = dates[year][month][dateCounter];

                        if(weekday === "Monday"){ padding = 0; }
                        else if(weekday === "Tuesday"){ padding = 1; }
                        else if(weekday === "Wednesday"){ padding = 2; }
                        else if(weekday === "Thursday"){ padding = 3; }
                        else if(weekday === "Friday"){ padding = 4; }
                        else if(weekday === "Saturday"){ padding = 5; }
                        else if(weekday === "Sunday"){ padding = 6; }
                    } else {
                        padding = 0;
                    }

                    if(dates[year][month][dateAsKey].weekday){
                        for(let paddingRunner = 1; paddingRunner <= padding; paddingRunner++){
                            dateJSX.push((<td></td>));
                        }

                        dateJSX.push((<td>{dateCounter}</td>));
                        dateCounter += padding;
                    }

                    if(dateCounter % 7 === 0){
                        rowsJSX.push((<tr>
                            {dateJSX}
                        </tr>));
                        dateJSX = [];
                    } 
                    
                }
                dateCounter++;
            }
        }
        

        return (
            <Fragment>
                <thead>
                    <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                <tbody>
                    {rowsJSX}
                </tbody>
            </Fragment>    
        );
    }
    
    renderHeader = () => {
        return (
            <Fragment>
                <div className="float-left">
                     <h4>Calendar</h4>
                </div>
            </Fragment>
        );
    }

    renderBody = () => {
        const { year, month } = this.state.moduleData;

        return (
            <table id="tabeon-calendar">
                {this.renderMonthTable(year, month)}
            </table>
        );
    }

    renderFooter = () => {
        return (
            <Fragment>
                <button className="btn btn-tabeon">Save</button>
                <button className="btn btn-tabeon btn-tabeon-cancel">Reset</button>
            </Fragment>
        );
    }

    setSelectedDate = (newDateInfo) => {
        const { date, month, year } = this.state.moduleData;
        let data = {}

        if(newDateInfo){
            data = {
                date: newDateInfo.date,
                month: newDateInfo.month,
                year: newDateInfo.year
            }
        } else { 
            if(!date || !month || !year){
                const selectedTime = new Date();

                data = {
                    date: selectedTime.getDate().toString(),
                    month: (selectedTime.getMonth() + 1).toString(),
                    year: selectedTime.getFullYear().toString()
                }
            }
        }

        this.setState(
            {
                moduleData: data
            }
        );
    }

    componentDidMount = () => {
        this.setSelectedDate({
            date: "20",
            month: "2",
            year: "2020"
        });
    }
}

export default CalendarModule;