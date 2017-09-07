import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarVenCitaContainer from '../MostrarVen'

import MostrarAgregarPreConsultaContainer from '../MostrarAgregarPreConsulta'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderCitas = this.renderCitas.bind(this)
		this.renderOptionsByRol = this.renderOptionsByRol.bind(this)
		this.renderAddButton = this.renderAddButton.bind(this)
		this.renderFormAndShow = this.renderFormAndShow.bind(this)

		this.renderEstadoCita = this.renderEstadoCita.bind(this)

		this.renderEnfermeriaBtns = this.renderEnfermeriaBtns.bind(this)
		// filter.
		// this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount() {
		this.props.listarCitas()
		this.props.listarPersonales()
	}

	shouldComponentUpdate(nextProps) {
		if(nextProps.citas !== this.props.citas) {
			return true
		}else {
			return false
		}
	}

	renderEstadoCita(pendiente) {
		if(pendiente) {
			return <p>Pendiente</p>
		} else {
			return <p>Realizado</p>
		}
	}

	// handleChange(e) {
	// 	let valoresInputActualizando = {
	// 		id_personal: ReactDOM.findDOMNode(this.refs.idPersonal).value
	// 	}

	// 	// console.log(valoresInputActualizando)

	// 	this.props.actualizarFormularioFiltro(valoresInputActualizando)
	// }

	renderEnfermeriaBtns(cita) {
		if(cita.id_preconsulta == null) {
			return <button type="button" onClick={() => { this.props.mostrarCitaAgregarPreConsulta(cita.id_cita) }} className="btn btn-success btn-space">
				Agregar pre-consulta
			</button>
			
		} else {
			return <Link to={`/dashboard/citas/${cita.id_cita}`}>
				<button type="button" className="btn btn-info btn-space">Mostrar</button>
			</Link>
		}
	}

	renderOptionsByRol(rol, cita) {
		// alert(rol)

		switch(rol) {
			case 'administracion':
				return <div>
					<button type="button" onClick={() => { this.props.mostrarCita(cita.id_cita) }} className="btn btn-info btn-space">Mostrar</button>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarCita(cita.id_cita) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarCita(cita.id_cita) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
			case 'ventanilla':
				return <div>
					<button type="button" onClick={() => { this.props.mostrarCita(cita.id_cita) }} className="btn btn-info btn-space">Mostrar</button>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarCita(cita.id_cita) }} className="btn btn-warning btn-space">Editar</button>
					<button type="button" onClick={() => { this.props.eliminarCita(cita.id_cita) }} className="btn btn-danger btn-space">Eliminar</button>
				</div>
			case 'medico':
				return <div>
					<Link to={`/dashboard/citas/${cita.id_cita}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
				</div>
			case 'enfermeria':
				return <div>
					{ this.renderEnfermeriaBtns(cita) }
				</div>
		}
	}

	renderAddButton(rol) {
		if(rol == 'ventanilla') {
			return <div className='row'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button onClick={ this.props.abrirFormularioCrearCita } className='btn btn-success'>Agregar</button>
				</div>
			</div>
		} else {
			return false
		}
	}

	renderFormAndShow(rol) {
		if(rol == 'ventanilla') {
			return <div>
				<FormularioContainer/>
				<MostarVenCitaContainer/>
			</div>
		} else {
			return <span></span>
		}
	}

	// <div className='row'>
	// 					<div className='col-lg-4'>
	// 						<div className="input-group">
	// 							<select onChange={this.handleChange} ref='idPersonal' className='form-control'>
	// 								<option>Médicos/as</option>
	// 								{
	// 									this.props.listaPersonales.map((i) => {
	// 										return <option key={i.personal.id_personal} value={i.personal.id_personal}>
	// 											{ i.personal.nombres }
	// 										</option>
	// 									})
	// 								}
	// 							</select>
	// 						</div>
	// 					</div>
	// 					<div className='col-lg-4'>
							
	// 					</div>
	// 				</div>

	renderCitas(citas) {

		let rolUsuario = removeAccents(jwtDecode(localStorage.getItem('token')).rol)


		let filtro = this.props.filtro

		var dateNow = new Date();
		var d = dateNow.getDate();
		var m = dateNow.getMonth();
		var y = dateNow.getFullYear();

		var p = y+'-0'+m+'-'+d // fecha actual para filtrar.

		let con = { // Condiciones.
			// id_personal: filtro.id_personal.trim().toLowerCase()
			fecha: p
		}

		// if(con.id_personal){
			// citas = this.props.filtrarCitas(citas, con)
		// }

		return <tbody>
			{ this.renderFormAndShow(rolUsuario) }

			{
				citas.map((i) => {
					return <tr key={i.cita.id_cita}>
			            <td>{ i.cita.id_cita }</td>
			            <td>{ i.cita.fecha }</td>
			            <td>{ i.cita.hora }</td>
			            <td>{ this.renderEstadoCita(i.cita.pendiente) }</td>
			            <td>
			            	{ this.renderOptionsByRol(rolUsuario, i.cita) }
			            </td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {

		const { citas, cargando, error } = this.props.listar

		let filtro = this.props.filtro

		// console.log(this.props.listar)
		console.log(this.props.filtro)
		

		if(cargando) {
			return <Cargando/>
		} else {
			
			let rolUsuario = removeAccents(jwtDecode(localStorage.getItem('token')).rol)

				return <div>
					<h1 className='text-center'>Citas</h1>
					
					<MostrarAgregarPreConsultaContainer/>

					<MensajeOerror error={error} mensaje={null}/>

					{ this.renderAddButton(rolUsuario) }

					<br/>
					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Fecha</th>
						        	<th>Hora</th>
						        	<th>Estado</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>


							{ this.renderCitas(citas) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar