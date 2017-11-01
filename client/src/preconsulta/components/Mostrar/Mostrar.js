import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'

import moment from 'moment'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

// PreConsulta X Parametro.
import FormularioPreConsultaParametroContainer from '../../../preConsultaParametro/components/Formulario'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderPreConsulta = this.renderPreConsulta.bind(this)

		this.formularioPreConsultaParametroByRol = this.formularioPreConsultaParametroByRol.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		this.props.mostrarPreConsulta(this.props.idPreConsulta)
	}

	formularioPreConsultaParametroByRol() {
		let rol = this.personalLocalSt.id_rol
		
		// 2 enfermeria.
		// 3 administración.
		if((rol == 2) || (rol == 4)) {
			return <FormularioPreConsultaParametroContainer
						idPreConsulta={this.props.idPreConsulta}/>
		} else {
			return <span></span>
		}
	}

	renderPreConsulta(cargando, preConsulta) {
		if(cargando) {
			return <Cargando/>
		} else if (preConsulta){
			return <div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-5 col-lg-5'>
					<p><strong>Enfermero/a:</strong>{ preConsulta.personal.nombres +' '+ preConsulta.personal.apellidos }</p>
					<p><strong>Fecha:</strong>{ moment(preConsulta.preconsulta.fecha).format('L') }</p>
					<p><strong>Nivel:</strong>{ preConsulta.nivel.descripcion }</p>				
					
				  	<Link target="_blank" to={`/dashboard/modulos-auditados/${this.props.idPreConsulta}/auditoria/pre-consulta-parametro`}>
				  		Auditoría
				  	</Link>

				</div>
				<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
					{ this.formularioPreConsultaParametroByRol() }
				</div>
			</div>
		}
	}

	render() {

		const { cargando, preConsulta, abierto } = this.props.mostrar

		let error = this.props.mostrar.error ? this.props.mostrar.error :
			this.props.eliminar.error
		// console.log(this.props.mostrar)
		
		return <div>
			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderPreConsulta(cargando, preConsulta) }
		</div>

	}
}

export default Mostrar