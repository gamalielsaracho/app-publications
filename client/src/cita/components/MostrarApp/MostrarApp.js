import React, { Component } from 'react'
import { Link } from 'react-router'

import MostarCitaContainer from '../Mostrar'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderMenu = this.renderMenu.bind(this)
	}

	renderMenu(cita) {
		// console.log(cita)
		if(cita.cita != undefined) {
			if(cita.cita.id_preconsulta != null) {
				return <li className="nav-item">
				    <a className="nav-link active">
				    	<Link to={`/dashboard/citas/${this.props.cita.cita.id_cita}/preconsulta/${this.props.cita.cita.id_preconsulta}`}>Pre-consulta</Link>
				    </a>
				</li>
			} else {
				return <h3 className='text-center'>Sin Pre-consulta (Btn Agregar aquí.)</h3>
			}
		} else {
			return <span></span>
		}
	}

	render() {
		let idCita = this.props.idCita
		
		return <div>
			<br/>
			<MostarCitaContainer 
				idCita={idCita}/>

			<ul className="nav nav-tabs">
				{ this.renderMenu(this.props.cita) }
			</ul>

			{ this.props.children }

		</div>
	}
}

export default MostrarApp