import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderTipoAnalisis = this.renderTipoAnalisis.bind(this)
	}

	componentWillMount() {
		this.props.mostrarTipoAnalisis(this.props.idTipoAnalisis)
	}

	renderTipoAnalisis(tipoAnalisis, cargando) {
		if(cargando) {
			return <Cargando/>
		} else if (tipoAnalisis){
			return <div>
				<h2>{ tipoAnalisis.descripcion }</h2>
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


		const { cargando, tipoAnalisis, error } = this.props.mostrar
		
			return <div className=''>
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
						<MensajeOerror error={error} mensaje={null}/>

						{ this.renderTipoAnalisis(tipoAnalisis, cargando) }
					</div>
				</div>
			</div>
		

	}
}

export default Mostrar