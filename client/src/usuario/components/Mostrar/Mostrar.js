import React, { Component } from 'react'

// import {  } from '../../../globalActions'

import moment from 'moment'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

// import ListarContainer from '../../../pacienteAlergia/components/Listar'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderPersonal = this.renderPersonal.bind(this)
	}
	
	componentWillMount() {
		this.props.mostrarPersonal(this.props.urls.idPersonal)
	}

	renderPersonal(cargando, dato) {
		// console.log(paciente)

		if(cargando) {
			return <Cargando/>
		} else if (dato){
			console.log(dato)
			return <div>
				<p><strong>Numero de Documento:</strong> { dato.personal.nroDocumento }</p>
				<p><strong>Tipo de Documento:</strong> { dato.tipoDocumento.descripcion }</p>
				<p><strong>Nro. Registro:</strong> { dato.tipoDocumento.descripcion }</p>
				<p><strong>Nombres:</strong> { dato.personal.nroRegistro }</p>
				<p><strong>Apellidos:</strong> { dato.personal.apellidos }</p>
				<p><strong>Fecha de nacimiento:</strong> {  moment(dato.personal.fecha_nacimiento).format('DD-MM-YYYY') }</p>
				<p><strong>Dirección:</strong> { dato.personal.direccion }</p>
				<p><strong>Correo:</strong> { dato.personal.correo }</p>
				<p><strong>Celular:</strong> { dato.personal.celular }</p>
				<p><strong>Telefono:</strong> { dato.personal.telefono }</p>


				<p><strong>Rol:</strong> { dato.rol.descripcion }</p>	
				<p><strong>Especialidad:</strong> { dato.especialidad.descripcion }</p>				

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


		const { cargando, personal, error } = this.props.mostrar
		// ...
		return <div className='row no-print-data'>

			<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered'>
				<br/>
				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderPersonal(cargando, personal) }
			</div>
		</div>

	}
}

export default Mostrar