import React from 'react';
import View from './view';

class CalendarView extends View {
    state = {
        title: "Calendar"
    }

    render = () => {
        return(
            <div className="row">
                <div className="col-2">
                    abc
                </div>
                <div className="col-2">
                    abc
                </div>
                <div className="col-2">
                    abc
                </div>
                <div className="col-2">
                    abc
                </div>
                <div className="col-2">
                    abc
                </div>
                <div className="col-2">
                    abc
                </div>
            </div>
        );
    }
}

export default CalendarView;