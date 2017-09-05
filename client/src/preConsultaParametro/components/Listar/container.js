import { connect } from 'react-redux'

import {
	listarPreConsultaParametros,
	eliminarPreConsultaParametro,
	mostrarPreConsultaParametro,

	abrirFormularioEditarPreConsultaParametro
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		// No se poner porque idPreConsulta le pasamos como property
		// al llamalo dentro de MostrarCitaApp
		// idPreConsulta: ownProps.idPreConsulta,

		crear: state.preConsultaParametro.crear,
		listar: state.preConsultaParametro.listar,
		parametrosPreConsulta: state.preConsultaParametro.listar.parametrosPreConsulta
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarPreConsultaParametros: (idPreConsulta) => {
			dispatch(listarPreConsultaParametros(idPreConsulta))
		},
		eliminarPreConsultaParametro: (idPreConsulta, idParametroPreconsulta) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarPreConsultaParametro(idPreConsulta, idParametroPreconsulta))
		    }
		},
		mostrarPreConsultaParametro: (idPreConsulta, idParametroPreconsulta) => {
			dispatch(mostrarPreConsultaParametro(idPreConsulta, idParametroPreconsulta))
		},
		abrirFormularioEditarPreConsultaParametro: (idPreConsulta, idParametroPreconsulta) => {
			dispatch(abrirFormularioEditarPreConsultaParametro(idPreConsulta, idParametroPreconsulta))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)