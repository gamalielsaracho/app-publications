import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderCita = this.renderCita.bind(this)
	}

	componentWillMount() {
		console.log('EL ID DE LA CITA ES: '+this.props.idCita)
		
		// idCita es pasado a MostarCitaContainer dentro de MostrarApp.
		this.props.mostrarCita(this.props.idCita)
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	renderCita(dato) {
		if(dato.cita != undefined) {
			return <div className='container'>
			
					<div className='row'>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Fecha:</strong>{ dato.cita.fecha }</p>
						</div>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Hora:</strong>{ dato.cita.hora }</p>
						</div>
					</div>

					<p><strong>Médico/a:</strong>{ dato.personal.nombres +' '+ dato.personal.apellidos }</p>
					<p><strong>Especialidad:</strong>{ dato.especialidad.descripcion }</p>

					<h3 className='text-center'>Paciente</h3>
					<div className='row'>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Nro. documento:</strong>{ dato.paciente.nroDocumento }</p>
						</div>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Nombre:</strong>{ dato.paciente.nombres +' '+ dato.paciente.apellidos }</p>
						</div>
						<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
							<p><strong>Sexo:</strong>{ dato.paciente.sexo }</p>
						</div>
					</div>
			</div>
		} else {
			return <span></span>
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

		console.log("Mostrar estÁ: "+this.props.mostrar.abierto)

		// console.log(cita)

		if(cargando) {
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
					{ this.renderCargando(cargando) }
				</div>
			</div>
		} else {
			return <div className='row'>
					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderCita(cita) }
				<br/>
				<br/>
			</div>
		}
	}
}

export default Mostrar