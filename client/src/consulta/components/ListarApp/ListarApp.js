import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarConsultas

		let activeList
		let activeShow

		if(this.props.urls.idConsulta) {
			activeList = ''
			activeShow = 'active'
		} else {
			activeList = 'active'
			activeShow = ''
		}

		// Si está parado en el historial clínico del paciente.
		if(this.props.urls.idPaciente) {
			urlListarConsultas = `/dashboard/pacientes/${this.props.urls.idPaciente}/consultas`
		} else {
			if(this.props.urls.idPreConsulta) {
				urlListarConsultas = `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas`
			} else {
				urlListarConsultas = `/dashboard/consultas`
			}
		}
		

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeList}>
			  	<Link to={urlListarConsultas}>Listar Consultas</Link>
			  </li>
			  <li className="nav-item nav-link" className={activeShow}>
			    <a className="nav-link">Detalle Consulta</a>
			  </li>
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp