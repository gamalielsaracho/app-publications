import React, { Component } from 'react'
import { Link } from 'react-router'

import MostrarPreConsultaContainer from '../Mostrar'

// PreConsulta X Parametro
import ListarPreConsultaParametrosContainer from '../../../preConsultaParametro/components/Listar'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderMenu = this.renderMenu.bind(this)
	}

				// return <li className="nav-item">
				//     <a className="nav-link active">
				//     	<Link to={`/dashboard/citas/${this.props.cita.cita.id_cita}/preconsulta/${this.props.cita.cita.id_preconsulta}`}>Pre-consulta</Link>
				//     </a>
				// </li>
	renderMenu(cita) {
		if(cita.cita != undefined) {
			if(cita.cita.id_preconsulta != null) {
				return <li className="nav-item">
				    <a className="nav-link active">Consulta</a>
				</li>
			} else {
				return <h3 className='text-center'>Sin Pre-consulta</h3>
			}
		} else {
			return <span></span>
		}
	}

	render() {
		// id de la pre-consulta desde la url.
		let idPreConsulta = this.props.idPreConsulta
		
		return <div>
			<br/>
			<MostrarPreConsultaContainer 
				idPreConsulta={idPreConsulta}/>

			{/*  
			*/}

			<ListarPreConsultaParametrosContainer idPreConsulta={idPreConsulta}/>

			<ul className="nav nav-tabs">
				{ this.renderMenu(this.props.cita) }
			</ul>

			{ this.props.children }

		</div>
	}
}

export default MostrarApp