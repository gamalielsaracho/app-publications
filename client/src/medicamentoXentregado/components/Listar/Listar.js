import React, { Component } from 'react'

import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import MostrarMedicamentoAgregadoContainer from '../Mostrar'

import FormularioMedicamentoAgregadoContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentosAgregados = this.renderMedicamentosAgregados.bind(this)
		this.renderFormularioMedicamentoAgregado = this.renderFormularioMedicamentoAgregado.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	// idMedicamentoEntregado -> es pasado como property al ser llamado.
	componentWillMount() {
		this.props.listarMedicamentosAgregados(this.props.urls.idMedicamentoEntregado)
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.medicamentosAgregados !== this.props.medicamentosAgregados ||
			nextProps.formulario !== this.props.formulario
		)

		if(condition) {
			return true
		} else {
			return false
		}
	}

	renderFormularioMedicamentoAgregado() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioMedicamentoAgregadoContainer
				idMedicamentoEntregado = { this.props.urls.idMedicamentoEntregado }/>
		} else {
			return <span></span>
		}
	}

	renderMedicamentosAgregados(medicamentosAgregados) {
		// console.log(medicamentosAgregados)
		return <tbody>
			{
				medicamentosAgregados.map((i) => {
					return <tr key={i.medicamentoXentregado.id_medicamentoXentregado}>
			            <td>
			            	{ 
			            	  i.nombreMedicamento.descripcion +' '+
			            	  i.medicamento.cantidadXunidad +' '+
			            	  i.presentacion.descripcion
			            	}
			            </td>
			            <td>{ i.medicamentoXentregado.lote }</td>
			            <td>{ i.medicamentoXentregado.cantidad }</td>

			            <td>
			            	<button type="button" onClick={() => { this.props.mostrarMedicamentoAgregado(i.medicamentoXentregado.id_medicamentoXentregado) }} className="btn btn-info btn-space">Mostrar detalle Gral de medicamento</button>
			            	<button type="button" onClick={() => { this.props.abrirFormularioEditarMedicamentoAgregado(i.medicamentoXentregado.id_medicamentoXentregado) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarMedicamentoAgregado(i.medicamentoXentregado.id_medicamentoXentregado) }} className="btn btn-danger btn-space">Eliminar</button>
						</td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {
		const { medicamentosAgregados, cargando, error } = this.props.listar		

		// console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'>Medicamentos</h3>
											
					<MensajeOerror error={error} mensaje={null}/>
					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearMedicamentoAgregado } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					{ this.renderFormularioMedicamentoAgregado() }

					<MostrarMedicamentoAgregadoContainer/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Medicamento</th>
						        	<th>Número de lote</th>
						        	<th>Cantidad</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderMedicamentosAgregados(medicamentosAgregados) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar