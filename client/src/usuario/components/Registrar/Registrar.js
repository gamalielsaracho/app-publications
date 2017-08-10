import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'

class Registrar extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderError = this.renderError.bind(this)

		this.renderFieldSelectEspecialidad = this.renderFieldSelectEspecialidad.bind(this)
		this.renderFieldSelectRol = this.renderFieldSelectRol.bind(this)
		this.renderFieldInput = this.renderFieldInput.bind(this)
	}

	componentWillMount() {
		this.props.listarEspecialidades()
		this.props.listarRoles()
	}

	renderFieldSelectEspecialidad({ input, label, listaEspecialidades, type, meta: { touched, error, warning } }) {
		if(listaEspecialidades.especialidades) {
			return <div>
				<div className='form-group'>
			    	<label htmlFor={label}>{label}</label>
					<select {...input} name={name} className='form-control'>
						<option value=''>Selecionar especialidad</option>
						{
							listaEspecialidades.especialidades.map((especialidad) => {
								return <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
									{ especialidad.descripcion }
								</option>
							})
						}
							
					</select>
				</div>
		    	{ touched && ((error && <p className="text-danger text-center">{ error }</p>)) }
			</div>
		} else {
			return <span></span>
		}
	}

	renderFieldSelectRol({ input, label, listaRoles, type, meta: { touched, error, warning } }) {
		if(listaRoles.roles) {
			return <div>
				<div className='form-group'>
			    	<label htmlFor={label}>{label}</label>
					<select {...input} name={name} className='form-control'>
						<option value=''>Selecionar rol</option>
						{
							listaRoles.roles.map((rol) => {
								return <option key={rol.id_rol} value={rol.id_rol}>
									{ rol.descripcion }
								</option>
							})
						}
							
					</select>
				</div>
		    	{ touched && ((error && <p className="text-danger text-center">{ error }</p>)) }
			</div>
		} else {
			return <span></span>
		}
	}

	renderFieldInput({ input, label, type, meta: { touched, error, warning } }) {
		return <div>
		    <div className="form-group">
		    	<label htmlFor={label}>{label}</label>
		    	<input {...input} placeholder={label} type={type} className="form-control"/>
		    </div>
		    { touched && ((error && <p className="text-danger text-center">{ error }</p>)) }
		</div>
	}

	enviarFormulario(formProps) {
		console.log(formProps)
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
			<br/>
			{ this.renderCargando(cargando) }
			{ this.renderError(error) }
			<form onSubmit={handleSubmit(this.enviarFormulario)}>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-7 col-lg-7 col-centered'>
						<div className='row'>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
								<Field name="nroDocumento" type="text" component={this.renderFieldInput} label="Numero de documento"/>
								<Field name="id_especialidad" type="text" component={this.renderFieldSelectEspecialidad} listaEspecialidades={this.props.listaEspecialidades} label="Especialidades"/>
								<Field name="id_ciudad" type="text" component={this.renderFieldInput} label="Ciudad"/>
								
								<Field name="id_rol" type="text" component={this.renderFieldSelectRol} listaRoles={this.props.listaRoles} label="Roles"/>
								<Field name="nombres" type="text" component={this.renderFieldInput} label="Nombres"/>
								<Field name="apellidos" type="text" component={this.renderFieldInput} label="Apellidos"/>
								<Field name="correo" type="text" component={this.renderFieldInput} label="Correo"/>
							</div>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
								<Field name="id_tipoDocumento" type="text" component={this.renderFieldInput} label="Tipo documento"/>
								<Field name="nroRegistro" type="text" component={this.renderFieldInput} label="Numero de registro"/>
								<Field name="telefono" type="text" component={this.renderFieldInput} label="Telefono"/>
								<Field name="celular" type="text" component={this.renderFieldInput} label="Celular"/>
								<Field name="direccion" type="text" component={this.renderFieldInput} label="Dirección"/>
								<Field name="fecha_nacimiento" type="date" component={this.renderFieldInput} label="Fecha de nacimiento"/>
								<Field name="contrasena" type="password" component={this.renderFieldInput} label="Contraseña"/>
							</div>
						</div>
					
						<div className='row row end-lg end-md end-sm end-xs'>
							<div className='col-xs-12 col-sm-12 col-md-7 col-lg-7'>
								<button className='btn btn-success' type="submit" disabled={submitting}>Enviar</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<br/>
		</div>
	}
}

export default Registrar