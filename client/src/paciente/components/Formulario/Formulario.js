import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectAreas from '../../../area/components/FieldSelectAreas'
import FieldSelectCiudadesContainer from '../../../ciudad/components/FieldSelectCiudades'

import FormularioContainer from '../../../ciudad/components/Formulario'

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
	}

	componentWillMount() {
		this.props.listarAreas()
		this.props.listarCiudades()
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

	renderFormulario(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			const { handleSubmit, pristine, reset, submitting } = this.props		

			return <form onSubmit={handleSubmit(this.enviarFormulario)}>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-7 col-lg-7 col-centered'>
						<div className='row'>
							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
								<Field name='nroDocumento' type='text' component={renderField} label='Número de documento'/>
								<Field name='nombres' type='text' component={renderField} label='Nombres'/>
								<Field name='sexo' type='radio' component={this.renderFieldRadio} value='masculino' label='Masculino'/>
								<Field name='sexo' type='radio' component={this.renderFieldRadio} value='femenino' label='Femenino'/>
								<Field name='direccion' type='text' component={renderField} label='Dirección'/>
								<Field name='celular' type='text' component={renderField} label='Celular'/>
								<Field name='id_area' type='text' component={FieldSelectAreas} listaAreas={this.props.listaAreas} label='Area:'/>
							</div>

							<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
								<Field name='id_tipoDocumento' type='text' component={renderField} label='Tipo de documento'/>
								<Field name='apellidos' type='text' component={renderField} label='Apellidos'/>
								<Field name='fechaNacimiento' type='date' component={renderField} label='Fecha de nacimiento'/>
								<Field name='telefono' type='text' component={renderField} label='Telefono'/>
								<Field name='id_ciudad' type='text' component={FieldSelectCiudadesContainer} listaCiudades={this.props.listaCiudades} label='Ciudad:'/>
							</div>
						</div>

						<div className='row row end-lg end-md end-sm end-xs'>
							<div className='col-xs-12 col-sm-12 col-md-7 col-lg-7'>
								<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
								<button type="button" onClick={ this.props.cerrarFormularioPaciente } className="btn btn-primary btn-space">Cancelar</button>
							</div>
						</div>

					</div>
				</div>
			</form>
		}
	}

	enviarFormulario(formProps) {
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarPaciente(formProps)
		} else {
			this.props.crearPaciente(formProps)
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '100vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, error, cargando, paciente 
		} = this.props.formulario

		let Error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario paciente</h4>

					<FormularioContainer/>

					<MensajeOerror error={Error} mensaje={null}/>

					{ this.renderFormulario(cargando) }

				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
