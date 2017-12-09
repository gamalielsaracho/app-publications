import React, { Component } from 'react'
import { Link } from 'react-router'

import moment from 'moment'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

// Formulario Modal para agregar solo una consulta por pre-consulta.
import FormularioConsultaContainer from '../../../consulta/components/Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderConsultas = this.renderConsultas.bind(this)
		this.renderFormularioConsulta = this.renderFormularioConsulta.bind(this)
		this.renderBtnAddByUrlsParams = this.renderBtnAddByUrlsParams.bind(this)
		
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}


	renderBtnAddByUrlsParams() {
		// Si el usuario está parado en una pre-cosulta.
		// Mostrar el Boton de agregar consulta, de lo contrario NO..
		if(this.props.urls.idPreConsulta) {
			return <div className='row'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button onClick={ this.props.abrirFormularioCrearConsulta } className='btn btn-success'>Agregar</button>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}


	renderFormularioConsulta() {
		
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioConsultaContainer
				idPreConsulta={this.props.urls.idPreConsulta}/>
		} else {
			return <span></span>
		}
	}
	

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.consultas !== this.props.consultas ||
			nextProps.formulario !== this.props.formulario ||
			nextProps.consultasFiltradas !== this.props.consultasFiltradas
		)

		if(condition) {
			return true
		}else {
			return false
		}
	}


	renderConsultas(consultas) {
		let urlMostrarConsulta

		// Para cuando esté dentro del historial clínico.
		if(this.props.urls.idPaciente) {
			urlMostrarConsulta = `/dashboard/pacientes/${this.props.urls.idPaciente}/consultas`
		} else {
			if(this.props.urls.idPreConsulta) {
				urlMostrarConsulta = `/dashboard/pre-consultas/${this.props.urls.idPreConsulta}/consultas`
			} else {
				urlMostrarConsulta = `/dashboard/consultas`
			}
		}

		return <tbody>
			{
				consultas.map((i) => {
					return <tr key={i.consulta.id_consulta}>
			            <td>{ i.consulta.id_consulta }</td>
			            <td>{ i.nivel.descripcion}</td>
			            <td>{ moment(i.consulta.fecha).format('DD-MM-YYYY') }</td>
			            <td>{ i.consulta.hora }</td>
			            <td>{ moment(i.consulta.fechaProximaConsulta).format('DD-MM-YYYY') }</td>
			           
			            <td>
			            	<p className='text-center'>{ i.paciente.nroDocumento+' '+i.tpDocPaciente.descripcion }</p>
			            	<p className='text-center'>{ i.paciente.nombres+' '+i.paciente.apellidos }</p>
			            </td>

			            <td>
			            	<p className='text-center'>{ i.personal.nroDocumento+' '+i.tpDocPersonal.descripcion }</p>
			            	<p className='text-center'>{ i.personal.nombres+' '+i.personal.apellidos }</p>
			            </td>

			            <td>
			            	<Link to={`${urlMostrarConsulta}/${i.consulta.id_consulta}`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		return <div>
		
			<h1 className='text-center'>Consultas</h1>
					
			{ this.renderBtnAddByUrlsParams() }
			<br/>

			{ this.renderFormularioConsulta() }
					
			<div className='table-responsive'>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Código</th>
							<th>Nivel</th>
							<th>Fecha</th>
							<th>Hora</th>
							<th>Próxima consulta</th>
							<th className='text-center'>Paciente</th>
							<th className='text-center'>Médico/ca</th>

							<th>Opciones</th>
						</tr>
					</thead>

					{ this.renderConsultas(this.props.consultasFiltradas) }

				</table>
			</div>
		</div>

	}
}

export default Listar