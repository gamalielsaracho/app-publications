import { connect } from 'react-redux'

import {
	listarCiudades,
	eliminarCiudad,
	mostrarCiudad,

	abrirFormularioCrearCiudad,
	abrirFormularioEditarCiudad
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.ciudad.eliminar,
		listar: state.ciudad.listar,
		ciudades: state.ciudad.listar.ciudades
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarCiudades: () => {
			dispatch(listarCiudades())
		},
		eliminarCiudad: (idCiudad) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarCiudad(idCiudad))
		    }
		},
		mostrarCiudad: (idCiudad) => {
			dispatch(mostrarCiudad(idCiudad))
		},
		abrirFormularioCrearCiudad: () => {
			dispatch(abrirFormularioCrearCiudad())
		},
		abrirFormularioEditarCiudad: (idCiudad) => {
			dispatch(abrirFormularioEditarCiudad(idCiudad))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)