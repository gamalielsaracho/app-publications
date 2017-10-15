import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	render() {
		let listarMedicamentosActive
		let detalleMedicamentoActive


		if(this.props.urls.idMedicamento) {
			listarMedicamentosActive = ''
			detalleMedicamentoActive = 'active'
		} else {
			listarMedicamentosActive = 'active'
			detalleMedicamentoActive = ''
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={listarMedicamentosActive}>
			  	<Link to='/dashboard/medicamentos'>Listar Medicamentos</Link>
			  </li>
			  <li className="nav-item nav-link" className={detalleMedicamentoActive}>
			    <a className="nav-link">Detalle Medicamento</a>
			  </li>
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp