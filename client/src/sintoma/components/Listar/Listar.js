import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioSintomaContainer from '../Formulario'
import MostarSintomaContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderSintomas = this.renderSintomas.bind(this)
	}

	componentWillMount() {
		this.props.listarSintomas()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.sintomas !== this.props.sintomas ||
			nextProps.eliminar !== this.props.eliminar
		)
		
		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderSintomas(sintomas) {

		return <tbody>
			{
				sintomas.map((sintoma) => {
					return <tr key={sintoma.id_sintoma}>
			            <td>{ sintoma.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarSintoma(sintoma.id_sintoma) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarSintoma(sintoma.id_sintoma) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarSintoma(sintoma.id_sintoma) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { sintomas, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
					this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Síntomas</h1>
					
					<FormularioSintomaContainer/>
					<MostarSintomaContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearSintoma } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Nombre</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderSintomas(sintomas) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar