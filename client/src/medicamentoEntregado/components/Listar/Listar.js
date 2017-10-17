import React, { Component } from 'react'

import { Link } from 'react-router'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioMedicamentoEntregadoContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentosEntregados = this.renderMedicamentosEntregados.bind(this)
		this.renderFormularioMedicamentoEntregado = this.renderFormularioMedicamentoEntregado.bind(this)
	}

	componentWillMount() {
		this.props.listarMedicamentosEntregados()
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.medicamentosEntregados !== this.props.medicamentosEntregados ||
			nextProps.formulario !== this.props.formulario
		)

		if(condition) {
			return true
		}else {
			return false
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

		return <tbody>
			{
				medicamentosEntregados.map((i) => {
					return <tr key={i.medicamentoEntregado.id_medicamentoEntregado}>
			            <td>{ i.personal.nombres+' '+i.personal.apellidos }</td>
			            <td>{ i.paciente.nombres+' '+i.paciente.apellidos }</td>
			            <td>{ moment(i.medicamentoEntregado.fecha).format('L') }</td>

			            <td>
			            	<Link to={`/dashboard/medicamentos-entregados/${i.medicamentoEntregado.id_medicamentoEntregado}/medicamentos`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarMedicamentoEntregado(i.medicamentoEntregado.id_medicamentoEntregado) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarMedicamentoEntregado(i.medicamentoEntregado.id_medicamentoEntregado) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { medicamentosEntregados, cargando, error } = this.props.listar

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h1 className='text-center'>Medicamentos entregados</h1>
					
					<MensajeOerror error={error} mensaje={null}/>

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
						        	<th>Pesonal</th>
						        	<th>Paciente</th>
						        	<th>Fecha</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderMedicamentosEntregados(medicamentosEntregados) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar