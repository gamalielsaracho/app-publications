import { connect } from 'react-redux'

import {
	listarCitas,
	eliminarCita,
	mostrarCita,

	abrirFormularioCrearCita,
	abrirFormularioEditarCita
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.cita.crear,
		listar: state.cita.listar,
		citas: state.cita.listar.citas,

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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)