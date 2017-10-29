import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCiudad = this.renderCiudad.bind(this)
	}


	renderCiudad(cargando, dato) {
		if(cargando) {
			return <Cargando/>
		} else if(dato) {
			return <div>
				<p><strong>Nombre:</strong> { dato.ciudad.descripcion }</p>
				<p><strong>Departamento:</strong> { dato.departamento.descripcion }</p> 
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

		const { cargando, ciudad, error, abierto } = this.props.mostrar

		console.log("Mostrar estÁ: "+this.props.mostrar.abierto)
		
		if(abierto) {
			return <ReactModal isOpen={abierto}
				       	contentLabel="Minimal Modal Example"
				       	style={customStyles}>

				<div className='container'>
					
					<div className='row end-lg end-md end-sm end-xs'>
						<span className='icon-cross' onClick={() => { this.props.cerrarModalMostrarCiudad() }}></span>
					</div>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
							<MensajeOerror error={error} mensaje={null}/>

							{ this.renderCiudad(cargando, ciudad) }
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