import { connect } from 'react-redux'

import {
	listarTiposConsumos,
	eliminarTipoConsumo,
	mostrarTipoConsumo,

	abrirFormularioCrearTipoConsumo,
	abrirFormularioEditarTipoConsumo
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.tipoConsumo.crear,
		listar: state.tipoConsumo.listar,
		tiposConsumos: state.tipoConsumo.listar.tiposConsumos
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarTiposConsumos: () => {
			dispatch(listarTiposConsumos())
		},
		eliminarTipoConsumo: (idTipoConsumo) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarTipoConsumo(idTipoConsumo))
		    }
		},
		mostrarTipoConsumo: (idTipoConsumo) => {
			dispatch(mostrarTipoConsumo(idTipoConsumo))
		},
		abrirFormularioCrearTipoConsumo: () => {
			dispatch(abrirFormularioCrearTipoConsumo())
		},
		abrirFormularioEditarTipoConsumo: (idTipoConsumo) => {
			dispatch(abrirFormularioEditarTipoConsumo(idTipoConsumo))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)