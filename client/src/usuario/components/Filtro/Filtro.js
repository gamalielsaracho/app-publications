import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Filtro extends Component {
	render() {
		const { filtro } = this.props.filtro

		console.log(this.props.filtro)

		return <div>
			<input type='text' ref='nombre'
				onChange={(e) => this.props.buscarUsuarios(this.props.usuarios, ReactDOM.findDOMNode(this.refs.nombre).value)} 
				/>
		</div>
	}
}

export default Filtro