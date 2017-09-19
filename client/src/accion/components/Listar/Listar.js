import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioAccionContainer from '../Formulario'
import MostarAccionContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderAcciones = this.renderAcciones.bind(this)
	}

	componentWillMount() {
		this.props.listarAcciones()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.acciones !== this.props.acciones) {
			return true
		}else {
			return false
		}
	}	

	renderAcciones(acciones) {

		return <tbody>
			{
				acciones.map((accion) => {
					return <tr key={accion.id_accion}>
			            <td>{ accion.id_accion }</td>
			            <td>{ accion.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarAccion(accion.id_accion) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarAccion(accion.id_accion) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarAccion(accion.id_accion) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { acciones, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Acciones</h1>
					
					<FormularioAccionContainer/>
					<MostarAccionContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearAccion } className='btn btn-success'>Agregar</button>
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

							{ this.renderAcciones(acciones) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar