import { connect } from 'react-redux'

import {
	listarTipoAnalisisParametros,
	eliminarTipoAnalisisParametro,
	mostrarTipoAnalisisParametro,
	abrirFormularioCrearTipoAnalisisParametro
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps.params)
	return {
		// idTipoAnalisis es pasado desde la url al ser llamado.
		idTipoAnalisis: ownProps.params.idTipoAnalisis,

		listar: state.tipoAnalisisParametro.listar,
		parametrosTipoAnalisis: state.tipoAnalisisParametro.listar.parametrosTipoAnalisis	
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarTipoAnalisisParametros: (idTipoAnalisis) => {
			dispatch(listarTipoAnalisisParametros(idTipoAnalisis))
		},
		eliminarTipoAnalisisParametro: (idTipoAnalisisParametro) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarTipoAnalisisParametro(idTipoAnalisisParametro))
		    }
		},
		mostrarTipoAnalisisParametro: (idTipoAnalisisParametro) => {
			dispatch(mostrarTipoAnalisisParametro(idTipoAnalisisParametro))
		},
		abrirFormularioCrearTipoAnalisisParametro: () => {
			dispatch(abrirFormularioCrearTipoAnalisisParametro())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)