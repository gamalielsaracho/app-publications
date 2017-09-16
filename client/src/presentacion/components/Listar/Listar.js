import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioPresentacionContainer from '../Formulario'
import MostarPresentacionContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPresentaciones = this.renderPresentaciones.bind(this)
	}

	componentWillMount() {
		this.props.listarPresentaciones()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.presentaciones !== this.props.presentaciones) {
			return true
		}else {
			return false
		}
	}	

	renderPresentaciones(presentaciones) {

		return <tbody>
			{
				presentaciones.map((presentacion) => {
					return <tr key={presentacion.id_presentacion}>
			            <td>{ presentacion.id_presentacion }</td>
			            <td>{ presentacion.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarPresentacion(presentacion.id_presentacion) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarPresentacion(presentacion.id_presentacion) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarPresentacion(presentacion.id_presentacion) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { presentaciones, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Presentaciones</h1>
					
					<MostarPresentacionContainer/>
					<FormularioPresentacionContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearPresentacion } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Nombre</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderPresentaciones(presentaciones) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar