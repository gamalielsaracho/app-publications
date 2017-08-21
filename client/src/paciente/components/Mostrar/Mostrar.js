import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

// import ListarContainer from '../../../pacienteAlergia/components/Listar'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderPaciente = this.renderPaciente.bind(this)
	}
	
	componentWillMount() {
		this.props.mostrarPaciente(this.props.nroDocumento, this.props.idTipoDocumento)
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	renderSexo(mujer) {
		if(mujer) {
			return <span>Femenino</span> 
		} else {
			return <span>Masculino</span>
		}
	}

	renderPaciente(paciente) {
		console.log(paciente)

		if(paciente) {
			return <div >
				<p><strong>Numero de Documento:</strong> { paciente.pa.nroDocumento }</p>
				<p><strong>Tipo de Documento:</strong> { paciente.tipoDocumento.descripcion }</p>
				<p><strong>Nombres:</strong> { paciente.pa.nombres }</p>
				<p><strong>Apellidos:</strong> { paciente.pa.apellidos }</p>
				<p><strong>Fecha de nacimiento:</strong> { paciente.pa.fechaNacimiento }</p>
				<p><strong>Dirección:</strong> { paciente.pa.direccion }</p>
				<p><strong>Sexo:</strong>{ this.renderSexo(paciente.pa.mujer) }</p>
				<p><strong>Area:</strong> { paciente.area.descripcion }</p>
				<p><strong>Ciudad:</strong> { paciente.ciudad.descripcion }</p>
				
				{/* Pasamos los valores de nroDocumento y id_tipoDocumento
					desde la URL con ownProps para buscar todas alergias que tiene
					un paciente en específico, desde la base de datos.
				*/}

				{/* <ListarContainer
					nroDocumento={paciente.pa.nroDocumento}
					id_tipoDocumento={paciente.pa.id_tipoDocumento}/> */}
			</div>
		} else {
			return <span></span>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '50vh',
		  		position: 'none'
		  	}
		}


		const { cargando, paciente, error, abierto } = this.props.mostrar

		console.log("Mostrar estÁ: "+this.props.mostrar.abierto)
		
		if(abierto) {
			return <div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
					{ this.renderCargando(cargando) }
					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderPaciente(paciente) }
				</div>
			</div>
		} else {
			return <span></span>
		}

	}
}

export default Mostrar