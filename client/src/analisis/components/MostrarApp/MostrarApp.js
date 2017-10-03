import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostarAnalisisContainer from '../Mostrar'

// Formulario Modal para EDITAR una consulta.
// import FormularioConsultaContainer from '../../../consulta/components/Formulario'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	// componentWillMount() {
		// this.props.listarAnalisisSolicitados()
	// }

	render() {
		let activeDiagnosticos = true
		let activeTratamientos = true
		let activeSolicitudLaboratorio = true

		// if(this.props.urls.idAnalisisSolicitado) {
		// 	activeSolicitudLaboratorio = 'active'
		// 	activeDiagnosticos = ''
		// 	activeTratamientos = ''
		// }

		return <div>
			<br/>
			{/* */}
			<MostarAnalisisContainer
				urls = {this.props.urls}
				idAnalisis = {this.props.urls.idAnalisis}/>

			<br/>
			<ul className="nav nav-tabs">
				<li className="nav-item nav-link" className={activeDiagnosticos}>
				    <Link to={`/dashboard/solicitudes-laboratorio/${this.props.urls.idAnalisisSolicitado}/analisis/${this.props.urls.idAnalisis}/tipos-analisis`}>Tipos de análisis</Link>
				</li>
				<li className="nav-item nav-link" className={activeTratamientos}>
				    <Link to={`/dashboard`}>Detalle tipo de análisis</Link>
				</li>
			</ul>

			{ this.props.children }
		</div>
	}
}

export default MostrarApp