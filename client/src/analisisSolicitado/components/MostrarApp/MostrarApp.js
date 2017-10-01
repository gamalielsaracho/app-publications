import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostarAnalisisSolicitadoContainer from '../Mostrar'

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

		if(this.props.urls.idAnalisisSolicitado) {
			activeList = 'active'
			activeShow = ''
		} else {
			activeList = ''
			activeShow = 'active'
		}

			// <ul className="nav nav-tabs">
			// 	<li className="nav-item nav-link" className={activeList}>
			// 	    <Link to={`/dashboard/tipos-analisis/${this.props.urls.idTipoAnalisis}/parametros/${this.props.urls.idParametroAnalisis}/referencias`}>Valores de referencia</Link>
			//   	</li>
			// </ul>
		return <div>
			<br/>
			<MostarAnalisisSolicitadoContainer
				urls = { this.props.urls }/>

			<h3>Menuu constante.</h3>
			<br/>

			{ this.props.children }
		</div>
	}
}

export default MostrarApp