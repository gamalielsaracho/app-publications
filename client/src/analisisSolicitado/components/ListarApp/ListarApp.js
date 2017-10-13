import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let activeList = true
		let activeShow = true
		let urlListarSolicitudes = ''

		if(this.props.urls.idPaciente) {
			urlListarSolicitudes = `/dashboard/pacientes/${this.props.urls.idPaciente}/solicitudes-laboratorio`
		} else {
			urlListarSolicitudes = `/dashboard/solicitudes-laboratorio`
		}

		// console.log(urlListarSolicitudes)
		if(this.props.urls.idAnalisisSolicitado) {
			activeList = ''
			activeShow = 'active'
		} else {
			activeList = 'active'
			activeShow = ''
		}

		return <div>
			<ul className="nav nav-tabs no-print-data">
			  <li className="nav-item nav-link" className={activeList}>
			    	<Link to={urlListarSolicitudes}>Listar</Link>
			  </li>
			  <li className="nav-item nav-link" className={activeShow}>
			    <a className="nav-link">Detalle solicitud laboratorio</a>
			  </li>
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp