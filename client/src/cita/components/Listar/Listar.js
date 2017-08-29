import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderCitas = this.renderCitas.bind(this)
		this.renderOptionsByRol = this.renderOptionsByRol.bind(this)
		this.renderAddButton = this.renderAddButton.bind(this)
	}

	componentWillMount() {
		this.props.listarCitas()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.citas !== this.props.citas) {
			return true
		}else {
			return false
		}
	}	

	renderOptionsByRol(rol, cita) {
		// let disabled = true
		// let mostrarOpcion = false
		// let editarOpcion = false
		// let eliminarOpcion = false

		// if(rol == 'medico' || rol == 'enfermeria') {
		// 	editarOpcion = true
		// 	eliminarOpcion = true
		// }else {
		// 	mostrarOpcion = false
		// 	editarOpcion = false
		// 	eliminarOpcion = false
		// }

		switch(rol) {
			case 'administracion':
				return <div>
					<button type="button" onClick={() => { this.props.mostrarCita(cita.id_cita) }} className="btn btn-info btn-space">Mostrar</button>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarCita(cita.id_cita) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarCita(cita.id_cita) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
			case 'ventanilla':
				return <div>
					<button type="button" onClick={() => { this.props.mostrarCita(cita.id_cita) }} className="btn btn-info btn-space">Mostrar</button>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarCita(cita.id_cita) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarCita(cita.id_cita) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
			case 'medico':
				return <div>
					<button type="button" onClick={() => { this.props.mostrarCita(cita.id_cita) }} className="btn btn-info btn-space">Mostrar</button>
				</div>
			case 'enfermeria':
				return <div>
					<button type="button" onClick={() => { this.props.mostrarCita(cita.id_cita) }} className="btn btn-info btn-space">Mostrar</button>
				</div>
		}

	}

	renderAddButton(rol) {
		if(rol == 'ventanilla') {
			return <div className='row'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button onClick={ this.props.abrirFormularioCrearCita } className='btn btn-success'>Agregar</button>
				</div>
			</div>
		} else {
			return false
		}
	}

	renderCitas(citas) {
		// console.log(citas)

		return <tbody>
			{
				citas.map((cita) => {
					return <tr key={cita.id_cita}>
			            <td>{ cita.id_cita }</td>
			            <td>{ cita.fecha }</td>
			            <td>{ cita.hora }</td>
			            <td>{ cita.pendiente }</td>
			            <td>
			            	{ this.renderOptionsByRol('enfermeria', cita) }
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { citas, cargando, error } = this.props.listar

		console.log(this.props.listar)
		
		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Citas</h1>
					
					<FormularioContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderAddButton('enfermeria') }

					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Fecha</th>
						        	<th>Hora</th>
						        	<th>Estado</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderCitas(citas) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar