import { connect } from 'react-redux'

import {
	listarAuditoria1MovimientosPorNombreTabla,
	listarAuditoria1MovimientosPorIdTablaPadre
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		// Guardamos todos los parametros de la url en donde el 
		// usuario está parado.
		urls: ownProps.params,

		listar: state.auditoriaModulo1.listar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAuditoria1MovimientosPorNombreTabla: (tableName) => {
			dispatch(listarAuditoria1MovimientosPorNombreTabla(tableName))
		},
		listarAuditoria1MovimientosPorIdTablaPadre: (idTableFather) => {
			dispatch(listarAuditoria1MovimientosPorIdTablaPadre(idTableFather))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)