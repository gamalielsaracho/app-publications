import React, { Component } from 'react'
import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisisTipo = this.renderAnalisisTipo.bind(this)
	}

	componentWillMount() {
		this.props.mostrarAnalisisTipo(this.props.urls.idAnalisisTipo)
	}

	renderAnalisisTipo(dato, cargando) {
		if(cargando) {
			return <Cargando/>
		} else if (dato) {
			return <div>
				<h3><strong>Nombre:</strong> { dato.tipoAnalisis.descripcion }</h3>
			</div>
		}
	}

	render() {
		// 
		const { cargando, analisisTipo, error } = this.props.mostrar
		
		return <div className=''>
			<div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderAnalisisTipo(analisisTipo, cargando) }
				</div>
			</div>
		</div>

	}
}

export default Mostrar