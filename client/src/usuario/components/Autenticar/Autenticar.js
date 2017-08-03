import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
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
		this.props.autenticarUsuario(formProps)
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
			<div className='row center-lg center-md center-sm center-xs'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
				{ this.renderCargando(cargando) }
				{ this.renderError(error) }
				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					<Field name="correo" type="text" component={renderField} label="Correo"/>
					<Field name="contrasena" type="password" component={renderField} label="Contraseña"/>
				
					<button className='right red accent-3 btn' type="submit" disabled={submitting}>Enviar</button>
				</form>
				</div>
			</div>
		</div>
	}
}

export default Autenticar