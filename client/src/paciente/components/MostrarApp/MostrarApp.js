import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'

import MostarPacienteContainer from '../Mostrar'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
		this.renderMenuByRol = this.renderMenuByRol.bind(this)
	}

	renderMenuByRol() {
		let rol = this.personalLocalSt.id_rol

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

		// 1 médico.
		// 3 administración.
		if((rol == 1) || (rol == 3)) {
			return <div>
				<h3 className='text-center no-print-data'>Historial Clínico</h3>

				<ul className="nav nav-tabs no-print-data">
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
			</div>
		} else {
			return <span></span>
		}
	}

	render() {
		

		return <div>
			<br/>
			<MostarPacienteContainer 
				idPaciente = { this.props.urls.idPaciente }/>

			{ this.renderMenuByRol() }

			{ this.props.children }

		</div>
	}
}

export default MostrarApp