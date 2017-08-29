import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'

class ListarApp extends Component {
	constructor(props) {
		super(props)
		this.renderMenuByRol = this.renderMenuByRol.bind(this)
	}

	renderMenuByRol(rol) {
		if(rol == 'ventanilla') {
			return <span>
			</span>
		} else {
			return <ul className="nav nav-tabs">
			  <li className="nav-item">
			    <a className="nav-link active">
			    	<Link to='/dashboard/citas'>Listar</Link>
			    </a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link">Detalle cita</a>
			  </li>
			</ul>
		}
	}

	render() {
		let rolUsuario = jwtDecode(localStorage.getItem('token')).rol

		return <div>
			{ this.renderMenuByRol(rolUsuario) }

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp