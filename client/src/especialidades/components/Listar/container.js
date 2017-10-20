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
		eliminar: state.especialidad.eliminar,
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
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarEspecialidad(idEspecialidad))
		    }
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