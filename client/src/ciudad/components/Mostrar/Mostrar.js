import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderCiudad = this.renderCiudad.bind(this)
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	renderCiudad(ciudad) {
		if(ciudad) {
			return <div>
				<span>Nombre: { ciudad.descripcion }</span>
			</div>
		} else {
			return <span></span>
		}
	}

	render() {
		const customStyles = {
			// overlay : {
			//     position: '',
			//     // top: 0,
			//     // left: 0,
			//     // right: 0,
			//     // bottom: 0,
			//     // backgroundColor: 'rgba(255, 255, 255, 0.75)'
			// },
		    content : {
			    top: '39%',
			    left: '50%',
			    right: 'auto',
			    bottom: 'auto',
			    marginRight: '-50%',
			    transform: 'translate(-50%, -50%)',
			    border: 'none',
			    background: 'none'
		  	}
		}

		let styles = {
			mostrarRolContainer: {
				"boxShadow":"0 0 10px #888",
				"padding":"1em",
				"background": "#fff"
			}
		}

		const { cargando, ciudad, error, abierto } = this.props.mostrar

		console.log("Mostrar estÁ: "+this.props.mostrar.abierto)
		
		if(abierto) {
			return <ReactModal isOpen={abierto}
				       	contentLabel="Minimal Modal Example"
				       	style={customStyles}>

				<div style={styles.mostrarRolContainer} className='container'>
					
					<div className='row end-lg end-md end-sm end-xs'>
						<span onClick={() => { this.props.cerrarModalMostrarCiudad() }}>Cerrar</span>
					</div>

					<div className='row center-lg center-md center-sm center-xs'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							{ this.renderCargando(cargando) }
							<MensajeOerror error={error} mensaje={null}/>

							{ this.renderCiudad(ciudad) }
						</div>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
							
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