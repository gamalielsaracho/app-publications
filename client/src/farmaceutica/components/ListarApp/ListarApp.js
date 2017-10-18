import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarFarmaceuticas = `/dashboard/farmaceuticas`
		let urlAuditoria = `/dashboard/farmaceuticas/auditoria/${'farmaceuticas'}`
		
		let activeListarFarmaceuticas = ''
		let activeAuditoria = ''

		switch(this.props.pathname) {
			case urlListarFarmaceuticas:
				activeListarFarmaceuticas = 'active'
				break

			case urlAuditoria:
				activeAuditoria = 'active'
				break
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarFarmaceuticas}>
			  	<Link to={urlListarFarmaceuticas}>Listar farmaceuticas</Link>
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