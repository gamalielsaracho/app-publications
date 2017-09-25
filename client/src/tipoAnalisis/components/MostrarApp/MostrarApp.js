import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostarTipoAnalisisContainer from '../Mostrar'

// import ListarTipoAnalisisParametrosContainer from '../../../tipoAnalisisParametro/components/Listar'


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
		let activeList
		let activeShow

		if(this.props.urls.idParametroAnalisis) {
			activeList = ''
			activeShow = 'active'
		} else {
			activeList = 'active'
			activeShow = ''
		}

		return <div>
			<MostarTipoAnalisisContainer 
				idTipoAnalisis = {this.props.idTipoAnalisis}/>

			<br/>

			<ul className="nav nav-tabs">
				<li className="nav-item nav-link" className={activeList}>
				    <Link to={`/dashboard/tipos-analisis/${this.props.idTipoAnalisis}/parametros`}>Paramentros</Link>
			  	</li>
				<li className="nav-item nav-link" className={activeShow}>
			    	<a className="nav-link">Detalle paramentro</a>
				</li>
			</ul>

			{ this.props.children }
		</div>
	}
}

export default MostrarApp