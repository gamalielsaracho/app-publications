import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import jwtDecode from 'jwt-decode'

import { browserHistory } from 'react-router'

// LISTA DE PRE-CONSULTAS.
import FieldSelectPreConsultasContainer from '../../../preconsulta/components/FieldSelectPreConsultas'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className="form-control" {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class AnadirPreConsulta extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderCargando = this.renderCargando.bind(this)
	}

	componentWillMount() {
		this.props.listarNiveles()
		this.props.listarPreConsultas()
	}

	enviarFormulario(formProps) {

		let datosCita = this.props.datosCita

		// console.log(datosCita)
		// let datosToken = this.props.datosToken

		formProps.fecha = datosCita.cita.fecha
		// Mal pensado->>>>>
			// Obtenemos el id del personal de enfermería que está 
			// autenticado. 
			// jwtDecode(localStorage.getItem('token')).id_personal
		// Mal pensado->>>>>

		formProps.id_personal = datosCita.personal.id_personal
		formProps.id_paciente = datosCita.paciente.id_paciente
		formProps.id_cita = datosCita.cita.id_cita
		formProps.id_preconsulta = formProps.id_preconsulta[0]

		// formProps.fecha = new Date()
		// formProps.id_paciente = datosCita.paciente.id_paciente
		// formProps.id_personal = datosToken.personal.id_personal

		// Para la ruta que redirecciona a la pre-consulta creada.
		// formProps.id_cita = datosCita.cita.id_cita

		console.log(formProps)

		// console.log(this.props.personal)

		// if(this.props.editarContenido) {
		// 	this.props.editarPreConsulta(formProps)
		// } else {
		// 	this.props.crearPreConsulta(formProps)
		// }
		this.props.editarCita(formProps)

		// this.props.cerrarFormularioAnadirPreConsulta()
		browserHistory.push(`/dashboard/citas/${formProps.id_cita}/preconsulta/${formProps.id_preconsulta}`)

	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '40vh',
		  		position: 'none'
		  	}
		}

		const { handleSubmit, pristine, reset, submitting } = this.props		
							
		return <div className='row'>
			<div className='col-xs-12 col-sm-10 col-md-10 col-lg-12'>
				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					<div className='form-group'>
						<label>Pre-consulta realizada en el día</label>
						<Field name='id_preconsulta' type='text' 
							component={FieldSelectPreConsultasContainer} 
							fechaCita={this.props.datosCita.cita.fecha}
							idPaciente={this.props.datosCita.paciente.id_paciente}
							listaPreConsultas={this.props.listaPreConsultas} label=''/>
					</div>

					<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
					<button type="button" onClick={ this.props.cerrarMostrarCitaAgregarPreConsulta } className="btn btn-primary btn-space">Cancelar</button>
				</form>
			</div>
		</div>			
	}
}

export default AnadirPreConsulta
