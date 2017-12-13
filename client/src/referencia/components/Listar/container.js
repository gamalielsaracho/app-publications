import { connect } from 'react-redux'

import {
	listarReferencias,
	eliminarReferencia,
	mostrarReferencia,

	abrirFormularioCrearReferencia,
	abrirFormularioEditarReferencia,

	limpiarMensajeErrorReferencia
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps.params)
	return {
		eliminar: state.referencia.eliminar,
		listar: state.referencia.listar,
		referencias: state.referencia.listar.referencias,

		// Para ver si tiene el id del parametro.
		urls: ownProps.params
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarReferencias: (idParametroAnalisis) => {
			dispatch(listarReferencias(idParametroAnalisis))
		},
		eliminarReferencia: (idReferencia) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarReferencia(idReferencia))

				setTimeout(function () {
					dispatch(limpiarMensajeErrorReferencia())
				}, 5000)
		    }
		},
		mostrarReferencia: (idReferencia) => {
			dispatch(mostrarReferencia(idReferencia))
		},
		abrirFormularioEditarReferencia: (idReferencia) => {
			dispatch(abrirFormularioEditarReferencia(idReferencia))
		},
		abrirFormularioCrearReferencia: () => {
			dispatch(abrirFormularioCrearReferencia())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)