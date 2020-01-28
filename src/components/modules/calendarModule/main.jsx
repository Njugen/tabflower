import React, { Fragment } from "react";
import Module from '../../utils/moduleon/module';
import "bootstrap.native";
import { ReactDOM } from 'react-dom';


class CalendarModule extends Module {
    settings = {
        moduleTitle: "Scheduler"
    }

    getMonthAsText = (number) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return months[number-1];
    }

    getDatesOfMonth = (year, month) => {
        let startOfSelectedMonth = Date.parse(new Date(this.getMonthAsText(month) + " 01, " + year + " 00:00:00")); // Start of selected Month in milliseconds
        const dayLengthInMilliseconds = 24 * 60 * 60 * 1000;

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

    getDaysPadding = (dateObj) => {
        const { weekday } = dateObj;
        let padding = 0;

        if(weekday === "Monday"){ padding = 0; }
        else if(weekday === "Tuesday"){ padding = 1; }
        else if(weekday === "Wednesday"){ padding = 2; }
        else if(weekday === "Thursday"){ padding = 3; }
        else if(weekday === "Friday"){ padding = 4; }
        else if(weekday === "Saturday"){ padding = 5; }
        else if(weekday === "Sunday"){ padding = 6; }

        return padding;
    }

    renderMonthTableHeader = () => {
        return(
            <tr>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
            </tr>
        );
    }


    renderMonthTable = (year, month) => {

        const { date: currentDate, month: currentMonth, year: currentYear } = this.props.currentDate;

        const dates = this.getDatesOfMonth(year, month);

        let rowsJSX = [];
        let dateJSX = [];
        let padding = 0;

        function storeRowJSX(jsxToPush){
            rowsJSX.push(jsxToPush);
            dateJSX = [];
        }
    
        function storeDateJSX(jsxToPush){
            dateJSX.push(jsxToPush);
        }
        
        if(dates[year] && dates[year][month]){
            let dateCounter = 1;

            while(dateCounter < 40){
                const dateAsKey = dateCounter.toString();
               
                if(typeof dates[year][month][dateAsKey] === "undefined"){
                    storeRowJSX((
                        <tr key={year + "-" + month + "-week-" + Math.random()}>
                        {dateJSX}
                        </tr>
                    ));
                    break;
                } else {
                   

                    if(dateCounter === 1){
                        padding = this.getDaysPadding(dates[year][month][dateCounter])
                    } else {
                        padding = 0;
                    }

                    if(dates[year][month][dateAsKey].weekday){
                        for(var paddingRunner = 1; paddingRunner <= padding; paddingRunner++){
                            storeDateJSX((<td key={year + "-" + month + "-padding-" + paddingRunner}></td>));
                            
                        }

                        storeDateJSX((<td onClick={() => {this.raiseToModal({ id: "date-settings" })}} className={dateAsKey === currentDate && month === currentMonth && year === currentYear ? "activeDate" : ""} key={year + "-" + month + "-" + dateAsKey}>{dateCounter}</td>));
                    }
               
                    if(dates[year][month][dateAsKey].weekday === "Sunday"){
                        storeRowJSX((
                            <tr key={year + "-" + month + "-week-" + Math.random()}>
                            {dateJSX}
                            </tr>
                        ));
                    }
                    
                    
                }
                dateCounter++;
            }
        }
        

        return (
            <Fragment>
                <thead>
                    {this.renderMonthTableHeader()}
                </thead>
                <tbody>
                    {rowsJSX}
                </tbody>
            </Fragment>    
        );
    }

    browseMonth = (newMonth, newYear) => {
        const { month: currentMonth, year: currentYear } = this.state.moduleData.selectedDate;

        if(typeof newMonth === "string"){
            if(newMonth === "next"){
                if(currentMonth === "12"){
                    newMonth = "1";
                    newYear = parseInt(currentYear) + 1;
                    newYear = newYear.toString();
                } else {
                    newMonth = parseInt(currentMonth)+1;
                    newMonth = newMonth.toString();

                    newYear = currentYear;
                }
            } else if(newMonth === "previous"){
                if(currentMonth === "1"){
                    newMonth = "12";
                    newYear = parseInt(currentYear) - 1;
                    newYear = newYear.toString();
                } else {
                    newMonth = parseInt(currentMonth) - 1;
                    newMonth = newMonth.toString();

                    newYear = currentYear;
                }
            }
        } else if(typeof newMonth === "number"){
            if(typeof newYear !== "number"){
                newYear = currentYear;
            }

            if(newMonth > 12){
                newMonth = "12";
            } else if(newMonth < 1){
                newMonth = "1";
            }
        } else {
            newMonth = currentMonth;
            newYear = currentYear;
        }


        this.setSelectedDate({
            month: newMonth,
            year: newYear
        })
    }

    renderMonthNavigation = () => {
        const { year, month } = this.state.moduleData.selectedDate;

        return(
            <div className="tabeon-calendar-navigation-section">
                <a href="#" className="tabeon-calendar-nav-arrow tabeon-calendar-left-nav fas fa-chevron-left" onClick={() => this.browseMonth("previous")}></a> 
                <h2 className="tabeon-calendar-title">{this.getMonthAsText(month) + " " + year}</h2>
                <a href="#" className="tabeon-calendar-nav-arrow tabeon-calendar-right-nav fas fa-chevron-right" onClick={() => this.browseMonth("next")}></a> 
            </div>

        )
    }

    renderBody = () => {
        const { year, month } = this.state.moduleData.selectedDate;
        
        const parsedMonth = month;

        return (
            <Fragment>
                {this.renderMonthNavigation()}
                <table className="tabeon-calendar">
                    {this.renderMonthTable(year, parsedMonth)}
                </table>
            </Fragment>
        );
    }

    saveModalData = (bla) => {

    }

    renderFooter = () => {
       
        return (
            <Fragment>
                <button className="btn btn-tabeon" onClick={() => {this.raiseToModal({ id: "confirm-action", action: this.saveModalData.bind(this) })}}>Save</button>
                <button className="btn btn-tabeon btn-tabeon-cancel">Reset</button>
            </Fragment>
        );
    }



    setSelectedDate = (newDateInfo) => {

        const { date, month, year } = this.state.moduleData.selectedDate;

        let data = {}

        if(newDateInfo){
            data = {
                selectedDate: {
                    date: newDateInfo.date,
                    month: newDateInfo.month,
                    year: newDateInfo.year
                }
            }
        } else { 
            if(!date || !month || !year){
                const selectedTime = new Date();

                data = {
                    selectedDate: {
                        date: selectedTime.getDate().toString(),
                        month: (selectedTime.getMonth() + 1).toString(),
                        year: selectedTime.getFullYear().toString()
                    }
                }
            }
        }

        this.changeStateModuleData(data);
    }


    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.currentDate !== this.props.currentDate){
            const { date, month, year } = this.props.currentDate;

            this.setSelectedDate({
                date: date,
                month: month,
                year: year
            }); 

        }
    }

    childComponentDidMount = () => {

    }

    childComponentWillMount = () => {
        this.createStateModuleDataSection("dailyData");
        this.createStateModuleDataSection("selectedDate");
    }
    
}

export default CalendarModule;