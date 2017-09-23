import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostarTipoAnalisisContainer from '../Mostrar'

// Formulario Modal para EDITAR una consulta.
// import FormularioConsultaContainer from '../../../consulta/components/Formulario'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	render() {

		// id del tipo de análisis desde la url.
		// let idTipoAnalisis = this.props.idTipoAnalisis

		return <div>
			<br/>
			<MostarTipoAnalisisContainer 
				idTipoAnalisis = {this.props.idTipoAnalisis}/>

			{/*  
				<FormularioConsultaContainer/>

				{ this.renderMenu(this.props.listar) }
			*/}

			<br/>
			<ul className="nav nav-tabs">
				<li className="nav-item">
				    <Link to={`/dashboard`}>Paramentros</Link>
				</li>
			</ul>

			{ this.props.children }
		</div>
	}
}

export default MostrarApp