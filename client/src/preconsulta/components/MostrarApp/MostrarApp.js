import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostrarPreConsultaContainer from '../Mostrar'

// PreConsulta X Parametro
import ListarPreConsultaParametrosContainer from '../../../preConsultaParametro/components/Listar'

// Formulario Modal para agregar solo una consulta por pre-consulta.
import FormularioConsultaContainer from '../../../consulta/components/Formulario'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderMenuById = this.renderMenuById.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarConsultasFuncion()
	}

	renderMenuById(listar) {
		let rol = this.personalLocalSt.id_rol

		// 1 médico.
		// 3 administación.

		if((rol == 1) || (rol == 3)) {
			
			if(listar.cargando) {
				return <p>Cargando..</p>
			} else {
				let consultas = listar.consultas

				const { cargando, cita } = this.props.datosCita

				if(!cargando && cita) {
					consultas = consultas.filter((i) => {
						return i.consulta.id_preconsulta ==  this.props.urls.idPreConsulta && 
						i.consulta.id_personal == cita.personal.id_personal
					})
				}

				if(consultas.length == 0) {
					return <div>
						<button type="button" onClick={ () => { this.props.abrirFormularioCrearConsulta() } }  className="text-center btn btn-success btn-space">Agregar Consulta</button>
					</div>
				} else {				
					return <div>
						<ul className="nav nav-tabs">
							<li className="nav-item">
					    		<Link to={`/dashboard/citas/${this.props.urls.idCita}/preconsulta/${this.props.urls.idPreConsulta}/consulta/${consultas[0].consulta.id_consulta}`}>Consulta</Link>
							</li>
						</ul>
					</div>
				}
			}

		} else {
			return <span></span>
		}

	}

	render() {

		return <div>
			<br/>
			<MostrarPreConsultaContainer 
				idPreConsulta={this.props.urls.idPreConsulta}/>

			{/*  
			*/}
			<ListarPreConsultaParametrosContainer idPreConsulta={this.props.urls.idPreConsulta}/>

			<FormularioConsultaContainer
				idPreConsulta={this.props.urls.idPreConsulta}
				datosCita={this.props.datosCita}/>

			{ this.renderMenuById(this.props.listarConsultas) }

			{ this.props.children }

		</div>
	}
}

export default MostrarApp