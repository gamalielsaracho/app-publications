import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostrarConsultaContainer from '../Mostrar'

// Formulario Modal para EDITAR una consulta.
import FormularioConsultaContainer from '../../../consulta/components/Formulario'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderLinkSolicitudLaboratorio = this.renderLinkSolicitudLaboratorio.bind(this)
		this.renderBtnAgregarSolicitudLaboratorioByRol = this.renderBtnAgregarSolicitudLaboratorioByRol.bind(this)
		
		this.renderLinkTratamiento = this.renderLinkTratamiento.bind(this)
		this.renderBtnAgregarTratamiento = this.renderBtnAgregarTratamiento.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
		this.idMedicoLocalSt = localStorage.getItem('idMedico')
	}

	componentWillMount() {
		this.props.listarAnalisisSolicitados()
		// console.log('EL ID ES ---------------------->')
		// console.log(this.props.urls.idConsulta)
		this.props.mostrarTratamientoIdConsultaFuncion(this.props.urls.idConsulta)
	}

	renderLinkTratamiento(urlMostrarTratamiento) {
		const { tratamiento, cargando, error } = this.props.mostrarTratamientoIdConsulta

		// let activeSolicitudLaboratorio
		// console.log('this.props.mostrarTratamientoIdConsulta ---->')
		// console.log(this.props.mostrarTratamientoIdConsulta)

		if(cargando) {
			return <p>Cargando..</p>
		} else {
			if(tratamiento) {
				// ..

				let url = `${urlMostrarTratamiento}/${tratamiento.id_tratamiento}`
				let activeMostrarTratamiento

				if(this.props.pathname == url) {
					activeMostrarTratamiento = 'active'
				}

				return <li className="nav-item nav-link" className={activeMostrarTratamiento}>
					<Link to={url}>Tratamiento</Link>
				</li>
			} else {
				return <li className="nav-item nav-link">
					{ this.renderBtnAgregarTratamiento() }
				</li>
			}
		}
	}

	renderBtnAgregarTratamiento() {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		// 1 médico.
		// 3 administración.
			
		let condition

		condition = (
			(idRol == 1 && idPersonal == this.idMedicoLocalSt) ||
			(idRol == 3)
		)

		if(condition) {
			return <button type="button" onClick={ () => { 
				this.props.crearTratamiento(this.props.urls.idConsulta) 
			} } className="text-center btn btn-success btn-space">
				Crear tratamiento
			</button>
		} else {
			return <span></span>
		}
	}

	renderBtnAgregarSolicitudLaboratorioByRol() {

		let idRol = this.personalLocalSt.id_rol

		if(idRol == 3 || idRol == 1) {
			return <button type="button" onClick={ () => { this.props.abrirFormularioCrearAnalisisSolicitado() } } className="text-center btn btn-success btn-space">
				Crear Solicitud para laboratorio
			</button>
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
				return <li >
					{ this.renderBtnAgregarSolicitudLaboratorioByRol() }
				</li>
			} else {	
				let url = `${urlMostrarSolicitudLaboratorio}/${solicitudesLaboratorio[0].analisisSolicitado.id_analisisSolicitado}`
				
				if(this.props.pathname == url) {
					activeSolicitudLaboratorio = 'active'
				}

				return <li className="nav-item nav-link" className={activeSolicitudLaboratorio}>
						    <Link to={`${urlMostrarSolicitudLaboratorio}/${solicitudesLaboratorio[0].analisisSolicitado.id_analisisSolicitado}`}>Solicitud laboratorio</Link>
						</li>
			}
		}
	}

	render() {
		let urlListarSintomas
		let urlListarDiagnosticos
		let urlMostrarTratamiento
		let urlMostrarSolicitudLaboratorio


		let activeDiagnosticos
		let activeSintomas

		// Rutas según el lugar en donde se encuentre el usuario.

		if(this.props.urls.idPaciente && this.props.urls.idConsulta) {
			urlListarSintomas = `/dashboard/pacientes/${this.props.urls.idPaciente}/consultas/${this.props.urls.idConsulta}/sintomas`
			urlListarDiagnosticos = `/dashboard/pacientes/${this.props.urls.idPaciente}/consultas/${this.props.urls.idConsulta}/diagnosticos`
			urlMostrarSolicitudLaboratorio = `/dashboard/pacientes/${this.props.urls.idPaciente}/consultas/${this.props.urls.idConsulta}/solicitud-laboratorio`
			urlMostrarTratamiento = `/dashboard/pacientes/${this.props.urls.idPaciente}/consultas/${this.props.urls.idConsulta}/tratamiento`
		
		} else {
			if(this.props.urls.idPreConsulta && this.props.urls.idConsulta) {
				urlListarSintomas = `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas/${this.props.urls.idConsulta}/sintomas`
				urlListarDiagnosticos = `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas/${this.props.urls.idConsulta}/diagnosticos`
				urlMostrarSolicitudLaboratorio = `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas/${this.props.urls.idConsulta}/solicitud-laboratorio`
				urlMostrarTratamiento = `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas/${this.props.urls.idConsulta}/tratamiento`
			
			} else {
				urlListarSintomas = `/dashboard/consultas/${this.props.urls.idConsulta}/sintomas`
				urlListarDiagnosticos = `/dashboard/consultas/${this.props.urls.idConsulta}/diagnosticos`
				urlMostrarSolicitudLaboratorio = `/dashboard/consultas/${this.props.urls.idConsulta}/solicitud-laboratorio`
				urlMostrarTratamiento = `/dashboard/consultas/${this.props.urls.idConsulta}/tratamiento`
			
			}
		}


		
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

			<MostrarConsultaContainer 
				urls = {this.props.urls}/>

			<FormularioConsultaContainer/>

			<br/>
			<ul className="nav nav-tabs no-print-data">
				<li className="nav-item nav-link" className={activeSintomas}>
				    <Link to={urlListarSintomas}>Síntomas</Link>
				</li>
				<li className="nav-item nav-link" className={activeDiagnosticos}>
				    <Link to={urlListarDiagnosticos}>Diagnósticos</Link>
				</li>

			
				{ this.renderLinkTratamiento(urlMostrarTratamiento) }
				{ this.renderLinkSolicitudLaboratorio(urlMostrarSolicitudLaboratorio) }
			
			</ul>

			{ this.props.children }
			<br/>
			<br/>
		</div>
	}
}

export default MostrarApp