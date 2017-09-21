import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamento = this.renderMedicamento.bind(this)
	}

	componentWillMount() {
		this.props.mostrarMedicamento(this.props.idMedicamento)
	}
	
	renderMedicamento(i) {
		if(i) {
			return <div>
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3'>
						<p><strong>Nombre Medicamento/a:</strong>{ i.nombreMedicamento.descripcion }</p>
						<p><strong>Tipo consumo:</strong>{ i.tipoConsumo.descripcion }</p>				
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3'>
						<p><strong>Dosis:</strong>{ i.dosis.valor }</p>				
						<p><strong>Presentación:</strong>{ i.presentacion.descripcion }</p>
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3'>
						<p><strong>Unidad de medida:</strong>{ i.unidad.descripcion }</p>				
						<p><strong>Cantidad x Unidad:</strong>{ i.medicamento.cantidadFarmaceutica }</p>				
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-3'>
						<p><strong>Stock mínimo:</strong>{ i.medicamento.stockMinimo }</p>				
					</div>
				</div>

				<h3>Farmacéutica</h3>
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Nombre:</strong>{ i.farmaceutica.nombre }</p>				
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Dirección:</strong>{ i.farmaceutica.direccion }</p>				
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Telefono:</strong>{ i.farmaceutica.telefono }</p>				
					</div>
				</div>

				<div className='row'>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarMedicamento(i.medicamento.id_medicamento) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarMedicamento(i.medicamento.id_medicamento) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>

			</div>
		} else {
			return <span></span>
		}
	}

	render() {
		const { cargando, medicamento, error, abierto } = this.props.mostrar
		
		if(cargando) {
			return <Cargando/>
		} else {
			return <div>
				<div>
					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderMedicamento(medicamento) }
				</div>
			</div>
		}
	}
}

export default Mostrar