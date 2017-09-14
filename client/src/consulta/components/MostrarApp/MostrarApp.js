import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostrarConsultaContainer from '../Mostrar'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		// this.renderMenu = this.renderMenu.bind(this)
		// this.renderBtnAgregarConsultaByRol = this.renderBtnAgregarConsultaByRol.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	// componentWillMount() {
	// 	this.props.listarConsultas()
	// }

	// renderBtnAgregarConsultaByRol() {
	// 	if(removeAccents(this.personalLocalSt.rol) == 'medico') {
	// 		return <button type="button" onClick={ () => { this.props.abrirFormularioCrearConsulta() } }  className="text-center btn btn-success btn-space">Agregar Consulta</button>
	// 	} else {
	// 		return <span></span>
	// 	}
	// }

	// renderMenu(listar) {
	// 	if(listar.cargando) {
	// 		return <p>cargando..</p>
	// 	} else {
	// 		let consultas = listar.consultas

	// 		consultas = consultas.filter((i) => {
	// 			return i.consulta.id_preconsulta ==  this.props.idPreConsulta && 
	// 			i.consulta.id_personal == this.personalLocalSt.id_personal
	// 		})

	// 		// console.log('consultas ################# ---->')
	// 		// console.log(consultas)

	// 		if(consultas.length == 0) {
	// 			return <div>
	// 				{ this.renderBtnAgregarConsultaByRol() }
	// 			</div>
	// 		} else {
	// 			// return <li className="nav-item">
	// 			//     <a className="nav-link active">
	// 			//     </a>
	// 			// </li>
	// 			return <div>
	// 				<ul className="nav nav-tabs">
	// 					<li className="nav-item">
	// 			    		<Link to={`/dashboard/citas/${this.props.cita.cita.id_cita}/preconsulta/${this.props.cita.cita.id_preconsulta}`}>Consulta</Link>
	// 					</li>
	// 				</ul>
	// 			</div>
	// 		}
	// 	}
	// }

	render() {

		// id de la pre-consulta desde la url.
		// let idPreConsulta = this.props.idPreConsulta

		return <div>
			<br/>

			<MostrarConsultaContainer 
				idConsulta = {this.props.idConsulta}/>

			{/*  
				{ this.renderMenu(this.props.listar) }
			*/}

			<br/>
			<ul className="nav nav-tabs">
				<li className="nav-item">
				    <Link to={`/dashboard/citas`}>Tratamientos</Link>
				</li>
				<li className="nav-item">
				    <Link to={`/dashboard/citas`}>Medicamentos Solicitados</Link>
				</li>
				<li className="nav-item">
				    <Link to={`/dashboard/citas`}>Analisis Solicitados</Link>
				</li>
			</ul>

			{ this.props.children }
		</div>
	}
}

export default MostrarApp