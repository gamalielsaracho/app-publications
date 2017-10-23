import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'
import CalendarioCitaContainer from '../Calendario'

import FieldSelectPacientesContainer from '../../../paciente/components/FieldSelectPacientes'

import FieldSelectEspecialidadesContainer from '../../../especialidades/components/FieldSelectEspecialidades'

import FieldSelectPesonalesContainer from '../../../usuario/components/FieldSelectPesonales'

const renderField = ({ input, nombreNodo, disabledVar, label, type, meta: { touched, error, warning } }) => (  
  <div>
	<div className="form-group">
		{ console.log(nombreNodo) }
	 	<label htmlFor={label}>{label}</label>
    	<input className='form-control' disabled={disabledVar} className={nombreNodo+' form-control'} {...input} placeholder={label} type={type}/>
	</div>
    { touched && ((error && <label className="text-danger">{ error }</label>)) }
  </div>
)

class Formulario extends Component {
	constructor(props) {
		super(props)
		this.enviarFormulario = this.enviarFormulario.bind(this)
		this.renderCargando = this.renderCargando.bind(this)
	}

	componentWillMount() {
		this.props.listarEspecialidadesFuncion()
		this.props.listarMedicosFuncion()
		this.props.listarPacientesFuncion()
	}

	enviarFormulario(formProps) {		
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarCita(formProps)
		} else {
			formProps.id_paciente = formProps.id_paciente[0]
			formProps.id_personal = formProps.id_personal[0]

			this.props.crearCita(formProps)
		}
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	render() {

		// console.log(this.props.fechaOtenida)
		const customStyles = {
		    content : {
		  		height: '95vh',
		  		position: 'none'
		  	}
		}

		const { handleSubmit, fieldDisabled, pristine, reset, submitting } = this.props		
		
		const { 
			abirtoCrear, abirtoEditar, cargando, cita 
		} = this.props.formulario

		let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


		let abierto = abirtoEditar ? abirtoEditar : abirtoCrear

		if(abierto) {
			return <ReactModal isOpen={abierto}
					       	contentLabel="Minimal Modal Example"
					       	style={customStyles}>

				<div className='container-fluit'>
					<h4 className='text-center'>Formulario cita</h4>

					<div className='row'>
						<MensajeOerror error={error} mensaje={null}/>
						{ this.renderCargando(cargando) }

						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							<CalendarioCitaContainer 
								citas = {this.props.listaCitasEditedAndFilter(this.props.listar.citas, this.props.valoresFiltro)}
								valoresFiltro={this.props.valoresFiltro}/>
						</div>

						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							<form onSubmit={handleSubmit(this.enviarFormulario)}>
									
								<div className='row'>
									<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
										<Field disabledVar={false} name='nroDocumento' type='text' component={renderField} label='Nro de documento'/>
									</div>
									<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
										<Field disabledVar={false} name='id_tipoDocumento' type='text' component={renderField} label='Tipo de documento'/>
									</div>
								</div>

								<div className='row'>
									<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
										<Field disabledVar={false} name='nombres' type='text' component={renderField} label='Nombres'/>
									</div>
									<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
										<Field disabledVar={false} name='apellidos' type='text' component={renderField} label='Apellidos'/>
									</div>
								</div>

								<br/>
								<div className='row'>
									<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
										<Field name='id_paciente' 
											type='text'
											listar = { this.props.listarPacientes }
											valoresFiltro = { this.props.valoresFiltro }
											component={FieldSelectPacientesContainer} label='Paciente'/>
									</div>
								</div>

								<div className='row'>
									<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
										<Field name='id_especialidad' type='text' 
											component={FieldSelectEspecialidadesContainer} 
											listar={this.props.listarEspecialidades} 
											label='Especialidad'
											showBtnAdd={false}/>
									</div>
									<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
										<Field name='id_personal' valoresFiltro={this.props.valoresFiltro} 
											type='text' component={FieldSelectPesonalesContainer} 
											listar={this.props.listarMedicos} 
											label='Profesionales'/>
									</div>
								</div>

								
								<div className='row'>
									<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4'>
										<Field disabledVar={false} nombreNodo='fechaNodo' name='fecha' type='text' component={renderField} label='Fecha'/>
									</div>
									<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4'>
										<Field disabledVar={false} nombreNodo='horaInicioNodo' name='start' type='text' component={renderField} label='Hora inicio'/>
									</div>
									<div className='col-xs-12 col-sm-6 col-md-4 col-lg-4'>
										<Field disabledVar={false} nombreNodo='horaFinNodo' name='end' type='text' component={renderField} label='Hora fin'/>
									</div>
								</div>

								<button type="submit" className="btn btn-info btn-space" disabled={pristine || submitting}>Guardar</button>
								<button type="button" onClick={ this.props.cerrarFormularioCita } className="btn btn-primary btn-space">Cancelar</button>
							</form>
						</div>

					</div>

				</div>
			</ReactModal>
		} else {
			return <span></span>
		}
														
								// <h3>Fecha: <strong className='fechaNodo'></strong></h3>
								// <h3>Hora: <strong className='horaInicioNodo'></strong></h3>
	}
}

export default Formulario
