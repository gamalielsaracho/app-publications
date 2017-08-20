import React, { Component } from 'react'
import { Link } from 'react-router'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
// import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPacientes = this.renderPacientes.bind(this)
		this.renderSexo = this.renderSexo.bind(this)
	}

	componentWillMount() {
		this.props.listarPacientes()
	}

	shouldComponentUpdate(nextProps) {

		if(nextProps.pacientes !== this.props.pacientes) {
			return true
		}else {
			return false
		}
	}	

	renderSexo(mujer) {
		if(mujer) {
			return <td>Femenino</td> 
		} else {
			return <td>Masculino</td>
		}
	}

	renderPacientes(pacientes) {

		return <tbody>
			{
				pacientes.map((paciente) => {
					console.log(paciente)
					return <tr key={paciente.tipoDocumento.id_tipoDocumento}>
			            <td>{ paciente.pa.nroDocumento }</td>
			            <td>{ paciente.tipoDocumento.descripcion }</td>
			            <td>{ paciente.pa.nombres }</td>
			            <td>{ paciente.pa.apellidos }</td>
			            <td>{ paciente.pa.fechaNacimiento }</td>
			            <td>{ paciente.pa.direccion }</td>
			            { this.renderSexo(paciente.pa.mujer) }
			            <td>{ paciente.area.descripcion }</td>
			            <td>{ paciente.ciudad.descripcion }</td>

			            <td>
							<Link to={`/${paciente.pa.nroDocumento}`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarPaciente(paciente.pa.nroDocumento, paciente.tipoDocumento.id_tipoDocumento) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarPaciente(paciente.pa.nroDocumento, paciente.tipoDocumento.id_tipoDocumento) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { pacientes, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Pacientes</h1>
					
					<FormularioContainer/>

					<MensajeOerror error={error} mensaje={null}/>

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

							{ this.renderPacientes(pacientes) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar