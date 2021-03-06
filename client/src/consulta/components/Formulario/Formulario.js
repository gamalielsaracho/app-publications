import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

// NIVEL.
import FieldSelectNivelesContainer from '../../../nivel/components/FieldSelectNiveles'


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
		this.renderFormulario = this.renderFormulario.bind(this)
		this.renderFieldTextArea = this.renderFieldTextArea.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarNivelesFuncion()
	}

	enviarFormulario(formProps) {
		if(this.props.editarContenido) {
			console.log(formProps)
			this.props.editarConsulta(formProps)
		} else {
			// LAS CONSULTAS SOLO SE PODRÁN CREAR
			// ÚNICAMENTE SI SE ESTÁ PARADO DENTRO DE UNA PRE-CONSULTA
			// DE LO CONTRARIO NO DARÁ LA OPCIÓN DE CREAR.  
			let datosPreConsulta = this.props.preConsulta.preconsulta
				
			// console.log('los datos de la preConsulta SON ----->')
			// console.log(datosPreConsulta)

			formProps.id_paciente = datosPreConsulta.id_paciente

			formProps.id_preconsulta = parseInt(this.props.idPreConsulta)
			
			// El id del personal Logeado (Médico/a).
			formProps.id_personal = this.personalLocalSt.id_personal

			console.log('formProps ---------->')
			console.log(formProps)
			
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


	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					<form onSubmit={handleSubmit(this.enviarFormulario)}>
						<div className='row'>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
								<Field name='fechaProximaConsulta' type='date' component={renderField} label='Fecha próxima consulta'/>
							</div>

							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
								<Field name='id_nivel' type='text' 
									component={FieldSelectNivelesContainer}
									listar={this.props.listarNiveles} 
									label='Nivel:'
									showBtnAdd={true}/>
							</div>
						</div>
								
						<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
						<button type="button" onClick={ this.props.cerrarFormularioConsulta } className="btn btn-primary btn-space">Cancelar</button>
					</form>
				</div>
			</div>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '50vh',
		  		position: 'none'
		  	}
		}
		
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
					
					{ this.renderFormulario(cargando) }
				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
