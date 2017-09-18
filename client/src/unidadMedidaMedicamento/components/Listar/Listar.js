import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioUnidadMedicamentoContainer from '../Formulario'
import MostarUnidadMedicamentoContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderUnidadesMedicamentos = this.renderUnidadesMedicamentos.bind(this)
	}

	componentWillMount() {
		this.props.listarUnidadesMedicamentos()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.unidadesMedicamentos !== this.props.unidadesMedicamentos) {
			return true
		}else {
			return false
		}
	}	

	renderUnidadesMedicamentos(unidadesMedicamentos) {

		return <tbody>
			{
				unidadesMedicamentos.map((unidad) => {
					return <tr key={unidad.id_unidadMedidaMedicamento}>
			            <td>{ unidad.id_unidadMedidaMedicamento }</td>
			            <td>{ unidad.descripcion }</td>
			            <td>
							<button type="button" onClick={() => { this.props.mostrarUnidadMedicamento(unidad.id_unidadMedidaMedicamento) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarUnidadMedicamento(unidad.id_unidadMedidaMedicamento) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarUnidadMedicamento(unidad.id_unidadMedidaMedicamento) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { unidadesMedicamentos, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Unidades de medida</h1>
					
					<FormularioUnidadMedicamentoContainer/>
					<MostarUnidadMedicamentoContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearUnidadMedicamento } className='btn btn-success'>Agregar</button>
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

							{ this.renderUnidadesMedicamentos(unidadesMedicamentos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar