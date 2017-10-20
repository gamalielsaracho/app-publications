import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderDepartamentos = this.renderDepartamentos.bind(this)
	}

	componentWillMount() {
		this.props.listarDepartamentos()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.departamentos !== this.props.departamentos ||
			nextProps.eliminar !== this.props.eliminar
		)
		
		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderDepartamentos(departamentos) {

		return <tbody>
			{
				departamentos.map((departamento) => {
					return <tr key={departamento.id_departamento}>
			            <td>{ departamento.id_departamento }</td>
			            <td>{ departamento.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarDepartamento(departamento.id_departamento) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarDepartamento(departamento.id_departamento) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarDepartamento(departamento.id_departamento) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>	
				})
			}
		</tbody>
	}

	render() {

		const { departamentos, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Departamentos</h1>

					<FormularioContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearDepartamento } className='btn btn-success'>Agregar</button>
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

							{ this.renderDepartamentos(departamentos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar