import React , { Component } from 'react'

import MostrarPreConsultaContainer from '../components/Mostrar'

class MostrarPreConsultaPage extends Component {
	render() {
		return <MostrarPreConsultaContainer 
					idPreConsulta={this.props.params.idPreConsulta}/>
	}
}

export default MostrarPreConsultaPage