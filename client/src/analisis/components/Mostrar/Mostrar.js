import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisis = this.renderAnalisis.bind(this)
	}

	componentWillMount() {
		// idAnalisis es pasado como property al ser llamado.
		this.props.mostrarAnalisis(this.props.idAnalisis)
	}

	renderAnalisis(analisis, cargando) {
		let urlToRedirect = ``

		// urls es pasado como property al ser llamado dentro de MostrarApp.
		if(this.props.urls.idAnalisisSolicitado) {
			urlToRedirect = `/dashboard/solicitudes-laboratorio/${this.props.urls.idAnalisisSolicitado}`
		} else if (this.props.urls.idConsulta) {
			urlToRedirect = `/dashboard/lista-analisis`
		}

		if(cargando) {
			return <Cargando/>
		} else if (analisis){

			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>	
					<p><strong>bioquímico/a:</strong>{ analisis.personal.nombres+' '+analisis.personal.apellidos }</p>
					<p><strong>Correo:</strong>{ analisis.personal.correo }</p>
					<p><strong>Celular:</strong>{ analisis.personal.celular }</p>
				</div>

				{/*  */}
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>	
					<button onClick={ () => { this.props.eliminarAnalisis(urlToRedirect, analisis.ana.id_analisis) } } className='btn btn-danger btn-space'>Eliminar</button>
				</div>				
			</div>
		}
	}

	render() {
		const { cargando, analisis } = this.props.mostrar

		let error = this.props.mostrar.error ? this.props.mostrar.error :
			this.props.eliminar.error
		
		return <div>
			<MensajeOerror error={error} mensaje={null}/>
			<br/>
			{ this.renderAnalisis(analisis, cargando) }
		</div>
	}
}

export default Mostrar