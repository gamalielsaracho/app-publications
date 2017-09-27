import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	constructor(props) {
		super(props)
		// this.state = {
		// 	linkListarMedicamentos: true,
		// 	linkMostrarMedicamento: true
		// }
	}

	render() {
		let activeList
		let activeShow

		if(this.props.uls.idLoteMedicamento) {
			activeList = ''
			activeShow = 'active'
		} else {
			activeList = 'active'
			activeShow = ''
		}

		return <div>
			<ul className="nav nav-tabs">
			  <li className="nav-item nav-link" className={activeList}>
			    	<Link to='/dashboard/lotes-medicamentos'>Listar lotes</Link>
			  </li>
			  <li className="nav-item nav-link" className={activeShow}>
			    <a className="nav-link">Detalle lote</a>
			  </li>
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp