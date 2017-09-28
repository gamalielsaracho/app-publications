import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let activeList = true
		let activeShow = true

		// if(this.props.uls.idLoteMedicamento) {
		// 	activeList = ''
		// 	activeShow = 'active'
		// } else {
		// 	activeList = 'active'
		// 	activeShow = ''
		// }
			// <ul className="nav nav-tabs">
			  // <li className="nav-item nav-link" className={activeList}>
			  //   	<Link to='/dashboard/lotes-medicamentos'>Listar análisis solicitados</Link>
			  // </li>
			  // <li className="nav-item nav-link" className={activeShow}>
			  //   <a className="nav-link">Detalle análisis solicitado</a>
			  // </li>
			// </ul>

		return <div>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp