import React, { Component } from 'react'
import moment from 'moment'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

// Formulario Modal para EDITAR un analisis solicitado.
import FormularioAnalisisSolicitadoContainer from '../Formulario'

import ListarAnalisisSolicitadoTiposContainer from '../../../analisisSolicitadoTipo/components/Listar'

import { calcularEdad } from '../../../globalActions'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderAnalisisSolicitado = this.renderAnalisisSolicitado.bind(this)
		this.renderAnalisisSolicitadoFormulario = this.renderAnalisisSolicitadoFormulario.bind(this)
		this.renderEstado = this.renderEstado.bind(this)
		this.renderOptionsByRol = this.renderOptionsByRol.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		// this.props.urls es pasado como property al ser llamado.
		// que contiene todos los parametros existentes en la url 
		// en el cual está parado el usuario.
		this.props.mostrarAnalisisSolicitado(this.props.urls.idAnalisisSolicitado)
	}

	renderEstado(pendiente) {
		if(pendiente) {
			return <span>Pendiente</span>
		} else {
			return <span>Realizado</span>
		}
	}

	renderAnalisisSolicitadoFormulario() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioAnalisisSolicitadoContainer/>
		} else {
			return <span></span>
		}
	}

	renderOptionsByRol(personal) {
		let rol = removeAccents(this.personalLocalSt.rol)
		let idPersonal = this.personalLocalSt.id_personal
		let urlToRedirect = ``

		if(this.props.urls.idPaciente) {
			urlToRedirect = `/dashboard/pacientes/${this.props.urls.idPaciente}/solicitudes-laboratorio`
		} else if (this.props.urls.idConsulta) {
			urlToRedirect = `/dashboard/citas/${this.props.urls.idCita}/preconsulta/${this.props.urls.idPreConsulta}/consulta/${this.props.urls.idConsulta}`
		}

		if(rol == 'administracion' || (rol == 'medico' && personal.id_personal == idPersonal)) {
			return <div className='row'>
				<button onClick={ () => { this.props.abrirFormularioEditarAnalisisSolicitado(this.props.urls.idAnalisisSolicitado) } } className='btn btn-warning btn-space'>Editar</button>
				<button onClick={ () => { this.props.eliminarAnalisisSolicitado(this.props.urls.idAnalisisSolicitado, urlToRedirect) } } className='btn btn-danger btn-space'>Eliminar</button>
			</div>
		} else {
			return <div className='row'>
				<button onClick={ () => { this.props.abrirFormularioEditarAnalisisSolicitado(this.props.urls.idAnalisisSolicitado) } } className='btn btn-warning btn-space'>Editar</button>
			</div>
		}
	}


	renderAnalisisSolicitado(dato, cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			if(dato) {
				// console.log(dato)

				return <div className=''>
					{ this.renderAnalisisSolicitadoFormulario() }

					<div className='row'>
						<div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
							<h3 className='text-center'>Solicitante</h3>

							<p><strong>Fecha a realizar:</strong>{ ' '+moment(dato.analisisSolicitado.fechaArealizar).format('LL') }</p>
							<p><strong>Estado:</strong>{ this.renderEstado(dato.analisisSolicitado.pendiente) }</p>
							<p><strong>Médico/a:</strong>{ ' '+dato.personal.nombres+' '+dato.personal.apellidos }</p>
							<p><strong>Especialidad:</strong>{ ' '+dato.especialidad.descripcion }</p>

							{ this.renderOptionsByRol(dato.personal) }
						</div>

						<div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
							<h3 className='text-center'>Paciente</h3>

							<p><strong>Nombre:</strong>{ ' '+dato.paciente.nombres+' '+dato.paciente.apellidos }</p>
							<p><strong>Sexo:</strong>{ ' '+dato.paciente.sexo }</p>
							<p><strong>Fecha de nacimiento:</strong>{ ' '+moment(dato.paciente.fechaNacimiento).format('LL') }</p>
							<p><strong>Edad:</strong>{ ' '+calcularEdad(dato.paciente.fechaNacimiento) }</p>
							<p><strong>Dirección:</strong>{ ' '+dato.paciente.direccion }</p>
						</div>

						<div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
							<ListarAnalisisSolicitadoTiposContainer
								idAnalisisSolicitado = {this.props.urls.idAnalisisSolicitado}/>
						</div>
					</div>
					
				</div>
			} else {
				return <span></span>
			} 
		}
	}

	render() {

		const { cargando, analisisSolicitado, error } = this.props.mostrar
		
		return <div className=''>
			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderAnalisisSolicitado(analisisSolicitado, cargando) }
		</div>
	}
}

export default Mostrar