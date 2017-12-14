import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className='form-group'>
		<label htmlFor={label}>{label}</label>
		<input {...input} placeholder={label} type={type} className="form-control"/>
    </div>
	{ touched && ((error && <p className="text-danger text-center">{ error }</p>)) }
  </div>
)

class Autenticar extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderFormulario = this.renderFormulario.bind(this)
	}

	enviarFormulario(formProps) {
		this.props.autenticarPersonal(formProps)
	}


	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4 col-centered'>
					<form onSubmit={handleSubmit(this.enviarFormulario)}>
						<Field name="correo" type="email" component={renderField} label="Correo"/>
						<Field name="contrasena" type="password" component={renderField} label="Contraseña"/>
					
						<div className='row end-lg end-md end-sm end-xs'>
							<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4'>
								<button className='btn btn-success text-right' type="submit" disabled={submitting}>Enviar</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		}
	}



	render() {
		const { cargando, error } = this.props.autenticacion
		
		// console.log(this.props.autenticacion)

		return <div className='container'>

			<MensajeOerror error={error} mensaje={null}/>
			<br/>
			{ this.renderFormulario(cargando) }
			
		</div>
	}
}

export default Autenticar