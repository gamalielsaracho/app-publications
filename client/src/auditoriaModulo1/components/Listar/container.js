import { connect } from 'react-redux'

// import {
// 	listarAuditoria1MovimientosPorNombreTabla,
// 	listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre
// } from '../../actions'

import Listar from './Listar'

function mapStateToProps(state, ownProps) {
	return {
		// Guardamos todos los parametros de la url en donde el 
		// usuario está parado.
		// urls: ownProps.params,

		// listar: state.auditoriaModulo1.listar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		// listarAuditoria1MovimientosPorNombreTabla: (tableName) => {
		// 	dispatch(listarAuditoria1MovimientosPorNombreTabla(tableName))
		// },
		// listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre: (tableName, idTableFather) => {
		// 	dispatch(listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre(tableName, idTableFather))
		// },

		// datosMovimientosFiltradosPorValores: (movimientos, valoresFiltro) => {
		// 	console.log(valoresFiltro)
			
		// 	if(movimientos) {
		// 		movimientos = movimientos.filter((i) => {
		// 			return i.id_diagnostico == valoresFiltro.id_diagnostico
		// 		})
		// 		movimientos = movimientos[0]

		// 		console.log('FILTRADOS movimientos.... :)')
		// 		console.log(movimientos)
		// 	}

		// 	return movimientos
		// }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)