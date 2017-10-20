import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderAlergias = this.renderAlergias.bind(this)
	}

	componentWillMount() {
		this.props.listarAlergias()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.alergias !== this.props.alergias ||
			nextProps.eliminar !== this.props.eliminar
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderAlergias(alergias) {

		return <tbody>
			{
				alergias.map((alergia) => {
					return <tr key={alergia.id_alergia}>
			            <td>{ alergia.id_alergia }</td>
			            <td>{ alergia.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarAlergia(alergia.id_alergia) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarAlergia(alergia.id_alergia) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarAlergia(alergia.id_alergia) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { alergias, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Alergias</h1>
					
					<FormularioContainer/>
					<MostarContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearAlergia } className='btn btn-success'>Agregar</button>
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

							{ this.renderAlergias(alergias) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar