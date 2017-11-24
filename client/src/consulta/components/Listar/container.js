import { connect } from 'react-redux'

import {
	abrirFormularioCrearConsulta,

	listarConsultas,
	listarConsultasPreConsulta,
	listarConsultasMedico,
	listarConsultasPaciente,
	mostrarConsulta
} from '../../actions'



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
		pathname: ownProps.location.pathname,

		// Para hacer render del formulario únicamente si está abierto.
		formulario: state.consulta.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearConsulta: () => {
			dispatch(abrirFormularioCrearConsulta())
		},
		listarConsultas: () => {
			dispatch(listarConsultas())
		},
		listarConsultasPreConsulta: (idPreConsulta) => {
			dispatch(listarConsultasPreConsulta(idPreConsulta))
		},
		mostrarConsulta: (idConsulta) => {
			dispatch(mostrarConsulta(idConsulta))
		},
		listarConsultasPaciente: (idPaciente) => {
			dispatch(listarConsultasPaciente(idPaciente))
		},
		listarConsultasMedico: (idPersonal) => {
			dispatch(listarConsultasMedico(idPersonal))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)