import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioUnidadAnalisisContainer from '../Formulario'
import MostarUnidadAnalisisContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderUnidadesAnalisis = this.renderUnidadesAnalisis.bind(this)
	}

	componentWillMount() {
		this.props.listarUnidadesAnalisis()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.unidadesAnalisis !== this.props.unidadesAnalisis ||
			nextProps.eliminar !== this.props.eliminar
		)
		
		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderUnidadesAnalisis(unidadesAnalisis) {

		return <tbody>
			{
				unidadesAnalisis.map((unidad) => {
					return <tr key={unidad.id_unidadAnalisis}>
			            <td>{ unidad.id_unidadAnalisis }</td>
			            <td>{ unidad.descripcion }</td>
			            <td>{ unidad.nombre }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarUnidadAnalisis(unidad.id_unidadAnalisis) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarUnidadAnalisis(unidad.id_unidadAnalisis) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarUnidadAnalisis(unidad.id_unidadAnalisis) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { unidadesAnalisis, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Unidades de Medidas</h1>
					
					<FormularioUnidadAnalisisContainer/>
					<MostarUnidadAnalisisContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearUnidadAnalisis } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Descripción</th>
						        	<th>Nombre</th>

						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderUnidadesAnalisis(unidadesAnalisis) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar