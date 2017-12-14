import React, { Component } from 'react'
import { Link } from 'react-router'

import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioSintomaConsultaContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderSintomasConsulta = this.renderSintomasConsulta.bind(this)
		this.renderBtnsOpciones = this.renderBtnsOpciones.bind(this)
		this.renderBtnAgregar = this.renderBtnAgregar.bind(this)
		
		this.renderFormularioSintomaConsulta = this.renderFormularioSintomaConsulta.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
		this.idMedicoLocalSt = localStorage.getItem('idMedico')

		this.renderBtnAuditByRol = this.renderBtnAuditByRol.bind(this)
	}

	// idConsulta -> es sacado desde la url en el cual está parado.
	componentWillMount() {
		this.props.listarConsultaSintomas(this.props.urls.idConsulta)
	}

	// shouldComponentUpdate(nextProps) {
	// 	let condition = (
	// 		nextProps.sintomasConsulta !== this.props.sintomasConsulta ||
	// 		nextProps.formulario !== this.props.formulario
	// 	)

	// 	if(condition) {
	// 		return true
	// 	} else {
	// 		return false
	// 	}
	// }

	renderBtnAuditByRol() {
		let rol = this.personalLocalSt.id_rol
		
		if(rol == 3) {
			return <div className='row'>
				<div className='col-xs-11 col-sm-11 col-md-11 col-lg-11 text-right'>
					<br/>
					<Link target="_blank" to={`/dashboard/modulos-auditados/${this.props.urls.idConsulta}/auditoria/consulta-sintomas`}>
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

	renderFormularioSintomaConsulta() {
		if(this.props.formulario.abirtoCrear || this.props.formulario.abirtoEditar) {
			return <FormularioSintomaConsultaContainer
				idConsulta = { this.props.urls.idConsulta }/>
		} else {
			return <span></span>
		}
	}

	renderBtnAgregar() {
		let idRol = this.personalLocalSt.id_rol
		let idPersonal = this.personalLocalSt.id_personal

		// 1 médico.
		// 3 administración.
		if((idRol == 1 && idPersonal == this.idMedicoLocalSt) || (idRol == 3)) {
			return <div className='row'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button onClick={ this.props.abrirFormularioCrearConsultaSintoma } className='btn btn-success'>Agregar</button>
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
				<button type="button" onClick={() => { this.props.abrirFormularioEditarConsultaSintoma(i.consultaSintoma.id_consultaSintoma) }} className="btn btn-warning btn-space">Editar</button>
				<button type="button" onClick={() => { this.props.eliminarConsultaSintoma(i.consultaSintoma.id_consultaSintoma) }} className="btn btn-danger btn-space">Eliminar</button>
			</div>
		} else {
			return <span></span>
		}
	}

	renderSintomasConsulta(sintomasConsulta) {
		
		return <tbody>
			{
				sintomasConsulta.map((i) => {
					return <tr key={i.consultaSintoma.id_consultaSintoma}>
			            <td>{ i.sintoma.descripcion }</td>
			            <td>{ i.consultaSintoma.observaciones }</td>

			            <td>
							{ this.renderBtnsOpciones(i) }
						</td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {
		const { sintomasConsulta, cargando, error } = this.props.listar		

		// console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					{ this.renderBtnAuditByRol() }


					<h3 className='text-center'>Síntomas</h3>
											
					<MensajeOerror error={error} mensaje={null}/>
				
					{ this.renderBtnAgregar() }

					<br/>

					{ this.renderFormularioSintomaConsulta() }

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Nombre</th>
						        	<th>Observaciones</th>
						        	<th></th>
						    	</tr>
						    </thead>

							{ this.renderSintomasConsulta(sintomasConsulta) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar