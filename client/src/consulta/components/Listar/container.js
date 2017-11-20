import { connect } from 'react-redux'

import {
	listarConsultas,
	listarConsultasMedico,
	listarConsultasPaciente,
	mostrarConsulta
} from '../../actions'

import {
	abrirFormularioCrearConsulta
} from '../../../consulta/actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	console.log(ownProps)
	return {
		crear: state.consulta.crear,
		listar: state.consulta.listar,
		consultas: state.consulta.listar.consultas,

		// guardamos los parametros dentro del objeto urls.
		urls: ownProps.params,

		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarConsultas: () => {
			dispatch(listarConsultas())
		},
		mostrarConsulta: (idConsulta) => {
			dispatch(mostrarConsulta(idConsulta))
		},
		listarConsultasPaciente: (idPaciente) => {
			dispatch(listarConsultasPaciente(idPaciente))
		},
		listarConsultasMedico: (idPersonal) => {
			dispatch(listarConsultasMedico(idPersonal))
		},


		abrirFormularioCrearConsulta: () => {
			dispatch(abrirFormularioCrearConsulta())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)