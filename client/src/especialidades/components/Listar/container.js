import { connect } from 'react-redux'

import {
	listarEspecialidades,
	eliminarEspecialidad,
	mostrarEspecialidad,

	abrirFormularioCrearEspecialidad,
	abrirFormularioEditarEspecialidad
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.especialidad.crear,
		listar: state.especialidad.listar,
		especialidades: state.especialidad.listar.especialidades
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarEspecialidades: () => {
			dispatch(listarEspecialidades())
		},
		eliminarEspecialidad: (idEspecialidad) => {
			dispatch(eliminarEspecialidad(idEspecialidad))
		},
		mostrarEspecialidad: (idEspecialidad) => {
			dispatch(mostrarEspecialidad(idEspecialidad))
		},
		abrirFormularioCrearEspecialidad: () => {
			dispatch(abrirFormularioCrearEspecialidad())
		},
		abrirFormularioEditarEspecialidad: (idEspecialidad) => {
			dispatch(abrirFormularioEditarEspecialidad(idEspecialidad))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)