import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioAreaContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderAreas = this.renderAreas.bind(this)
	}

	componentWillMount() {
		this.props.listarAreas()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.areas !== this.props.areas ||
			nextProps.eliminar !== this.props.eliminar
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderAreas(areas) {
		return <tbody>
			{
				areas.map((area) => {
					return <tr key={area.id_area}>
			            <td>{ area.id_area }</td>
			            <td>{ area.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarArea(area.id_area) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarArea(area.id_area) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarArea(area.id_area) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { areas, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Areas</h1>
					
					<FormularioAreaContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearArea } className='btn btn-success'>Agregar</button>
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

							{ this.renderAreas(areas) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar