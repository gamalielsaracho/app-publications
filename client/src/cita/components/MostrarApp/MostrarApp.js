import React, { Component } from 'react'
import { Link } from 'react-router'

import MostarCitaContainer from '../Mostrar'

class MostrarApp extends Component {
	render() {
		let idCita = this.props.idCita
		
			    // <a className="nav-link active">
			    // 	<Link to={`/dashboard/pacientes/${idCita}/alergias`}>Pre-consulta</Link>
			    // </a>
		return <div>
			<br/>
			<MostarCitaContainer 
				idCita={idCita}/>

			<ul className="nav nav-tabs">
			  <li className="nav-item">
			    <a className="nav-link">Pre-consulta</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link">Consulta</a>
			  </li>
			</ul>

			{ this.props.children }

		</div>
	}
}

export default MostrarApp