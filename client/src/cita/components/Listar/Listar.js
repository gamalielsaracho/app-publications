import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioContainer from '../Formulario'
import MostarVenCitaContainer from '../MostrarVen'

import MostrarAgregarPreConsultaContainer from '../MostrarAgregarPreConsulta'

import FiltrosCitaContainer from '../Filtros'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderCitas = this.renderCitas.bind(this)
		this.renderOptionsByRol = this.renderOptionsByRol.bind(this)
		this.renderAddButton = this.renderAddButton.bind(this)
		this.renderFormAndShow = this.renderFormAndShow.bind(this)

		this.renderEstadoCita = this.renderEstadoCita.bind(this)

		this.renderEnfermeriaBtns = this.renderEnfermeriaBtns.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
				console.log('entrooooo medico -> '+removeAccents(this.personalLocalSt.rol))
		switch(removeAccents(this.personalLocalSt.rol)) {
			case 'ventanilla':
				this.props.listarCitas()
				break
				
			case 'administracion':
				this.props.listarCitas()
				break

			case 'enfermeria':
				this.props.listarCitas()
				break

			case 'medico':
				this.props.listarCitasMedico(this.personalLocalSt.id_personal)
				break

		}
	}

	// shouldComponentUpdate(nextProps) {
	// 	if(nextProps.citas !== this.props.citas) {
	// 		return true
	// 	}else {
	// 		return false
	// 	}
	// }

	renderEstadoCita(pendiente) {
		if(pendiente) {
			return <p>Pendiente</p>
		} else {
			return <p>Realizado</p>
		}
	}

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

	renderCitas(citas) {

		let rolUsuario = removeAccents(jwtDecode(localStorage.getItem('token')).rol)

		let filtro = this.props.filtro

		console.log('EL FILTRO.')
		console.log(citas)

		let con = { // Condiciones.
			cita: {
				fechaActual: filtro.cita.fechaActual
			}
		}


		// if(con.id_personal){
			citas = this.props.filtrarCitas(citas, con)
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

		// let filtro = this.props.filtro

		if(cargando) {
			return <Cargando/>
		} else {
			
			let rolUsuario = removeAccents(jwtDecode(localStorage.getItem('token')).rol)

				return <div>
					<h1 className='text-center'>Citas</h1>
					
					<FiltrosCitaContainer/>

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