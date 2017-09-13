import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'

import MostrarPreConsultaContainer from '../Mostrar'

// PreConsulta X Parametro
import ListarPreConsultaParametrosContainer from '../../../preConsultaParametro/components/Listar'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderMenu = this.renderMenu.bind(this)
	}

	componentWillMount() {
		this.props.listarConsultas()
	}

				// return <li className="nav-item">
				//     <a className="nav-link active">
				//     	<Link to={`/dashboard/citas/${this.props.cita.cita.id_cita}/preconsulta/${this.props.cita.cita.id_preconsulta}`}>Pre-consulta</Link>
				//     </a>
				// </li>
	renderMenu(listar) {
		if(listar.cargando) {
			return <p>cargando..</p>
		} else {
			let consultas = listar.consultas

			consultas = consultas.filter((i) => {
				return i.consulta.id_preconsulta ==  this.props.idPreConsulta && 
				i.consulta.id_personal == jwtDecode(localStorage.getItem('token')).id_personal
			})

			if(consultas.length == 0) {
				return <div className='row'>
					<button type="button"  className="text-center btn btn-success btn-space">Agregar Consulta</button>
				</div>
			} else {
				return <div>
					<ul className="nav nav-tabs">
						<li className="nav-item">
					    	<a className="nav-link active">Consulta</a>
						</li>
					</ul>
				</div>
			}

			console.log('consultas ################# ---->')
			console.log(consultas)
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

			{ this.renderMenu(this.props.listar) }

			{ this.props.children }

		</div>
	}
}

export default MostrarApp