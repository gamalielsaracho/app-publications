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
		this.renderDatosPaciente = this.renderDatosPaciente.bind(this)

		this.renderBtnAuditByRol = this.renderBtnAuditByRol.bind(this)
	}

	componentWillMount() {
		this.props.mostrarPreConsulta(this.props.idPreConsulta)
	}

	renderBtnAuditByRol() {
		let rol = this.personalLocalSt.id_rol
		
		if(rol == 3) {
			return <div className='row'>
				<div className='col-xs-11 col-sm-11 col-md-11 col-lg-11 text-right'>
					<br/>
					<Link target="_blank" to={`/dashboard/modulos-auditados/${this.props.urls.idConsulta}/auditoria/consulta-sintomas`}>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Auditoría
						</button>
					</Link>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}

	renderDatosPaciente(preConsulta) {
		if(this.props.urls.idPaciente) {
			return <span></span>
		} else {
			return <div>
				<h3>Paciente</h3>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
						<p><strong>Documento:</strong>{ preConsulta.paciente.nroDocumento }</p>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
						<p><strong>Nombre:</strong>{ preConsulta.paciente.nombres +' '+ preConsulta.paciente.apellidos }</p>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
						<p><strong>Sexo:</strong>{ preConsulta.paciente.sexo }</p>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
						<p><strong>Fecha de nacimiento:</strong>{ moment(preConsulta.paciente.fechaNacimiento).format('DD-MM-YYYY') }</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
						<p><strong>Telefono:</strong>{ preConsulta.paciente.telefono }</p>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
						<p><strong>Celular:</strong>{ preConsulta.paciente.celular }</p>
					</div>
					<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
						<p><strong>Dirección:</strong>{ preConsulta.paciente.direccion }</p>
					</div>
				</div>
				<br/>
			</div>
		}
	}

	formularioPreConsultaParametroByRol(idPreConsulta) {
		let idRol = this.personalLocalSt.id_rol

		// 2 enfermeria.
		// 3 administración.
		if((idRol == 2) || (idRol == 3)) {
			return <FormularioPreConsultaParametroContainer
						idPreConsulta={this.props.idPreConsulta}/>
		} else {
			return <span></span>
		}
	}

	renderBtnAuditByRol() {
		let rol = this.personalLocalSt.id_rol
		
		if(rol == 3) {
			return <div className='row'>
				<div className='col-xs-11 col-sm-11 col-md-11 col-lg-11 text-right'>
					<br/>
					<Link target="_blank" to={`/dashboard/modulos-auditados/${this.props.idPreConsulta}/auditoria/pre-consulta-parametro`}>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Auditoría
						</button>
					</Link>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}

	renderPreConsulta(cargando, preConsulta) {
		if(cargando) {
			return <Cargando/>
		} else if (preConsulta){

			return <div>
				{ this.renderDatosPaciente(preConsulta) }

				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-5 col-lg-5'>
						<p><strong>Enfermero/a:</strong>{ preConsulta.personal.nombres +' '+ preConsulta.personal.apellidos }</p>
						<p><strong>Fecha:</strong>{ moment(preConsulta.preconsulta.fecha).format('DD-MM-YYYY') } <strong>Hora:</strong>{ preConsulta.preconsulta.hora }</p>
						<p></p>
						
						<p><strong>Observaciones:</strong>{ preConsulta.preconsulta.observaciones }</p>				
						
					</div>
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
						{ this.formularioPreConsultaParametroByRol(preConsulta.preconsulta.id_preconsulta) }
					</div>
				</div>

				{ this.renderBtnAuditByRol() }
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