import React, { Component } from 'react'
import { Link } from 'react-router'

import MostarPacienteContainer from '../Mostrar'

class MostrarApp extends Component {
	render() {
		let urlListarAlergias
		let urlListarConsultas
		let urlListarSolicitudesAnalisis

		let activeAlergias
		let activeConsultas
		let activeSolicitudesAnalisis

		urlListarAlergias = `/dashboard/pacientes/${this.props.urls.idPaciente}/alergias`
		urlListarConsultas = `/dashboard/pacientes/${this.props.urls.idPaciente}/consultas`
		urlListarSolicitudesAnalisis = `/dashboard/pacientes/${this.props.urls.idPaciente}/solicitudes-laboratorio`
		
		switch(this.props.pathname) {
			case urlListarAlergias:
				activeAlergias = 'active'
				activeConsultas = ''
				activeSolicitudesAnalisis = ''
				break

			case urlListarConsultas:
				activeAlergias = ''
				activeConsultas = 'active'
				activeSolicitudesAnalisis = ''
				break

			case urlListarSolicitudesAnalisis:
				activeAlergias = ''
				activeConsultas = ''
				activeSolicitudesAnalisis = 'active'
				break
		}

		return <div>
			<br/>
			<MostarPacienteContainer 
				idPaciente = { this.props.urls.idPaciente }/>

			<h3 className='text-center'>Historial Clínico</h3>

			<ul className="nav nav-tabs">
				<li className="nav-item nav-link" className={activeAlergias}>
			    	<Link to={urlListarAlergias}>Alergias</Link>
				</li>
				<li className="nav-item nav-link" className={activeConsultas}>
			    	<Link to={urlListarConsultas}>Consultas</Link>
				</li>
				<li className="nav-item nav-link" className={activeSolicitudesAnalisis}>
				<Link to={urlListarSolicitudesAnalisis}>
			    		Solicitudes laboratorio
			    	</Link>
				</li>
			</ul>

			<br/>
			{ this.props.children }

		</div>
	}
}

export default MostrarApp