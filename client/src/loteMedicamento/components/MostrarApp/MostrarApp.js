import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostarLoteMedicamentoContainer from '../Mostrar'

// Formulario Modal para EDITAR un medicamento.
// import FormularioMedicamentoContainer from '../../../medicamento/components/Formulario'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		// this.renderMenu = this.renderMenu.bind(this)
		// this.renderBtnAgregarConsultaByRol = this.renderBtnAgregarConsultaByRol.bind(this)

		// this.renderFormularioMedicamento = this.renderFormularioMedicamento.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	// renderFormularioMedicamento() {
	// 	if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
	// 		return <FormularioMedicamentoContainer/>
	// 	} else {
	// 		return <span></span>
	// 	}
	// }


	render() {

			// { this.renderFormularioMedicamento() }
		return <div>
			<br/>
			<MostarLoteMedicamentoContainer 
				idLoteMedicamento = {this.props.idLoteMedicamento}/>

			<br/>

			{ this.props.children }
		</div>
	}
}

export default MostrarApp