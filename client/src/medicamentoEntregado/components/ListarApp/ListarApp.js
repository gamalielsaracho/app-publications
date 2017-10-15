import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let activeListarMedicamentosEntregados
		let activeMostrarMedicamentoEntregado

		if(this.props.urls.idMedicamentoEntregado) {
			activeMostrarMedicamentoEntregado = 'active'
			activeListarMedicamentosEntregados = ''
		} else {
			activeMostrarMedicamentoEntregado = ''
			activeListarMedicamentosEntregados = 'active'
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeListarMedicamentosEntregados}>
			  	<Link to={`/dashboard/medicamentos-entregados`}>Listar medicamentos entregados</Link>
			  </li>
			  <li className="nav-item nav-link" className={activeMostrarMedicamentoEntregado}>
			    <a className="nav-link">Detalle medicamento entregado</a>
			  </li>
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp