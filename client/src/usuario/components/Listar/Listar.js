import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Cargando from '../../../app/components/Cargando'

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

	handleChange(e) {
		let valoresInputActualizando = {
			nombre: ReactDOM.findDOMNode(this.refs.nombre).value,
			apellido: ReactDOM.findDOMNode(this.refs.apellido).value,
			correo: ReactDOM.findDOMNode(this.refs.correo).value
		}

		this.props.actualizarFormularioFiltro(valoresInputActualizando)
	}

	renderPersonales(personales) {

		let filtro = this.props.filtro

		let con = { // Condiciones.
			nombre: filtro.nombre.trim().toLowerCase(),
			apellido: filtro.apellido.trim().toLowerCase(),
			correo: filtro.correo.trim().toLowerCase()
		}


		if(con.nombre.length > 0 || con.apellido.length > 0 || con.correo.length > 0){
			personales = this.props.filtrarPersonales(personales, con)
		}

		return <tbody>
				{
				  personales.map((personal) => {
					return <tr key={personal.id_personal}>
			            <td>{ personal.nombre }</td>
			            <td>{ personal.apellido }</td>
			            <td>{ personal.correo }</td>
			            <td>
							<button type="button" className="btn btn-success">Editar</button>
							<button type="button" className="btn btn-danger btn-space">Eliminar</button>
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

		if(cargando) {
			return <Cargando/>
		}else {
			return <div>
				<h1 className='text-center'>Usuarios</h1>
				<br/>
				<div className='row'>
					<div className='col-lg-4'>
						<div className="input-group">
							<input className='form-control' type='text' placeholder='Nombre'
							value={filtro.nombre} ref='nombre'
							onChange={this.handleChange} />
							</div> 
						</div>
					<div className='col-lg-4'>
						<div className="input-group">
							<input className='form-control' type='text' placeholder='Apellido'
							value={filtro.apellido} ref='apellido'
							onChange={this.handleChange}/>
						</div>
					</div>
					<div className='col-lg-4'>
						<div className="input-group">
							<input className='form-control' type='text' placeholder='Correo'
							value={filtro.correo} ref='correo'
							onChange={this.handleChange}/>
						</div>
					</div>
				</div>

				<br/>
				<div className="table-responsive">
					<table className='table table-striped'>
						<thead>
				          <tr>
				              <th>Nombre</th>
				              <th>Apellido</th>
				              <th>Correo</th>
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