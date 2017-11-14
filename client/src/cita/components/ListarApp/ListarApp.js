import React, { Component } from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

import jwtDecode from 'jwt-decode'

class ListarApp extends Component {
	constructor(props) {
		super(props)
	}

	render() {

		let activeListarCitas
		let activeMostrarCita

		if(this.props.urls.idCita) {
			activeMostrarCita = 'active'
			activeListarCitas = ''
		} else {
			activeMostrarCita = ''
			activeListarCitas = 'active'
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarCitas}>
			  	<Link to={`/dashboard/citas`}>Listar citas</Link>
			  </li>
			  <li className="nav-item nav-link" className={activeMostrarCita}>
			    <a className="nav-link">Detalle cita</a>
			  </li>
			  <li className="nav-item nav-link" className={activeMostrarCita}>
			  	<Link to={`/dashboard/citas-agendadas-calendario`}>
			    	<a className="nav-link">Agenda</a>
			  	</Link>
			  </li>
			</ul>

			{ this.props.children }
		</div>
	}
}

export default ListarApp