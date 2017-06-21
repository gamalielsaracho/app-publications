import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Cargando from '../../../app/components/Cargando'

import FiltroContainer from '../Filtro'


class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderUsuarios = this.renderUsuarios.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount() {
		this.props.listarUsuarios()
	}

	handleChange(e) {
		let valoresInputActualizando = {
			nombre: ReactDOM.findDOMNode(this.refs.nombre).value,
			apellido: ReactDOM.findDOMNode(this.refs.apellido).value,
			correo: ReactDOM.findDOMNode(this.refs.correo).value
		}

		this.props.actualizarFormularioFiltro(valoresInputActualizando)
	}
	// shouldComponentUpdate(nextProps, nextState) {
	// 	// console.log(nextState)
	// 	return nextState.usuarios.length !== this.props.usuarios.length 
	// }

	renderUsuarios(usuarios) {
		let filtro = this.props.filtro

		let con = { // Condiciones.
			nombre: filtro.nombre.trim().toLowerCase(),
			apellido: filtro.apellido.trim().toLowerCase(),
			correo: filtro.correo.trim().toLowerCase()
		}


		if(con.nombre.length > 0 || con.apellido.length > 0 || con.correo.length > 0){
			usuarios = this.props.filtrarUsuarios(usuarios, con)
		}

		return <tbody>
				{
				  usuarios.map((usuario) => {
					return <tr key={usuario.id}>
			            <td className='center'>{ usuario.nombre }</td>
			            <td className='center'>{ usuario.apellido }</td>
			            <td className='center'>{ usuario.correo }</td>
			            <td className='center'>
			            	<a className="#e53935 red darken-1 btn">Editar</a>
			            	<a className="#0288d1 light-blue darken-2 btn">Eliminar</a>
			            </td>
			          </tr>		
				  })
			    }

		</tbody>
	}

	render() { 

		const { usuarios, cargando, error } = this.props.listar
		let filtro = this.props.filtro

		console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		}else {
			return <div className='container'>
				<div className='row center-lg center-md center-sm center-xs'>
					<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
						<input type='text' placeholder='Nombre'
						value={filtro.nombre} ref='nombre'
						onChange={this.handleChange}/>
						</div>
					<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
						<input type='text' placeholder='Apellido'
						value={filtro.apellido} ref='apellido'
						onChange={this.handleChange}/>
					</div>
					<div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
						<input type='text' placeholder='Correo'
						value={filtro.correo} ref='correo'
						onChange={this.handleChange}/>
					</div>
				</div>


				<table>
					<thead>
			          <tr>
			              <th className='center'>Nombre</th>
			              <th className='center'>Apellido</th>
			              <th className='center'>Correo</th>
			              <th className='center'>Opciones</th>
			          </tr>
			        </thead>

					{ this.renderUsuarios(usuarios) }

				</table>
				

			</div>
		}
	}
}

export default Listar