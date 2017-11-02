import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import FiltrosApp from './FiltrosApp'

import {
	listarAuditoria1MovimientosPorNombreTabla,
	listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre
} from '../../actions'


function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		urls: ownProps.params,
		
		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname,

		valoresFiltro: {
    		// Para filtrar .
			idRegistro: selector(state, 'idRegistro') || '',
			fecha: selector(state, 'fecha') || '',
			hora: selector(state, 'hora') || '',
			accion: selector(state, 'accion') || '',
			id_personal: selector(state, 'id_personal') || ''
    	},

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
		},

		datosMovimientosFiltradosPorValores: (movimientos, valoresFiltro) => {
			console.log(valoresFiltro)
			
			console.log('No FILTRADOS movimientos.... :)')
			console.log(movimientos)

			
			// if(movimientos) {
				movimientos = movimientos.filter((i) => {
					return i.auditoria.idRegistro == valoresFiltro.idRegistro &&
					i.auditoria.accion.match(valoresFiltro.accion)
				})

				// movimientos = movimientos[0]

				console.log('FILTRADOS movimientos.... :)')
				console.log(movimientos)
			// }

			return movimientos
		}
	}
}

const form = reduxForm({
  form: 'FiltrosApp'
})

const selector = formValueSelector('FiltrosApp')

export default connect(mapStateToProps, mapDispatchToProps)(form(FiltrosApp))







