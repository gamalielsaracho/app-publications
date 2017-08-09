import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input className="form-control" {...input} placeholder={label} type={type}/>
    </div>
    { touched && ((error && <p className="text-danger text-center">{ error }</p>)) }
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
		this.props.registrarPersonal(formProps)
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

			{ this.renderCargando(cargando) }
			{ this.renderError(error) }
			<form onSubmit={handleSubmit(this.enviarFormulario)}>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-3'>
						<Field name="nroDocumento" type="text" component={renderField} label="Numero de documento"/>
						<Field name="id_especialidad" type="text" component={renderField} label="Especialidades"/>
						<Field name="id_rol" type="text" component={renderField} label="Rol"/>
						<Field name="nombres" type="text" component={renderField} label="Nombres"/>
						<Field name="apellidos" type="text" component={renderField} label="Apellidos"/>
						<Field name="id_ciudad" type="text" component={renderField} label="Ciudad"/>
						<Field name="correo" type="text" component={renderField} label="Correo"/>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-3'>
						<Field name="id_tipoDocumento" type="text" component={renderField} label="Tipo documento"/>
						<Field name="nroRegistro" type="text" component={renderField} label="Numero de registro"/>
						<Field name="telefono" type="text" component={renderField} label="Telefono"/>
						<Field name="celular" type="text" component={renderField} label="Celular"/>
						<Field name="direccion" type="text" component={renderField} label="Dirección"/>
						<Field name="fecha_nacimiento" type="date" component={renderField} label="Fecha de nacimiento"/>
						<Field name="contrasena" type="text" component={renderField} label="Contraseña"/>
					</div>
				</div>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-3'>
						<button className='right red accent-3 btn' type="submit" disabled={submitting}>Enviar</button>
					</div>
				</div>
			</form>
		</div>
	}
}

export default Registrar