import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderEspecialidad = this.renderEspecialidad.bind(this)
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	renderEspecialidad(rol) {
		if(rol) {
			return <div>
				<p><strong>Descripción:</strong> { rol.descripcion }</p>
			</div>
		} else {
			return <span></span>
		}
	}

	render() {
		const customStyles = {
		    content : {
		  		height: '40vh'
		  	}
		}


		const { cargando, especialidad, error, abierto } = this.props.mostrar

		console.log("Mostrar estÁ: "+this.props.mostrar.abierto)
		
		if(abierto) {
			return <ReactModal isOpen={abierto}
				       	contentLabel="Minimal Modal Example"
				       	style={customStyles}>

				<div className='container'>
					<div className='row'>
						<p className='text-right'>
							<span className='icon-cross' onClick={() => { this.props.cerrarModalMostrarEspecialidad() }}></span>
						</p>
					</div>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							{ this.renderCargando(cargando) }
							<MensajeOerror error={error} mensaje={null}/>

							{ this.renderEspecialidad(especialidad) }
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