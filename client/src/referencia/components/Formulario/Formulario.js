import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

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
		this.renderCheckbox = this.renderCheckbox.bind(this)
	}


	enviarFormulario(formProps) {

		// idParametroAnalisis es pasado como property al ser llamado dentro 
		// de ListarReferenciasContainer.
		formProps.id_parametroAnalisis = this.props.idParametroAnalisis

		if(!(formProps.sexo == 'masculino') && !(formProps.sexo == 'femenino')) {
			formProps.general = true
			formProps.sexo = ''
		} else {
			formProps.general = false
		}

		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarReferencia(formProps)
		} else {
			this.props.crearReferencia(formProps)
		}
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

	renderCheckbox({ input, name, label, type, value, meta: { touched, error, warning } }) {
		return <div>
			<div className='form-group'>
			    <input type={type} name={name} value={value} {...input}/>
				<strong>{label}</strong>
				{ touched && ((error && <label className="text-danger">{ error }</label>)) }
			</div>
		</div>
	}

	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			return <div>
				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
							<Field name='diasMaximos' type='text' component={renderField} label='Días máximos'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
							<Field name='mesesMaximos' type='text' component={renderField} label='Meses máximos'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
							<Field name='anosMaximos' type='text' component={renderField} label='Años máximos'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
							<Field name='superior' type='text' component={renderField} label='Valor superior'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
							<Field name='inferior' type='text' component={renderField} label='Valor inferior'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
							<Field name='diasMinimos' type='text' component={renderField} label='Días mínimos'/>
						</div>
					</div>
					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
							<Field name='mesesMinimos' type='text' component={renderField} label='Meses mínimos'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
							<Field name='anosMinimos' type='text' component={renderField} label='Años mínimos'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-4 col-lg-2'>
							<Field name='sexo' type='radio' component={this.renderFieldRadio} value='masculino' label='Masculino'/>
							<Field name='sexo' type='radio' component={this.renderFieldRadio} value='femenino' label='Femenino'/>
							<Field name='sexo' type='radio' component={this.renderFieldRadio} value='true' label='Ambos'/>
						</div>
					</div>
																	
					<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
					<button type="button" onClick={ this.props.cerrarFormularioReferencia } className="btn btn-primary btn-space">Cancelar</button>
				</form>
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
			abirtoCrear, abirtoEditar, cargando, parametroPreConsulta 
		} = this.props.formulario
		
		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 

		console.log(error)

		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>
				<div className='container'>
					<div className='row'>
						<MensajeOerror error={error} mensaje={null}/>
					</div>
					{ this.renderFormulario(cargando) }
				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
	}
}

export default Formulario
