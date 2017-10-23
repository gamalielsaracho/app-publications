import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'

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
		this.renderCargando = this.renderCargando.bind(this)
		this.renderError = this.renderError.bind(this)
	}

	enviarFormulario(formProps) {
		this.props.autenticarPersonal(formProps)
	}

	renderCargando(cargando) {
		if(cargando) {
			return <div>
				<h5>Cargando...</h5>
			</div>
		} else {
			return <span></span>
		}
	}

	renderError(error) {
		if(error) {
			return <div>
				<h5>{ error }</h5>
			</div>
		} else {
			return <span></span>
		}
	}

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props
		const { cargando, mensaje, error } = this.props.autenticacion
		
		console.log(this.props.autenticacion)
		return <div className='container'>
			<br/>
			<div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4 col-centered'>
					{ this.renderCargando(cargando) }
					{ this.renderError(error) }
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
			<br/>
		</div>
	}
}

export default Autenticar