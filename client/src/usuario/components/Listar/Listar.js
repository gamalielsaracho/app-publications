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
		let style = {
			btn: {
				"marginLeft":"10px"
			}
		}

		console.log(style.btn)

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
			            <td className='center'>{ personal.nombre }</td>
			            <td className='center'>{ personal.apellido }</td>
			            <td className='center'>{ personal.correo }</td>
			            <td className='center'>
			            	<a className="#e53935 red darken-1 btn">Editar</a>
			            	<a style={style.btn} className="#0288d1 light-blue darken-2 btn">Eliminar</a>
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

					{ this.renderPersonales(personales) }

				</table>
				

			</div>
		}
	}
}

export default Listar