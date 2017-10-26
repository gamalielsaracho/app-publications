import React, { Component } from 'react'
import { Link } from 'react-router'

class EstadisticasApp extends Component {
	constructor(props) {
		super(props)
	}

	// componentWillMount() {
	// 	this.props.mostrarEstadistica1()
	// }
	
	
	render() {
		let activeEstadistica1 = ''
		let activeEstadistica2 = ''

		return <div>
			<ul className="nav nav-tabs no-print-data">
				<li className="nav-item nav-link" className={activeEstadistica1}>
				    <Link to='/estadisticas/diagnosticos-anuales'>Anuales</Link>
				</li>
				<li className="nav-item nav-link" className={activeEstadistica2}>
				    <Link to='/'>Anual</Link>
				</li>
			</ul>
			<br/>

			{ this.props.children }
		</div>
	}
}

export default EstadisticasApp