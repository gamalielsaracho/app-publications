import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderLoteMedicamento = this.renderLoteMedicamento.bind(this)
	}

	componentWillMount() {
		this.props.mostrarLoteMedicamento(this.props.idLoteMedicamento)
	}

	renderLoteMedicamento(i) {
		// console.log(i)
		if(i) {
				// <p><strong>Nombre Lote. cool.!:</strong> { loteMedicamento.id_loteMedicamento }</p>
			return <div>
				<h3>Lote</h3>
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Número de lote:</strong>{ i.lote.numeroLote }</p>				
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Fecha de vencimiento:</strong>{ i.lote.fechaVencimiento }</p>				
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Cantidad Recibida:</strong>{ i.lote.cantidadRecibida }</p>				
					</div>
				</div>

				<h4 className=''>Proveedor</h4>
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Nombre:</strong>{ i.proveedor.nombre }</p>				
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Dirección:</strong>{ i.proveedor.direccion }</p>				
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Telefono:</strong>{ i.proveedor.telefono }</p>				
					</div>
				</div>

				<br/>
				<h3>Medicamento</h3>
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

				<h4 className=''>Farmacéutica</h4>
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

			</div>
		} else {
			return <span></span>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '40vh',
		  		position: 'none'
		  	}
		}


		const { cargando, loteMedicamento, error } = this.props.mostrar
		
		if(cargando) {
			return <Cargando/>
		} else {
			return <div>
				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderLoteMedicamento(loteMedicamento) }
			</div>
		}

	}
}

export default Mostrar