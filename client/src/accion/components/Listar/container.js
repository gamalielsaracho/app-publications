import { connect } from 'react-redux'

import {
	listarAcciones,
	eliminarAccion,
	mostrarAccion,

	abrirFormularioCrearAccion,
	abrirFormularioEditarAccion
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.accion.crear,
		listar: state.accion.listar,
		acciones: state.accion.listar.acciones
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAcciones: () => {
			dispatch(listarAcciones())
		},
		eliminarAccion: (idAccion) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarAccion(idAccion))
		    }
		},
		mostrarAccion: (idAccion) => {
			dispatch(mostrarAccion(idAccion))
		},
		abrirFormularioCrearAccion: () => {
			dispatch(abrirFormularioCrearAccion())
		},
		abrirFormularioEditarAccion: (idAccion) => {
			dispatch(abrirFormularioEditarAccion(idAccion))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)