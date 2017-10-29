import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarDepartamentos = `/dashboard/departamentos`
		let urlAuditoria = `/dashboard/departamentos/auditoria/${'departamentos'}`
		
		let activeListarDepartamentos = ''
		let activeAuditoria = ''

		switch(this.props.pathname) {
			case urlListarDepartamentos:
				activeListarDepartamentos = 'active'
				break

			case urlAuditoria:
				activeAuditoria = 'active'
				break
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarDepartamentos}>
			  	<Link to={urlListarDepartamentos}>Listar departamentos</Link>
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