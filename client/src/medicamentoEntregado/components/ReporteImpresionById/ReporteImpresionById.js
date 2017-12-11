import React, { Component } from 'react'

import ReactModal from 'react-modal'
import moment from 'moment'

import MensajeOerror from '../../../app/components/MensajeOerror'
import Cargando from '../../../app/components/Cargando'

import CabeceraContainer from '../../../app/components/Cabecera'

import jwtDecode from 'jwt-decode'

class ReporteImpresionById extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentoEntregadoImpresion = this.renderMedicamentoEntregadoImpresion.bind(this)
		
		this.renderBtnImprimir = this.renderBtnImprimir.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))

		this.renderMedicamentos = this.renderMedicamentos.bind(this)

		this.renderDrogas = this.renderDrogas.bind(this)

		this.getEstadoHabilitado = this.getEstadoHabilitado.bind(this)		
	}

	// El objeto urls es pasado como property al ser llamado dentro
	// de .
	componentWillMount() {
		this.props.medicamentoEntregadoImpresionFuncion(this.props.urls.idMedicamentoEntregado)
	}

	getEstadoHabilitado(dato) {
		let idRol = this.personalLocalSt.id_rol

		let desabilitado

		if(dato.medicamentoEntregado.imprimido) {
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

	renderBtnImprimir(dato) {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		if((idRol == 5) || (idRol == 3)) {
			return <div className='row no-print-data'>
				<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right'>
					<button disabled={this.getEstadoHabilitado(dato)} className='btn btn-success' 
						onClick={() => { 
							this.props.imprimirMedicamentosEntregados(this.props.urls.idMedicamentoEntregado)
						}}>Imprimir o Exportar a PDF</button>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}


	renderDrogas(drogas) {
		return <div>
			{
				drogas.map((i) => {
					return <ul key={i.droga.id_droga}>
						<div className='row'>
							<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
								<p><strong>-</strong>{ i.droga.descripcion+' '+i.medicamentoDroga.descripcionProporcion }</p>
							</div>
						</div>
			        </ul>		
				})
			}
		</div>
	}

	renderMedicamentos(medicamentos) {
		return <div>
			<h3 className='text-center'>Medicamentos</h3>

			{
				medicamentos.map((i) => {
					return <ul key={i.medicamento.id_medicamento}>
			           			            
						<div className='row'>
							<div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
								<div className='row'>
									<div className='col-xs-6 col-sm-6 col-md-6 col-lg-5'>
										<p><strong>Nombre:</strong>{ i.nombreMedicamento.descripcion }</p>
										<p><strong>Cantidad por Unidad:</strong>{ i.medicamento.cantidadXunidad }</p>
										<p><strong>Presentación:</strong>{ i.presentacion.descripcion }</p>
										<p><strong>Observaciones:</strong>{ i.medicamento.observaciones }</p>
									</div>
									<div className='col-xs-6 col-sm-6 col-md-6 col-lg-3'>
										{ this.renderDrogas(i.drogas) }
									</div>
								</div>

								<div className='row'>
									<p>{ i.farmaceutica.nombre+' | '+i.farmaceutica.direccion+' | '+i.farmaceutica.telefono }</p>
									
								</div>

							</div>
							<div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
								<p><strong>Lote:</strong>{ i.medicamentoXentregado.lote }</p>
								<p><strong>Cantidad entregada:</strong>{ i.medicamentoXentregado.cantidad }</p>
							</div>
						</div>
			        	
			        	<br/>
			        </ul>		
				})
			}
		</div>
	}

	renderMedicamentoEntregadoImpresion(dato, cargando) {
		if(cargando) {
			return <Cargando/>
		} else if (dato) {
			console.log(dato)

			return <div className='responsive'>
					<br/>
					{ this.renderBtnImprimir(dato) }
					<br/>

					<hr></hr>
					<CabeceraContainer
						styleData={''}
						fechaCreacion = { this.props.fechaTratamiento }
						fechaImpresion = { new Date() }/>

					<div className='row'>
			           
						<div className='col-xs-6 col-sm-12 col-md-4 col-lg-4'>
							<h3 className='text-center'>Paciente</h3>
							<p><strong>Número de documento:</strong>{ dato.paciente.nroDocumento }</p>
							<p><strong>Tipo de documento:</strong>{ dato.tpDocPaciente.descripcion }</p>

							<p><strong>Nombre:</strong>{ ' '+dato.paciente.nombres+' '+dato.paciente.apellidos }</p>
							<p><strong>Sexo:</strong>{ ' '+dato.paciente.sexo }</p>
							<p><strong>Fecha de nacimiento:</strong>{ ' '+moment(dato.paciente.fechaNacimiento).format('L') }</p>
							<p><strong>Celular:</strong>{ ' '+dato.paciente.celular +' '} <strong>Telefono:</strong>{ ' '+dato.paciente.telefono }</p>
							<p><strong>Dirección:</strong>{ ' '+dato.paciente.direccion }</p>
						</div>
						<div className='col-xs-6 col-sm-12 col-md-4 col-lg-4'>
							<h3 className='text-center'>Personal</h3>
							<p><strong>Número de documento:</strong>{ dato.farmaceutico.nroDocumento }</p>
							<p><strong>Tipo de documento:</strong>{ dato.tpDocFarmaceutico.descripcion }</p>
							<p><strong>Nombre:</strong>{ ' '+dato.farmaceutico.nombres+' '+dato.farmaceutico.apellidos }</p>
							<p><strong>Celular:</strong>{ ' '+dato.farmaceutico.celular +' '} <strong>Telefono:</strong>{ ' '+dato.farmaceutico.telefono }</p>
							<br/>
							<h4><strong>Hora:</strong>{ ' '+dato.medicamentoEntregado.hora }</h4>
							
						</div>
					</div>

					{ this.renderMedicamentos(dato.medicamentos) }
					<hr></hr>
					<br/>
			</div>
		}
	}

	render() {
		const { cargando, medicamentoEntregado, error } = this.props.medicamentoEntregadoImpresion

		return <div>
			<div className='row'>
				<MensajeOerror error={error} mensaje={null}/>
			</div>

			{ this.renderMedicamentoEntregadoImpresion(medicamentoEntregado, cargando) }
		</div>

	}
}

export default ReporteImpresionById