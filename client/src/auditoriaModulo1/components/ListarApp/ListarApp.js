import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	
	componentWillMount() {
		if(this.props.urls.tableName && this.props.urls.idTableFather) {
			this.props.listarAuditoria1MovimientosPorPorNombreTablaYidTablaPadre(this.props.urls.tableName, this.props.urls.idTableFather)
		} else if(this.props.urls.tableName) {
			this.props.listarAuditoria1MovimientosPorNombreTabla(this.props.urls.tableName)
		}
	}


	render() {
		let urlListarModulos = `/dashboard/modulos-auditados`
		
		let activeListarModulos = ''
		let activeAuditoria = ''

		if(this.props.pathname == urlListarModulos) {
			activeListarModulos = 'active'
		} else {
			activeAuditoria = 'active'
			// activeListarModulos = ''
		}
	

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarModulos}>
			  	<Link to={urlListarModulos}>Listar módulos auditados</Link>
			  </li>
			  <li className="nav-item nav-link" className={activeAuditoria}>
			  	<a>Detalle</a>
			  </li> 
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp