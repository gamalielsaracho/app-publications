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

		this.renderBtnsOpciones = this.renderBtnsOpciones.bind(this)
		this.getEstadoHabilitado = this.getEstadoHabilitado.bind(this)

		this.renderBtnAgregar = this.renderBtnAgregar.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	// idMedicamentoEntregado -> es pasado como property al ser llamado.
	componentWillMount() {
		this.props.mostrarMedicamentoEntregado(this.props.urls.idMedicamentoEntregado)
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


	getEstadoHabilitado() {
		
		let idRol = this.personalLocalSt.id_rol

		let desabilitado

		if(localStorage.getItem('medicamentoEntregadoImprimido') == 1) {
				desabilitado = true
		} else {
				desabilitado = false
		}

		// 3 administración.
		if(idRol == 3) {
			desabilitado = false
		}

		return desabilitado
	}


	renderBtnAgregar() {
		let idRol = this.personalLocalSt.id_rol

		if((idRol == 5) || (idRol == 3)) {
			return <div className='row no-print-data'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button disabled={this.getEstadoHabilitado()} onClick={ this.props.abrirFormularioCrearMedicamentoAgregado } className='btn btn-success'>Agregar</button>
				</div>
			</div>

		} else {
			return <span></span>
		}
	}


	renderBtnsOpciones(i) {
		let idRol = this.personalLocalSt.id_rol


		// 5 farmaceutico.
		// 3 administración.
		if((idRol == 5) || (idRol == 3)) {
			return <div className='text-right'>

				<button  type="button" onClick={
					() => { this.props.mostrarMedicamentoAgregado(i.medicamentoXentregado.id_medicamentoXentregado) }} className="btn btn-info btn-space">
					Mostrar detalle Gral de medicamento
				</button>

			    <button disabled={this.getEstadoHabilitado()} type="button" onClick={
			    	() => { this.props.abrirFormularioEditarMedicamentoAgregado(i.medicamentoXentregado.id_medicamentoXentregado) }} className="btn btn-warning btn-space">
			    	Editar
			    </button>

				<button disabled={this.getEstadoHabilitado()} type="button" onClick={
					() => { this.props.eliminarMedicamentoAgregado(i.medicamentoXentregado.id_medicamentoXentregado) }} className="btn btn-danger btn-space">
					Eliminar
				</button>

		
			</div>
		} else {
			return <span></span>
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
			            <td>{ i.nombreMedicamento.descripcion }</td>
			            <td>{ i.presentacion.descripcion }</td>
			            <td>{ i.medicamento.cantidadXunidad }</td>

			            <td>{ i.medicamentoXentregado.lote }</td>
			            <td className='text-center'>{ i.medicamentoXentregado.cantidad }</td>

			            <td>
			            	{ this.renderBtnsOpciones(i) }
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
					

					{ this.renderBtnAgregar() }
					<br/>

					{ this.renderFormularioMedicamentoAgregado() }

					<MostrarMedicamentoAgregadoContainer/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Medicamento</th>
						        	<th>Presentación</th>
						        	<th>Cantidad por unidad</th>
						        	<th>Número de lote</th>
						        	<th>Cantidad entregada</th>
						        	<th className='text-center'>Opciones</th>
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