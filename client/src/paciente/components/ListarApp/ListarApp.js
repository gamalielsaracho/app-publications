import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarPacientes
		let urlListarPacientesAuditoria
		let urlMostrarPaciente

		let activeListarPacientes
		let activeListarPacientesAuditoria
		let activeMostrarPaciente

		urlListarPacientes = `/dashboard/pacientes`
		urlListarPacientesAuditoria = `/dashboard/pacientes/auditoria/${'pacientes'}`
		urlMostrarPaciente = `/dashboard/pacientes/${this.props.urls.idPaciente}`

		switch(this.props.pathname) {
			case urlListarPacientes:
				activeListarPacientes = 'active'
				activeListarPacientesAuditoria = ''
				activeMostrarPaciente = ''
				break

			case urlListarPacientesAuditoria:
				activeListarPacientes = ''
				activeListarPacientesAuditoria = 'active'
				activeMostrarPaciente = ''
				break

			case urlMostrarPaciente:
				activeListarPacientes = ''
				activeListarPacientesAuditoria = ''
				activeMostrarPaciente = 'active'
				break

		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarPacientes}>
			  	<Link to={urlListarPacientes}>Listar Pacientes</Link>
			  </li>
			  <li className="nav-item nav-link" className={activeMostrarPaciente}>
			    <a className="nav-link">Detalle Paciente</a>
			  </li>
			  <li className="nav-item nav-link" className={activeListarPacientesAuditoria}>
			  	<Link to={urlListarPacientesAuditoria}>Auditoría</Link>
			  </li>
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp