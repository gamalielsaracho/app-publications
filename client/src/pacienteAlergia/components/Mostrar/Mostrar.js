import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderPacienteAlergia = this.renderPacienteAlergia.bind(this)
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	renderPacienteAlergia(alergia) {
		if(alergia) {
			return <div>
				<p><strong>Nombre:</strong> { alergia.descripcion }</p>
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


		const { cargando, alergia, error, abierto } = this.props.mostrar

		console.log("Mostrar estÁ: "+this.props.mostrar.abierto)
		
		if(abierto) {
			return <ReactModal isOpen={abierto}
				       	contentLabel="Minimal Modal Example"
				       	style={customStyles}>

				<div className='container'>

					<div className='row end-lg end-md end-sm end-xs'>
						<span className='icon-cross' onClick={() => { this.props.cerrarModalMostrarPacienteAlergia() }}></span>
					</div>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
							{ this.renderCargando(cargando) }
							<MensajeOerror error={error} mensaje={null}/>

							{ this.renderPacienteAlergia(alergia) }
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