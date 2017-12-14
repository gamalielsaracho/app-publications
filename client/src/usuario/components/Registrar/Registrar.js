// --------------------
import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectEspecialidadesContainer from '../../../especialidades/components/FieldSelectEspecialidades'

class Registrar extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderFormulario = this.renderFormulario.bind(this)

		this.renderFieldSelectRol = this.renderFieldSelectRol.bind(this)
		this.renderFieldInput = this.renderFieldInput.bind(this)

		this.getTypeInput = this.getTypeInput.bind(this)

	}

	getTypeInput() {
		if(this.props.editarContenido) {
			return 'text'
		} else {
			return 'password'
		}
	}

	enviarFormulario(formProps) {				
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarPersonal(formProps)
		} else {
			this.props.registrarPersonal(formProps)
		}
	}

	componentWillMount() {
		this.props.listarEspecialidadesFuncion()
		this.props.listarRoles()
	}

	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <form onSubmit={handleSubmit(this.enviarFormulario)}>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-7 col-lg-7 col-centered'>
						<div className='row'>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
								<Field name="nroDocumento" type="number" component={this.renderFieldInput} label="Numero de documento"/>
								<Field name='id_especialidad' type='text' 
									component={FieldSelectEspecialidadesContainer} 
									listar={this.props.listarEspecialidades} 
									label='Especialidad'
									showBtnAdd={true}/>
								
								<Field name="id_rol" type="text" component={this.renderFieldSelectRol} listaRoles={this.props.listaRoles} label="Roles"/>
								<Field name="nombres" type="text" component={this.renderFieldInput} label="Nombres"/>
								<Field name="apellidos" type="text" component={this.renderFieldInput} label="Apellidos"/>
								<Field name="correo" type="email" component={this.renderFieldInput} label="Correo"/>
							</div>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
								<Field name="id_tipoDocumento" type="text" component={this.renderFieldInput} label="Tipo documento"/>
								<Field name="nroRegistro" type="number" component={this.renderFieldInput} label="Numero de registro"/>
								<Field name="telefono" type="number" component={this.renderFieldInput} label="Telefono"/>
								<Field name="celular" type="number" component={this.renderFieldInput} label="Celular"/>
								<Field name="direccion" type="text" component={this.renderFieldInput} label="Dirección"/>
								<Field name="fecha_nacimiento" type="date" component={this.renderFieldInput} label="Fecha de nacimiento"/>
								<Field name="contrasena" type={this.getTypeInput()} component={this.renderFieldInput} label="Contraseña"/>
							</div>
						</div>
					
						<div className='row row end-lg end-md end-sm end-xs'>
							<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
							<button type="button" onClick={ this.props.cerrarFormularioPersonal } className="btn btn-primary btn-space">Cancelar</button>
						</div>
					</div>
				</div>
			</form>
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

	render() {
		const customStyles = {
		    content : {
		  		height: '95vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, personal 
		} = this.props.formulario

		const { cargando } = this.props.crear


		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					contentLabel="Minimal Modal Example"
					style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario Personal</h4>

					<MensajeOerror error={error} mensaje={null}/>
					
					{ this.renderFormulario(cargando) }
				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Registrar
