import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarParametrosPreConsulta = `/dashboard/parametros-preconsulta`
		let urlAuditoria = `/dashboard/parametros-preconsulta/auditoria/${'parametros-preconsulta'}`
		
		let activeListarParametrosPreConsulta = ''
		let activeAuditoria = ''

		switch(this.props.pathname) {
			case urlListarParametrosPreConsulta:
				activeListarParametrosPreConsulta = 'active'
				break

			case urlAuditoria:
				activeAuditoria = 'active'
				break
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarParametrosPreConsulta}>
			  	<Link to={urlListarParametrosPreConsulta}>Listar parámetros</Link>
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