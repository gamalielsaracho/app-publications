import { connect } from 'react-redux'

import {
	listarParametrosAnalisisByIdTipoAnalisis,
	eliminarParametroAnalisis,
	mostrarParametroAnalisis,

	abrirFormularioCrearParametroAnalisis,
	abrirFormularioEditarParametroAnalisis,

	limpiarMensajeErrorParametroAnalisis
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		// para obtener los parametros de las urls.
		urls: ownProps.params,

		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname,


		eliminar: state.parametroAnalisis.eliminar,
		listar: state.parametroAnalisis.listar,
		parametrosAnalisis: state.parametroAnalisis.listar.parametrosAnalisis,

		// estado del formulario para hacer render.
		// unicamente si se abre.
		formulario: state.parametroAnalisis.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarParametrosAnalisisByIdTipoAnalisis: (idTipoAnalisis) => {
			dispatch(listarParametrosAnalisisByIdTipoAnalisis(idTipoAnalisis))
		},
		eliminarParametroAnalisis: (idParametroAnalisis) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarParametroAnalisis(idParametroAnalisis))

				setTimeout(function () {
					dispatch(limpiarMensajeErrorParametroAnalisis())
				}, 5000)
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