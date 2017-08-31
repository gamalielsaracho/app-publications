import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import { formatDate } from '../../../globalActions'

import {
	listarCitas,
	eliminarCita,
	mostrarCita,

	abrirFormularioCrearCita,
	abrirFormularioEditarCita,

	// Formulario Filtro, cool.!
	actualizarFormularioFiltro
} from '../../actions'


import {
	listarPersonales
} from '../../../usuario/actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.cita.crear,
		listar: state.cita.listar,
		citas: state.cita.listar.citas,
		filtro: state.cita.filtro,

		// Estados para el sistema de filtro.
		listaPersonales: state.personal.listar.personales,

		// Rol del usuario logeado, se trae desde el servidor, 
		// para ocultar contenidos de la vista.
		rol: state.personal.usuarioEstado.datosToken.rol
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
		listarPersonales: () => {
			dispatch(listarPersonales())
		},

		actualizarFormularioFiltro: (valores) => {
			// console.log(valores)
			dispatch(actualizarFormularioFiltro(valores))
		},
		filtrarCitas: (citas, valores) => {
 			console.log(valores)

 			citas = citas.filter((i) => {
 				console.log(formatDate(i.cita.fecha))
 				return formatDate(i.cita.fecha) == valores.fecha
 			})
 
 
 			return citas
 		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)