import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostrarPreConsultaContainer from '../Mostrar'

// PreConsulta X Parametro
import ListarPreConsultaParametrosContainer from '../../../preConsultaParametro/components/Listar'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderMenuById = this.renderMenuById.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	// componentWillMount() {
	// 	this.props.listarConsultasFuncion()
	// }

	renderMenuById(listar) {
		let rol = this.personalLocalSt.id_rol

		let urlListarConsultas = `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas`
		let urlMostrarConsulta = `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas/${this.props.urls.idConsulta}`

		let activeListarConsultas = ''
		let activeMostrarConsulta = ''

		switch(this.props.pathname) {
			case urlListarConsultas:
				activeListarConsultas = 'active'
				break

			case urlMostrarConsulta:
				activeMostrarConsulta = 'active'
				break
		}

		// 1 médico.
		// 3 administación.

		if((rol == 1) || (rol == 3)) {
			return <div>
				<ul className="nav nav-tabs no-print-data">
				  <li className="nav-item nav-link" className={activeListarConsultas}>
				  	<Link to={urlListarConsultas}>Listar Consultas</Link>
				  </li>
				  <li className="nav-item nav-link" className={activeMostrarConsulta}>
				  	<a>Detalle Consulta</a>
				  </li> 
				</ul>
			</div>

		} else {
			return <span></span>
		}

	}

	render() {

		return <div>
			<br/>
			<MostrarPreConsultaContainer 
				idPreConsulta={this.props.urls.idPreConsulta}/>

			{/*  
			*/}
			
			<ListarPreConsultaParametrosContainer idPreConsulta={this.props.urls.idPreConsulta}/>

			{ this.renderMenuById() }

			{ this.props.children }

		</div>
	}
}

export default MostrarApp