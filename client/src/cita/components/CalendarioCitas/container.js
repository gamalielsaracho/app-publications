import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import moment from 'moment'

import {
	listarCitas,
	eliminarCita,

	abrirFormularioCrearCita,
	abrirFormularioEditarCita
} from '../../actions'

import CalendarioCitas from './CalendarioCitas'

function mapStateToProps(state) {
	return {
		crear: state.cita.crear,
		listar: state.cita.listar,
		citas: state.cita.listar.citas,

		filtro: state.cita.filtro,		

		// Para ver el estado del formulario, y hacer render del mismo
		// solamente si esta abierto.
		formulario: state.cita.formulario,

		// Para obtener el error al editar.
		editar: state.cita.editar
	}
}

function mapDispatchToProps(dispatch) {
	return {		
		listarCitas: () => {
			dispatch(listarCitas())
		},
		eliminarCita: (idCita) => {
			var r = confirm("Está seguro que desea eliminar el rol?");
		    if (r == true) {
				dispatch(eliminarCita(idCita))
		    }
		},
		abrirFormularioCrearCita: () => {
			dispatch(abrirFormularioCrearCita())
		},
		abrirFormularioEditarCita: (idCita) => {
			dispatch(abrirFormularioEditarCita(idCita))
		},


		// Lista para mostrar en el calendario.
		listaCitasEditedAndFilter: (datos, valores) => {
			console.log(datos)
			// title: 'Gamaliel Saracho',
   //                  start: '2017-08-23T08:00:00',
   //                  end: '2017-08-23T08:30:00',
   //                  allDay: false
			

			// Tocar luego.! cool :)

			// if(valores.id_personal != undefined) {
			// 	valores.id_personal = valores.id_personal[0] 
			// 	// console.log(valores)
			// }

			// datos = datos.filter((i) => {
			// 	return i.id_personal == valores.id_personal
			// })

			// console.log('datos |||||||||||||||||')
			// console.log(datos)
			return datos
		}

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarioCitas)