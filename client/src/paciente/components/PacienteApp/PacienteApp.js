import React, { Component } from 'react'
import { Link } from 'react-router'

class PacienteApp extends Component {
	render() {
		return <div>
			<ul className="nav nav-tabs">
			  <li className="nav-item">
			    <a className="nav-link active">
			    	<Link to='/pacientes'>Listar</Link>
			    </a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link">Detalle paciente</a>
			  </li>
			  
			</ul>
			{ this.props.children }
		</div>
	}
}

export default PacienteApp