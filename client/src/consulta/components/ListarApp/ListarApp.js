import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let urlListarConsultas
		let urlReportesListaConsultas


		let activeList
		let activeShow
		let activeMostrarReportes

		let condicionActiveUrlListarConsultas = (
			this.props.pathname == `/dashboard/pacientes/${this.props.urls.idPaciente}/consultas` ||
			this.props.pathname == `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas` ||
			this.props.pathname == `/dashboard/consultas`
		)


		let condicionActiveUrlMostrarReportesConsultas = (
			this.props.pathname == `/dashboard/consultas/lista-consultas-vista-general-reportes`
			// this.props.pathname == `/dashboard/consultas/lista-consultas-vista-general-reportes` ||
			// this.props.pathname == `/dashboard/consultas/lista-consultas-vista-general-reportes`
		)

		if(condicionActiveUrlListarConsultas) {
			activeList = 'active'
			activeShow = ''
			activeMostrarReportes = ''

		} else {
			if(condicionActiveUrlMostrarReportesConsultas) {
				activeMostrarReportes = 'active'
				activeShow = ''
				activeList = ''
			}
		}

		if(this.props.urls.idConsulta) {
			activeShow = 'active'
		}

		// Si está parado en el historial clínico del paciente.
		if(this.props.urls.idPaciente) {
			urlListarConsultas = `/dashboard/pacientes/${this.props.urls.idPaciente}/consultas`
		} else {
			if(this.props.urls.idPreConsulta) {
				urlListarConsultas = `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas`
			} else {
				urlListarConsultas = `/dashboard/consultas`
				urlReportesListaConsultas = `/dashboard/consultas/lista-consultas-vista-general-reportes`
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
			  <li className="nav-item nav-link" className={activeMostrarReportes}>
			  	<Link to={urlReportesListaConsultas}>Reportes</Link>
			  </li>
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp