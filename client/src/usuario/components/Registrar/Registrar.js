import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type}/>
      { touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


class Registrar extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderError = this.renderError.bind(this)
	}

	enviarFormulario(formProps) {
		this.props.registrarUsuario(formProps)
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
		const { cargando, mensaje, error } = this.props.registro
		
		console.log(this.props.registro)
		return <div className='container'>
			<br/>
			<div className='row center-lg'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
				{ this.renderCargando(cargando) }
				{ this.renderError(error) }
				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					<Field name="nombre" type="text" component={renderField} label="Nombre"/>
					<Field name="apellido" type="text" component={renderField} label="Apellido"/>
					<Field name="correo" type="text" component={renderField} label="Correo"/>
					<Field name="contrasena" type="password" component={renderField} label="Contraseña"/>
				
					<button className='right red accent-3 btn' type="submit" disabled={submitting}>Enviar</button>
				</form>
				</div>
			</div>
		</div>
	}
}

export default Registrar