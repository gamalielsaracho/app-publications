import React, { Component } from 'react'
import { Link } from 'react-router'

import MostarPacienteContainer from '../Mostrar'

class MostrarApp extends Component {
	render() {
		let idPaciente = this.props.idPaciente
		
		return <div>
			<br/>
			<MostarPacienteContainer 
				idPaciente={idPaciente}/>

			<h3 className='text-center'>Historial Clínico</h3>
			<ul className="nav nav-tabs">
			  <li className="nav-item">
			    <a className="nav-link active">
			    	<Link to={`/dashboard/pacientes/${idPaciente}/alergias`}>Alergias</Link>
			    </a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link">Consultas</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link active">
			    	<Link to={`/dashboard/pacientes/${idPaciente}/solicitudes-laboratorio`}>
			    		Solicitudes laboratorio
			    	</Link>
			    </a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link">Análisis Realizados</a>
			  </li>
			</ul>
			<br/>
			{ this.props.children }

		</div>
	}
}

export default MostrarApp