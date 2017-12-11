import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'

import { Link } from 'react-router'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioMedicamentoTratamientoContainer from '../Formulario'

import CabeceraContainer from '../../../app/components/Cabecera'


class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderMedicamentosTratamiento = this.renderMedicamentosTratamiento.bind(this)
		this.renderDetalleMedicamento = this.renderDetalleMedicamento.bind(this)
		this.renderObservaciones = this.renderObservaciones.bind(this)
		this.renderFormularioMedicamentoTratamiento = this.renderFormularioMedicamentoTratamiento.bind(this)
		this.renderBtnsOpciones = this.renderBtnsOpciones.bind(this)
		this.renderBtnAgregar = this.renderBtnAgregar.bind(this)
		this.renderBtnImprimir = this.renderBtnImprimir.bind(this)
		

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
		this.idMedicoLocalSt = localStorage.getItem('idMedico')

		this.renderBtnAuditByRol = this.renderBtnAuditByRol.bind(this)
		this.getEstadoHabilitado = this.getEstadoHabilitado.bind(this)
	}

	getEstadoHabilitado() {
		let idRol = this.personalLocalSt.id_rol

		let habilitado

		if(this.props.tratamientoImprimido) {
			habilitado = true
		} else {
			habilitado = false
		}

		// 3 administración.
		if(idRol == 3) {
			habilitado = false
		}

		return habilitado
	}

	componentWillMount() {
		// idTratamiento es pasado como property al ser llamado dentro de 
		// MostrarTratamientoContainer.
		this.props.listarMedicamentosTratamientosByIdTratamiento(this.props.idTratamiento)
	}


	renderBtnAuditByRol() {
		let idRol = this.personalLocalSt.id_rol
		
		if(idRol == 3) {
			return <div className='row no-print-data'>
				<div className='col-xs-11 col-sm-11 col-md-11 col-lg-11 text-right'>
					<br/>
					<Link target="_blank" to={`/dashboard/modulos-auditados/${this.props.idTratamiento}/auditoria/tratamiento-medicamentos`}>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Auditoría
						</button>
					</Link>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}


	renderFormularioMedicamentoTratamiento() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			// console.log("FormularioPacienteContainer montado. cool.!!")
			return <FormularioMedicamentoTratamientoContainer
				idTratamiento={this.props.idTratamiento}/>
		} else {
			return <span></span>
		}
	}


	renderBtnImprimir() {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		if((idRol == 1 && idPersonal == this.idMedicoLocalSt) || (idRol == 3)) {
			return <div className='row no-print-data'>
				<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right'>
					<button className='btn btn-success' 
						onClick={() => { 
							this.props.imprimirTratamiento(this.props.idTratamiento)
						}}>Imprimir o Exportar a PDF</button>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}


	renderBtnAgregar() {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		if((idRol == 1 && idPersonal == this.idMedicoLocalSt) || (idRol == 3)) {
			return <div className='row no-print-data'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button disabled={this.getEstadoHabilitado()} onClick={ this.props.abrirFormularioCrearMedicamentoTratamiento } className='btn btn-success'>Agregar</button>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}

	renderBtnsOpciones(i) {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		// 1 médico.
		// 3 administración.
		if((idRol == 1 && idPersonal == this.idMedicoLocalSt) || (idRol == 3)) {
			return <div className='text-right no-print-data'>
				<button disabled={this.getEstadoHabilitado()} type="button" onClick={() => { this.props.abrirFormularioEditarMedicamentoTratamiento(i.indicacion.id_medicamentoTratamiento) }} className="btn btn-warning btn-space">Editar</button>
				<button disabled={this.getEstadoHabilitado()} type="button" onClick={() => { this.props.eliminarMedicamentoTratamiento(i.indicacion.id_medicamentoTratamiento) }} className="btn btn-danger btn-space">Eliminar</button>
			</div>
		} else {
			return <span></span>
		}
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.medicamentosTratamiento !== this.props.medicamentosTratamiento ||
			nextProps.eliminar !== this.props.eliminar ||
			nextProps.formulario !== this.props.formulario
		)
		
		if(condition) {
			return true
		}else {
			return false
		}
	}

	renderDetalleMedicamento(detalleMedicamento, medicamentoNoExistente) {
		if(medicamentoNoExistente) {
			return <div>
				<h3 className=''>{ medicamentoNoExistente }</h3>
			</div>
		} else if(detalleMedicamento){
			return <div>
				<h3 className=''>{ detalleMedicamento.nombreMedicamento.descripcion }</h3>
				<h4></h4>
				{
					detalleMedicamento.drogas.map((i) => {
						return <ul key={i.droga.id_droga}>
							<li>{i.droga.descripcion+' '+i.medicamentoDroga.descripcionProporcion }</li>
						</ul>
					})
				}
			</div>
		}
	}

	renderObservaciones(observaciones) {
		if(observaciones) {
			return <div className=''>
			<p><strong>Observaciones: </strong>{ observaciones }</p>
			</div>
		} else {
			return <span></span>
		}
	}

	renderMedicamentosTratamiento(medicamentosTratamiento) {
		// console.log('<------------- medicamentosTratamiento -------->')
		// console.log(medicamentosTratamiento)

		return <div className='row'>
			<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
			{
				medicamentosTratamiento.map((i) => {
					return <div key={i.indicacion.id_medicamentoTratamiento}>
							<div className='row'>
								<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									{ this.renderDetalleMedicamento(i.detalleMedicamento, i.indicacion.medicamentoNoExistente) }
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
									{ this.renderObservaciones(i.indicacion.observaciones) }
								</div>
							</div>
							<div className='row'>
								<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									{ this.renderBtnsOpciones(i) }
								</div>
							</div>
							<br/>
					</div>
				})
			}
			</div>
		</div>
	}

	render() {

		const { medicamentosTratamiento, cargando } = this.props.listar

		let error = this.props.listar.error ? this.props.listar.error :
			this.props.eliminar.error

		// window.onbeforeprint = function () {
  //       	alert('Hello');
  //   	}
	    // window.onafterprint = function () {
	    //     alert('Bye');
	    // }
		
		//.. 
		if(cargando) {
			return <Cargando/>
		} else {
			return <div>
				<h1 className='text-center'></h1>

				{/*
				*/}

				{ this.renderFormularioMedicamentoTratamiento() }

				<MensajeOerror error={error} mensaje={null}/>

				<CabeceraContainer
					styleData={'datos-cabecera-en-modal'}
					fechaCreacion = { this.props.fechaTratamiento }/>

				<h3 className='text-center'>Tratamiento</h3>

				{ this.renderBtnImprimir() }
				<br/>

				{ this.renderBtnAuditByRol() }

				{ this.renderBtnAgregar() }
				
					
				<div className=''>
					{ this.renderMedicamentosTratamiento(medicamentosTratamiento) }
				</div>
			</div>
		}

	}
}

export default Listar