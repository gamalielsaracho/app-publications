import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostrarConsultaRellenandoContainer from '../MostrarRellenando'

import FormularioAnalisisSolicitadoContainer from '../../../analisisSolicitado/components/Formulario'

class MostrarRellenandoApp extends Component {
	constructor(props) {
		super(props)
		this.renderLinkSolicitudLaboratorio = this.renderLinkSolicitudLaboratorio.bind(this)
		this.renderBtnAgregarConsultaByRol = this.renderBtnAgregarConsultaByRol.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarAnalisisSolicitados()
	}

	 // onClick={ () => { this.props.abrirFormularioCrearConsulta() } } 
	renderBtnAgregarConsultaByRol() {

		let rol = removeAccents(this.personalLocalSt.rol)
		let idPersonal = this.personalLocalSt.id_personal

		if(rol == 'administracion' || rol == 'medico') {
			return <button type="button" onClick={ () => { this.props.abrirFormularioCrearAnalisisSolicitado() } } className="text-center btn btn-success btn-space">Crear Solicitud para laboratorio</button>
		} else {
			return <span></span>
		}
	}

	renderLinkSolicitudLaboratorio(activeSolicitudLaboratorio) {
		const { analisisSolicitados, cargando, error } = this.props.listar

		if(cargando) {
			return <p>Cargando..</p>
		} else {

			let solicitudesLaboratorio = analisisSolicitados

			solicitudesLaboratorio = solicitudesLaboratorio.filter((i) => {
				return i.analisisSolicitado.id_consulta ==  this.props.urls.idConsulta
			})


			if(solicitudesLaboratorio.length == 0) {
				return <div>
					{ this.renderBtnAgregarConsultaByRol() }
				</div>
			} else {			
				return <div>
					<ul className="nav nav-tabs">
						<li className="nav-item nav-link" className={activeSolicitudLaboratorio}>
						    <Link to={`/dashboard/citas/${this.props.urls.idCita}/preconsulta/${this.props.urls.idPreConsulta}/consulta/${this.props.urls.idConsulta}/solicitud-laboratorio/${solicitudesLaboratorio[0].analisisSolicitado.id_analisisSolicitado}`}>Solicitud laboratorio</Link>
						</li>
					</ul>
				</div>
			}
		}
	}

	render() {
		let activeDiagnosticos
		let activeTratamientos
		let activeSolicitudLaboratorio

		if(this.props.urls.idAnalisisSolicitado) {
			activeSolicitudLaboratorio = 'active'
			activeDiagnosticos = ''
			activeTratamientos = ''
		}

			// <ul className="nav nav-tabs">
			// 	<li className="nav-item nav-link" className={activeList}>
			// 	    <Link to={`/dashboard/tipos-analisis/${this.props.urls.idTipoAnalisis}/parametros/${this.props.urls.idParametroAnalisis}/referencias`}>Valores de referencia</Link>
			//   	</li>
			// </ul>

		return <div>
			<br/>
			<FormularioAnalisisSolicitadoContainer urls={ this.props.urls }/>

			<MostrarConsultaRellenandoContainer 
				idConsulta = {this.props.urls.idConsulta}/>
				
			<br/>
			<ul className="nav nav-tabs">
				<li className="nav-item nav-link" className={activeDiagnosticos}>
				    <Link to={`/dashboard`}>HACER LOS DIAGNÓSTICOS</Link>
				</li>
				<li className="nav-item nav-link" className={activeTratamientos}>
				    <Link to={`/dashboard`}>Tratamientos (HACER)</Link>
				</li>
				{ this.renderLinkSolicitudLaboratorio(activeSolicitudLaboratorio) }
			</ul>

			{ this.props.children }
		</div>
	}
}

export default MostrarRellenandoApp