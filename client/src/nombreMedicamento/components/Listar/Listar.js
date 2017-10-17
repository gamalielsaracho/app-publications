import React, { Component } from 'react'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioNombreMedicamentoContainer from '../Formulario'
import MostarNombreMedicamentoContainer from '../Mostrar'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderNombresMedicamentos = this.renderNombresMedicamentos.bind(this)
	}

	componentWillMount() {
		this.props.listarNombresMedicamentos()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.nombresMedicamentos !== this.props.nombresMedicamentos ||
			nextProps.eliminar !== this.props.eliminar
		)
		
		if(condition) {
			return true
		}else {
			return false
		}
	}	


	renderNombresMedicamentos(nombresMedicamentos) {

		return <tbody>
			{
				nombresMedicamentos.map((i) => {
					return <tr key={i.id_nombreMedicamento}>
			            <td>{ i.descripcion }</td>

			            <td>
							<button type="button" onClick={() => { this.props.mostrarNombreMedicamento(i.id_nombreMedicamento) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarNombreMedicamento(i.id_nombreMedicamento) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarNombreMedicamento(i.id_nombreMedicamento) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { nombresMedicamentos, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
					this.props.eliminar.error

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Nombres Medicamentos</h1>
					
					<FormularioNombreMedicamentoContainer/>
					<MostarNombreMedicamentoContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearNombreMedicamento } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Nombre comercial</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderNombresMedicamentos(nombresMedicamentos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar