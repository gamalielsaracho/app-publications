import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderCargando = this.renderCargando.bind(this)
		this.renderPreConsulta = this.renderPreConsulta.bind(this)
	}

	componentWillMount() {
		this.props.mostrarPreConsulta(this.props.idPreConsulta)
	}

	renderCargando(cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			return <span></span>
		}
	}

	renderPreConsulta(preConsulta) {
		if(preConsulta) {
			return <div>
				<p><strong>Nombre:</strong> { preConsulta.fecha }</p>
			</div>
		} else {
			return <span></span>
		}
	}

	render() {

		const { cargando, preConsulta, error, abierto } = this.props.mostrar

		console.log(this.props.mostrar)

		console.log("Mostrar estÁ: "+this.props.mostrar.abierto)
		
		return <div className='row'>
			<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
				{ this.renderCargando(cargando) }
				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderPreConsulta(preConsulta) }
			</div>
		</div>

	}
}

export default Mostrar