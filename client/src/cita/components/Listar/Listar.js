import React, { Component } from 'react'
import { Link } from 'react-router'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarVenCitaContainer from '../MostrarVen'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderCitas = this.renderCitas.bind(this)
		this.renderOptionsByRol = this.renderOptionsByRol.bind(this)
		this.renderAddButton = this.renderAddButton.bind(this)
		this.renderFormAndShow = this.renderFormAndShow.bind(this)
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
					<Link to={`/dashboard/citas/${cita.id_cita}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
				</div>
			case 'enfermeria':
				return <div>
					<button type="button" onClick={() => { this.props.mostrarCita(cita.id_cita) }} className="btn btn-info btn-space">Mostrar</button>
				</div>
			default:
				return <div>
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

	renderFormAndShow(rol) {
		if(rol == 'ventanilla') {
			return <div>
				<FormularioContainer/>
				<MostarVenCitaContainer/>
			</div>
		} else {
			return <span></span>
		}
	}

	renderCitas(citas) {

		let rolUsuario = this.props.rol ? 
					   	 this.props.rol.descripcion : ''

		return <tbody>
			{ this.renderFormAndShow(rolUsuario) }

			{
				citas.map((cita) => {
					return <tr key={cita.id_cita}>
			            <td>{ cita.id_cita }</td>
			            <td>{ cita.fecha }</td>
			            <td>{ cita.hora }</td>
			            <td>{ cita.pendiente }</td>
			            <td>
			            	{ this.renderOptionsByRol(rolUsuario, cita) }
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { citas, cargando, error } = this.props.listar

		// console.log(this.props.listar)
		
		if(cargando) {
			return <Cargando/>
		} else {
			let rolUsuario = this.props.rol ? 
							 this.props.rol.descripcion : '' 

			// console.log('Btb -> '+rolUsuario)

				return <div>
					<h1 className='text-center'>Citas</h1>
					
					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderAddButton(rolUsuario) }

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