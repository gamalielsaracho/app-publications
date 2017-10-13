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

	renderLinkSolicitudLaboratorio(urlMostrarSolicitudLaboratorio) {
		const { analisisSolicitados, cargando, error } = this.props.listar

		let activeSolicitudLaboratorio

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
				let url = `${urlMostrarSolicitudLaboratorio}/${solicitudesLaboratorio[0].analisisSolicitado.id_analisisSolicitado}`
				
				if(this.props.pathname == url) {
					activeSolicitudLaboratorio = 'active'
				}

				return <div>
					<ul className="nav nav-tabs">
						<li className="nav-item nav-link" className={activeSolicitudLaboratorio}>
						    <Link to={`${urlMostrarSolicitudLaboratorio}/${solicitudesLaboratorio[0].analisisSolicitado.id_analisisSolicitado}`}>Solicitud laboratorio</Link>
						</li>
					</ul>
				</div>
			}
		}
	}

	render() {
		let urlListarSintomas
		let urlListarDiagnosticos
		let urlMostrarSolicitudLaboratorio

		let activeDiagnosticos
		let activeSintomas

		urlListarSintomas = `/dashboard/citas/${this.props.urls.idCita}/preconsulta/${this.props.urls.idPreConsulta}/consulta/${this.props.urls.idConsulta}/sintomas`
		urlListarDiagnosticos = `/dashboard/citas/${this.props.urls.idCita}/preconsulta/${this.props.urls.idPreConsulta}/consulta/${this.props.urls.idConsulta}/diagnosticos`
		urlMostrarSolicitudLaboratorio = `/dashboard/citas/${this.props.urls.idCita}/preconsulta/${this.props.urls.idPreConsulta}/consulta/${this.props.urls.idConsulta}/solicitud-laboratorio`

		switch(this.props.pathname) {
			case urlListarSintomas:
				activeSintomas = 'active'
				activeDiagnosticos = ''
				break

			case urlListarDiagnosticos:
				activeSintomas = ''
				activeDiagnosticos = 'active'
				break
		}


		return <div>
			<br/>
			<FormularioAnalisisSolicitadoContainer urls={ this.props.urls }/>

			<MostrarConsultaRellenandoContainer 
				idConsulta = {this.props.urls.idConsulta}/>
				
			<br/>
			<ul className="nav nav-tabs">
				<li className="nav-item nav-link" className={activeSintomas}>
				    <Link to={urlListarSintomas}>Síntomas</Link>
				</li>
				<li className="nav-item nav-link" className={activeDiagnosticos}>
				    <Link to={urlListarDiagnosticos}>Diagnósticos</Link>
				</li>
				{ this.renderLinkSolicitudLaboratorio(urlMostrarSolicitudLaboratorio) }
			</ul>
			{ this.props.children }
			<br/>
			<br/>
		</div>
	}
}

export default MostrarRellenandoApp