import React, { Component } from 'react'

import CrearContainer from '../Crear'
import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

const isArrayEqual = (array1 = [], array2 = []) => {
    if (array1 === array2) {
        return true;
    }

    // check one level deep
    // return array1.length === array2.length &&
    //     array1.every((item, index) => item === array2[index]);
}

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderRoles = this.renderRoles.bind(this)
	}

	componentDidMount() {
		// setTimeout(() => this.props.listarRoles(), 1000)
		this.props.listarRoles()
	}

	shouldComponentUpdate(nextProps) {
		console.log("actual:")
		console.log(this.props.roles)

		console.log("el que sigue:")
		console.log(nextProps.roles)

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
			            	<a className="#e53935 red darken-1 btn">Editar</a>
			            	<a style={style.btn} className="#0288d1 light-blue darken-2 btn">Eliminar</a>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {
		console.log(this.props.mostrar)

		const { roles, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div className='container'>
					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<CrearContainer/>
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