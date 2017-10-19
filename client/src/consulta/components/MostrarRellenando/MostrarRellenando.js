import React, { Component } from 'react'

import ReactModal from 'react-modal'
import { formatDate } from '../../../globalActions'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

class MostrarRellenando extends Component {
	constructor(props) {
		super(props)
		this.renderConsulta = this.renderConsulta.bind(this)
	}

	componentWillMount() {
		this.props.mostrarConsulta(this.props.idConsulta)
	}

	renderConsulta(cargando, dato) {
		if(cargando) {
			return <Cargando/>
		} else if (dato) {
			return <div> 
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Médico/a:</strong>{ dato.personal.nombres +' '+ dato.personal.apellidos }</p>
						<p><strong>Fecha:</strong>{ formatDate(dato.consulta.fecha) }</p>
						<p><strong>Fecha próxima consulta:</strong>{ formatDate(dato.consulta.fechaProximaConsulta) }</p>
					</div>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<button onClick={ () => { this.props.abrirFormularioEditarConsulta(dato.consulta.id_consulta) } } className='btn btn-info btn-space'>Editar</button>
						<button onClick={ () => { this.props.eliminarConsulta(dato.consulta.id_consulta) } } className='btn btn-danger btn-space'>Eliminar</button>
					</div>
				</div>
			</div>
		}
	}

	render() {

		const { cargando, consulta } = this.props.mostrar

		let error = this.props.mostrar.error ? this.props.mostrar.error :
					this.props.eliminar.error
		
		return <div>
			<MensajeOerror error={error} mensaje={null}/>
			<br/>
			{ this.renderConsulta(cargando, consulta) }
		</div>
	}
}

export default MostrarRellenando