import { connect } from 'react-redux'

import {
	listarPacientes,
	eliminarPaciente,

	abrirFormularioCrearPaciente,
	abrirFormularioEditarPaciente
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		eliminar: state.paciente.eliminar,
		listar: state.paciente.listar,
		pacientes: state.paciente.listar.pacientes,


		// Para hacer render del formulario únicamente si esta abierto.
		formulario: state.paciente.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarPacientes: () => {
			dispatch(listarPacientes())
		},
		eliminarPaciente: (idPaciente) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarPaciente(idPaciente))
		    }
		},
		abrirFormularioCrearPaciente: () => {
			dispatch(abrirFormularioCrearPaciente())
		},
		abrirFormularioEditarPaciente: (idPaciente) => {
			dispatch(abrirFormularioEditarPaciente(idPaciente))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)