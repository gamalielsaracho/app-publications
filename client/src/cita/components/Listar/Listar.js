import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarVenCitaContainer from '../MostrarVen'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderFitros = this.renderFitros.bind(this)
		this.renderCitas = this.renderCitas.bind(this)
		this.renderOptionsByRol = this.renderOptionsByRol.bind(this)
		this.renderAddButton = this.renderAddButton.bind(this)
		this.renderFormAndShow = this.renderFormAndShow.bind(this)

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

	// handleChange(e) {
	// 	let valoresInputActualizando = {
	// 		id_personal: ReactDOM.findDOMNode(this.refs.idPersonal).value
	// 	}

	// 	// console.log(valoresInputActualizando)

	// 	this.props.actualizarFormularioFiltro(valoresInputActualizando)
	// }

	renderOptionsByRol(rol, cita) {
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
					<Link to={`/dashboard/citas/${cita.id_cita}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
				</div>
			default:
				return <div>
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

	renderFitros() {
		return <div>
			<h4>Los filtros Aquí.</h4>
		</div>
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

		let rolUsuario = this.props.rol ? 
					   	 this.props.rol.descripcion : ''

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
			            <td>{ i.cita.pendiente }</td>
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
			let rolUsuario = this.props.rol ? 
							 this.props.rol.descripcion : '' 

			// console.log('Btb -> '+rolUsuario)

				return <div>
					<h1 className='text-center'>Citas</h1>
					
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