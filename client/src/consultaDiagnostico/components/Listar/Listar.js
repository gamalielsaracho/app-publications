import React, { Component } from 'react'
import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import { Link } from 'react-router'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioConsultaDiagnosticoContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderConsultaDiagnosticos = this.renderConsultaDiagnosticos.bind(this)
		this.renderBtnsOpciones = this.renderBtnsOpciones.bind(this)
		this.renderBtnAgregar = this.renderBtnAgregar.bind(this)
		

		this.renderFormularioConsultaDiagnostico = this.renderFormularioConsultaDiagnostico.bind(this)
		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
		this.idMedicoLocalSt = localStorage.getItem('idMedico')

		this.renderBtnAuditByRol = this.renderBtnAuditByRol.bind(this)
	}

	componentWillMount() {
		this.props.listarConsultaDiagnosticos(this.props.urls.idConsulta)
	}

	shouldComponentUpdate(nextProps) {
		let condition = (
			nextProps.consultaDiagnosticos !== this.props.consultaDiagnosticos ||
			nextProps.formulario !== this.props.formulario
		)

		if(condition) {
			return true
		} else {
			return false
		}
	}

	renderBtnAuditByRol() {
		let rol = this.personalLocalSt.id_rol
		
		if(rol == 3) {
			return <div className='row'>
				<div className='col-xs-11 col-sm-11 col-md-11 col-lg-11 text-right'>
					<br/>
					<Link target="_blank" to={`/dashboard/modulos-auditados/${this.props.urls.idConsulta}/auditoria/consulta-diagnosticos`}>
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

	renderBtnAgregar() {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		if((idRol == 1 && idPersonal == this.idMedicoLocalSt) || (idRol == 3)) {
			return <div className='row'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button onClick={ this.props.abrirFormularioCrearConsultaDiagnostico } className='btn btn-success'>Agregar</button>
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
			return <div>
				<button type="button" onClick={() => { this.props.abrirFormularioEditarConsultaDiagnostico(i.consultaDiagnostico.id_consultaDiagnostico) }} className="btn btn-warning btn-space">Editar</button>
				<button type="button" onClick={() => { this.props.eliminarConsultaDiagnostico(i.consultaDiagnostico.id_consultaDiagnostico) }} className="btn btn-danger btn-space">Eliminar</button>
			</div>
		} else {
			return <span></span>
		}		
	}

	renderFormularioConsultaDiagnostico() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioConsultaDiagnosticoContainer
					urls = { this.props.urls }/>
		} else {
			return <span></span>
		}
	}

	renderConsultaDiagnosticos(datos) {
		// console.log(datos)
		if(datos) {
			return <tbody>
				{
					datos.map((i) => {
						return <tr key={i.consultaDiagnostico.id_consultaDiagnostico}>
				            <td>{ i.consultaDiagnostico.id_consultaDiagnostico }</td>
				            <td>{ i.diagnostico.descripcion }</td>
				            <td>{ i.consultaDiagnostico.observaciones }</td>
				            <td>
								{ this.renderBtnsOpciones(i) }
							</td>
				        </tr>		
					})
				}
			</tbody>
		} else {
			return <span></span>
		}		
	}

	render() {
		const { consultaDiagnosticos, cargando, error } = this.props.listar		

		// console.log(consultaDiagnosticos)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					{ this.renderBtnAuditByRol() }
				
					<h3 className='text-center'>Diagnósticos</h3>
											
					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderBtnAgregar() }
					<br/>

					{ this.renderFormularioConsultaDiagnostico() }

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Diagnóstico</th>
						        	<th>Observaciones</th>
						    	</tr>
						    </thead>

							{ this.renderConsultaDiagnosticos(consultaDiagnosticos) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar