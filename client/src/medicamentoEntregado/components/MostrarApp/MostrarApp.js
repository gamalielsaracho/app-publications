import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import MostarMedicamentoEntregadoContainer from '../Mostrar'

// Formulario Modal para EDITAR un recibo de medicamentos entregados.
import FormularioMedicamentoEntregadoContainer from '../Formulario'

class MostrarApp extends Component {
	constructor(props) {
		super(props)
		this.renderFormularioMedicamentoEntregado = this.renderFormularioMedicamentoEntregado.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	renderFormularioMedicamentoEntregado() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioMedicamentoEntregadoContainer/>
		} else {
			return <span></span>
		}
	}


	render() {
		let urlListarMedicamentos = `/dashboard/medicamentos-entregados/${this.props.urls.idMedicamentoEntregado}/medicamentos`
		let activeListarMedicamentos = ''

		let urlMedicamentosEntrgadosImpresion = `/dashboard/medicamentos-entregados/${this.props.urls.idMedicamentoEntregado}/vista-general-comprobante`
		let activeMedicamentosEntrgadosImpresion = ''

		if(this.props.pathname == urlListarMedicamentos) {
			activeListarMedicamentos = 'active'
		}

		if(this.props.pathname == urlMedicamentosEntrgadosImpresion) {
			activeMedicamentosEntrgadosImpresion = 'active'
		}

		return <div className=''>
			<br/>

			<MostarMedicamentoEntregadoContainer 
				urls = {this.props.urls}/>

			{ this.renderFormularioMedicamentoEntregado() }

			<br/>
			<ul className="nav nav-tabs no-print-data">
				<li className="nav-item nav-link" className={activeListarMedicamentos}>
				    <Link to={urlListarMedicamentos}>Medicamentos</Link>
				</li>

				<li className="nav-item nav-link" className={activeMedicamentosEntrgadosImpresion}>
				    <Link to={urlMedicamentosEntrgadosImpresion}>Vista general impresión</Link>
				</li>
			</ul>
				
			{ this.props.children }
		</div>
	}
}

export default MostrarApp