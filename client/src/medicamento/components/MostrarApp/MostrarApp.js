import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostarMedicamentoContainer from '../Mostrar'

// Formulario Modal para EDITAR un medicamento.
import FormularioMedicamentoContainer from '../../../medicamento/components/Formulario'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderFormularioMedicamento = this.renderFormularioMedicamento.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	renderFormularioMedicamento() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioMedicamentoContainer/>
		} else {
			return <span></span>
		}
	}


	render() {
		let urlListarDrogas = `/dashboard/medicamentos/${this.props.urls.idMedicamento}/drogas`

		let activeListarDrogas = ''

		if(this.props.pathname == urlListarDrogas) {
			activeListarDrogas = 'active'
		}

		return <div>
			<br/>

			<MostarMedicamentoContainer 
				urls = {this.props.urls}/>

			{ this.renderFormularioMedicamento() }

			<br/>
			<ul className="nav nav-tabs">
				<li className="nav-item nav-link" className={activeListarDrogas}>
				    <Link to={urlListarDrogas}>Drogas</Link>
				</li>
			</ul>
				
			{ this.props.children }
		</div>
	}
}

export default MostrarApp