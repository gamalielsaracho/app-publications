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
		if(dato.cita) {
			return <div>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
						<p><strong>Fecha:</strong>{ dato.cita.fecha }</p>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
						<p><strong>Hora:</strong>{ dato.cita.hora }</p>
					</div>
				</div>

				<h4 className='text-center'>Profesional</h4>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
						<p><strong>Nombre:</strong>{ dato.personal.nombres +' '+ dato.personal.apellidos }</p>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
						<p><strong>Especialidad:</strong>{ dato.especialidad.descripcion }</p>
					</div>
				</div>

				<h4 className='text-center'>Paciente</h4>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
						<p><strong>Nombre:</strong>{ dato.paciente.nombres +' '+ dato.paciente.apellidos }</p>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
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

		console.log(this.props.cita)

		return <div className='container'>
			<div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
					{ this.renderCargando(cargando) }
					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderCita(cita) }
				</div>
			</div>
		</div>

	}
}

export default Mostrar