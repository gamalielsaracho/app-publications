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

		return nextProps.roles !== this.props.roles


		// if(this.props.listar.roles != nextProps.listar.roles) {
		// 	return true
		// }else {
		// 	return false
		// }
	}	

	renderRoles(roles) {
		let style = {
			btn: {
				"marginLeft":"10px"
			}
		}

		return <tbody>
			{
				roles.map((rol) => {
					return <tr key={rol.id_rol}>
			            <td className='center'>{ rol.id_rol }</td>
			            <td className='center'>{ rol.nombre }</td>
			            <td className='center'>
			            	<a onClick={() => { this.props.mostrarRol(rol.id_rol) }} className="#0288d1 light-blue darken-2 btn">
			            		Mostrar
			            	</a>
			            	<a onClick={() => { this.props.abrirFormularioEditarRol(rol.id_rol) }} style={style.btn} className="#0288d1 light-green darken-2 btn">Editar</a>
			            	<a onClick={() => { this.props.eliminarRole(rol.id_rol) }} style={style.btn} className="#e53935 red darken-1 btn">
			            		Eliminar
			            	</a>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { roles, cargando, error } = this.props.listar

		// console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div className='container'>
				
					<FormularioContainer/>
					<MostarContainer/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearRol } className='#0288d1 light-blue darken-2 btn'>Agregar</button>
						</div>
					</div>
					<MensajeOerror error={error} mensaje={null}/>
					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-12'>
							<h4 className='center'>Roles</h4>

							<table>
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
				</div>
		}

	}
}

export default Listar