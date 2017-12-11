import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'

import FiltrosApp from './FiltrosApp'

import {
	listarMedicamentosEntregados,

	abrirFormularioFiltro
} from '../../actions'

function mapStateToProps(state, ownProps) {
	
	return {

		valoresFiltro: {
    		// Para filtrar .
    		nroDocumento_paciente: selector(state, 'nroDocumento_paciente') || '',
			id_tipoDocumento_paciente: selector(state, 'id_tipoDocumento_paciente') || '',
			nombres_paciente: selector(state, 'nombres_paciente') || '',
			apellidos_paciente: selector(state, 'apellidos_paciente') || '',
			
			nroDocumento_farmaceutico: selector(state, 'nroDocumento_farmaceutico') || '',
			id_tipoDocumento_farmaceutico: selector(state, 'id_tipoDocumento_farmaceutico') || '',
			nombres_farmaceutico: selector(state, 'nombres_farmaceutico') || '',
			apellidos_farmaceutico: selector(state, 'apellidos_farmaceutico') || '',
			
			fechaEmisionDesde_medicamentosEntregados: selector(state, 'fechaEmisionDesde_medicamentosEntregados') || '',
			fechaEmisionHasta_medicamentosEntregados: selector(state, 'fechaEmisionHasta_medicamentosEntregados') || '',
			hora_medicamentosEntregados: selector(state, 'hora_medicamentosEntregados') || ''
			// impreso_medicamentosEntregados: selector(state, 'impreso_medicamentosEntregados') || ''
    	},

		listar: state.medicamentoEntregado.listar,
		
		eliminar: state.medicamentoEntregado.eliminar,

		formularioFiltro: state.medicamentoEntregado.formularioFiltro

	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarMedicamentosEntregados: () => {
			dispatch(listarMedicamentosEntregados())
		},
		abrirFormularioFiltro: () => {
			dispatch(abrirFormularioFiltro())
		},


		
		// nroDocumento_paciente
		// id_tipoDocumento_paciente
		// nombres_paciente
		// apellidos_paciente
		// nroDocumento_farmaceutico
		// id_tipoDocumento_farmaceutico
		// nombres_farmaceutico
		// apellidos_farmaceutico
		// fechaEmisionDesde_medicamentosEntregados
		// fechaEmisionHasta_medicamentosEntregados
		// hora_medicamentosEntregados
		// impreso_medicamentosEntregados

		medicamentosEntregadosFiltradosEnGeneral: (pacientes, v) => {
			console.log(v)
			let condicionDatosPersonalesPaciente
			let datosPersonalesPacienteFiltro

			let condicionRangoFechasEmision
			let rangoFechasEmisionFiltro

			let condicionDatosPersonalesFarmaceutico
			let datosPersonalesFarmaceuticoFiltro

			let condicionHora
			let horaFiltro

			// let condicionImpreso
			// let impresoFiltro


			condicionDatosPersonalesPaciente = (	
				v.nroDocumento_paciente.length > 0 ||
				v.id_tipoDocumento_paciente.length > 0 ||
				v.nombres_paciente.length > 0 ||
				v.apellidos_paciente.length > 0
			)

			condicionDatosPersonalesFarmaceutico = (
				v.nroDocumento_farmaceutico.length > 0 ||
				v.id_tipoDocumento_farmaceutico.length > 0 ||
				v.nombres_farmaceutico.length > 0 ||
				v.apellidos_farmaceutico.length > 0
			)

			condicionRangoFechasEmision = (
				v.fechaEmisionDesde_medicamentosEntregados.length ||
				v.fechaEmisionHasta_medicamentosEntregados.length
			)

			condicionHora = (
				v.hora_medicamentosEntregados.length > 0
			)

			// condicionImpreso = (
			// 	v.impreso_medicamentosEntregados == 0 ||
			// 	v.impreso_medicamentosEntregados == 1

			// )

			pacientes = pacientes.filter((i) => {

				if(i.paciente.nroDocumento == null) {
					i.paciente.nroDocumento = ''
				}

				if(i.farmaceutico.nroDocumento == null) {
					i.farmaceutico.nroDocumento = ''
				}

				if(condicionDatosPersonalesPaciente) {
					datosPersonalesPacienteFiltro = (
						i.paciente.nroDocumento.toString().match(v.nroDocumento_paciente) &&
						i.paciente.id_tipoDocumento.toString().match(v.id_tipoDocumento_paciente) &&
						i.paciente.nombres.toString().match(v.nombres_paciente) &&
						i.paciente.apellidos.toString().match(v.apellidos_paciente)
					)
				} else {
					datosPersonalesPacienteFiltro = true
				}


				if(condicionDatosPersonalesFarmaceutico) {

					datosPersonalesFarmaceuticoFiltro = (
						i.farmaceutico.nroDocumento.toString().match(v.nroDocumento_farmaceutico) &&
						i.farmaceutico.id_tipoDocumento.toString().match(v.id_tipoDocumento_farmaceutico) &&
						i.farmaceutico.nombres.toString().match(v.nombres_farmaceutico) &&
						i.farmaceutico.apellidos.toString().match(v.apellidos_farmaceutico)
					)
				} else {
					datosPersonalesFarmaceuticoFiltro = true
				}


				if(condicionRangoFechasEmision) {
					rangoFechasEmisionFiltro = (
						(moment(v.fechaEmisionDesde_medicamentosEntregados).format('DD') <= (moment(i.medicamentoEntregado.fecha).format('DD')) && 
						(moment(i.medicamentoEntregado.fecha).format('DD')  <= moment(v.fechaEmisionHasta_medicamentosEntregados).format('DD')) && 

						moment(v.fechaEmisionDesde_medicamentosEntregados).format('MM') <= (moment(i.medicamentoEntregado.fecha).format('MM')) && 
						(moment(i.medicamentoEntregado.fecha).format('MM')  <= moment(v.fechaEmisionHasta_medicamentosEntregados).format('MM')) && 

						moment(v.fechaEmisionDesde_medicamentosEntregados).format('YYYY') <= (moment(i.medicamentoEntregado.fecha).format('YYYY')) && 
						(moment(i.medicamentoEntregado.fecha).format('YYYY')  <= moment(v.fechaEmisionHasta_medicamentosEntregados).format('YYYY')))
					
					)
				} else {
					rangoFechasEmisionFiltro = true	
				}


				if(condicionHora) {
					horaFiltro = (
						i.medicamentoEntregado.hora.toString().match(v.hora_medicamentosEntregados)
					)
				} else {
					horaFiltro = true	
				}

				
				// if(condicionImpreso) {
				// 	impresoFiltro = (
				// 		i.medicamentoEntregado.imprimido == v.impreso_medicamentosEntregados
				// 	)
				// } else {
				// 	impresoFiltro = true	
				// }
				

				return (
					// moment(i.consulta.fecha).format('DD-MM-YYY') == moment(v.fechaEmisionDesde_medicamentosEntregados).format('DD-MM-YYY') &&
					
					datosPersonalesPacienteFiltro &&
					datosPersonalesFarmaceuticoFiltro &&
					rangoFechasEmisionFiltro && 
					horaFiltro 
				)

			})

			return pacientes
		}
	}
}

const form = reduxForm({
  form: 'FiltrosAppMedicamentosEntregados'
})

const selector = formValueSelector('FiltrosAppMedicamentosEntregados')

export default connect(mapStateToProps, mapDispatchToProps)(form(FiltrosApp))







