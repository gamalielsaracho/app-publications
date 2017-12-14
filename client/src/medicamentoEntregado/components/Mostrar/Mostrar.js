import React, { Component } from 'react'

import ReactModal from 'react-modal'
import moment from 'moment'

import jwtDecode from 'jwt-decode'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentoEntregado = this.renderMedicamentoEntregado.bind(this)
		this.renderBtnsOpcionesCrud = this.renderBtnsOpcionesCrud.bind(this)
		
		this.getEstadoHabilitado = this.getEstadoHabilitado.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	// El objeto urls es pasado como property al ser llamado dentro
	// de MostrarApp.
	componentWillMount() {
		this.props.mostrarMedicamentoEntregado(this.props.urls.idMedicamentoEntregado)
	}

	getEstadoHabilitado(i) {
		let idRol = this.personalLocalSt.id_rol

		let desabilitado

		if(i.medicamentoEntregado.imprimido) {
			desabilitado = true
		} else {
			desabilitado = false
		}

		// 3 administración.
		if(idRol == 3) {
			desabilitado = false
		}

		return desabilitado
	}


	renderBtnsOpcionesCrud(i) {
		let idRol = this.personalLocalSt.id_rol

		// 1 farmaceutico.
		// 3 administración.
		if((idRol == 5) || (idRol == 3)) {
			return <div className='text-right no-print-data'>
				<button disabled={this.getEstadoHabilitado(i)} type="button" onClick={
					() => { this.props.abrirFormularioEditarMedicamentoEntregado(i.medicamentoEntregado.id_medicamentoEntregado) }} className="btn btn-warning btn-space">
					Editar
				</button>

				<button disabled={this.getEstadoHabilitado(i)} type="button" onClick={
					() => { this.props.eliminarMedicamentoEntregado(i.medicamentoEntregado.id_medicamentoEntregado) }} className="btn btn-danger btn-space">
					Eliminar
				</button>
			</div>
		} else {
			return <span></span>
		}
	}


	renderMedicamentoEntregado(dato, cargando) {
		if(cargando) {
			return <Cargando/>
		} else if (dato) {
			console.log(dato)
			return <div className='no-print-data'>
				<div className='row'>
			           
					<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
						<h3 className='text-center'>Paciente</h3>
						<p><strong>Número de documento:</strong>{ dato.paciente.nroDocumento }</p>
						<p><strong>Tipo de documento:</strong>{ dato.tpDocPaciente.descripcion }</p>

						<p><strong>Nombre:</strong>{ ' '+dato.paciente.nombres+' '+dato.paciente.apellidos }</p>
						<p><strong>Sexo:</strong>{ ' '+dato.paciente.sexo }</p>
						<p><strong>Fecha de nacimiento:</strong>{ ' '+moment(dato.paciente.fechaNacimiento).format('L') }</p>
						<p><strong>Celular:</strong>{ ' '+dato.paciente.celular +' '} <strong>Telefono:</strong>{ ' '+dato.paciente.telefono }</p>
						<p><strong>Dirección:</strong>{ ' '+dato.paciente.direccion }</p>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
						<h3 className='text-center'>Personal</h3>
						<p><strong>Número de documento:</strong>{ dato.farmaceutico.nroDocumento }</p>
						<p><strong>Tipo de documento:</strong>{ dato.tpDocFarmaceutico.descripcion }</p>
						<p><strong>Nombre:</strong>{ ' '+dato.farmaceutico.nombres+' '+dato.farmaceutico.apellidos }</p>
						<p><strong>Celular:</strong>{ ' '+dato.farmaceutico.celular +' '} <strong>Telefono:</strong>{ ' '+dato.farmaceutico.telefono }</p>
						<br/>
						<h4><strong>Fecha:</strong>{ ' '+moment(dato.medicamentoEntregado.fecha).format('DD-MM-YYYY') }</h4>
						<h4><strong>Hora:</strong>{ ' '+dato.medicamentoEntregado.hora }</h4>
						
					</div>
					<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
						{ this.renderBtnsOpcionesCrud(dato) }
					</div>
				</div>

			</div>
		}
	}

	render() {
		const { cargando, medicamentoEntregado } = this.props.mostrar
	
		let error = this.props.mostrar.error ? this.props.mostrar.error : 
			this.props.eliminar.error

		return <div>
			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderMedicamentoEntregado(medicamentoEntregado, cargando) }
		</div>

	}
}

export default Mostrar