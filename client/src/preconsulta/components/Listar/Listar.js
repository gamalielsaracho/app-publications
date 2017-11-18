import React, { Component } from 'react'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioPreConsultaContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPreConsultas = this.renderPreConsultas.bind(this)
		this.renderFormularioPreConsulta = this.renderFormularioPreConsulta.bind(this)
	}

	// componentWillMount() {
	// 	this.props.listarRoles()
	// }

	renderFormularioPreConsulta() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioPreConsultaContainer/>
		} else {
			return <span></span>
		}
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

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.preConsultas !== this.props.preConsultas ||
			nextProps.formulario !== this.props.formulario
		)

		if(condition) {
			return true
		} else {
			return false
		}
	}	

	renderPreConsultas(preConsultas) {

		return <tbody>
			{
				preConsultas.map((i) => {
					return <tr key={i.preconsulta.id_preconsulta}>
			            <td>{ moment(i.preconsulta.fecha).format('DD-MM-YYYY') }</td>
			            <td>{ i.preconsulta.hora }</td>
			            <td>{ i.nivel.descripcion }</td>

			            <td>
			            	<p className='text-center'>{ i.paciente.nroDocumento+' '+i.tpDocPaciente.descripcion }</p>
			            	<p className='text-center'>{ i.paciente.nombres+' '+i.paciente.apellidos }</p>
			            </td>
			            
			            <td>
			            	<p className='text-center'>{ i.personal.nroDocumento+' '+i.tpDocEnfermera.descripcion }</p>
			            	<p className='text-center'>{ i.personal.nombres+' '+i.personal.apellidos }</p>
			            </td>

			            <td>
							<button type="button" onClick={() => { this.props.mostrarRol(i.preconsulta.id_preconsulta) }} className="btn btn-info btn-space">Mostrar</button>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarPreConsulta(i.preconsulta.id_preconsulta) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarPreConsulta(i.preconsulta.id_preconsulta) }} className="btn btn-danger btn-space">Eliminar</button>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		return <div>
			<h1 className='text-center'>Pre-consultas</h1>

			<div className='row'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button onClick={ this.props.abrirFormularioCrearPreConsulta } className='btn btn-success'>Agregar</button>
				</div>
			</div>
			<br/>

			{ this.renderFormularioPreConsulta() }

			<div className='table-responsive'>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Fecha</th>
							<th>Hora</th>
							<th>Nivel</th>
							<th className='text-center'>Paciente</th>
							<th className='text-center'>Enfermero/a</th>
							<th className='text-center'>Opciones</th>
						</tr>
					</thead>

					{ this.renderPreConsultas(this.props.preConsultasFiltradas) }

				</table>
			</div>
		</div>

	}
}

export default Listar