import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'

import FiltrosApp from './FiltrosApp'

import {
	listarPacientes,

	abrirFormularioFiltro
} from '../../actions'

function mapStateToProps(state, ownProps) {
	
	return {
		urls: ownProps.params,
		
		// para ver la url completa en el cual está parada el usuario.
		pathname: ownProps.location.pathname,

		valoresFiltro: {
    		// Para filtrar .
    		fecha: selector(state, 'fecha') || '',
			hora: selector(state, 'hora') || '',
			fechaProximaConsulta: selector(state, 'fechaProximaConsulta') || '',
			fechaDesde: selector(state, 'fechaDesde') || '',
			fechaHasta: selector(state, 'fechaHasta') || '',
			id_nivel: selector(state, 'id_nivel') || '',
			id_especialidad: selector(state, 'id_especialidad') || '',


			nroDocumento_paciente: selector(state, 'nroDocumento_paciente') || '',
			id_tipoDocumento_paciente: selector(state, 'id_tipoDocumento_paciente') || '',
			nombres_paciente: selector(state, 'nombres_paciente') || '',
			apellidos_paciente: selector(state, 'apellidos_paciente') || '',
			
			
			nroDocumento_medico: selector(state, 'nroDocumento_medico') || '',
			id_tipoDocumento_medico: selector(state, 'id_tipoDocumento_medico') || '',
			nombres_medico: selector(state, 'nombres_medico') || '',
			apellidos_medico: selector(state, 'apellidos_medico') || ''
    	},

		listar: state.paciente.listar,
		eliminar: state.paciente.eliminar,

		formularioFiltro: state.paciente.formularioFiltro

	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarPacientes: () => {
			dispatch(listarPacientes())
		},
		abrirFormularioFiltro: () => {
			dispatch(abrirFormularioFiltro())
		},


		// ..................................
		// fechaDesde
		// fechaHasta
		// hora
		// fechaProximaConsulta
		// id_nivel
		// id_especialidad
		// nroDocumento_paciente
		// id_tipoDocumento_paciente
		// nombres_paciente
		// apellidos_paciente
		// nroDocumento_medico
		// id_tipoDocumento_medico
		// nombres_medico
		// apellidos_medico
		pacientesFiltradosEnGeneral: (pacientes, v) => {
			console.log("Entro en EnGeneral ............")
			console.log(v)

			let condicionFieldsConsulta
			let consultaFiltro

			let condicionFieldsFechas
			let rangofechasFiltro

			let condicionFieldsPaciente
			let pacienteFiltro

			let condicionFieldsMedico
			let medicoFiltro

			// let condicionHistorial
			// let condicionPreConsulta

			condicionFieldsConsulta = (
				v.id_nivel ||
				v.fechaProximaConsulta ||
				v.id_especialidad ||
				v.hora ||
				v.fechaDesde || 
				v.fechaHasta
			)

			condicionFieldsFechas = (
				v.fechaDesde || v.fechaHasta
			)

			condicionFieldsPaciente = (
				v.nroDocumento_paciente || v.id_tipoDocumento_paciente ||
				v.nombres_paciente || v.apellidos_paciente
			)

			condicionFieldsMedico = (
				v.nroDocumento_medico ||
				v.id_tipoDocumento_medico ||
				v.nombres_medico ||
				v.apellidos_medico
			)

			pacientes = pacientes.filter((i) => {


				if(condicionFieldsConsulta) {
					consultaFiltro = (
						i.consulta.id_nivel.toString().match(v.id_nivel) &&
						i.consulta.fechaProximaConsulta.match(v.fechaProximaConsulta) &&
						i.personal.id_especialidad.toString().match(v.id_especialidad) &&
						i.consulta.hora.match(v.hora)
					)
				} else {
					consultaFiltro = true
				}

				if(condicionFieldsFechas) {
					rangofechasFiltro = (
						(moment(v.fechaDesde).format('DD') <= (moment(i.consulta.fecha).format('DD')) && 
						(moment(i.consulta.fecha).format('DD')  <= moment(v.fechaHasta).format('DD')) && 

						moment(v.fechaDesde).format('MM') <= (moment(i.consulta.fecha).format('MM')) && 
						(moment(i.consulta.fecha).format('MM')  <= moment(v.fechaHasta).format('MM')) && 

						moment(v.fechaDesde).format('YYYY') <= (moment(i.consulta.fecha).format('YYYY')) && 
						(moment(i.consulta.fecha).format('YYYY')  <= moment(v.fechaHasta).format('YYYY')))
					)
				} else {
					rangofechasFiltro = true	
				}

				if(condicionFieldsPaciente) {
					pacienteFiltro = (
						(i.paciente.nroDocumento.match(v.nroDocumento_paciente) &&
						i.paciente.id_tipoDocumento.toString().match(v.id_tipoDocumento_paciente) &&
						i.paciente.nombres.match(v.nombres_paciente) &&
						i.paciente.apellidos.match(v.apellidos_paciente))
					)
				} else {
					pacienteFiltro = true
				}

				
				if(condicionFieldsMedico) {
					medicoFiltro = (
						i.personal.nroDocumento.match(v.nroDocumento_medico) &&
						i.personal.id_tipoDocumento.toString().match(v.id_tipoDocumento_medico) &&
						i.personal.nombres.match(v.nombres_medico) &&
						i.personal.apellidos.match(v.apellidos_medico)
					)
				} else {
					medicoFiltro = true
				}
				console.log('pacienteFiltro --------->')
				console.log(pacienteFiltro)

				return (
					// moment(i.consulta.fecha).format('DD-MM-YYY') == moment(v.fechaDesde).format('DD-MM-YYY') &&
					
					consultaFiltro &&
					
					rangofechasFiltro &&		

					// Datos paciente.
					pacienteFiltro &&

					// Datos Médico
					medicoFiltro
				)

			})

			return pacientes
		}
	}
}

const form = reduxForm({
  form: 'FiltrosAppPacientes'
})

const selector = formValueSelector('FiltrosAppPacientes')

export default connect(mapStateToProps, mapDispatchToProps)(form(FiltrosApp))







