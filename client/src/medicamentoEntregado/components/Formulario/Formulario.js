import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'

import FieldSelectPacientesContainer from '../../../paciente/components/FieldSelectPacientes'

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

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarPacientesFuncion()
	}

	enviarFormulario(formProps) {
		// Obtenemos el id del personal logeado.
		formProps.id_personal = this.personalLocalSt.id_personal

		formProps.id_paciente = formProps.id_paciente[0]

		console.log(formProps)
		if(this.props.editarContenido) {
			this.props.editarMedicamentoEntregado(formProps)
		} else {
			this.props.crearMedicamentoEntregado(formProps)
		}
	}

	renderFormulario(cargando) {
		const { handleSubmit, pristine, reset, submitting } = this.props		

		if(cargando) {
			return <Cargando/>
		} else {
			// console.log(this.props.valoresFiltro)

			return <div>
				<form onSubmit={handleSubmit(this.enviarFormulario)}>
					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-3 col-lg-2'>
							<Field name='nroDocumento' type='text' component={renderField} label='Nro de documento'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-3 col-lg-2'>
							<Field name='id_tipoDocumento' type='text' component={renderField} label='Tipo de documento'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-3 col-lg-2'>
							<Field name='nombres' type='text' component={renderField} label='Nombres'/>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-3 col-lg-2'>
							<Field name='apellidos' type='text' component={renderField} label='Apellidos'/>
						</div>
					</div>
					
					<br/>
					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							<Field name='id_paciente' 
								type='text'
								listar = { this.props.listarPacientes }
								valoresFiltro = { this.props.valoresFiltro }
								component={FieldSelectPacientesContainer} label='Paciente'/>
						</div>
					</div>
					
					
					<br/>
					<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
					<button type="button" onClick={ this.props.cerrarFormularioMedicamentoEntregado } className="btn btn-primary btn-space">Cancelar</button>
													
				</form>
			</div>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '65vh',
		  		position: 'none'
		  	}
		}
		
		const { 
			abirtoCrear, abirtoEditar, cargando, nivel 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container'>
					<h4 className='text-center'>Formulario medicamento entregado</h4>

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
