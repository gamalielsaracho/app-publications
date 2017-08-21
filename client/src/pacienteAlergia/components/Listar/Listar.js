import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.PacienteAlergias = this.PacienteAlergias.bind(this)
	}

	// this.props.nroDocumento -> es pasado como property.
	// this.props.id_tipoDocumento
	componentWillMount() {
		this.props.listarPacienteAlergias(this.props.nroDocumento, this.props.idTipoDocumento)
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.alergias !== this.props.alergias) {
			return true
		}else {
			return false
		}
	}	

	PacienteAlergias(alergias) {
		return <tbody>
			{
				alergias.map((i) => {
					return <tr key={i.alergia.id_alergia}>
			            <td>{ i.alergia.id_alergia }</td>
			            <td>{ i.alergia.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarPacienteAlergia(i.pacienteAlergia.nroDocumento, i.pacienteAlergia.id_tipoDocumento, i.alergia.id_alergia) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarPacienteAlergia(i.pacienteAlergia.nroDocumento, i.pacienteAlergia.id_tipoDocumento, i.alergia.id_alergia) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarPacienteAlergia(i.pacienteAlergia.nroDocumento, i.pacienteAlergia.id_tipoDocumento, i.alergia.id_alergia) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { alergias, cargando, error } = this.props.listar

		console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'>Alergias</h3>
					
					{/* pasamos los valores de nroDocumento y id_tipoDocumento,
						que son pasados al componente Listar cuando es llamado en
						el componente Mostrar de Paciente como property para que sean accesibles desde el 
						componente Formulario de PacienteAlergia, 
					    y así enviar a la base de datos, insertando en la tabla
						intermedia de pacientes con alergias 
					*/}

					<FormularioContainer 
						nroDocumento={this.props.nroDocumento}
						id_tipoDocumento={this.props.idTipoDocumento}/>
						
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearPacienteAlergia } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Descripción</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.PacienteAlergias(alergias) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar