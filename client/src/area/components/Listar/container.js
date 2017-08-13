import { connect } from 'react-redux'

import {
	listarAreas,
	eliminarArea,
	mostrarArea,

	abrirFormularioCrearArea,
	abrirFormularioEditarArea
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.area.crear,
		listar: state.area.listar,
		areas: state.area.listar.areas
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAreas: () => {
			dispatch(listarAreas())
		},
		eliminarArea: (idArea) => {
			dispatch(eliminarArea(idArea))
		},
		mostrarArea: (idArea) => {
			dispatch(mostrarArea(idArea))
		},
		abrirFormularioCrearArea: () => {
			dispatch(abrirFormularioCrearArea())
		},
		abrirFormularioEditarArea: (idArea) => {
			dispatch(abrirFormularioEditarArea(idArea))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)