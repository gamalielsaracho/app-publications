import { connect } from 'react-redux'

import {
	listarAnalisisSolicitados,
	listarAnalisisSolicitadosPorIdPaciente,
	mostrarAnalisisSolicitado,

	abrirFormularioEditarAnalisisSolicitado
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		crear: state.analisisSolicitado.crear,
		listar: state.analisisSolicitado.listar,
		analisisSolicitados: state.analisisSolicitado.listar.analisisSolicitados,

		urls: ownProps.params

		// estado del formulario para hacer render.
		// unicamente si se abre.
		// formulario: state.parametroAnalisis.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAnalisisSolicitados: () => {
			dispatch(listarAnalisisSolicitados())
		},
		listarAnalisisSolicitadosPorIdPaciente: (idPaciente) => {
			dispatch(listarAnalisisSolicitadosPorIdPaciente(idPaciente))
		},
		mostrarAnalisisSolicitado: (idAnalisisSolicitado) => {
			dispatch(mostrarAnalisisSolicitado(idAnalisisSolicitado))
		},
		abrirFormularioEditarAnalisisSolicitado: (idAnalisisSolicitado) => {
			dispatch(abrirFormularioEditarAnalisisSolicitado(idAnalisisSolicitado))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)