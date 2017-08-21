import React, { Component } from 'react'
import { Link } from 'react-router'

import MostarPacienteContainer from '../Mostrar'

class MostrarApp extends Component {
	render() {
		let nroDocumento = this.props.nroDocumento
		let idTipoDocumento = this.props.idTipoDocumento
		return <div>
			<br/>
			<MostarPacienteContainer 
				nroDocumento={nroDocumento}
				idTipoDocumento={idTipoDocumento}/>

			<h3 className='text-center'>Historial Clínica</h3>
			<ul className="nav nav-tabs">
			  <li className="nav-item">
			    <a className="nav-link active">
			    	<Link to={`/pacientes/${nroDocumento}/${idTipoDocumento}/alergias`}>Alergias</Link>
			    </a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link">Consultas</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link">Dignosticos</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link">Medicamentos retirados</a>
			  </li>
			</ul>

			{ this.props.children }

		</div>
	}
}

export default MostrarApp