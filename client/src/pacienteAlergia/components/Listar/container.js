import { connect } from 'react-redux'

import {
	listarPacienteAlergias,
	eliminarPacienteAlergia,
	mostrarPacienteAlergia,

	abrirFormularioCrearPacienteAlergia,
	abrirFormularioEditarPacienteAlergia
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		idPaciente: ownProps.idPaciente,

		crear: state.alergiaPaciente.crear,
		listar: state.alergiaPaciente.listar,
		alergias: state.alergiaPaciente.listar.alergias
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarPacienteAlergias: (idPaciente) => {
			dispatch(listarPacienteAlergias(idPaciente))
		},
		eliminarPacienteAlergia: (idPaciente, idAlergia) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarPacienteAlergia(idPaciente, idAlergia))
		    }
		},
		mostrarPacienteAlergia: (idPaciente, idAlergia) => {
			dispatch(mostrarPacienteAlergia(idPaciente, idAlergia))
		},
		abrirFormularioCrearPacienteAlergia: () => {
			dispatch(abrirFormularioCrearPacienteAlergia())
		},
		abrirFormularioEditarPacienteAlergia: (idPaciente, idAlergia) => {
			dispatch(abrirFormularioEditarPacienteAlergia(idPaciente, idAlergia))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)