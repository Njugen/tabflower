import React from 'react';
import View from './view';

import CalendarModule from '../modules/calendarModule/main';

class CalendarView extends View {
    state = {
        title: "Calendar"
    }

    render = () => {
        return(
            <CalendarModule></CalendarModule>
        );
    }
}

export default CalendarView;