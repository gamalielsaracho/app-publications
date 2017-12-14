import React, { Component } from 'react'

import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioEspecialidadContainer from '../Formulario'
import MostarEspecialidadContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderEspecialidades = this.renderEspecialidades.bind(this)
		
		this.renderBtnAdd = this.renderBtnAdd.bind(this)
		this.renderBtsOpciones = this.renderBtsOpciones.bind(this)
		
		this.renderIndice = this.renderIndice.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))

	}

	componentWillMount() {
		this.props.listarEspecialidades()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.especialidades !== this.props.especialidades ||
			nextProps.eliminar !== this.props.eliminar
		)

		if(condition) {
			return true
		} else {
			return false
		}

	}	


	renderIndice(especialidad) {
		if(especialidad.id_especialidad != 1) {
			return <tr key={especialidad.id_especialidad}>
			    <td>{ especialidad.id_especialidad }</td>
			    <td>{ especialidad.descripcion }</td>
			    <td>
			        { this.renderBtsOpciones(especialidad) }
			    </td>
			</tr>
		}
	}


	renderBtnAdd() {
		let idRol = this.personalLocalSt.id_rol
		
		if(idRol == 3) { 
			return <div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
					<button type="button" onClick={ this.props.abrirFormularioCrearEspecialidad } className='btn btn-success'>Agregar</button>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}

	renderBtsOpciones(especialidad) {
		let idRol = this.personalLocalSt.id_rol
		
		if(idRol == 3) {
			return <div>
				<button type="button" onClick={() => { this.props.mostrarEspecialidad(especialidad.id_especialidad) }} className="btn btn-info btn-space">Mostrar</button>
				<button type="button" onClick={() => { this.props.abrirFormularioEditarEspecialidad(especialidad.id_especialidad) }} className="btn btn-warning btn-space">Editar</button>
				<button type="button" onClick={() => { this.props.eliminarEspecialidad(especialidad.id_especialidad) }} className="btn btn-danger btn-space">Eliminar</button>
			</div>
			
		} else {
			return <span></span>
		}
	}

	renderEspecialidades(especialidades) {
		
		return <tbody>
			{
				especialidades.map((especialidad) => {
					return this.renderIndice(especialidad)
				})
			}
		</tbody>
	}

	render() {

		const { especialidades, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Especialidades</h1>
					
					<FormularioEspecialidadContainer/>
					<MostarEspecialidadContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderBtnAdd() }
					<br/>

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