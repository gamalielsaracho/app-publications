import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentoAgregado = this.renderMedicamentoAgregado.bind(this)
		this.renderDrogas = this.renderDrogas.bind(this)
	}

	renderDrogas(drogas) {
		if(drogas) {
			return <div>
				{
					drogas.map((i) => {
						return <div key={i.medicamentoDroga.id_medicamentoDroga}>
					    	<h4>- { i.droga.descripcion +' '+i.medicamentoDroga.descripcionProporcion }</h4>
					    </div>		
					})
				}
			</div>
		} else {
			return <span></span>
		}
	}

	renderMedicamentoAgregado(cargando, dato) {
		if(cargando) {
			return <Cargando/>
		} else if(dato) {
			// console.log(dato)
			return <div>
				<h4><strong>Medicamento:</strong> { 
					' '+ dato.nombreMedicamento.descripcion +' '+
				    dato.medicamento.cantidadXunidad +' '+
				    dato.presentacion.descripcion +' '
				} <strong>Lote:</strong>{ dato.medicamentoXentregado.lote }</h4>

			   	{ this.renderDrogas(dato.drogas) }
				
				<h4><strong>Observaciones:</strong>{ ' '+ dato.medicamento.observaciones }</h4>

				<h4><strong>Farmaceutica:</strong>{ 
					' '+ dato.farmaceutica.nombre +' | '+
				    dato.farmaceutica.direccion +' | '+
				    dato.farmaceutica.telefono
				}</h4>
			</div>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '40vh',
		  		position: 'none'
		  	}
		}

		const { cargando, medicamentoAgregado, error, abierto } = this.props.mostrar

		// ..
		if(abierto) {
			return <ReactModal isOpen={abierto}
				       	contentLabel="Minimal Modal Example"
				       	style={customStyles}>

				<div className='container'>

					<div className='row end-lg end-md end-sm end-xs'>
						<span className='icon-cross' onClick={() => { this.props.cerrarModalMostrarMedicamentoAgregado() }}></span>
					</div>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
							<MensajeOerror error={error} mensaje={null}/>

							{ this.renderMedicamentoAgregado(cargando, medicamentoAgregado) }
						</div>
					</div>
				</div>

			</ReactModal>
		} else {
			return <span></span>
		}

	}
}

export default Mostrar