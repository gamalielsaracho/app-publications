import React , { Component } from 'react'

import MostarContainer from '../components/Mostrar'

class MostrarPacientePage extends Component {
	render() {
		return <MostarContainer nroDocumento={this.props.params.nroDocumento}/>
	}
}

export default MostrarPacientePage