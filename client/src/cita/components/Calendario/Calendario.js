import React, { Component } from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import fullcalendar from 'fullcalendar'
import moment from 'moment'

import {
	alertaPrueba,
	editarCita
} from '../../actions'

import configureStore from '../../../store'

const store = configureStore()

class Calendario extends Component {
	constructor(props) {
		super(props)
		this.updateEvents = this.updateEvents.bind(this)
	}

	updateEvents(eventsList) { // No tiene que tener fin, para que se quede ahí.
		var dateNow = new Date();
		var d = dateNow.getDate();
		var m = dateNow.getMonth();
		var y = dateNow.getFullYear();
		
		// $('#calendar').fullCalendar('destroy');
	    $('#calendar').fullCalendar({
	      	lang: 'es',
			weekends: true,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			// defaultDate: new Date(),
			navLinks: true,
			editable: true,
			eventLimit: true,
			droppable: true, // this allows things to be dropped onto the calendar
			eventDrop: function(event, delta, reverFunc) {
				let contenido = `
					id: ${event.id_cita}
					title: ${event.title}
					fI: ${event.start.format()}
					fF: ${event.end.format()}
				`
				let data = {
					id_cita: event.id_cita,
					fecha: event.fecha,
					start: event.start.format(),
					end: event.end.format(),
					pendiente: event.pendiente,
					id_personal: event.id_personal,
					id_paciente: event.id_paciente,
					id_preconsulta: event.id_preconsulta,
				}
				// alert(contenido)
				console.log(data)
				store.dispatch(editarCita(data))
			},
			dayClick: function(date, jsEvent, view, resourceObj) {
				// this.props.obtenerFecha(date.format())
				// this.refs.fecha.textContent = 'date.format()'
				// console.log(date.format('mm'))

				// let hInicio = date.format('h')
				// let hFin = parseInt(date.format('mm')) + 30

				store.dispatch(alertaPrueba('hola mundo :)'))


				$(".fechaNodo").val(date.format('YYYY-MM-DD'));

				$(".horaInicioNodo").val(date.format('h:mm'));
				$(".horaFinNodo").val(date.format('h:mm'));

				// this.props.s = date.format('YYYY-MM-DD') ? xD
		        // alert('Date: ' + date.format('YYYY-MM-DD'));
		        // alert('Date: ' + date.format());
		        alert('Hora: ' + date.format('h:mm'));

		        alert(date)

		        // alert('Resource ID: ' + resourceObj.id);
		    },
		    eventResize: function(event, delta, revertFunc) {
		    	// alert(event.title + " end is now " + event.end.format('YYYY-MM-DD HH:mm:ss'));
		    	
		    	// si el usuario cancela.
		    	if (!confirm("is this okay?")) {
           			revertFunc();
        		}

        		let data = {
					id_cita: event.id_cita,
					fecha: event.fecha,
					start: event.start.format(),
					end: event.end.format(),
					pendiente: event.pendiente,
					id_personal: event.id_personal,
					id_paciente: event.id_paciente,
					id_preconsulta: event.id_preconsulta,
				}

				console.log("Editando la hora. cool! :)")
				console.log(data)
				store.dispatch(editarCita(data))
		    },
		    events: eventsList
	  })
	}

	componentDidMount() {
		this.updateEvents(this.props.citas)
	}

	// componentDidUpdate() {
		// valoresFiltro
		// console.log('prevProps HOLA')
		// console.log(prevProps.valoresFiltro)

		// if(prevProps.valoresFiltro.id_personal) {
			// this.updateEvents(this.props.citas)
		// }
	// }

	render() {
		return <div id="calendar">
		</div>
	}
}

export default Calendario