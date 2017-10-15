import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioFarmaceuticaContainer from '../Formulario'
import MostarFarmaceuticaContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderFarmaceuticas = this.renderFarmaceuticas.bind(this)
	}

	componentWillMount() {
		this.props.listarFarmaceuticas()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.farmaceuticas !== this.props.farmaceuticas ||
			nextProps.eliminar !== this.props.eliminar
		)
		
		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderFarmaceuticas(farmaceuticas) {
		return <tbody>
			{
				farmaceuticas.map((farmaceutica) => {
					return <tr key={farmaceutica.id_farmaceutica}>
			            <td>{ farmaceutica.id_farmaceutica }</td>
			            <td>{ farmaceutica.nombre }</td>
			            <td>{ farmaceutica.direccion }</td>
			            <td>{ farmaceutica.telefono }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarFarmaceutica(farmaceutica.id_farmaceutica) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarFarmaceutica(farmaceutica.id_farmaceutica) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarFarmaceutica(farmaceutica.id_farmaceutica) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { farmaceuticas, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
					this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Farmacéuticas</h1>
					
					<FormularioFarmaceuticaContainer/>
					<MostarFarmaceuticaContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearFarmaceutica } className='btn btn-success'>Agregar</button>
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

							{ this.renderFarmaceuticas(farmaceuticas) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar