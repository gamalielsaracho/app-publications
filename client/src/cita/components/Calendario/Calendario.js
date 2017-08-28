import React, { Component } from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import fullcalendar from 'fullcalendar'
import moment from 'moment'

class Calendario extends Component {
	constructor(props) {
		super(props)
		this.renderFechaCita = this.renderFechaCita.bind(this)
	}

	renderFechaCita(fecha) {
		if(fecha) {
			return <div>
				{ fecha }
			</div>
		} else {
			return <span></span>
		}
	}

	componentDidMount() {
		console.log(this.refs.fecha)

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
				// this.props.obtenerFecha(date.format())
				// this.refs.fecha.textContent = 'date.format()'

				$(".fechaNodo").text(date.format('YYYY-MM-DD'));

				$(".horaInicioNodo").text(date.format('h:mm'));
				// $(".horaFinNodo").val(date.format('h:mm'));

				// this.props.s = date.format('YYYY-MM-DD')
		        // alert('Date: ' + date.format('YYYY-MM-DD'));
		        // alert('Date: ' + date.format());
		        // alert('Hora: ' + date.format('h:mm'));

		        // alert('Resource ID: ' + resourceObj.id);
		    },
		    events: this.props.citas
		})
	}

	render() {
		return <div id="calendar">
			<h4 className='fecha'></h4>
		</div>
	}
}

export default Calendario