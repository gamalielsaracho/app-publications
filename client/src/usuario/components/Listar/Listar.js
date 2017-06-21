import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Cargando from '../../../app/components/Cargando'

import FiltroContainer from '../Filtro'


class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderUsuarios = this.renderUsuarios.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.enviarFormulario = this.enviarFormulario.bind(this)

		this.state = { nombre:'', apellido: '' }
	}

	componentWillMount() {
		this.props.listarUsuarios()
	}

	enviarFormulario(formProps) {
		// this.props.registrarUsuario(formProps)
	}
 
	handleChange(e) {
		this.setState({ nombre: e.target.value, apellido: e.target.value })
	}
	// shouldComponentUpdate(nextProps, nextState) {
	// 	// console.log(nextState)
	// 	return nextState.usuarios.length !== this.props.usuarios.length 
	// }

	renderUsuarios(usuarios) {

		let apellido = this.state.apellido.trim().toLowerCase()

		if(apellido.length > 0){
			usuarios = this.props.filtrarUsuarios(usuarios, apellido)
		}

		return <div className='container'>
			
			<div className='row'>
				{
				  usuarios.map((usuario) => {
					return <div key={usuario.id} className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
						<h4>{ usuario.nombre }</h4>
						<h4>{ usuario.apellido }</h4>
						<strong>{ usuario.correo }</strong>
					</div>
				  })
			    }
			</div>
		</div>
	}

	render() { 

		const { usuarios, cargando, error } = this.props.listar

		console.log(this.props.listar)

		if(cargando) {
			return <Cargando/>
		}else {
			return <div>
				<input type='text' 
					value={this.state.apellido} 
					onChange={this.handleChange}/>
				


				{ this.renderUsuarios(usuarios) }
			</div>
		}
	}
}

export default Listar