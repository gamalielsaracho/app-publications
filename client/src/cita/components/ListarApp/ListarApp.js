import React, { Component } from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

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
			  <li role="presentation" className="active">
			  	<a>
			    	<Link to='/dashboard/citas'>Listar</Link>
			  	</a>
			  </li>

			  <li role="presentation" id='myTabs'>
			  	<a href="#">Detalle cita</a>
			  </li>
			  
			</ul>
		}
	}

	render() {
		let rolUsuario = jwtDecode(localStorage.getItem('token')).rol

		return <div>
			{ this.renderMenuByRol(rolUsuario) }

			{ this.props.children }
			
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
		</div>
	}
}

export default ListarApp