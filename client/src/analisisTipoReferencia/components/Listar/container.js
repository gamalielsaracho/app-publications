import { connect } from 'react-redux'

import {
	listarAnalisisTipoReferencias,
	eliminarAnalisisTipoReferencia,

	abrirFormularioEditarAnalisisTipoReferencia
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.analisisTipoReferencia.crear,
		listar: state.analisisTipoReferencia.listar,
		analisisTipoReferencias: state.analisisTipoReferencia.listar.analisisTipoReferencias
	
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAnalisisTipoReferencias: (idAnalisisTipo) => {
			dispatch(listarAnalisisTipoReferencias(idAnalisisTipo))
		},
		eliminarAnalisisTipoReferencia: (idAnalisisTipoAnalisisReferencia) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarAnalisisTipoReferencia(idAnalisisTipoAnalisisReferencia))
		    }
		},
		abrirFormularioEditarAnalisisTipoReferencia: (idAnalisisTipoAnalisisReferencia) => {
			dispatch(abrirFormularioEditarAnalisisTipoReferencia(idAnalisisTipoAnalisisReferencia))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)