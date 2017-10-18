import {
	LISTAR_AUDITORIA1_MOVIMIENTOS_REQUEST,
	LISTAR_AUDITORIA1_MOVIMIENTOS_EXITO,
	LISTAR_AUDITORIA1_MOVIMIENTOS_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	listar: { auditoria1Movimientos:[], cargando: false, error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		
		// LISTAR.
		case LISTAR_AUDITORIA1_MOVIMIENTOS_REQUEST:
			return Object.assign({}, state, {
				listar: { cargando: true, error: '' }
			})

		case LISTAR_AUDITORIA1_MOVIMIENTOS_EXITO:
			return Object.assign({}, state, {
				listar: { auditoria1Movimientos: action.payload.auditoria1Movimientos, cargando: false, error: '' }
			})

		case LISTAR_AUDITORIA1_MOVIMIENTOS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, auditoria1Movimientos:[], cargando: false }
			})

		default: 
			return state
	}

}