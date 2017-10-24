import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarPacientes
		let urlMostrarPaciente

		let activeListarPacientes
		let activeMostrarPaciente

		urlListarPacientes = `/dashboard/pacientes`
		urlMostrarPaciente = `/dashboard/pacientes/${this.props.urls.idPaciente}`

		switch(this.props.pathname) {
			case urlListarPacientes:
				activeListarPacientes = 'active'
				activeMostrarPaciente = ''
				break

			case urlMostrarPaciente:
				activeListarPacientes = ''
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
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp