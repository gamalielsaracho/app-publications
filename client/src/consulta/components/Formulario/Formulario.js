import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

// DIAGNOSTICO.
import FieldSelectDiagnosticosContainer from '../../../diagnostico/components/FieldSelectDiagnosticos'
import FormularioDiagnosticoContainer from '../../../diagnostico/components/Formulario'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className="form-control" {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class Formulario extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderFieldTextArea = this.renderFieldTextArea.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarDiagnosticos()
	}

	enviarFormulario(formProps) {				
		formProps.fecha = new Date()

		formProps.id_preconsulta = parseInt(this.props.idPreConsulta)
		// El id del personal Logeado (Médico/a).
		formProps.id_personal = this.personalLocalSt.id_personal

		formProps.id_paciente = this.props.datosCita.cita.id_paciente

		// Para pasarle a push y redireccionar a la consulta creada.
		formProps.id_cita = this.props.datosCita.cita.id_cita

		// console.log(formProps)
		
		if(this.props.editarContenido) {
			this.props.editarConsulta(formProps)
		} else {
			this.props.crearConsulta(formProps)
		}
	}

	renderFieldTextArea({ input, label, type, meta: { touched, error, warning } }) {
		return <div>
			<div className="form-group">
			 	<label htmlFor={label}>{label}</label>
		    	<textarea className="form-control" {...input} placeholder={label} type={type}>
		    	</textarea>
			</div>
		    { touched && ((error && <label className="text-danger">{ error }</label>)) }
		</div>
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
		  		height: '50vh',
		  		position: 'none'
		  	}
		}

		const { handleSubmit, pristine, reset, submitting } = this.props		
		
		const { 
			abirtoCrear, abirtoEditar, cargando, consulta 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario consulta</h4>

					<MensajeOerror error={error} mensaje={null}/>
					<div className='row'>
						{ this.renderCargando(cargando) }

						<FormularioDiagnosticoContainer/>

						<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								<div className='row'>
									<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
										<Field name='id_diagnostico' type='text'
											component={FieldSelectDiagnosticosContainer}
											listaDiagnosticos={this.props.listaDiagnosticos}
											label='Diagnóstico'/>
										<Field name='observacionDiagnostico' type='text' component={this.renderFieldTextArea} label='Observaciones'/>
									</div>
									<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
										<Field name='fechaProximaConsulta' type='date' component={renderField} label='Fecha próxima consulta'/>
									</div>
								</div>
								
								<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
								<button type="button" onClick={ this.props.cerrarFormularioConsulta } className="btn btn-primary btn-space">Cancelar</button>
							</form>
						</div>
					</div>
				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
