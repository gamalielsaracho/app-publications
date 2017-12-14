import React, { Component } from 'react'
import { Link } from 'react-router'

import moment from 'moment'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

// Formulario Modal para agregar solo una consulta por pre-consulta.
import FormularioConsultaContainer from '../../../consulta/components/Formulario'

import CabeceraContainer from '../../../app/components/Cabecera'

class ReporteListaConsultas extends Component {
	constructor(props) {
		super(props)
		this.renderConsultas = this.renderConsultas.bind(this)		
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))

		this.renderBtnImprimir = this.renderBtnImprimir.bind(this)

		this.renderDatosPaciente = this.renderDatosPaciente.bind(this)
		this.renderDatosPreConsulta = this.renderDatosPreConsulta.bind(this)
		this.renderDatosConsulta = this.renderDatosConsulta.bind(this)

		this.renderDatosSintomas = this.renderDatosSintomas.bind(this)
		this.renderDatosDiagnosticos = this.renderDatosDiagnosticos.bind(this)


		this.renderDetalleMedicamento = this.renderDetalleMedicamento.bind(this)
		this.renderDatosTratamientos = this.renderDatosTratamientos.bind(this)
	}


	renderDatosPreConsulta(i) {
		return <div>
			<h3 className='text-center'>Pre-consulta</h3>
			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-5 col-lg-5'>
					<p><strong>Enfermero/a:</strong>{ i.enfermera.nombres +' '+ i.enfermera.apellidos }</p>
					<p><strong>Nro. Documento:</strong>{ i.enfermera.nroDocumento}</p>
					<p><strong>Tipo documento:</strong>{ i.tpDocEnfermera.descripcion }</p>
					
					<p><strong>Nro. Registro:</strong>{ i.enfermera.nroRegistro }</p>

					<p><strong>Fecha:</strong>{ moment(i.preConsulta.fecha).format('DD-MM-YYYY') } <strong>Hora:</strong>{ i.preConsulta.hora }</p>
				</div>
			</div>

			<br/>
			<div className='table-responsive'>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Parametro</th>
							<th>Valor</th>
							<th>Normal</th>
							<th>Alto</th>
							<th>Bajo</th>
							<th>Observaciones</th>
						</tr>
					</thead>

					<tbody>
						{
							i.resultadosPreconsulta.map((i) => {
								return <tr key={i.preconsultaParametro.id_preconsultaParametro}>
						            <td>{ i.parametro.descripcion }</td>
						            <td>{ i.preconsultaParametro.valor +' '+i.unidad.descripcion }</td>
						            <td>{ i.parametro.valorNormal }</td>
						            <td>{ i.parametro.valorAlto }</td>
						            <td>{ i.parametro.valorBajo }</td>
						            <td>{ i.preconsultaParametro.observaciones }</td>
						        </tr>		
							})
						}
					</tbody>

				</table>
			</div>

		</div>
	}


	renderDatosPaciente(i) {
		return <div>
			<h3>Paciente</h3>
			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<p><strong>Nro. Documento:</strong>{ i.paciente.nroDocumento}</p>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<p><strong>Nombre:</strong>{ i.paciente.nombres +' '+ i.paciente.apellidos }</p>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<p><strong>Sexo:</strong>{ i.paciente.sexo }</p>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<p><strong>Fecha de nacimiento:</strong>{ moment(i.paciente.fechaNacimiento).format('DD-MM-YYYY') }</p>
				</div>
			</div>

			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<p><strong>Tipo documento:</strong>{ i.tpDocPaciente.descripcion }</p>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<p><strong>Telefono:</strong>{ i.paciente.telefono }</p>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<p><strong>Celular:</strong>{ i.paciente.celular }</p>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
					<p><strong>Dirección:</strong>{ i.paciente.direccion }</p>
				</div>
			</div>
			<br/>
		</div>
	}


	renderDatosSintomas(i) {
		if(i.sintomas.length) {
			return <div className='table-responsive'>
				<br/>
				<h4>Sintomas</h4>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Observaciones</th>
						</tr>
					</thead>

					<tbody>
						{
							i.sintomas.map((i) => {
								return <tr key={i.consultaSintoma.id_consultaSintoma}>
						            <td>{ i.sintoma.descripcion }</td>
						            <td>{ i.consultaSintoma.observaciones }</td>
						        </tr>		
							})
						}
					</tbody>
				</table>
			</div>
		} else {
			return <h4>Sin sintomas.</h4>
		}
	}


	renderDatosDiagnosticos(i) {
		if(i.diagnosticos.length) {
			return <div className='table-responsive'>
				<br/>
				<h4>Diagnósticos</h4>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Diagnóstico</th>
							<th>Observaciones</th>
						</tr>
					</thead>

					<tbody>
						{
							i.diagnosticos.map((i) => {
								return <tr key={i.consultaDiagnostico.id_consultaDiagnostico}>
						            <td>{ i.diagnostico.descripcion }</td>
						            <td>{ i.consultaDiagnostico.observaciones }</td>
						        </tr>		
							})
						}
					</tbody>

				</table>
			</div>
		} else {
			return <h4>Sin diagnósticos.</h4>
		}
	}


	renderDetalleMedicamento(i) {
		if(i.indicacion.medicamentoNoExistente) {
			return <div>
				<h3 className=''>{ i.indicacion.medicamentoNoExistente }</h3>
			</div>
		} else {
			return <div>
				<h3 className=''>{ i.nombreMedicamento.descripcion }</h3>
				<h4></h4>
				{
					i.drogas.map((i) => {
						return <ul key={i.droga.id_droga}>
							<li>{i.droga.descripcion+' '+i.medicamentoDroga.descripcionProporcion }</li>
						</ul>
					})
				}
			</div>
		}
	}


	renderDatosTratamientos(i) {
		if(i.tratamientos.length) {
			return <div>
				<br/>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
					<h4 className='text-center'>Tratamientos</h4>
						{
						i.tratamientos.map((i) => {
							return <div key={i.indicacion.id_medicamentoTratamiento}>
								<div className='row'>
									<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
										{ this.renderDetalleMedicamento(i) }
									</div>
								</div>
								<div className='row'>
									<div className='col-xs-12 col-sm-6 col-md-6 col-lg-5'>
										<p><strong>Consumir: </strong> { i.indicacion.cantidadConsumo }</p>
									</div>
									<div className='col-xs-12 col-sm-3 col-md-6 col-lg-3'>
										<p><strong>Cada: </strong> { i.indicacion.cantidadTiempo }</p>
									</div>
									<div className='col-xs-12 col-sm-3 col-md-6 col-lg-4'>
										<p><strong>Durante: </strong> { i.indicacion.duracionConsumo }</p>
									</div>
							   	</div>	
								<div className='row'>
									<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
										<p><strong>Observaciones: </strong>{ i.indicacion.observaciones }</p>
									</div>
								</div>
								<br/>
							</div>
						})
						}
					</div>
				</div>
			</div>
		} else {
			return <h4>Sin tratamientos.</h4>
		}
	}

	renderDatosConsulta(i) {
		return <div>
			<h3 className='text-center'>Consulta</h3>
					
			<div className='row'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-4'>
					<p><strong>Médico/a:</strong>{ i.medico.nombres +' '+ i.medico.apellidos }</p>

					<p><strong>Nro. Documento:</strong>{ i.medico.nroDocumento}</p>
					<p><strong>Tipo documento:</strong>{ i.tpDocMedico.descripcion }</p>
					<p><strong>Nro. Registro:</strong>{ i.medico.nroRegistro }</p>


					<p><strong>Fecha:</strong>{ moment(i.consulta.fecha).format('DD-MM-YYYY') } <strong>Hora:</strong>{ i.consulta.hora }</p>
					<p><strong>Fecha próxima consulta:</strong>{ moment(i.consulta.fechaProximaConsulta).format('DD-MM-YYYY') }</p>
					<p><strong>Nivel:</strong>{ i.nivel.descripcion }</p>				
				</div>
			</div>

			{ this.renderDatosSintomas(i) }
			
			{ this.renderDatosDiagnosticos(i) }

			{ this.renderDatosTratamientos(i) }
		</div>
	}


	renderBtnImprimir() {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		if((idRol == 1) || (idRol == 3)) {
			return <div className='row no-print-data'>
				<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right'>
					<button className='btn btn-success' 
						onClick={() => { 
							this.props.imprimirReporte()
						}}>Imprimir o Exportar a PDF</button>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}


	renderConsultas(consultas) {
		console.log(consultas)
		return <div>
			{
				consultas.map((i) => {
					return <div key={i.consulta.id_consulta} className='pageBreakHere'>
							<hr></hr>
				            <CabeceraContainer
								styleData={null}
								fechaCreacion = { i.consulta.fecha }/>

							{ this.renderDatosPaciente(i) }

							{ this.renderDatosPreConsulta(i) }

							{ this.renderDatosConsulta(i) }

							<br/>
							<br/>
							<hr></hr>
			        </div>		
				})
			}

		</div>
			
	}

	render() {
		console.log('Esto va a ser las consultas detalladas FILTRADAS')
		console.log(this.props.consultasFiltradas)
		return <div>

			{ this.renderBtnImprimir() }

			<h1 className='text-center no-print-data'>Lista de Reportes</h1>
			<br/>
					

			{ this.renderConsultas(this.props.consultasFiltradas) }

		</div>

	}
}

export default ReporteListaConsultas