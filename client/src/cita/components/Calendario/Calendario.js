import React, { Component } from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import fullcalendar from 'fullcalendar'
import moment from 'moment'

class Calendario extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		let citas = this.props.citas

		var dateNow = new Date();
		var d = dateNow.getDate();
		var m = dateNow.getMonth();
		var y = dateNow.getFullYear();

		if(this.props.valoresFiltro.id_personal) {
			citas = citas.filter((i) => {
				return i.id_personal == this.props.valoresFiltro.id_personal[0]
			})
		}

		console.log(citas)

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
				// this.props.obtenerFecha(date.format())
				// this.refs.fecha.textContent = 'date.format()'
				// console.log(date.format('mm'))

				// let hInicio = date.format('h')
				// let hFin = parseInt(date.format('mm')) + 30


				$(".fechaNodo").val(date.format('YYYY-MM-DD'));

				$(".horaInicioNodo").val(date.format('h:mm'));
				$(".horaFinNodo").val(date.format('h:mm'));

				// this.props.s = date.format('YYYY-MM-DD')
		        // alert('Date: ' + date.format('YYYY-MM-DD'));
		        // alert('Date: ' + date.format());
		        // alert('Hora: ' + date.format('h:mm'));

		        // alert('Resource ID: ' + resourceObj.id);
		    },
		    events: citas

		})
	}

	render() {
		return <div id="calendar">
		</div>
	}
}

export default Calendario