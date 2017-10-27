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
		let urlEstadistica1 = '/estadisticas/diagnosticos-anuales'
		let urlEstadistica2 = '/estadisticas/diagnosticos-anual'

		let activeEstadistica1 = ''
		let activeEstadistica2 = ''

		switch(this.props.pathname) {
			case urlEstadistica1:
				activeEstadistica1 = 'active'
				activeEstadistica2 = ''
				break

			case urlEstadistica2:
				activeEstadistica1 = ''
				activeEstadistica2 = 'active'
				break
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
				<li className="nav-item nav-link" className={activeEstadistica1}>
				    <Link to={urlEstadistica1}>Anuales</Link>
				</li>
				<li className="nav-item nav-link" className={activeEstadistica2}>
				    <Link to={urlEstadistica2}>Anual</Link>
				</li>
			</ul>
			<br/>

			{ this.props.children }
		</div>
	}
}

export default EstadisticasApp