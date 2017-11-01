import React, { Component } from 'react'
import { Link } from 'react-router'

import jwtDecode from 'jwt-decode'
import removeAccents from 'remove-accents'

import moment from 'moment'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioCitaContainer from '../Formulario'

// import MostrarAgregarPreConsultaContainer from '../MostrarAgregarPreConsulta'

import FiltrosCitaContainer from '../Filtros'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderCitas = this.renderCitas.bind(this)
		this.renderOptionsByRol = this.renderOptionsByRol.bind(this)
		this.renderAddButton = this.renderAddButton.bind(this)
		this.renderFormularioCita = this.renderFormularioCita.bind(this)

		this.renderEstadoCita = this.renderEstadoCita.bind(this)
		this.renderBtnDelete = this.renderBtnDelete.bind(this)

		this.personalLocalSt = jwtDecode(localStorage.getItem('token'))
	}

	componentWillMount() {
		// console.log(this.personalLocalSt)
		switch(this.personalLocalSt.id_rol) {
			case 4:
				this.props.listarCitas()
				break
				
			case 3:
				this.props.listarCitas()
				break

			case 2:
				this.props.listarCitas()
				break

			case 1:
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

	renderBtnDelete(cita) {
		if(cita.id_preconsulta) {
			return <span></span>
		} else {
			return <button type="button" 
				onClick={() => { this.props.eliminarCita(cita.id_cita) }} className="btn btn-danger btn-space">
				Eliminar
			</button>
		}
	}

	renderOptionsByRol(cita) {

		switch(this.personalLocalSt.id_rol) {
			case 3: // admin.
				return <div>
					<Link to={`/dashboard/citas/${cita.id_cita}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarCita(cita.id_cita) }} className="btn btn-warning btn-space">Editar</button>
					{ this.renderBtnDelete(cita) }
				</div>
			case 4: // admisión.
				return <div>
					<Link to={`/dashboard/citas/${cita.id_cita}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
					<button type="button" onClick={() => { this.props.abrirFormularioEditarCita(cita.id_cita) }} className="btn btn-warning btn-space">Editar</button>
					{ this.renderBtnDelete(cita) }
				</div>
			case 1: // médico.
				return <div>
					<Link to={`/dashboard/citas/${cita.id_cita}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
				</div>
			case 2: // enfermería.
				return <div>
					<Link to={`/dashboard/citas/${cita.id_cita}`}>
						<button type="button" className="btn btn-info btn-space">Mostrar</button>
					</Link>
				</div>
		}
	}

	renderAddButton() {
		if(jwtDecode(localStorage.getItem('token')).id_rol == 4) {
			return <div className='row'>
				<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
					<button onClick={ this.props.abrirFormularioCrearCita } className='btn btn-success'>Agregar</button>
				</div>
			</div>
		} else {
			return false
		}
	}

	renderFormularioCita() {
		if(jwtDecode(localStorage.getItem('token')).id_rol == 4) {
			const { abirtoCrear, abirtoEditar } = this.props.formulario
			
			if(abirtoCrear || abirtoEditar) {
				return <FormularioCitaContainer/>
			} else {
				return <span></span>
			}
		} else {
			return <span></span>
		}
	}

	renderCitas(citas) {

		let filtro = this.props.filtro

		// console.log('EL FILTRO.')
		// console.log(citas)

			// Para filtrar información. 
		// let con = { // Condiciones.
		// 	cita: {
		// 		fechaActual: filtro.cita.fechaActual
		// 	}
		// }


		// if(con.id_personal){
			// citas = this.props.filtrarCitas(citas, con)
		// }

		return <tbody>
			{ this.renderFormularioCita() }

			{
				citas.map((i) => {
					return <tr key={i.cita.id_cita}>
			            <td>{ i.cita.id_cita }</td>
			            <td>{ moment(i.cita.fecha).format('L') }</td>
			            <td>{ moment(i.cita.start).format('LT') }</td>
			            <td>{ moment(i.cita.end).format('LT') }</td>
			            <td>{ this.renderEstadoCita(i.cita.pendiente) }</td>
			            <td>
			            	{ this.renderOptionsByRol(i.cita) }
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
			return <div>
				<h1 className='text-center'>Citas</h1>
					
				<MensajeOerror error={error} mensaje={null}/>

				{ this.renderAddButton() }

				<br/>
				<div className='table-responsive'>
					<table className='table table-striped'>
						<thead>
						    <tr>
						    	<th>Id</th>
						    	<th>Fecha</th>
						    	<th>Hora inicio</th>
						    	<th>Hora Fin</th>
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