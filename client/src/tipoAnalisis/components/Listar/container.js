import { connect } from 'react-redux'

import {
	listarTiposAnalisis,
	eliminarTipoAnalisis,
	mostrarTipoAnalisis,

	abrirFormularioCrearTipoAnalisis,
	abrirFormularioEditarTipoAnalisis
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.tipoAnalisis.crear,
		listar: state.tipoAnalisis.listar,
		tiposAnalisis: state.tipoAnalisis.listar.tiposAnalisis
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarTiposAnalisis: () => {
			dispatch(listarTiposAnalisis())
		},
		eliminarTipoAnalisis: (idTipoAnalisis) => {
			var r = confirm("Está seguro que desea eliminar?");
		    if (r == true) {
				dispatch(eliminarTipoAnalisis(idTipoAnalisis))
		    }
		},
		mostrarTipoAnalisis: (idTipoAnalisis) => {
			dispatch(mostrarTipoAnalisis(idTipoAnalisis))
		},
		abrirFormularioCrearTipoAnalisis: () => {
			dispatch(abrirFormularioCrearTipoAnalisis())
		},
		abrirFormularioEditarTipoAnalisis: (idTipoAnalisis) => {
			dispatch(abrirFormularioEditarTipoAnalisis(idTipoAnalisis))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)