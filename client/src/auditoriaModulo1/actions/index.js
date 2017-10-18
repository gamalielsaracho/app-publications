import {

	LISTAR_AUDITORIA1_MOVIMIENTOS_REQUEST,
	LISTAR_AUDITORIA1_MOVIMIENTOS_EXITO,
	LISTAR_AUDITORIA1_MOVIMIENTOS_FALLO,

	// Show rol.
	MOSTRAR_AUDITORIA1_MOVIMIENTO_REQUEST,
	MOSTRAR_AUDITORIA1_MOVIMIENTO_EXITO,
	MOSTRAR_AUDITORIA1_MOVIMIENTO_FALLO,

	CERRAR_MODAL_MOSTRAR_AUDITORIA1_MOVIMIENTO
} from './types'

import { browserHistory } from 'react-router'

import {
	postData,
	getData,
	putData,
	deleteData,
	errorHandler,

	API_URL
} from '../../globalActions'

export function listarAuditoria1MovimientosPorNombreTabla(tableName) {
	return (dispatch) => {
		let url = `/auditoriaModulo1/${tableName}/nombreTabla`

		dispatch({ type: LISTAR_AUDITORIA1_MOVIMIENTOS_REQUEST })

		getData(LISTAR_AUDITORIA1_MOVIMIENTOS_EXITO, LISTAR_AUDITORIA1_MOVIMIENTOS_FALLO, true, url, dispatch)
	}
}



export function listarAuditoria1MovimientosPorIdTablaPadre(idTableFather) {
	return (dispatch) => {
		let url = `/auditoriaModulo1/${idTableFather}/idTablaPadre`

		dispatch({ type: LISTAR_AUDITORIA1_MOVIMIENTOS_REQUEST })

		getData(LISTAR_AUDITORIA1_MOVIMIENTOS_EXITO, LISTAR_AUDITORIA1_MOVIMIENTOS_FALLO, true, url, dispatch)
	}
}