import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioProveedorContainer from '../Formulario'
import MostarProveedorContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderProveedores = this.renderProveedores.bind(this)
	}

	componentWillMount() {
		this.props.listarProveedores()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.proveedores !== this.props.proveedores) {
			return true
		}else {
			return false
		}
	}	

	renderProveedores(proveedores) {

		return <tbody>
			{
				proveedores.map((proveedor) => {
					return <tr key={proveedor.id_proveedor}>
			            <td>{ proveedor.id_proveedor }</td>
			            <td>{ proveedor.nombre }</td>
			            <td>{ proveedor.direccion }</td>
			            <td>{ proveedor.telefono }</td>

			            <td>
							<button type="button" onClick={() => { this.props.mostrarProveedor(proveedor.id_proveedor) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarProveedor(proveedor.id_proveedor) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarProveedor(proveedor.id_proveedor) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { proveedores, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Proveedores</h1>
					
					<FormularioProveedorContainer/>
					<MostarProveedorContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearProveedor } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Nombre</th>
						        	<th>Dirección</th>
						        	<th>Telefono</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderProveedores(proveedores) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar