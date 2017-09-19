import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderProveedor = this.renderProveedor.bind(this)
	}

	renderProveedor(proveedor, cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <div>
				<p><strong>Nombre:</strong> { proveedor.descripcion }</p>
				<p><strong>Dirección:</strong> { proveedor.direccion }</p>
				<p><strong>Telefono:</strong> { proveedor.telefono }</p>
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


		const { cargando, proveedor, error, abierto } = this.props.mostrar

		// console.log("Mostrar estÁ: "+this.props.mostrar.abierto)
		
		if(abierto) {
			return <ReactModal isOpen={abierto}
				       	contentLabel="Minimal Modal Example"
				       	style={customStyles}>

				<div className='container'>

					<div className='row end-lg end-md end-sm end-xs'>
						<span className='icon-cross' onClick={() => { this.props.cerrarModalMostrarProveedor() }}></span>
					</div>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
							<MensajeOerror error={error} mensaje={null}/>

							{ this.renderProveedor(proveedor, cargando) }
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