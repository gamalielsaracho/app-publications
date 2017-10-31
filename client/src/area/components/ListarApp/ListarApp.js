import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarAreas = `/dashboard/areas`
		let urlAuditoria = `/dashboard/areas/auditoria/${'areas'}`
		
		let activeListarAreas = ''
		let activeAuditoria = ''

		switch(this.props.pathname) {
			case urlListarAreas:
				activeListarAreas = 'active'
				break

			case urlAuditoria:
				activeAuditoria = 'active'
				break
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarAreas}>
			  	<Link to={urlListarAreas}>Listar areas</Link>
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