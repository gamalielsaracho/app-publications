import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarAlergias = `/dashboard/alergias`
		let urlAuditoria = `/dashboard/alergias/auditoria/${'alergias'}`
		
		let activeListarAlergias = ''
		let activeAuditoria = ''

		switch(this.props.pathname) {
			case urlListarAlergias:
				activeListarAlergias = 'active'
				break

			case urlAuditoria:
				activeAuditoria = 'active'
				break
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarAlergias}>
			  	<Link to={urlListarAlergias}>Listar alergias</Link>
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