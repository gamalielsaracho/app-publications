import React, { Component } from 'react'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

import
	ListarMedicamentosTratamientoContainer 
from '../../../medicamentoTratamiento/components/Listar'


class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderTratamiento = this.renderTratamiento.bind(this)
	}

	componentWillMount() {
		this.props.mostrarTratamiento(this.props.urls.idTratamiento)
	}

	renderTratamiento(cargando, tratamiento) {
		if(cargando) {
			return <Cargando/>
		} else {
			if(tratamiento) {
				return <div>
					<ListarMedicamentosTratamientoContainer
						idTratamiento = { this.props.urls.idTratamiento }
						fechaTratamiento = { tratamiento.fechaCreacion }
						tratamientoImprimido={ tratamiento.imprimido }/>
				</div>
			}
		}
	}

	render() {		
		const { cargando, tratamiento } = this.props.mostrar

		let error = this.props.mostrar.error ? this.props.mostrar.error :
					this.props.eliminar.error

		return <div className=''>

			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderTratamiento(cargando, tratamiento) }
		</div>

		// <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-centered'>
		// </div>

			// <div className='row'>
			// </div>

	}
}

export default Mostrar