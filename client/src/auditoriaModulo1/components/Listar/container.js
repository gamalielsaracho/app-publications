import { connect } from 'react-redux'

import {
	listarAuditoria1MovimientosPorNombreTabla,
	listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre
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
		listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre: (tableName, idTableFather) => {
			dispatch(listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre(tableName, idTableFather))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)