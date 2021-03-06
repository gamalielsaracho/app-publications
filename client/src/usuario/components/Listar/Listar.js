import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Cargando from '../../../app/components/Cargando'

import { Link } from 'react-router'

import RegistrarPersonalContainer from '../Registrar'

import FiltroContainer from '../Filtro'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderPersonales = this.renderPersonales.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount() {
		this.props.listarPersonales()
	}

	// shouldComponentUpdate(nextProps) {
	// 	let condition = (
	// 		nextProps.niveles !== this.props.niveles ||
	// 		nextProps.eliminar !== this.props.eliminar
	// 	)
		
	// 	if(condition) {
	// 		return true
	// 	}else {
	// 		return false
	// 	}
	// }

	handleChange(e) {
		let valoresInputActualizando = {
			nombres: ReactDOM.findDOMNode(this.refs.nombres).value,
			apellidos: ReactDOM.findDOMNode(this.refs.apellidos).value,
			correo: ReactDOM.findDOMNode(this.refs.correo).value
		}

		this.props.actualizarFormularioFiltro(valoresInputActualizando)
	}

	renderPersonales(personales) {

		let filtro = this.props.filtro

		let con = { // Condiciones.
			nombres: filtro.nombres.trim().toLowerCase(),
			apellidos: filtro.apellidos.trim().toLowerCase(),
			correo: filtro.correo.trim().toLowerCase()
		}

		// console.log(con)


		if(con.nombres.length > 0 || con.apellidos.length > 0 || con.correo.length > 0){
			personales = this.props.filtrarPersonales(personales, con)
		}

		console.log(personales)

		return <tbody>
				{
				  personales.map((i) => {
					return <tr key={i.personal.id_personal}>
			            <td>{ i.personal.nombres+' '+i.personal.apellidos }</td>
			            <td>{ i.personal.nroDocumento }</td>
			            <td>{ i.tipoDocumento.descripcion }</td>
			            <td>{ i.personal.correo }</td>

			            <td>{ i.rol.descripcion }</td>

			            <td>{ i.especialidad.descripcion }</td>

			            <td>
			            	<Link to={`/dashboard/personales/${i.personal.id_personal}`}>
								<button type="button" className="btn btn-info btn-space">Mostrar</button>
							</Link>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarPersonal(i.personal.id_personal) }} className="btn btn-warning btn-space">Editar</button>
			            </td>
			          </tr>		
				  })
			    }
		</tbody>
	}

	render() { 

		const { personales, cargando, error } = this.props.listar
		let filtro = this.props.filtro

		console.log(this.props.listar)
		console.log(this.props.filtro)
		

			// <div className='row'>
			// 		<div className='col-lg-4'>
			// 			<div className="input-group">
			// 				<input className='form-control' type='text' placeholder='Nombre'
			// 				value={filtro.nombres} ref='nombres'
			// 				onChange={this.handleChange} />
			// 				</div> 
			// 			</div>
			// 		<div className='col-lg-4'>
			// 			<div className="input-group">
			// 				<input className='form-control' type='text' placeholder='Apellido'
			// 				value={filtro.apellidos} ref='apellidos'
			// 				onChange={this.handleChange}/>
			// 			</div>
			// 		</div>
			// 		<div className='col-lg-4'>
			// 			<div className="input-group">
			// 				<input className='form-control' type='text' placeholder='Correo'
			// 				value={filtro.correo} ref='correo'
			// 				onChange={this.handleChange}/>
			// 			</div>
			// 		</div>
			// 	</div>


		if(cargando) {
			return <Cargando/>
		}else {
			return <div>
				<h1 className='text-center'>Personales</h1>

				<div className='row'>
					<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
						<button onClick={ this.props.abrirFormularioCrearPersonal } className='btn btn-success'>Agregar</button>
					</div>
				</div>
				<br/>

				<RegistrarPersonalContainer/>

				<div className="table-responsive">
					<table className='table table-striped'>
						<thead>
				          <tr>
				              <th>Nombre</th>
				              <th>Nro. Documento</th>
				              <th>Tipo Documento</th>
				              <th>Correo</th>

				              <th>Rol</th>

				              <th>Especialidad</th>

				              <th>Opciones</th>
				          </tr>
				        </thead>

						{ this.renderPersonales(personales) }

					</table>
				</div>

			</div>
		}
	}
}

export default Listar