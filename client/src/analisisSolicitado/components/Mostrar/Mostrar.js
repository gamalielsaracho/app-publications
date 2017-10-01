import React, { Component } from 'react'
import moment from 'moment'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import ReactModal from 'react-modal'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

// Formulario Modal para EDITAR un analisis solicitado.
import FormularioAnalisisSolicitadoContainer from '../Formulario'

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
			return <div className='container'>
				<button onClick={ () => { this.props.abrirFormularioEditarAnalisisSolicitado(this.props.urls.idAnalisisSolicitado) } } className='btn btn-warning btn-space'>Editar</button>
				<button onClick={ () => { this.props.eliminarAnalisisSolicitado(this.props.urls.idAnalisisSolicitado, urlToRedirect) } } className='btn btn-danger btn-space'>Eliminar</button>
			</div>
		}
	}

	renderAnalisisSolicitado(dato, cargando) {
		if(cargando) {
			return <Cargando/>
		} else {
			if(dato) {
				return <div className='row'>

					{ this.renderAnalisisSolicitadoFormulario() }

					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>				            
						<p><strong>Fecha a realizar:</strong>{ ' '+moment(dato.analisisSolicitado.fechaArealizar).format('LL') }</p>
						<p><strong>Estado:</strong>{ this.renderEstado(dato.analisisSolicitado.pendiente) }</p>

						<p><strong>Médico/a:</strong>{ ' '+dato.personal.nombres+' '+dato.personal.apellidos }</p>
						<p><strong>Especialidad:</strong>{ ' '+dato.especialidad.descripcion }</p>
					</div>

					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
						<h3>Lista de tipos de análisis solicitados</h3>
					</div>
					
					{ this.renderOptionsByRol(dato.personal) }
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