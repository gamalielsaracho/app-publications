import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioNivelContainer from '../Formulario'
import MostarNivelContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderNiveles = this.renderNiveles.bind(this)
	}

	componentWillMount() {
		this.props.listarNiveles()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.niveles !== this.props.niveles ||
			nextProps.eliminar !== this.props.eliminar
		)
		
		if(condition) {
			return true
		}else {
			return false
		}
	}	

	renderNiveles(niveles) {

		return <tbody>
			{
				niveles.map((nivel) => {
					return <tr key={nivel.id_nivel}>
			            <td>{ nivel.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarNivel(nivel.id_nivel) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarNivel(nivel.id_nivel) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarNivel(nivel.id_nivel) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { niveles, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Niveles</h1>
					
					<FormularioNivelContainer/>
					<MostarNivelContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearNivel } className='btn btn-success'>Agregar</button>
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

							{ this.renderNiveles(niveles) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar