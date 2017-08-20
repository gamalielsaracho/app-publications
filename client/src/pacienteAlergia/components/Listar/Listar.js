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
		this.props.listarPacienteAlergias(this.props.nroDocumento, this.props.id_tipoDocumento)
	}

	shouldComponentUpdate(nextProps) {
		// console.log("actual:")
		// console.log(this.props.alergias)

		// console.log("el que sigue:")
		// console.log(nextProps.alergias)

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
							<button type="button" onClick={() => { this.props.mostrarRol(rol.id_rol) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarRol(rol.id_rol) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarRole(rol.id_rol) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { alergias, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>alergias</h1>
					
					<FormularioContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearRol } className='btn btn-success'>Agregar</button>
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