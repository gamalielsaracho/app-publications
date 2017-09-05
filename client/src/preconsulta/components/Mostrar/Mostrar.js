import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

// PreConsulta X Parametro.
import FormularioPreConsultaParametroContainer from '../../../preConsultaParametro/components/Formulario'

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
		if(preConsulta && preConsulta.personal !== undefined) {
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
					<p><strong>Enfermero/a:</strong>{ preConsulta.personal.nombres +' '+ preConsulta.personal.apellidos }</p>
					<p><strong>Fecha:</strong>{ preConsulta.preconsulta.fecha }</p>
					<p><strong>Nivel:</strong>{ preConsulta.nivel.descripcion }</p>				
				</div>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
					<FormularioPreConsultaParametroContainer
						idPreConsulta={this.props.idPreConsulta}/>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}

	render() {

		const { cargando, preConsulta, error, abierto } = this.props.mostrar

		// console.log(this.props.mostrar)
		
		return <div>
			{ this.renderCargando(cargando) }
			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderPreConsulta(preConsulta) }
		</div>

	}
}

export default Mostrar