import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostarAnalisisSolicitadoContainer from '../Mostrar'

// Formulario Modal para EDITAR una consulta.
// import FormularioConsultaContainer from '../../../consulta/components/Formulario'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderMenuByRol = this.renderMenuByRol.bind(this)
		this.renderLinkDetalleGral = this.renderLinkDetalleGral.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.mostrarmostrarAnalisisPorIdAnalisisSolicitado(this.props.urls.idAnalisisSolicitado)
	}

	renderLinkDetalleGral(idAnalisis, detalleGeneral, url) {
		// Obtenemos el estado mostrar de mostrarAnalisisSolicitado.
		const { cargando, analisisSolicitado, error } = this.props.mostrarAnalisisSolicitado

		let solicitud = analisisSolicitado

		// Si No está caragando y solicitud es distinto a null.
		if(!cargando && solicitud) { // Si estas condition se cumple.
			// Preguntar si la solicitud está pendiente.
			if(solicitud.analisisSolicitado.pendiente) {
				return <span></span>
			} else {
				// Si no está pendiente, muestro el link para mostrar el detalle
				// gral de todos los análisis realizados.
				return <li className="nav-item nav-link" className={detalleGeneral}>
					<Link to={`${url}`}>Detalle general de análisis ya realizados</Link>
				</li>
			}
		}
	}

	renderMenuByRol() {
		let rol = removeAccents(this.personalLocalSt.rol)
		let idPersonal = this.personalLocalSt.id_personal

		const { cargando, analisis, error } = this.props.mostrarByIdAnalisisSolicitado

		let detalleAnalisis
		let detalleGeneral

		if(this.props.urls.idAnalisis) {
			detalleAnalisis = 'active'
			detalleGeneral = ''
		} else {
			detalleAnalisis = ''
			detalleGeneral = ''
		}

		if(cargando) {
			return <p>Cargando Menu..</p>
		} else {
			// 
			if(analisis.length == 0) {
				let datos = {}
				datos.id_analisisSolicitado = this.props.urls.idAnalisisSolicitado
				datos.id_personal = idPersonal

				if(rol == 'administracion' || rol == 'laboratorio') {
					return <button type="button"
						onClick={ () => { this.props.crearAnalisis(datos) } } className="text-center btn btn-success btn-space">
						Crear Análisis
					</button>
				} else {
					return <span></span>
				}
			} else {
				// console.log(analisis[0])

				if(rol == 'administracion' || rol == 'laboratorio') {
					
					if(this.props.urls.idPaciente) {
						let url = `/dashboard/pacientes/${this.props.urls.idPaciente}/solicitudes-laboratorio/${this.props.urls.idAnalisisSolicitado}/analisis/${analisis[0].id_analisis}/vista-general`

						return <ul className="nav nav-tabs no-print-data">
							{ this.renderLinkDetalleGral(analisis[0].id_analisis, detalleGeneral, url) }
						</ul>
					} else {
						let url = `/dashboard/solicitudes-laboratorio/${this.props.urls.idAnalisisSolicitado}/analisis/${analisis[0].id_analisis}/vista-general`
						
						return <ul className="nav nav-tabs no-print-data">
							<li className="nav-item nav-link" className={detalleAnalisis}>
								<Link to={`/dashboard/solicitudes-laboratorio/${this.props.urls.idAnalisisSolicitado}/analisis/${analisis[0].id_analisis}/analisis-tipos`}>Análisis</Link>
							</li>
							{ this.renderLinkDetalleGral(analisis[0].id_analisis, detalleGeneral, url) }
						</ul>
					}
				} else {
					let url = `/dashboard/pacientes/${this.props.urls.idPaciente}/solicitudes-laboratorio/${this.props.urls.idAnalisisSolicitado}/analisis/${analisis[0].id_analisis}/vista-general`
					
					return <ul className="nav nav-tabs no-print-data">
						{ this.renderLinkDetalleGral(analisis[0].id_analisis, detalleGeneral, url) }
					</ul>
				}

			}
		}
	}

	render() {

		let activeList
		let activeShow

		if(this.props.urls.idAnalisisSolicitado) {
			activeList = 'active'
			activeShow = ''
		} else {
			activeList = ''
			activeShow = 'active'
		}

		return <div>
			<br/>
			<MostarAnalisisSolicitadoContainer
				urls = { this.props.urls }/>
			<br/>
			{ this.renderMenuByRol() }

			{ this.props.children }
		</div>
	}
}

export default MostrarApp