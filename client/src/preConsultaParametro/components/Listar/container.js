import { connect } from 'react-redux'

import {
	listarPreConsultaParametros,
	eliminarPreConsultaParametro,
	mostrarPreConsultaParametro,

	abrirFormularioEditarPreConsultaParametro
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {

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
		eliminarPreConsultaParametro: (idPreconsultaParametro) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarPreConsultaParametro(idPreconsultaParametro))
		    }
		},
		mostrarPreConsultaParametro: (idPreconsultaParametro) => {
			dispatch(mostrarPreConsultaParametro(idPreconsultaParametro))
		},
		abrirFormularioEditarPreConsultaParametro: (idPreconsultaParametro) => {
			dispatch(abrirFormularioEditarPreConsultaParametro(idPreconsultaParametro))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)