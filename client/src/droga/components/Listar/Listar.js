import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioDosisContainer from '../Formulario'
import MostarDrogaContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderDrogas = this.renderDrogas.bind(this)
	}

	componentWillMount() {
		this.props.listarDrogas()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.drogas !== this.props.drogas ||
			nextProps.eliminar !== this.props.eliminar
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderDrogas(drogas) {

		return <tbody>
			{
				drogas.map((droga) => {
					return <tr key={droga.id_droga}>
			            <td>{ droga.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarDroga(droga.id_droga) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarDroga(droga.id_droga) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarDroga(droga.id_droga) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { drogas, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error : 
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Drogas</h1>
					
					<FormularioDosisContainer/>
					<MostarDrogaContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearDroga } className='btn btn-success'>Agregar</button>
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

							{ this.renderDrogas(drogas) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar