import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {

	// componentWillMount() {
	// 	this.props.listarPreConsultas()
	// }

	render() {
		let urlListarPreConsultas = `/dashboard/pre-consultas`

		let activeListarPreConsultas = ''
		let activePreConsulta = ''

		if(this.props.pathname == urlListarPreConsultas) {
			activeListarPreConsultas = 'active'
		} else {
			activePreConsulta = 'active'
		}
	

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarPreConsultas}>
			  	<Link to={urlListarPreConsultas}>Listar pre-consultas</Link>
			  </li>
			  <li className="nav-item nav-link" className={activePreConsulta}>
			  	<a>Detalle pre-consulta</a>
			  </li> 
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp