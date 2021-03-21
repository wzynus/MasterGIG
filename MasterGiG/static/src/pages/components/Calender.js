import BigCalendar from 'react-big-calendar'
import moment from 'moment'


const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default () => {
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
return(
    <>
    <div>
        <BigCalendar
         localizer={localizer}
         events={myEventsList}
        startAccessor="start"
         endAccessor="end"
        />
    </div>
    </>
);
}