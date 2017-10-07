import React, { Component } from 'react'
import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

import 
	ListarAnalisisTipoReferenciasContainer 
from '../../../analisisTipoReferencia/components/Listar'

import 
	FormularioAnalisisTipoReferenciaContainer 
from '../../../analisisTipoReferencia/components/Formulario'

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
		} else if (dato && !this.props.mostrarAnalisisSolicitado.cargando && this.props.mostrarAnalisisSolicitado.analisisSolicitado) {
			return <div>
				<h3 className='text-center'><strong>Nombre:</strong> { dato.tipoAnalisis.descripcion }</h3>

				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-4'>
						<FormularioAnalisisTipoReferenciaContainer
							idTipoAnalisis = { dato.analisisTipo.id_tipoAnalisis }
							analisisSolicitadoDatos = { this.props.mostrarAnalisisSolicitado.analisisSolicitado }
							urls = { this.props.urls }/>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-12 col-lg-7'>
						<ListarAnalisisTipoReferenciasContainer
							analisisTipoDatos = {dato}/>
					</div>
				</div>
			</div>
		}
	}

	render() {
		// 
		const { cargando, analisisTipo, error } = this.props.mostrar
		
		return <div className=''>
			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderAnalisisTipo(analisisTipo, cargando) }
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
		</div>

	}
}

export default Mostrar