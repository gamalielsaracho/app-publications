import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'

import moment from 'moment'

// import {  } from '../../../globalActions'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioPacienteContainer from '../Formulario'
// import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPacientes = this.renderPacientes.bind(this)
		this.renderOptionsByRol = this.renderOptionsByRol.bind(this)

		this.renderFormularioPaciente = this.renderFormularioPaciente.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}


	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.pacientes !== this.props.pacientes ||
			nextProps.pacientesFiltrados  !== this.props.pacientesFiltrados ||
			nextProps.eliminar !== this.props.eliminar ||
			nextProps.formulario !== this.props.formulario
		)
		
		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderFormularioPaciente() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			console.log("FormularioPacienteContainer montado. cool.!!")
			return <FormularioPacienteContainer/>
		} else {
			return <span></span>
		}
	}

	renderOptionsByRol(paciente) {
		switch(this.personalLocalSt.id_rol) {
			case 3: // admin.
				return <div>
					<Link to={`/dashboard/pacientes/${paciente.pa.id_paciente}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarPaciente(paciente.pa.id_paciente) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarPaciente(paciente.pa.id_paciente) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
			case 4: // admisión.
				return <div>
					<Link to={`/dashboard/pacientes/${paciente.pa.id_paciente}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarPaciente(paciente.pa.id_paciente) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarPaciente(paciente.pa.id_paciente) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
			case 1: // médico.
				return <div>
					<Link to={`/dashboard/pacientes/${paciente.pa.id_paciente}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
				</div>
			case 2: // enfermería.
				return <div>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarPaciente(paciente.pa.id_paciente) }} className="btn btn-warning btn-space">Editar</button>
					<Link to={`/dashboard/pacientes/${paciente.pa.id_paciente}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
					<button type="button" onClick={() => { this.props.eliminarPaciente(paciente.pa.id_paciente) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
		}
	}

	renderPacientes(pacientes) {

		return <tbody>
			{
				pacientes.map((paciente) => {
					return <tr key={paciente.pa.id_paciente}>
			            <td>{ paciente.pa.nroDocumento }</td>
			            <td>{ paciente.pa.nombreTipoDocumento }</td>
			            <td>{ moment(paciente.fecha).format('DD-MM-YYYY') }</td>
			            <td>{ paciente.pa.nombres }</td>
			            <td>{ paciente.pa.apellidos }</td>
			            <td>{ moment(paciente.pa.fechaNacimiento).format('DD-MM-YYYY') }</td>
			            <td>{ paciente.pa.direccion }</td>
			            <td>{ paciente.pa.sexo }</td>
			            <td>{ paciente.area.descripcion }</td>
			            <td>{ paciente.ciudad.descripcion }</td>

			            <td>
			            	{ this.renderOptionsByRol(paciente) }
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

				return <div>
					<h1 className='text-center'>Pacientes</h1>
					
					{ this.renderFormularioPaciente() }

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearPaciente } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th className='text-center'>Nro.Doc</th>
						        	<th className='text-center'>Tipo Doc</th>
						        	<th className='text-center'>Ingreso</th>
						        	<th className='text-center'>Nombres</th>
						        	<th className='text-center'>Apellidos</th>
						        	<th className='text-center'>Nacimiento</th>
						        	<th className='text-center'>Dirección</th>
						        	<th className='text-center'>Sexo</th>
						        	<th className='text-center'>Area</th>
						        	<th className='text-center'>Ciudad</th>
						        	<th className='text-center'>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderPacientes(this.props.pacientesFiltrados) }

						</table>
					</div>
				</div>
		

	}
}

export default Listar