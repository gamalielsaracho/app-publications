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
		crear: state.paciente.crear,
		listar: state.paciente.listar,
		pacientes: state.paciente.listar.pacientes
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarPacientes: () => {
			dispatch(listarPacientes())
		},
		eliminarPaciente: (nroDocumento, idTipoDocumento) => {
			dispatch(eliminarPaciente(nroDocumento, idTipoDocumento))
		},
		abrirFormularioCrearPaciente: () => {
			dispatch(abrirFormularioCrearPaciente())
		},
		abrirFormularioEditarPaciente: (nroDocumento, idTipoDocumento) => {
			dispatch(abrirFormularioEditarPaciente(nroDocumento, idTipoDocumento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)