import React, { Component } from 'react'

import ReactModal from 'react-modal'

import moment from 'moment'

import { formatDate, calcularEdad } from '../../../globalActions'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

import AnadirPreConsultaContainer from '../../../preconsulta/components/AnadirPreConsulta'


class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCita = this.renderCita.bind(this)
	}

	componentWillMount() {
		console.log('EL ID DE LA CITA ES: '+this.props.idCita)
		
		// idCita es pasado a MostarCitaContainer dentro de MostrarApp.
		this.props.mostrarCita(this.props.idCita)
	}


	renderCita(cargando, dato) {
		if(cargando) {
			return <Cargando/>
		} else if(dato){

			return <div className='container'>

					<AnadirPreConsultaContainer datosCita = { dato }/>

					<div className='row'>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Fecha:</strong>{ moment(dato.cita.fecha).format('L') }</p>
						</div>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Hora inicio:</strong>{ moment(dato.cita.start).format('LT') }</p>
						</div>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Hora fin:</strong>{ moment(dato.cita.end).format('LT') }</p>
						</div>
					</div>

					<p><strong>Médico/a:</strong>{ dato.personal.nombres +' '+ dato.personal.apellidos }</p>
					<p><strong>Especialidad:</strong>{ dato.especialidad.descripcion }</p>

					<h3 className='text-center'>Paciente</h3>
					<div className='row'>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Nro. documento:</strong>{ dato.paciente.nroDocumento }</p>
							<p><strong>Dirección:</strong> { dato.paciente.direccion }</p>				
						</div>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Nombre:</strong>{ dato.paciente.nombres +' '+ dato.paciente.apellidos }</p>
							<p><strong>Fecha de nacimiento:</strong> { moment(dato.paciente.fechaNacimiento).format('L') }</p>
						</div>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Sexo:</strong>{ dato.paciente.sexo }</p>
						</div>
					</div>
			</div>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '55vh',
		  		position: 'none'
		  	}
		}


		const { cargando, cita, error, abierto } = this.props.mostrar

		// console.log("Mostrar estÁ: "+this.props.mostrar.abierto)

		// console.log(cita)

		return <div className='row'>
			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderCita(cargando, cita) }
			<br/>
			<br/>
		</div>
	}
}

export default Mostrar