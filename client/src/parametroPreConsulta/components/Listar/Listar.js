import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioParametroPreConsultaContainer from '../Formulario'
import MostarParametroPreConsultaContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderParametrosPreConsulta = this.renderParametrosPreConsulta.bind(this)
	}

	componentWillMount() {
		this.props.listarParametrosPreConsulta()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.parametros !== this.props.parametros ||
			nextProps.eliminar !== this.props.eliminar
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}

	renderParametrosPreConsulta(parametros) {

		console.log(parametros)
		return <tbody>
			{
				parametros.map((i) => {
					return <tr key={i.parametro.id_parametroPreconsulta}>
			            <td>{ i.parametro.id_parametroPreconsulta }</td>
			            <td>{ i.parametro.descripcion }</td>
			            <td>{ i.unidad.descripcion }</td>
			            <td>{ i.parametro.valorNormal }</td>
			            <td>{ i.parametro.valorAlto }</td>
			            <td>{ i.parametro.valorBajo }</td>

			            <td>
							<button type="button" onClick={() => { this.props.mostrarParametroPreConsulta(i.parametro.id_parametroPreconsulta) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarParametroPreConsulta(i.parametro.id_parametroPreconsulta) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarParametroPreConsulta(i.parametro.id_parametroPreconsulta) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { parametros, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Parametros pre-consulta</h1>
					
					<FormularioParametroPreConsultaContainer/>
					<MostarParametroPreConsultaContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearParametroPreConsulta } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Nombre</th>
						        	<th>Unidad</th>
						        	<th>Valor normal</th>
						        	<th>Valor alto</th>
						        	<th>Valor bajo</th>

						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderParametrosPreConsulta(parametros) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar