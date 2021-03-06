import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

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
		this.renderFieldRadio = this.renderFieldRadio.bind(this)

		this.renderInputsByRol = this.renderInputsByRol.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	enviarFormulario(formProps) {				
		// urls es pasado como property al ser llamado
		// lo cual tiene todos los parametros de la url para obtener 
		// id_consulta y poder guardarlo.

		if(this.props.editarContenido) {
			this.props.editarAnalisisSolicitado(formProps)
		} else {
			formProps.id_consulta = this.props.urls.idConsulta
			this.props.crearAnalisisSolicitado(formProps)
		}

		// console.log(formProps)
	}

	renderFieldRadio({ input, name, label, type, value, meta: { touched, error, warning } }) {
		return <div>
			<div className='form-group'>
				<label className="radio-inline">
			    	<input type={type} name={name} value={value} {...input}/>
					<strong>{label}</strong>
				</label>
				{ touched && ((error && <label className="text-danger">{ error }</label>)) }
			</div>
		</div>
	}

	renderInputsByRol() {
		let rol = removeAccents(this.personalLocalSt.rol)

		if(rol == 'administracion') {
			return <div>
				<Field name='fechaArealizar' type='date' component={renderField} label='Fecha a realizar'/>
				<Field name='pendiente' type='radio' component={this.renderFieldRadio} value='1' label='Pendiente'/>
				<Field name='pendiente' type='radio' component={this.renderFieldRadio} value='0' label='Realizado'/>
			</div>
		} else {
			if(rol == 'laboratorio') {
				return <div>
					<Field name='pendiente' type='radio' component={this.renderFieldRadio} value='1' label='Pendiente'/>
					<Field name='pendiente' type='radio' component={this.renderFieldRadio} value='0' label='Realizado'/>
				</div>
			} else {
				return <div>
					<Field name='fechaArealizar' type='date' component={renderField} label='Fecha a realizar'/>
				</div>
			}
		}
	}

	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
					<form onSubmit={handleSubmit(this.enviarFormulario)}>
						{ this.renderInputsByRol() }

						<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
						<button type="button" onClick={ this.props.cerrarFormularioAnalisisSolicitado } className="btn btn-primary btn-space">Cancelar</button>
					</form>
				</div>
			</div>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '40vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, cargando, analisisSolicitado 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario Solicitud laboratorio</h4>

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
