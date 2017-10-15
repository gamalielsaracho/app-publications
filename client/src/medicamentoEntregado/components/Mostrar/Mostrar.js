import React, { Component } from 'react'

import ReactModal from 'react-modal'
import moment from 'moment'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentoEntregado = this.renderMedicamentoEntregado.bind(this)
	}

	// El objeto urls es pasado como property al ser llamado dentro
	// de MostrarApp.
	componentWillMount() {
		this.props.mostrarMedicamentoEntregado(this.props.urls.idMedicamentoEntregado)
	}

	renderMedicamentoEntregado(dato, cargando) {
		if(cargando) {
			return <Cargando/>
		} else if (dato) {
			return <div className=''>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
						<h3 className='text-center'>Paciente</h3>
						<p><strong>Número de documento:</strong>{ dato.paciente.nroDocumento }</p>
						<p><strong>Nombre:</strong>{ ' '+dato.paciente.nombres+' '+dato.paciente.apellidos }</p>
						<p><strong>Sexo:</strong>{ ' '+dato.paciente.sexo }</p>
						<p><strong>Fecha de nacimiento:</strong>{ ' '+moment(dato.paciente.fechaNacimiento).format('L') }</p>
						<p><strong>Celular:</strong>{ ' '+dato.paciente.celular +' '} <strong>Telefono:</strong>{ ' '+dato.paciente.telefono }</p>
						<p><strong>Dirección:</strong>{ ' '+dato.paciente.direccion }</p>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
						<h3 className='text-center'>Personal</h3>
						<p><strong>Nombre:</strong>{ ' '+dato.personal.nombres+' '+dato.personal.apellidos }</p>
						<p><strong>Celular:</strong>{ ' '+dato.personal.celular +' '} <strong>Telefono:</strong>{ ' '+dato.personal.telefono }</p>
						<br/>
						<h4><strong>Fecha:</strong>{ ' '+moment(dato.medicamentoEntregado.fecha).format('L') }</h4>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
						<button type="button" onClick={() => { this.props.abrirFormularioEditarMedicamentoEntregado(dato.medicamentoEntregado.id_medicamentoEntregado) }} className="btn btn-warning btn-space">Editar</button>
						<button type="button" onClick={() => { this.props.eliminarMedicamentoEntregado(dato.medicamentoEntregado.id_medicamentoEntregado) }} className="btn btn-danger btn-space">Eliminar</button>
					</div>
				</div>
			</div>
		}
	}

	render() {
		const { cargando, medicamentoEntregado, error } = this.props.mostrar
	
		return <div>
			<div className='row'>
				<MensajeOerror error={error} mensaje={null}/>
			</div>

			{ this.renderMedicamentoEntregado(medicamentoEntregado, cargando) }
		</div>

	}
}

export default Mostrar