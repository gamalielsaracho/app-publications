import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostrarConsultaRellenandoContainer from '../MostrarRellenando'

class MostrarRellenandoApp extends Component {
	constructor(props) {
		super(props)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	render() {
		// /dashboard/citas/${this.props.urlsParams.idCita}/preconsulta/${this.props.urlsParams.idPreConsulta}/consulta/${this.props.urlsParams.idConsulta}/diagnosticos
		
		return <div>
			<br/>

			<MostrarConsultaRellenandoContainer 
				idConsulta = {this.props.idConsulta}/>
				
			<br/>
			<ul className="nav nav-tabs">
				<li className="nav-item">
				    <Link to={`/dashboard`}>Tratamiento</Link>
				</li>
				<li className="nav-item">
				    <Link to={`/dashboard`}>Medicamentos Solicitados</Link>
				</li>
				<li className="nav-item">
				    <Link to={`/dashboard`}>Analisis Solicitados</Link>
				</li>
			</ul>

			{ this.props.children }
		</div>
	}
}

export default MostrarRellenandoApp