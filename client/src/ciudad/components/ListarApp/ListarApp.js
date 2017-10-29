import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarCiudades = `/dashboard/ciudades`
		let urlAuditoria = `/dashboard/ciudades/auditoria/${'ciudades'}`
		
		let activeListarCiudades = ''
		let activeAuditoria = ''

		switch(this.props.pathname) {
			case urlListarCiudades:
				activeListarCiudades = 'active'
				break

			case urlAuditoria:
				activeAuditoria = 'active'
				break
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarCiudades}>
			  	<Link to={urlListarCiudades}>Listar ciudades</Link>
			  </li>
			  <li className="nav-item nav-link" className={activeAuditoria}>
			  	<Link to={urlAuditoria}>Auditoría</Link>
			  </li> 
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp