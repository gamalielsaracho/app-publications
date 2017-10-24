import React, { Component } from 'react'

import { formatDate } from '../../../globalActions'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

// import ListarContainer from '../../../pacienteAlergia/components/Listar'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderPaciente = this.renderPaciente.bind(this)
	}
	
	componentWillMount() {
		this.props.mostrarPaciente(this.props.idPaciente)
	}

	renderPaciente(cargando, paciente) {
		// console.log(paciente)

		if(cargando) {
			return <Cargando/>
		} else if (paciente){
			return <div>
				<p><strong>Numero de Documento:</strong> { paciente.pa.nroDocumento }</p>
				<p><strong>Tipo de Documento:</strong> { paciente.tipoDocumento.descripcion }</p>
				<p><strong>Nombres:</strong> { paciente.pa.nombres }</p>
				<p><strong>Apellidos:</strong> { paciente.pa.apellidos }</p>
				<p><strong>Fecha de nacimiento:</strong> { formatDate(paciente.pa.fechaNacimiento) }</p>
				<p><strong>Dirección:</strong> { paciente.pa.direccion }</p>
				<p><strong>Sexo:</strong>{ paciente.pa.sexo }</p>
				<p><strong>Area:</strong> { paciente.area.descripcion }</p>
				<p><strong>Ciudad:</strong> { paciente.ciudad.descripcion }</p>				
			</div>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '50vh',
		  		position: 'none'
		  	}
		}


		const { cargando, paciente, error } = this.props.mostrar
		// ...
		return <div className='row'>
			<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderPaciente(cargando, paciente) }
			</div>
		</div>

	}
}

export default Mostrar