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
		crear: state.ciudad.crear,
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
			dispatch(eliminarCiudad(idCiudad))
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