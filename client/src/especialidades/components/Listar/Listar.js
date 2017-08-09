import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderEspecialidades = this.renderEspecialidades.bind(this)
	}

	componentWillMount() {
		this.props.listarEspecialidades()
	}

	shouldComponentUpdate(nextProps) {

		return nextProps.especialidades !== this.props.especialidades

	}	

	renderEspecialidades(especialidades) {
		
		return <tbody>
			{
				especialidades.map((especialidad) => {
					return <tr key={especialidad.id_especialidad}>
			            <td>{ especialidad.id_especialidad }</td>
			            <td>{ especialidad.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarEspecialidad(especialidad.id_especialidad) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarEspecialidad(especialidad.id_especialidad) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarEspecialidad(especialidad.id_especialidad) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { especialidades, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Especialidades</h1>
					
					<FormularioContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
							<button type="button" onClick={ this.props.abrirFormularioCrearEspecialidad } className='btn btn-success'>Agregar</button>
						</div>
					</div>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id especialidad</th>
						        	<th>Descripción</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderEspecialidades(especialidades) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar