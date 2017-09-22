import { connect } from 'react-redux'

import {
	listarParametrosAnalisis,
	eliminarParametroAnalisis,
	mostrarParametroAnalisis,

	abrirFormularioCrearParametroAnalisis,
	abrirFormularioEditarParametroAnalisis
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.parametroAnalisis.crear,
		listar: state.parametroAnalisis.listar,
		parametrosAnalisis: state.parametroAnalisis.listar.parametrosAnalisis,

		// estado del formulario para hacer render.
		// unicamente si se abre.
		formulario: state.parametroAnalisis.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarParametrosAnalisis: () => {
			dispatch(listarParametrosAnalisis())
		},
		eliminarParametroAnalisis: (idParametroAnalisis) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarParametroAnalisis(idParametroAnalisis))
		    }
		},
		mostrarParametroAnalisis: (idParametroAnalisis) => {
			dispatch(mostrarParametroAnalisis(idParametroAnalisis))
		},
		abrirFormularioCrearParametroAnalisis: () => {
			dispatch(abrirFormularioCrearParametroAnalisis())
		},
		abrirFormularioEditarParametroAnalisis: (idParametroAnalisis) => {
			dispatch(abrirFormularioEditarParametroAnalisis(idParametroAnalisis))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)