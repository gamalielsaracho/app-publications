import React, { Component } from 'react'
import { Link } from 'react-router'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioLoteMedicamentoContainer from '../Formulario'

import moment from 'moment'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderLotesMedicamentos = this.renderLotesMedicamentos.bind(this)
	}

	componentWillMount() {
		this.props.listarLotesMedicamentos()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.lotesMedicamentos !== this.props.lotesMedicamentos) {
			return true
		}else {
			return false
		}
	}	

	renderLotesMedicamentos(lotesMedicamentos) {
		return <tbody>
			{
				lotesMedicamentos.map((i) => {
					return <tr key={i.lote.id_loteMedicamento}>
			        	<td>{ i.lote.numeroLote }</td>
			            <td>{ i.lote.cantidadRecibida }</td>
			            <td>{ moment(i.lote.fechaVencimiento).format('DD-MM-YYYY')}</td>
			            <td>{ i.nombreMedicamento.descripcion+' '+i.dosis.valor+' '+i.unidad.descripcion }</td>
			            <td>{ i.medicamento.cantidadFarmaceutica+' '+i.presentacion.descripcion }</td>

			            <td>{ i.tipoConsumo.descripcion }</td>

			            <td>
			            	<Link to={`/dashboard/lotes-medicamentos/${i.lote.id_loteMedicamento}`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>

							<button type="button" onClick={() => { this.props.abrirFormularioEditarLoteMedicamento(i.lote.id_loteMedicamento) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarLoteMedicamento(i.lote.id_loteMedicamento) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { lotesMedicamentos, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Lotes medicamentos</h1>
					
					<FormularioLoteMedicamentoContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearLoteMedicamento } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Lote</th>
						        	<th>Cantidad</th>
						        	<th>Fecha de vencimiento</th>
						        	<th>Medicamento</th>
						        	<th>Presentación</th>
						        	<th>Consumo via</th>

						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderLotesMedicamentos(lotesMedicamentos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar