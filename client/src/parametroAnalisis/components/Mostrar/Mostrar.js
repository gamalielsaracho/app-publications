import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderParametroAnalisis = this.renderParametroAnalisis.bind(this)
	}

	componentWillMount() {
		this.props.mostrarParametroAnalisis(this.props.idParametroAnalisis)
	}

	renderParametroAnalisis(dato, cargando) {
		if(cargando) {
			return <Cargando/>
		} else if(dato) {
			// console.log(dato)
			return <div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
					<h4><strong>Nombre:</strong>{ ' '+ dato.parametro.descripcion }</h4>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
					<h4><strong>Unidad de medida:</strong>{ ' '+ dato.unidad.descripcion }</h4>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
					<h4><strong>Tipo de examen:</strong>{ ' '+ dato.tipoExamen.descripcion }</h4>
				</div>
			</div>
		}
	}

	render() {

		const { cargando, parametroAnalisis, error } = this.props.mostrar
		
		return <div className=''>
			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderParametroAnalisis(parametroAnalisis, cargando) }
		</div>
	}
}

export default Mostrar