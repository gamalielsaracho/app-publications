import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderRoles = this.renderRoles.bind(this)
	}

	componentWillMount() {
		this.props.listarRoles()
	}

	shouldComponentUpdate(nextProps) {
		// console.log("actual:")
		// console.log(this.props.roles)

		// console.log("el que sigue:")
		// console.log(nextProps.roles)

		if(nextProps.roles !== this.props.roles) {
			return true
		}else {
			return false
		}
	}	

	renderRoles(roles) {

		return <tbody>
			{
				roles.map((rol) => {
					return <tr key={rol.id_rol}>
			            <td>{ rol.id_rol }</td>
			            <td>{ rol.descripcion }</td>
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

		const { roles, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Roles</h1>
					
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
						        	<th className='center'>Id</th>
						        	<th className='center'>Nombre</th>
						        	<th className='center'>Opciones</th>
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