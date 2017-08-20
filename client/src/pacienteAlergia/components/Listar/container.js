import { connect } from 'react-redux'

import {
	listarPacienteAlergias,
	eliminarPacienteAlergia,
	mostrarPacienteAlergia,

	abrirFormularioCrearPacienteAlergia,
	abrirFormularioEditarPacienteAlergia
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.alergiaPaciente.crear,
		listar: state.alergiaPaciente.listar,
		alergias: state.alergiaPaciente.listar.alergias
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarPacienteAlergias: (nroDocumento, id_tipoDocumento) => {
			dispatch(listarPacienteAlergias(nroDocumento, id_tipoDocumento))
		},
		eliminarPacienteAlergia: (nroDocumento, id_tipoDocumento, id_alergia) => {
			dispatch(eliminarPacienteAlergia(nroDocumento, id_tipoDocumento, id_alergia))
		},
		mostrarPacienteAlergia: (nroDocumento, id_tipoDocumento, id_alergia) => {
			dispatch(mostrarPacienteAlergia(nroDocumento, id_tipoDocumento, id_alergia))
		},
		abrirFormularioCrearPacienteAlergia: () => {
			dispatch(abrirFormularioCrearPacienteAlergia())
		},
		abrirFormularioEditarPacienteAlergia: (nroDocumento, id_tipoDocumento, id_alergia) => {
			dispatch(abrirFormularioEditarPacienteAlergia(nroDocumento, id_tipoDocumento, id_alergia))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)