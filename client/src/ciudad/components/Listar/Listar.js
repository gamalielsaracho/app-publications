import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderCiudades = this.renderCiudades.bind(this)
	}

	componentWillMount() {
		this.props.listarCiudades()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.ciudades !== this.props.ciudades ||
			nextProps.eliminar !== this.props.eliminar
		)
		
		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderCiudades(ciudades) {
		let style = {
			btn: {
				"marginLeft":"10px"
			}
		}

		return <tbody>
			{
				ciudades.map((ciudad) => {
					return <tr key={ciudad.id_ciudad}>
			            <td>{ ciudad.id_ciudad }</td>
			            <td>{ ciudad.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarCiudad(ciudad.id_ciudad) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarCiudad(ciudad.id_ciudad) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarCiudad(ciudad.id_ciudad) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>	
				})
			}
		</tbody>
	}

	render() {

		const { ciudades, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Ciudades</h1>

					<FormularioContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearCiudad } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>
					
					<div className='table-responsive'>

						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th className='center'>Id_ciudad</th>
						        	<th className='center'>Descripción</th>
						        	<th className='center'>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderCiudades(ciudades) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar