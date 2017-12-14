import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarPersonales
		let urlMostrarPersonal

		let activeListarPersonales
		let activeMostrarPersonal

		urlListarPersonales = `/dashboard/personales`
		urlMostrarPersonal = `/dashboard/personales/${this.props.urls.idPersonal}`

		switch(this.props.pathname) {
			case urlListarPersonales:
				activeListarPersonales = 'active'
				activeMostrarPersonal = ''
				break

			case urlMostrarPersonal:
				activeListarPersonales = ''
				activeMostrarPersonal = 'active'
				break
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarPersonales}>
			  	<Link to={urlListarPersonales}>Listar Personales</Link>
			  </li>
			  <li className="nav-item nav-link" className={activeMostrarPersonal}>
			    <a className="nav-link">Detalle Personal</a>
			  </li>
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp