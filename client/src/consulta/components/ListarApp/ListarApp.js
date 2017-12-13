import React, { Component } from 'react'
import { Link } from 'react-router'
import jwtDecode from 'jwt-decode'

class ListarApp extends Component {
	constructor(props) {
		super(props)
		this.renderBtnReportes = this.renderBtnReportes.bind(this)
		this.renderBtnEstadisticas = this.renderBtnEstadisticas.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	renderBtnEstadisticas(urlEstadisticas, activeEstadisticas) {
		let idRol = this.personalLocalSt.id_rol
		
		if((idRol == 3) && (this.props.pathname == '/dashboard/consultas')) {
			return <li className="nav-item nav-link" className={activeEstadisticas}>
				<Link to={urlEstadisticas}>Estadisticas</Link>
			</li>
		} else {
			return <span></span>
		}
	}

	renderBtnReportes(urlReportesListaConsultas, activeMostrarReportes) {
		let idRol = this.personalLocalSt.id_rol
		
		if((idRol == 3) && (this.props.pathname == '/dashboard/consultas')) {
			return <li className="nav-item nav-link" className={activeMostrarReportes}>
				<Link to={urlReportesListaConsultas}>Reportes</Link>
			</li>
		} else {
			return <span></span>
		}

	}

	render() {
		let urlListarConsultas
		let urlReportesListaConsultas
		let urlEstadisticas = '/dashboard/consultas/estadisticas'


		let activeList
		let activeShow
		let activeMostrarReportes
		let activeEstadisticas

		let condicionActiveUrlListarConsultas = (
			this.props.pathname == `/dashboard/pacientes/${this.props.urls.idPaciente}/consultas` ||
			this.props.pathname == `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas` ||
			this.props.pathname == `/dashboard/consultas`
		)


		if(condicionActiveUrlListarConsultas) {
			activeList = 'active'
			// activeShow = ''
			// activeMostrarReportes = ''
		}
			
		if(this.props.pathname == `/dashboard/consultas/lista-consultas-vista-general-reportes`) {
			activeMostrarReportes = 'active'
		}

		if(this.props.pathname == urlEstadisticas) {
			activeEstadisticas = 'active'
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

			  { this.renderBtnReportes(urlReportesListaConsultas, activeMostrarReportes) }
			  { this.renderBtnEstadisticas(urlEstadisticas, activeEstadisticas) }
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp