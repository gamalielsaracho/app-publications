import { connect } from 'react-redux'

import {
	listarParametrosPreConsulta,
	eliminarParametroPreConsulta,
	mostrarParametroPreConsulta,

	abrirFormularioCrearParametroPreConsulta,
	abrirFormularioEditarParametroPreConsulta
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.parametroPreConsulta.crear,
		listar: state.parametroPreConsulta.listar,
		parametros: state.parametroPreConsulta.listar.parametros
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarParametrosPreConsulta: () => {
			dispatch(listarParametrosPreConsulta())
		},
		eliminarParametroPreConsulta: (idParametroPreconsulta) => {
			var r = confirm("Está seguro que desea eliminar el rol?");
		    if (r == true) {
				dispatch(eliminarParametroPreConsulta(idParametroPreconsulta))
		    }
		},
		mostrarParametroPreConsulta: (idParametroPreconsulta) => {
			dispatch(mostrarParametroPreConsulta(idParametroPreconsulta))
		},
		abrirFormularioCrearParametroPreConsulta: () => {
			dispatch(abrirFormularioCrearParametroPreConsulta())
		},
		abrirFormularioEditarParametroPreConsulta: (idParametroPreconsulta) => {
			dispatch(abrirFormularioEditarParametroPreConsulta(idParametroPreconsulta))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)