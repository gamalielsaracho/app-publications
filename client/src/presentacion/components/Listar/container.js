import { connect } from 'react-redux'

import {
	listarPresentaciones,
	eliminarPresentacion,
	mostrarPresentacion,

	abrirFormularioCrearPresentacion,
	abrirFormularioEditarPresentacion
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.presentacion.eliminar,
		listar: state.presentacion.listar,
		presentaciones: state.presentacion.listar.presentaciones
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarPresentaciones: () => {
			dispatch(listarPresentaciones())
		},
		eliminarPresentacion: (idPresentacion) => {
			var r = confirm("Está seguro que desea eliminar el rol?");
		    if (r == true) {
				dispatch(eliminarPresentacion(idPresentacion))
		    }
		},
		mostrarPresentacion: (idPresentacion) => {
			dispatch(mostrarPresentacion(idPresentacion))
		},
		abrirFormularioCrearPresentacion: () => {
			dispatch(abrirFormularioCrearPresentacion())
		},
		abrirFormularioEditarPresentacion: (idPresentacion) => {
			dispatch(abrirFormularioEditarPresentacion(idPresentacion))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)