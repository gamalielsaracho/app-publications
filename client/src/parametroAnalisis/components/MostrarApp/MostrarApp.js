import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostarParametroAnalisisContainer from '../Mostrar'

// Formulario Modal para EDITAR una consulta.
// import FormularioConsultaContainer from '../../../consulta/components/Formulario'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	render() {

		let activeList
		let activeShow

		if(this.props.urls.idParametroAnalisis) {
			activeList = 'active'
			activeShow = ''
		} else {
			activeList = ''
			activeShow = 'active'
		}

		return <div>
			<br/>
			<MostarParametroAnalisisContainer
				idParametroAnalisis = { this.props.idParametroAnalisis }/>

			<br/>
			<ul className="nav nav-tabs">
				<li className="nav-item nav-link" className={activeList}>
				    <Link to={`/dashboard/tipos-analisis/${this.props.urls.idTipoAnalisis}/parametros/${this.props.urls.idParametroAnalisis}/referencias`}>Valores de referencia</Link>
			  	</li>
			</ul>

			{ this.props.children }
		</div>
	}
}

export default MostrarApp