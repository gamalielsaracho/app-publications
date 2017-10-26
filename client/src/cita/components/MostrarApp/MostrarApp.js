import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import moment from 'moment'

import MostarCitaContainer from '../Mostrar'


class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderMenuByRol = this.renderMenuByRol.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	renderMenuByRol() {
		let rol = this.personalLocalSt.id_rol

		// 1 médico.
		// 2 enfermería.
		// 3 administración.

			const { cargando, cita, error, abierto } = this.props.mostrar

			if(cargando) {
				return <p>Cargando..</p>
			} else if (cita){
				let citaInfo = cita.cita

				let fechaActual = moment(new Date()).format('DD-MM-YYYY')
				let fechaCita = moment(citaInfo.fecha).format('DD-MM-YYYY')
				
				// ..
				// console.log("La fecha de la cita es:"+ fechaCita)
				// console.log("La fecha ACTUAL:"+ fechaActual)

				if(citaInfo.id_preconsulta != null) {
					if((rol == 1) || (rol == 2) || (rol == 3)) {
						return <li className="nav-item">
							<a className="nav-link active">
								<Link to={`/dashboard/citas/${this.props.urls.idCita}/preconsulta/${citaInfo.id_preconsulta}`}>Pre-consulta</Link>
							</a>
						</li>
					} else {
						return <span></span>
					}
				} else {
					// ..
					if((rol == 2) || (rol == 3)) {
						return <li className="nav-item">
							<button onClick={ () => { this.props.abrirModalListarPreConsultasFechaDia() } } type="button" 
								className="text-center btn btn-success btn-space">
								Crear Pre-consulta
							</button>
						</li>
					} else {
						return <span></span>
					}
				}
		} else {
			return <span></span>
		}

	}

	render() {

		return <div>
			<br/>
			<MostarCitaContainer 
				idCita={this.props.urls.idCita}/>

			<ul className="nav nav-tabs">
				{ this.renderMenuByRol() }
				<br/>
				<br/>
			</ul>

			{ this.props.children }

		</div>
	}
}

export default MostrarApp