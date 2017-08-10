import React, { Component } from 'react'
import { Link } from 'react-router'

class Menu extends Component {
	render() {

		return <div className='col-sm-3 col-md-2 back-green'>
			<div className='row center-xs center-sm center-md center-lg'>
				<div className='col-xs-4 col-sm-6 col-md-6 col-lg-6'>
					<br/>
					<img className='img-circle img-responsive' src='http://localhost:8080/images/gama.jpg'/>
				</div>
			</div>
			<h4 className='text-center'>Hola LOP</h4>
					
			<ul className="nav nav-sidebar">
				<li><Link to='/usuarios'>Usuarios <span className="badge">14</span></Link></li>
				<li><Link to='/roles'>Roles <span className="badge">1</span></Link></li>
				<li><Link to='/especialidades'>Especialidades <span className="badge">0</span></Link></li>
				<li><Link to='/ciudades'>Ciudades <span className="badge">8</span></Link></li>
	        </ul>
						
		</div>
	}
}

export default Menu