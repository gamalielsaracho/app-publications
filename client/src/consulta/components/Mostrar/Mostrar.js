import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'

import ReactModal from 'react-modal'
import moment from 'moment'

import { formatDate, calcularEdad, habilitadoSegunFecha } from '../../../globalActions'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

import MostrarPreConsultaContainer from '../../../preconsulta/components/Mostrar'

// PreConsulta X Parametro
import ListarPreConsultaParametrosContainer from '../../../preConsultaParametro/components/Listar'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderConsulta = this.renderConsulta.bind(this)
		this.renderDatosPaciente = this.renderDatosPaciente.bind(this)
		this.renderDatosPreConsulta = this.renderDatosPreConsulta.bind(this)
		this.renderBtnsCrud = this.renderBtnsCrud.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
		// this.idMedicoLocalSt = localStorage.getItem('idMedico')
	}

	componentWillMount() {
		console.log('LOS PARAMETROS PASADOS SON --->')
		console.log(this.props.urls)
		// urls es pasado como property al ser llamado dentro de MostrarApp.
		this.props.mostrarConsulta(this.props.urls.idConsulta)
	}

	renderDatosPaciente(dato) {
		if(this.props.urls.idPreConsulta || this.props.urls.idPaciente) {
			return <span></span>
		} else {
			if(this.props.urls.idConsulta) {
				return <span></span>
			} else {
				return <div>
					<h4 className='text-center'>Paciente</h4>
					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							<p><strong>Numero de Documento:</strong> { dato.paciente.nroDocumento }</p>
							<p><strong>Dirección:</strong> { dato.paciente.direccion }</p>				
						</div>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							<p><strong>Nombre:</strong> { dato.paciente.nombres+' '+dato.paciente.apellidos }</p>
							<p><strong>Edad:</strong> { calcularEdad(dato.paciente.fechaNacimiento) }</p>
						</div>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							<p><strong>Sexo:</strong>{ dato.paciente.sexo }</p>
						</div>
					</div>
				</div>
			}
		}
	}

	renderDatosPreConsulta(dato) {
		// Esto es para ocultar los datos de la Pre-consulta si
		// se está mostrando una pre-consulta por ID.
		if(this.props.urls.idPreConsulta) {
			return <span></span>
		} else {
			return <div>
				<h4 className='text-center'>Pre-consulta</h4>
				
				<MostrarPreConsultaContainer 
					idPreConsulta={dato.preconsulta.id_preconsulta}
					urls = {this.props.urls}/>

				<div className=''>
					<ListarPreConsultaParametrosContainer idPreConsulta={dato.preconsulta.id_preconsulta}/>
				</div>
			</div>
		}
	}

	renderBtnsCrud(dato) {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		// 1 médico.
		// 3 administración.
		console.log('this.idMedicoLocalSt CREADOR')
		console.log(localStorage.getItem('idMedico'))
			
		console.log('ID PERSONAL LOGEADO')
		console.log(idPersonal)

		let condition

		condition = (
			(idRol == 1 && idPersonal == localStorage.getItem('idMedico')) ||
			(idRol == 3)
		)

		if(condition) {
			return <div>
				<button onClick={ () => { this.props.abrirFormularioEditarConsulta(dato.consulta.id_consulta) } } className='btn btn-info btn-space'>Editar</button>
				<button onClick={ () => { this.props.eliminarConsulta(dato.consulta.id_consulta) } } className='btn btn-danger btn-space'>Eliminar</button>
			</div>
		} else {
			return <span></span>
		}

	}


	renderConsulta(cargando, dato) {
		if(cargando) {
			return <Cargando/>
		} else if (dato){
				

				return <div className='no-print-data'>
					<h4 className='text-center'>Consulta</h4>
					
					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							<p><strong>Médico/a:</strong>{ dato.personal.nombres +' '+ dato.personal.apellidos }</p>
							<p><strong>Fecha:</strong>{ moment(dato.consulta.fecha).format('DD-MM-YYYY') } <strong>Hora:</strong>{ dato.consulta.hora }</p>
							<p><strong>Fecha próxima consulta:</strong>{ moment(dato.consulta.fechaProximaConsulta).format('DD-MM-YYYY') }</p>
							<p><strong>Nivel:</strong>{ dato.nivel.descripcion }</p>				
						</div>

						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							{ this.renderBtnsCrud(dato) }
						</div>
					</div>


					{ this.renderDatosPreConsulta(dato) }

				</div>
		}
	}

	render() {
		const { cargando, consulta } = this.props.mostrar

		let error = this.props.mostrar.error ? this.props.mostrar.error :
					this.props.eliminar.error
		
		return <div>
			<MensajeOerror error={error} mensaje={null}/>

			{ this.renderConsulta(cargando, consulta) }
		</div>
	}
}

export default Mostrar