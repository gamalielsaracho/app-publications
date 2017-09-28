import { connect } from 'react-redux'

import {
	listarAnalisisSolicitadosPorIdPaciente,
	eliminarAnalisisSolicitado,
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
		listarAnalisisSolicitadosPorIdPaciente: (idPaciente) => {
			dispatch(listarAnalisisSolicitadosPorIdPaciente(idPaciente))
		},
		eliminarAnalisisSolicitado: (idAnalisisSolicitado) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarAnalisisSolicitado(idAnalisisSolicitado))
		    }
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