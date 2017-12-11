import React, { Component } from 'react'

import { Link } from 'react-router'
import jwtDecode from 'jwt-decode'

import moment from 'moment'

import FormularioMedicamentoEntregadoContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentosEntregados = this.renderMedicamentosEntregados.bind(this)
		this.renderFormularioMedicamentoEntregado = this.renderFormularioMedicamentoEntregado.bind(this)
	
		this.renderBtnsOpciones = this.renderBtnsOpciones.bind(this)
		this.getEstadoHabilitado = this.getEstadoHabilitado.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	// componentWillMount() {
	// }

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.medicamentosEntregados !== this.props.medicamentosEntregados ||
			nextProps.medicamentosEntregadosFiltrados !== this.props.medicamentosEntregadosFiltrados ||
			nextProps.formulario !== this.props.formulario
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}


	getEstadoHabilitado(i) {
		let idRol = this.personalLocalSt.id_rol

		let desabilitado

		if(i.medicamentoEntregado.imprimido) {
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


	renderBtnsOpciones(i) {
		let idRol = this.personalLocalSt.id_rol

		// 5 farmaceutico.
		// 3 administración.
		if((idRol == 5) || (idRol == 3)) {
			return <div>
				<Link to={`/dashboard/medicamentos-entregados/${i.medicamentoEntregado.id_medicamentoEntregado}/medicamentos`}>
					<button type="button" className="btn btn-info btn-space">Mostrar</button>
				</Link>
				<button disabled={this.getEstadoHabilitado(i)} type="button" onClick={() => { this.props.abrirFormularioEditarMedicamentoEntregado(i.medicamentoEntregado.id_medicamentoEntregado) }} className="btn btn-warning btn-space">Editar</button>
				<button disabled={this.getEstadoHabilitado(i)} type="button" onClick={() => { this.props.eliminarMedicamentoEntregado(i.medicamentoEntregado.id_medicamentoEntregado) }} className="btn btn-danger btn-space">Eliminar</button>
			</div>
		} else {
			return <span></span>
		}
	}


	renderFormularioMedicamentoEntregado() {
		let formulario = this.props.formulario

		if(formulario.abirtoCrear || formulario.abirtoEditar) {
			return <FormularioMedicamentoEntregadoContainer/>
		} else {
			<span></span>
		}
	}

	renderMedicamentosEntregados(medicamentosEntregados) {
		// console.log(medicamentosEntregados)

		return <tbody>
			{
				medicamentosEntregados.map((i) => {
					return <tr key={i.medicamentoEntregado.id_medicamentoEntregado}>
			            <td className='text-center'>{ moment(i.medicamentoEntregado.fecha).format('DD-MM-YYYY') }</td>
			            <td className='text-center'>{ i.medicamentoEntregado.hora }</td>

			            <td>
			            	<p className='text-center'>{ i.paciente.nroDocumento+' '+i.tpDocPaciente.descripcion }</p>
			            	<p className='text-center'>{ i.paciente.nombres+' '+i.paciente.apellidos }</p>
			            </td>
			            
			            <td>
			            	<p className='text-center'>{ i.farmaceutico.nroDocumento+' '+i.tpDocFarmaceutico.descripcion }</p>
			            	<p className='text-center'>{ i.farmaceutico.nombres+' '+i.farmaceutico.apellidos }</p>
			            </td>			            

			            <td className='text-center'>
			            	{ this.renderBtnsOpciones(i) }
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		return <div>
			<h1 className='text-center'>Medicamentos entregados</h1>
					
			<div className='row'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button onClick={ this.props.abrirFormularioCrearMedicamentoEntregado } className='btn btn-success'>Agregar</button>
				</div>
			</div>
			<br/>

			{ this.renderFormularioMedicamentoEntregado() }

			<div className='table-responsive'>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th className='text-center'>Fecha</th>
							<th className='text-center'>Hora</th>
							<th className='text-center'>Paciente</th>
							<th className='text-center'>Pesonal</th>
							<th className='text-center'>Opciones</th>
						</tr>
					</thead>

					{ this.renderMedicamentosEntregados(this.props.medicamentosEntregadosFiltrados) }

				</table>
			</div>
		</div>

	}
}

export default Listar