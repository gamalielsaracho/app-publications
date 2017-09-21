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
		this.renderMenu = this.renderMenu.bind(this)
		this.renderBtnAgregarConsultaByRol = this.renderBtnAgregarConsultaByRol.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.listarConsultas()
	}

	renderBtnAgregarConsultaByRol() {
		if(removeAccents(this.personalLocalSt.rol) == 'medico') {
			return <button type="button" onClick={ () => { this.props.abrirFormularioCrearConsulta() } }  className="text-center btn btn-success btn-space">Agregar Consulta</button>
		} else {
			return <span></span>
		}
	}

	renderMenu(listar) {
		if(listar.cargando) {
			return <p>Cargando..</p>
		} else {
			let consultas = listar.consultas

			if(this.props.datosCita.cita != undefined) {
				consultas = consultas.filter((i) => {
					return i.consulta.id_preconsulta ==  this.props.idPreConsulta && 
					i.consulta.id_personal == this.props.datosCita.personal.id_personal
				})
			}


			// console.log('consultas ################# ---->')
			// console.log(consultas[0])

			if(consultas.length == 0) {
				return <div>
					{ this.renderBtnAgregarConsultaByRol() }
				</div>
			} else {				
				return <div>
					<ul className="nav nav-tabs">
						<li className="nav-item">
				    		<Link to={`/dashboard/citas/${this.props.idCita}/preconsulta/${this.props.idPreConsulta}/consulta/${consultas[0].consulta.id_consulta}`}>Consulta</Link>
						</li>
					</ul>
				</div>
			}
		}
	}

	render() {

		// id de la pre-consulta desde la url.
		let idPreConsulta = this.props.idPreConsulta
			// console.log(idPreConsulta)

		return <div>
			<br/>
			<MostrarPreConsultaContainer 
				idPreConsulta={idPreConsulta}/>

			{/*  
			*/}
			<ListarPreConsultaParametrosContainer idPreConsulta={idPreConsulta}/>

			<FormularioConsultaContainer
				idPreConsulta={idPreConsulta}
				datosCita={this.props.datosCita}/>

			{ this.renderMenu(this.props.listar) }



			{ this.props.children }

		</div>
	}
}

export default MostrarApp