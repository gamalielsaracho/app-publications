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
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.mostrarmostrarAnalisisPorIdAnalisisSolicitado(this.props.urls.idAnalisisSolicitado)
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
					return <ul className="nav nav-tabs">
						<li className="nav-item nav-link" className={detalleAnalisis}>
							<Link to={`/dashboard/solicitudes-laboratorio/${this.props.urls.idAnalisisSolicitado}/analisis/${analisis[0].id_analisis}/analisis-tipos`}>Análisis</Link>
						</li>
						<li className="nav-item nav-link" className={detalleGeneral}>
					    	<Link to={`/dashboard`}>Detalle general de análisis ya realizados</Link>
						</li>
					</ul>
				} else {
					return <ul className="nav nav-tabs">
						<li className="nav-item nav-link" className={detalleGeneral}>
					    	<Link to={`/dashboard`}>Detalle general de análisis ya realizados</Link>
						</li>
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
			<MostarAnalisisSolicitadoContainer
				urls = { this.props.urls }/>
			<br/>
			{ this.renderMenuByRol() }

			{ this.props.children }
		</div>
	}
}

export default MostrarApp