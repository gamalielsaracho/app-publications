import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		return <div>
			<ul className="nav nav-tabs">
			  <li className="nav-item">
			    <a className="nav-link active">
			    	<Link to='/dashboard/consultas'>Listar Consultas</Link>
			    </a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link">Detalle Consulta</a>
			  </li>
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp