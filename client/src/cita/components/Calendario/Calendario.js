import React, { Component } from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import fullcalendar from 'fullcalendar'
import moment from 'moment'

class Calendario extends Component {

	componentDidMount() {
		var dateNow = new Date();
		var d = dateNow.getDate();
		var m = dateNow.getMonth();
		var y = dateNow.getFullYear();

		$('#calendar').fullCalendar({
			lang: 'es',
			weekends: false,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			editable: false,
			droppable: true, // this allows things to be dropped onto the calendar
			drop: function() {
				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}
			},
			dayClick: function(date, jsEvent, view, resourceObj) {

		        // alert('Date: ' + date.format('YYYY-MM-DD'));
		        alert('Date: ' + date.format());

		        // alert('Hora: ' + date.format('h:mm'));

		        // alert('Resource ID: ' + resourceObj.id);
		    },
		    events: this.props.citas
		})
	}

	render() {
		return <div id="calendar">
		</div>
	}
}

export default Calendario