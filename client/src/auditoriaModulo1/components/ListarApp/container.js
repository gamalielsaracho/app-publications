import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import ListarApp from './ListarApp'

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
			idRegistro: selector(state, 'idRegistro'),
			fecha: selector(state, 'fecha'),
			hora: selector(state, 'hora'),
			accion: selector(state, 'accion'),
			id_personal: selector(state, 'id_personal')
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
			
			if(movimientos) {
				movimientos = movimientos.filter((i) => {
					return i.id_diagnostico == valoresFiltro.id_diagnostico
				})
				movimientos = movimientos[0]

				console.log('FILTRADOS movimientos.... :)')
				console.log(movimientos)
			}

			return movimientos
		}
	}
}

const form = reduxForm({
  form: 'ListarApp'
})

const selector = formValueSelector('ListarApp')

export default connect(mapStateToProps, mapDispatchToProps)(form(ListarApp))







