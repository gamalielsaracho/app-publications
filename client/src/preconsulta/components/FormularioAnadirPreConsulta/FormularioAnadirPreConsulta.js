import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

// NIVEL.
import FieldSelectNivelesContainer from '../../../nivel/components/FieldSelectNiveles'
import FormularioNivelContainer from '../../../nivel/components/Formulario'


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

class FormularioAnadirPreConsulta extends Component {
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
		let datosToken = this.props.datosToken

		formProps.fecha = new Date()
		formProps.id_paciente = datosCita.paciente.id_paciente
		formProps.id_personal = datosToken.personal.id_personal

		// Para la ruta que redirecciona a la pre-consulta creada.
		formProps.id_cita = datosCita.cita.id_cita

		console.log(formProps)

		// console.log(this.props.personal)

		if(this.props.editarContenido) {
			this.props.editarPreConsulta(formProps)
		} else {
			this.props.crearPreConsulta(formProps)
		}
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
		
		const { 
			abirtoCrear, abirtoEditar, cargando, rol 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

					
		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario pre-consulta</h4>

					<FormularioNivelContainer/>

					<MensajeOerror error={error} mensaje={null}/>
					{ this.renderCargando(cargando) }

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							
							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								<div className='form-group'>
									<Field name='id_nivel' type='text' component={FieldSelectNivelesContainer} listaNiveles={this.props.listaNiveles} label='Nivel:'/>
								</div>

								<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
								<button type="button" onClick={ this.props.cerrarFormularioPreConsulta } className="btn btn-primary btn-space">Cancelar</button>
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

export default FormularioAnadirPreConsulta
