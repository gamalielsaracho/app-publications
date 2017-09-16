import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioTipoConsumoContainer from '../Formulario'
import MostarTipoConsumoContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderTiposConsumos = this.renderTiposConsumos.bind(this)
	}

	componentWillMount() {
		this.props.listarTiposConsumos()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.tiposConsumos !== this.props.tiposConsumos) {
			return true
		}else {
			return false
		}
	}	

	renderTiposConsumos(tiposConsumos) {

		return <tbody>
			{
				tiposConsumos.map((tipo) => {
					return <tr key={tipo.id_tipoConsumo}>
			            <td>{ tipo.id_tipoConsumo }</td>
			            <td>{ tipo.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarTipoConsumo(tipo.id_tipoConsumo) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarTipoConsumo(tipo.id_tipoConsumo) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarTipoConsumo(tipo.id_tipoConsumo) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { tiposConsumos, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Tipos consumos</h1>
					
					<FormularioTipoConsumoContainer/>
					<MostarTipoConsumoContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearTipoConsumo } className='btn btn-success'>Agregar</button>
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

							{ this.renderTiposConsumos(tiposConsumos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar