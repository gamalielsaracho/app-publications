import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderParametroPreConsulta = this.renderParametroPreConsulta.bind(this)
	}


	renderParametroPreConsulta(cargando, dato) {
		if(cargando) {
			// console.log(dato)
			return <Cargando/>
		} else if(dato) {
			return <div>
				<p><strong>Nombre:</strong> { dato.parametro.descripcion }</p>
				<p><strong>Unidad:</strong> { dato.unidad.descripcion }</p>
				<p><strong>Valor normal:</strong> { dato.parametro.valorNormal }</p>
				<p><strong>Valor alto:</strong> { dato.parametro.valorAlto }</p>
				<p><strong>Valor bajo:</strong> { dato.parametro.valorBajo }</p>
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


		const { cargando, parametro, error, abierto } = this.props.mostrar

		// console.log("Mostrar estÁ: "+this.props.mostrar.abierto)
		
		if(abierto) {
			return <ReactModal isOpen={abierto}
				       	contentLabel="Minimal Modal Example"
				       	style={customStyles}>

				<div className='container'>

					<div className='row end-lg end-md end-sm end-xs'>
						<span className='icon-cross' onClick={() => { this.props.cerrarModalMostrarParametroPreConsulta() }}></span>
					</div>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
							<MensajeOerror error={error} mensaje={null}/>

							{ this.renderParametroPreConsulta(cargando, parametro) }
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