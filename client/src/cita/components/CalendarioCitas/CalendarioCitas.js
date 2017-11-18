import React, { Component } from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import jwtDecode from 'jwt-decode'

import CalendarioCitaContainer from '../Calendario'

import FormularioCitaContainer from '../Formulario'

class CalendarioCitas extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.listarCitas()
	}

	// shouldComponentUpdate(nextProps) {
	// 	let condition = (
	// 		nextProps.formulario !== this.props.formulario
	// 	)

	// 	if(condition) {
	// 		return true
	// 	}else {
	// 		return false
	// 	}
	// }


	render() {
		const { citas, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error 
			: this.props.editar.error

		// console.log("El error ---->")
		// console.log(error)

		if(cargando) {
			return <Cargando/>
		} else {
			return <div>
				<MensajeOerror error={error} mensaje={null}/>
				
				<h2>El calendario aquí. Cool ! (solo para ventanilla y admin.)</h2>
				
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button onClick={ this.props.abrirFormularioCrearCita } className='btn btn-success'>Agregar</button>
				</div>
				
				<FormularioCitaContainer/>
				<br/>
				<div className='row'>
					<div className='col-xs-12 col-sm-10 col-md-10 col-lg-10'>
						<CalendarioCitaContainer
							citas = {this.props.listaCitasEditedAndFilter(citas, null)}/>
						{/* valoresFiltro={this.props.valoresFiltro} */}
					</div>
				</div>
			</div>
		}
	}
}

export default CalendarioCitas