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
    		nroDocumento_paciente: selector(state, 'nroDocumento_paciente') || '',
			id_tipoDocumento_paciente: selector(state, 'id_tipoDocumento_paciente') || '',
			nombres_paciente: selector(state, 'nombres_paciente') || '',
			apellidos_paciente: selector(state, 'apellidos_paciente') || '',
			sexo: selector(state, 'sexo') || '',
			fechaNacimiento_paciente: selector(state, 'fechaNacimiento_paciente') || '',
			direccion_paciente: selector(state, 'direccion_paciente') || '',


			fechaMuerte_paciente: selector(state, 'fechaMuerte_paciente') || '',
			id_area: selector(state, 'id_area') || '',
			id_ciudad: selector(state, 'id_ciudad') || '',
			fechaIngresoDesde_paciente: selector(state, 'fechaIngresoDesde_paciente') || '',
			
			
			fechaIngresoHasta_paciente: selector(state, 'fechaIngresoHasta_paciente') || ''
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
		// nroDocumento_paciente
		// id_tipoDocumento_paciente
		// nombres_paciente
		// apellidos_paciente
		// sexo
		// fechaNacimiento_paciente
		// direccion_paciente
		// fechaMuerte_paciente
		// id_area
		// id_ciudad
		// fechaIngresoDesde_paciente
		// fechaIngresoHasta_paciente

		pacientesFiltradosEnGeneral: (pacientes, v) => {
			// console.log("Entro en EnGeneral ............")
			// console.log(v)

			let condicionDatosPersonalesPaciente
			let DatosPersonalesPacienteFiltro

			let condicionRangoFechasIngreso
			let rangoFechasIngresoFiltro

			let condicionFieldsPaciente
			let pacienteFiltro

			let condicionFieldsMedico
			let medicoFiltro


			condicionDatosPersonalesPaciente = (				
				v.nroDocumento_paciente.length > 0 ||
				v.id_tipoDocumento_paciente.length > 0 ||
				v.nombres_paciente.length > 0 ||
				v.apellidos_paciente.length > 0 ||
				v.sexo.length > 0 ||
				v.fechaNacimiento_paciente.length > 0 ||
				v.direccion_paciente.length > 0 ||
				v.fechaMuerte_paciente.length > 0 ||
				v.id_area.length > 0 ||
				v.id_ciudad.length > 0
			)

			condicionRangoFechasIngreso = (
				v.fechaIngresoDesde_paciente ||
				v.fechaIngresoHasta_paciente
			)


			pacientes = pacientes.filter((i) => {
				if(i.pa.fechaMuerte == null) {
					i.pa.fechaMuerte = ''
				}

				if(i.pa.nroDocumento == null) {
					i.pa.nroDocumento = ''
				}

				if(i.pa.id_tipoDocumento == null) {
					i.pa.id_tipoDocumento = ''
				}

				if(condicionDatosPersonalesPaciente) {
					DatosPersonalesPacienteFiltro = (
						i.pa.nroDocumento.toString().match(v.nroDocumento_paciente) &&
						i.pa.id_tipoDocumento.toString().match(v.id_tipoDocumento_paciente) &&
						
						i.pa.nombres.toString().match(v.nombres_paciente) &&
						i.pa.apellidos.toString().match(v.apellidos_paciente) &&
						i.pa.sexo.toString().match(v.sexo) &&
						i.pa.fechaNacimiento.toString().match(v.fechaNacimiento_paciente) &&
						i.pa.direccion.toString().match(v.direccion_paciente) &&
						i.pa.fechaMuerte.toString().match(v.fechaMuerte_paciente) &&
						i.pa.id_area.toString().match(v.id_area) &&
						i.pa.id_ciudad.toString().match(v.id_ciudad)
					)
				} else {
					DatosPersonalesPacienteFiltro = true
				}

				if(condicionRangoFechasIngreso) {
					rangoFechasIngresoFiltro = (
						(moment(v.fechaIngresoDesde_paciente).format('DD') <= (moment(i.pa.fecha).format('DD')) && 
						(moment(i.pa.fecha).format('DD')  <= moment(v.fechaIngresoHasta_paciente).format('DD')) && 

						moment(v.fechaIngresoDesde_paciente).format('MM') <= (moment(i.pa.fecha).format('MM')) && 
						(moment(i.pa.fecha).format('MM')  <= moment(v.fechaIngresoHasta_paciente).format('MM')) && 

						moment(v.fechaIngresoDesde_paciente).format('YYYY') <= (moment(i.pa.fecha).format('YYYY')) && 
						(moment(i.pa.fecha).format('YYYY')  <= moment(v.fechaIngresoHasta_paciente).format('YYYY')))
					)
				} else {
					rangoFechasIngresoFiltro = true	
				}
				

				console.log('pacienteFiltro --------->')
				console.log(pacienteFiltro)

				return (
					// moment(i.consulta.fecha).format('DD-MM-YYY') == moment(v.fechaIngresoDesde_paciente).format('DD-MM-YYY') &&
					
					DatosPersonalesPacienteFiltro &&
					rangoFechasIngresoFiltro
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







