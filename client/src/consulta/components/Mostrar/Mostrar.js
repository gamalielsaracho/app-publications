import React, { Component } from 'react'

import ReactModal from 'react-modal'
import { formatDate, calcularEdad } from '../../../globalActions'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

// PreConsulta X Parametro
import ListarPreConsultaParametrosContainer from '../../../preConsultaParametro/components/Listar'

class Mostrar extends Component {
	constructor(props) {
		super(props)
		this.renderConsulta = this.renderConsulta.bind(this)
		this.renderDatosPaciente = this.renderDatosPaciente.bind(this)
		this.renderDatosPreConsulta = this.renderDatosPreConsulta.bind(this)
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

	renderDatosPreConsulta(dato) {
		if(this.props.urls.idPreConsulta) {
			return <span></span>
		} else {
			return <div>
				<h4 className='text-center'>Pre-consulta</h4>
				<div className='row'>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
						<p><strong>Enfermero/a:</strong>{ dato.personalEnfermeria.nombres+' '+dato.personalEnfermeria.apellidos }</p>
						<p><strong>Fecha:</strong> { formatDate(dato.preconsulta.fecha) }</p>
						<p><strong>Nivel:</strong> { dato.nivel.descripcion }</p>				
					</div>
				</div>
				<div className=''>
					<ListarPreConsultaParametrosContainer idPreConsulta={dato.preconsulta.id_preconsulta}/>
				</div>
			</div>
		}
	}

	renderConsulta(cargando, dato) {
		if(cargando) {
			return <Cargando/>
		} else if (dato){
				return <div>
					<h4 className='text-center'>Consulta</h4>
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

					{ this.renderDatosPaciente(dato) }

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