import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarUnidadesParametroPre = `/dashboard/unidades-parametro-preconsulta`
		let urlAuditoria = `/dashboard/unidades-parametro-preconsulta/auditoria/${'unidades-parametro-preconsulta'}`
		
		let activeListarUnidadesParametroPre = ''
		let activeAuditoria = ''

		switch(this.props.pathname) {
			case urlListarUnidadesParametroPre:
				activeListarUnidadesParametroPre = 'active'
				break

			case urlAuditoria:
				activeAuditoria = 'active'
				break
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarUnidadesParametroPre}>
			  	<Link to={urlListarUnidadesParametroPre}>Listar unidades</Link>
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