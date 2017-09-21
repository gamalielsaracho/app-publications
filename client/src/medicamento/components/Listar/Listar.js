import React, { Component } from 'react'
import { Link } from 'react-router'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioMedicamentoContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentos = this.renderMedicamentos.bind(this)
		this.renderFormularioMedicamento = this.renderFormularioMedicamento.bind(this)

	}

	renderFormularioMedicamento() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioMedicamentoContainer/>
		} else {
			return <span></span>
		}
	}

	componentWillMount() {
		this.props.listarMedicamentos()
	}

	shouldComponentUpdate(nextProps) {
		if((nextProps.medicamentos !== this.props.medicamentos) || (nextProps.formulario !==  this.props.formulario)) {
			// console.log('ESTADO DE FORMULARIO ANTERIOR.')
			// console.log(this.props.formulario)

			// console.log('ESTADO DE FORMULARIO SIGUIENTE.')
			// console.log(nextProps.formulario)

			return true
		}else {
			return false
		}
	}	

	renderMedicamentos(medicamentos) {

		return <tbody>
			{
				medicamentos.map((i) => {
					return <tr key={i.medicamento.id_medicamento}>
			            <td>{ i.medicamento.id_medicamento }</td>
			            <td>{ i.nombreMedicamento.descripcion }</td>
			            <td>{ i.nombreMedicamento.nombreGenerico }</td>
			            <td>{ i.presentacion.descripcion }</td>
			            <td>{ i.dosis.valor }</td>
			            <td>{ i.unidad.descripcion }</td>
			            <td>{ i.medicamento.cantidadFarmaceutica }</td>
			            <td>{ i.tipoConsumo.descripcion }</td>

			            <td>
			            	<Link to={`/dashboard/medicamentos/${i.medicamento.id_medicamento}`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { medicamentos, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Medicamentos</h1>
					
					{ this.renderFormularioMedicamento() }

					<MensajeOerror error={error} mensaje={null}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearMedicamento } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Nombre comercial</th>
						        	<th>Nombre genérico</th>
						        	<th>Presentación</th>
						        	<th>Dosis</th>
						        	<th>Medida</th>
						        	<th>Cantidad x unidad</th>
						        	<th>Consumo via</th>

						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderMedicamentos(medicamentos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar