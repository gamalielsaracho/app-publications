import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import moment from 'moment'

import { formatDate } from '../../../globalActions'

import {
	listarCitas,
	listarCitasMedico,

	eliminarCita,
	mostrarCita,

	abrirFormularioCrearCita,
	abrirFormularioEditarCita,


	mostrarCitaAgregarPreConsulta
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.cita.crear,
		listar: state.cita.listar,
		citas: state.cita.listar.citas,
		filtro: state.cita.filtro,		

		// Rol del usuario logeado, se trae desde el servidor, 
		// para ocultar contenidos de la vista.
		usuarioEstado: state.personal.usuarioEstado
	}
}

function mapDispatchToProps(dispatch) {
	return {		
		listarCitas: () => {
			dispatch(listarCitas())
		},
		listarCitasMedico: (idPersonal) => {
			dispatch(listarCitasMedico(idPersonal))
		},
		eliminarCita: (idCita) => {
			var r = confirm("Está seguro que desea eliminar el rol?");
		    if (r == true) {
				dispatch(eliminarCita(idCita))
		    }
		},
		mostrarCita: (idCita) => {
			dispatch(mostrarCita(idCita))
		},
		abrirFormularioCrearCita: () => {
			dispatch(abrirFormularioCrearCita())
		},
		abrirFormularioEditarCita: (idCita) => {
			dispatch(abrirFormularioEditarCita(idCita))
		},


		// Funciones para el sistema de filtro.
		filtrarCitas: (citas, valores) => {
 			// console.log(valores)

 			citas = citas.filter((i) => {
	 			// console.log('FECHA ACTUAL-> '+valores.cita.fechaActual+' FECHA CITA -> '+moment(i.cita.fecha).format('YYYY-MM-DD'))

 				return moment(i.cita.fecha).format('YYYY-MM-DD') == valores.cita.fechaActual
 			})
 
 
 			return citas
 		},

 		// Acción para mostrar ventana modal con los datos de una cita
 		// y también mostrar una pre-consulta realizada en el día o 
 		// si aún no tiene una pre-consulta, entonces lo crea.
 		mostrarCitaAgregarPreConsulta: (idCita) => {
 			dispatch(mostrarCitaAgregarPreConsulta(idCita))
 		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)