import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import jwtDecode from 'jwt-decode'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderRoles = this.renderRoles.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))

	}

	componentWillMount() {
		this.props.listarRoles()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.roles !== this.props.roles ||
			nextProps.eliminar !== this.props.eliminar
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}	



	renderRoles(roles) {
		// <button type="button" onClick={() => { this.props.abrirFormularioEditarRol(rol.id_rol) }} className="btn btn-warning btn-space">Editar</button>
		// <button type="button" onClick={() => { this.props.eliminarRole(rol.id_rol) }} className="btn btn-danger btn-space">Eliminar</button>

		return <tbody>
			{
				roles.map((rol) => {
					return <tr key={rol.id_rol}>
			            <td>{ rol.id_rol }</td>
			            <td>{ rol.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarRol(rol.id_rol) }} className="btn btn-info btn-space">Mostrar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { roles, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Roles</h1>
					
					<FormularioContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>


					{/*
						<div className='row'>
							<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
								<button onClick={ this.props.abrirFormularioCrearRol } className='btn btn-success'>Agregar</button>
							</div>
						</div>
						<br/>
					*/}

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Nombre</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderRoles(roles) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar