import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostrarPreConsultaContainer from '../Mostrar'

// PreConsulta X Parametro
import ListarPreConsultaParametrosContainer from '../../../preConsultaParametro/components/Listar'

// Formulario Modal para agregar solo una consulta por pre-consulta.
// import FormularioConsultaContainer from '../../../consulta/components/Formulario'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderMenu = this.renderMenu.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
	}

	renderMenu(listar) {
		// 1 médico.
		// 3 administación.
		// let rol = this.personalLocalSt.id_rol

		// let activeMostrarConsulta = ''

		// if(this.props.urls.idPreConsulta && this.props.urls.idConsulta) {
		// 	activeMostrarConsulta = 'active'
		// }

		// const { cargando, consulta, error } = this.props.mostrarPorIdPersonalYidPreConsulta

		// // console.log(this.props.mostrarPorIdPersonalYidPreConsulta)
		// if(!cargando && consulta) {
		// 		return <div>
		// 			<ul className="nav nav-tabs no-print-data">
		// 				<li className="nav-item nav-link" className={activeMostrarConsulta}>
		// 					<Link to={`/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consulta/${consulta.id_consulta}`}>Consulta</Link>
		// 				</li>
		// 			</ul>
		// 		</div>
		// } else {
		// 		return <div>
		// 			<FormularioConsultaContainer
		// 					idPreConsulta={this.props.urls.idPreConsulta}/>

		// 			<ul className="nav nav-tabs no-print-data">
		// 			  <li className="nav-item nav-link">
		// 				<button onClick={ this.props.abrirFormularioCrearConsulta } className='btn btn-success'>Agregar</button>
		// 			  	<br/>
		// 			  	<br/>
		// 			  </li> 
		// 			</ul>
		// 		</div>
		// }



		return <div>
			
		</div>
	}

	render() {
		return <div>
			<br/>

			<MostrarPreConsultaContainer 
				idPreConsulta={this.props.urls.idPreConsulta}
				urls = {this.props.urls}/>

			{/*  
			*/}

			<ListarPreConsultaParametrosContainer idPreConsulta={this.props.urls.idPreConsulta}/>

			{ this.renderMenu() }

			{ this.props.children }

		</div>
	}
}

export default MostrarApp