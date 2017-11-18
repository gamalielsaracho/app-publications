import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'

import FiltrosApp from './FiltrosApp'

import {
	listarPreConsultas,

	abrirFormularioFiltro
} from '../../actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		urls: ownProps.params,
		
		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname,

		valoresFiltro: {
    		// Para filtrar .

			fecha: selector(state, 'fecha') || '',
			hora: selector(state, 'hora') || '',
			id_nivel: selector(state, 'id_nivel') || '',

			nroDocumento_paciente: selector(state, 'nroDocumento_paciente') || '',
			id_tipoDocumento_paciente: selector(state, 'id_tipoDocumento_paciente') || '',
			nombres_paciente: selector(state, 'nombres_paciente') || '',
			apellidos_paciente: selector(state, 'apellidos_paciente') || '',
			
			
			nroDocumento_enfermera: selector(state, 'nroDocumento_enfermera') || '',
			id_tipoDocumento_enfermera: selector(state, 'id_tipoDocumento_enfermera') || '',
			nombres_enfermera: selector(state, 'nombres_enfermera') || '',
			apellidos_enfermera: selector(state, 'apellidos_enfermera') || ''
    	},

		listar: state.preConsulta.listar,

		formularioFiltro: state.preConsulta.formularioFiltro

	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarPreConsultas: () => {
			dispatch(listarPreConsultas())
		},
		abrirFormularioFiltro: () => {
			dispatch(abrirFormularioFiltro())
		},

		preConsultasFiltradasPorValores: (preConsultas, valoresFiltro) => {
			console.log(valoresFiltro)
			
			console.log('No FILTRADOS pre-consultas.... :)')
			console.log(preConsultas)

			// console.log(moment(valoresFiltro.fecha).format('MM-DD-YYYY'))

			// POR DESARROLLAR.

			// movimientos = movimientos.filter((i) => {
					
			// 	// console.log(i.auditoria.fecha)

			// 	return i.auditoria.idRegistro.toString().match(valoresFiltro.idRegistro) &&
			// 	i.auditoria.accion.match(valoresFiltro.accion) &&
			// 	moment(i.auditoria.fecha).format('DD-MM-YYYY').match(moment(valoresFiltro.fecha).format('DD-MM-YYYY')) &&

			// 	i.auditoria.hora.match(valoresFiltro.hora) &&
					
			// 	i.personal.nroDocumento.match(valoresFiltro.nroDocumento) &&
			// 	i.personal.nombres.match(valoresFiltro.nombres) &&
			// 	i.personal.apellidos.match(valoresFiltro.apellidos)
			// })

			// movimientos = movimientos[0]

			console.log('FILTRADOS pre-consultas.... :)')
			console.log(preConsultas)

			return preConsultas
		}
	}
}

const form = reduxForm({
  form: 'FiltrosAppPreConsultas'
})

const selector = formValueSelector('FiltrosAppPreConsultas')

export default connect(mapStateToProps, mapDispatchToProps)(form(FiltrosApp))







