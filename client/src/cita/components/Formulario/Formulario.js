import React, { Component } from 'react'
import { Field, reset } from 'redux-form'
import ReactModal from 'react-modal'

import _ from 'lodash'

import Cargando from '../../../app/components/Cargando'

import MensajeOerror from '../../../app/components/MensajeOerror'
import CalendarioCitaContainer from '../Calendario'

import FieldSelectEspecialidadesContainer from '../../../especialidades/components/FieldSelectEspecialidades'

import FieldSelectPesonales from '../../../usuario/components/FieldSelectPesonales'

const renderField = ({ input, nombreNodo, label, type, meta: { touched, error, warning } }) => (
  
  <div>
	<div className="form-group">
	 	<label htmlFor={label}>{label}</label>
    	<input className={nombreNodo} {...input} placeholder={label} type={type}/>
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
		this.props.listarEspecialidades()
		this.props.listarPersonales()
	}

	enviarFormulario(formProps) {		
		console.log(formProps)

		if(this.props.editarContenido) {
			this.props.editarCita(formProps)
		} else {
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
		  		height: '90vh',
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

				<div className='container'>
					<h4 className='text-center'>Formulario cita</h4>

					<div className='row'>
						<MensajeOerror error={error} mensaje={null}/>
						{ this.renderCargando(cargando) }

						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>

							<CalendarioCitaContainer citas= {[
								{
				                    title: 'Pedro Raul',
				                    start: '2017-08-21T08:00:00',
				                    end: '2017-08-21T08:30:00',
				                    allDay: false
				                },
				                {
				                    title: 'Rie Motomori',
				                    start: '2017-08-23',
				                    // end: new Date(y, m, 1, 9, 00),
				                    allDay: false
				                },
				                {
				                    title: 'Gamaliel Saracho',
				                    start: '2017-08-23T08:00:00',
				                    end: '2017-08-23T08:30:00',
				                    allDay: false
				                }
							]}/>
							
						</div>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							<form onSubmit={handleSubmit(this.enviarFormulario)}>
								<Field name='id_especialidad' type='text' component={FieldSelectEspecialidadesContainer} listaEspecialidades={this.props.listaEspecialidades} label='Especialidad'/>
								
								<Field name='id_personal' valoresFiltro={this.props.valoresFiltro} type='text' component={FieldSelectPesonales} listaPesonales={this.props.listaPesonales} label='Profesionales'/>
								<h3>Fecha: <strong className='fechaNodo'></strong></h3>
								<h3>Hora: <strong className='horaInicioNodo'></strong></h3>
								
								
								<h1>Especialidad: { this.props.valoresFiltro.id_especialidad }</h1>
								<h1>Médico/a: { this.props.valoresFiltro.id_personal }</h1>
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
														
	}
								// <Field nombreNodo='fechaNodo' name='fecha' type='text' component={renderField} label='Fecha'/>
								// <Field nombreNodo='horaInicioNodo' name='inicio' type='text' component={renderField} label='Hora inicio'/>
								// <Field nombreNodo='horaFinNodo' name='fin' type='text' component={renderField} label='Hora fin'/>
}

export default Formulario
